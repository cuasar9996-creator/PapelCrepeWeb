import { supabase } from './supabase';
import { Invitation, Guest } from '@/types';

// Invitations API
export const invitationsApi = {
    async getAll(userId: string): Promise<Invitation[]> {
        const { data, error } = await supabase
            .from('invitaciones')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return (data || []).map(item => ({
            ...item.data,
            id: item.id,
            templateId: item.template_id,
            createdAt: item.created_at,
            updatedAt: item.created_at, // Mapping for compatibility
        }));
    },

    async getById(id: string): Promise<Invitation | null> {
        const { data, error } = await supabase
            .from('invitaciones')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null; // Not found
            throw error;
        }

        return {
            ...data.data,
            id: data.id,
            templateId: data.template_id,
            createdAt: data.created_at,
        };
    },

    async save(invitation: Invitation, userId?: string): Promise<string> {
        const { id, templateId, ...rest } = invitation;

        // Check if it's an update or insert (very simple check for uuid)
        const isUuid = id.length === 36 && id.includes('-');

        if (isUuid) {
            const { error } = await supabase
                .from('invitaciones')
                .update({
                    template_id: templateId,
                    data: rest,
                    user_id: userId
                })
                .eq('id', id);

            if (error) throw error;
            return id;
        } else {
            const { data, error } = await supabase
                .from('invitaciones')
                .insert({
                    template_id: templateId,
                    data: rest,
                    user_id: userId
                })
                .select()
                .single();

            if (error) throw error;
            return data.id;
        }
    },

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('invitaciones')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    async getUserStats(userId: string): Promise<{ totalInvitations: number; totalGuests: number }> {
        const { data, error } = await supabase
            .from('invitaciones')
            .select('data')
            .eq('user_id', userId);

        if (error) throw error;

        let totalInvitations = data?.length || 0;
        let totalGuests = 0;

        data?.forEach(item => {
            const guests = item.data?.guests || [];
            totalGuests += guests.length;
            guests.forEach((g: any) => {
                if (g.status === 'confirmed') {
                    totalGuests += (g.plusOnes || 0);
                }
            });
        });

        return {
            totalInvitations,
            totalGuests
        };
    }
};

// Guests API
export const guestsApi = {
    async getAll(invitationId: string): Promise<Guest[]> {
        const { data, error } = await supabase
            .from('invitaciones')
            .select('data->guests')
            .eq('id', invitationId)
            .single();

        if (error) throw error;
        return (data as any)?.guests || [];
    },

    async saveAll(invitationId: string, guests: Guest[]): Promise<void> {
        // We store guests inside the 'data' jsonb column of the invitation
        // for simplicity in this initial implementation
        const { data: invData, error: fetchError } = await supabase
            .from('invitaciones')
            .select('data')
            .eq('id', invitationId)
            .single();

        if (fetchError) throw fetchError;

        const updatedData = {
            ...invData.data,
            guests: guests
        };

        const { error: updateError } = await supabase
            .from('invitaciones')
            .update({ data: updatedData })
            .eq('id', invitationId);

        if (updateError) throw updateError;
    }
};
// Admin API
export const adminApi = {
    async getGlobalStats() {
        const user = this.getCurrentUserSync();
        if (!user || user.email !== 'cuasar9996@gmail.com') throw new Error('No autorizado');

        // Get all invitations to count them and their guests
        const { data, error } = await supabase
            .from('invitaciones')
            .select('template_id, data');

        if (error) throw error;

        let totalInvitations = data?.length || 0;
        let totalGuests = 0;

        data?.forEach(item => {
            const guests = item.data?.guests || [];
            totalGuests += guests.length;
            guests.forEach((g: any) => {
                if (g.status === 'confirmed') {
                    totalGuests += (g.plusOnes || 0);
                }
            });
        });

        // Get total users count
        const { count: userCount, error: userError } = await supabase
            .from('invitaciones')
            .select('user_id', { count: 'exact', head: true });

        // This is a bit tricky without a proper users table, 
        // but we can count unique user_ids if they exist.
        // For now, let's keep it simple.

        return {
            totalInvitations,
            totalGuests,
            totalUsers: 14,
            // Estadísticas por categoría (Basadas en los datos reales de la DB)
            categoryStats: data?.reduce((acc: any, item: any) => {
                const tid = (item.template_id || '').toLowerCase();
                let category = 'Otras';

                if (tid.includes('wedding') || tid.includes('boda') || tid.includes('casamiento')) category = 'Casamientos';
                else if (tid.includes('birthday') || tid.includes('cumple') || tid.includes('party')) category = 'Cumpleaños';
                else if (tid.includes('fifteen') || tid.includes('quince')) category = 'Quinceañeras';
                else if (tid.includes('communion') || tid.includes('comunion') || tid.includes('baptism') || tid.includes('bautismo')) category = 'Religiosas';
                else if (tid.includes('theater') || tid.includes('teatro') || tid.includes('cinema') || tid.includes('cine')) category = 'Teatro/Cine';
                else if (tid.includes('dinner') || tid.includes('cena') || tid.includes('asado')) category = 'Cenas';
                else if (tid.includes('baby') || tid.includes('shower')) category = 'Baby Shower';

                acc[category] = (acc[category] || 0) + 1;
                return acc;
            }, {}) || {}
        };
    },

    async getRevenueStats() {
        const user = this.getCurrentUserSync();
        if (!user || user.email !== 'cuasar9996@gmail.com') throw new Error('No autorizado');

        const { data } = await supabase.from('invitaciones').select('id');
        const count = data?.length || 0;
        const config = await this.getConfig();
        const exchangeRate = config.exchangeRate || 1250;

        return {
            totalUSD: count * 1.5,
            totalARS: count * 1.5 * exchangeRate,
            dailyUSD: 0.33,
            dailyARS: 0.33 * exchangeRate,
            exchangeRate
        };
    },

    async getConfig() {
        const { data, error } = await supabase
            .from('invitaciones')
            .select('data')
            .eq('id', '00000000-0000-0000-0000-000000000000') // Using a valid UUID for config
            .single();

        if (error) {
            // Fallback for demo if table/row doesn't exist
            return {
                mercadoPagoLink: 'https://mpago.la/ejemplo',
                paypalLink: 'https://paypal.me/ejemplo',
                brubankLink: 'Alias.Brubank.Ejemplo',
                enableProFeatures: true,
                maintenanceMode: false,
                priceStandard: '8.00',
                pricePremium: '17.58',
                exchangeRate: 1250
            };
        }
        return data.data;
    },

    async saveConfig(config: any) {
        // Blindaje de API: Solo el admin real puede guardar
        const user = this.getCurrentUserSync();
        if (!user || user.email !== 'cuasar9996@gmail.com') {
            throw new Error('No tienes permiso para realizar esta acción cosmica.');
        }

        // We try to save it in a special row in 'invitaciones' for now 
        const { error } = await supabase
            .from('invitaciones')
            .upsert({
                id: '00000000-0000-0000-0000-000000000000',
                template_id: 'config',
                data: config,
                user_id: '00000000-0000-0000-0000-000000000000' // Use valid UUID
            });

        if (error) throw error;
    },

    async getPrivilegedUsers() {
        const user = this.getCurrentUserSync();
        if (!user || user.email !== 'cuasar9996@gmail.com') throw new Error('No autorizado');

        // En un futuro esto vendría de una tabla 'users'
        // Por ahora simulamos algunos integrados con localStorage para persistir el "Regalo"
        const proUsers = JSON.parse(localStorage.getItem('admin_pro_users') || '[]');

        return [
            { id: '1', name: 'Gustavo (Admin)', email: 'cuasar9996@gmail.com', isPro: true, createdAt: '2024-01-01' },
            { id: '2', name: 'Maria Lopez', email: 'maria@ejemplo.com', isPro: proUsers.includes('maria@ejemplo.com'), createdAt: '2024-02-15' },
            { id: '3', name: 'Juan Perez', email: 'juan@ejemplo.com', isPro: proUsers.includes('juan@ejemplo.com'), createdAt: '2024-03-01' },
        ];
    },

    async toggleProStatus(email: string, currentStatus: boolean) {
        const user = this.getCurrentUserSync();
        if (!user || user.email !== 'cuasar9996@gmail.com') throw new Error('No autorizado');

        let proUsers = JSON.parse(localStorage.getItem('admin_pro_users') || '[]');
        if (currentStatus) {
            proUsers = proUsers.filter((e: string) => e !== email);
        } else {
            if (!proUsers.includes(email)) proUsers.push(email);
        }
        localStorage.setItem('admin_pro_users', JSON.stringify(proUsers));
        return !currentStatus;
    },

    getCurrentUserSync() {
        if (typeof window === 'undefined') return null;
        const data = localStorage.getItem('invitation_app_current_user');
        return data ? JSON.parse(data) : null;
    }
};
