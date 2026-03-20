'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, User, Mail, Shield, Zap, Award, BarChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { User as UserType, updateProfile } from '@/lib/auth';
import { adminApi, invitationsApi } from '@/lib/api';

interface ProfileModalProps {
    user: UserType | null;
    open: boolean;
    onClose: () => void;
    onUpdate: (user: UserType) => void;
}

export function ProfileModal({ user, open, onClose, onUpdate }: ProfileModalProps) {
    const [name, setName] = useState(user?.name || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');
    const [isUpdating, setIsUpdating] = useState(false);
    const [stats, setStats] = useState({ totalInvitations: 0, totalGuests: 0 });
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user && open) {
            setName(user.name);
            setAvatar(user.avatar || '');
            
            // Load real stats
            invitationsApi.getUserStats(user.id)
                .then(setStats)
                .catch(err => console.error('Error fetching stats:', err));

            // Sync profile from cloud if exists
            adminApi.getProfile(user.email)
                .then(cloudData => {
                    if (cloudData) {
                        setName(cloudData.name || user.name);
                        setAvatar(cloudData.avatar || user.avatar || '');
                        // Optional: update local version too if cloud is newer
                        updateProfile({ name: cloudData.name, avatar: cloudData.avatar });
                    }
                })
                .catch(err => console.error('Error syncing profile:', err));
        }
    }, [user, open]);

    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            const img = document.createElement('img');
            const reader = new FileReader();
            reader.onload = (e) => {
                img.onload = () => {
                    const MAX = 150;
                    let w = img.width, h = img.height;
                    if (w > h) { h = (h / w) * MAX; w = MAX; }
                    else { w = (w / h) * MAX; h = MAX; }
                    canvas.width = w;
                    canvas.height = h;
                    ctx.drawImage(img, 0, 0, w, h);
                    resolve(canvas.toDataURL('image/jpeg', 0.65));
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('La imagen es demasiado grande (máximo 5MB)');
                return;
            }
            try {
                const compressed = await compressImage(file);
                setAvatar(compressed);
            } catch {
                toast.error('Error al procesar la imagen');
            }
        }
    };

    const handleSave = async () => {
        if (!user) return;
        if (!name.trim()) {
            toast.error('El nombre no puede estar vacío');
            return;
        }

        setIsUpdating(true);
        try {
            // Save to Cloud first
            await adminApi.saveProfile(user.email, { name: name.trim(), avatar });
            
            // Then update local profile
            const result = updateProfile({ name: name.trim(), avatar });
            
            if (result.success && result.user) {
                onUpdate(result.user);
                toast.success('¡Perfil sincronizado en la nube! ☁️');
                onClose();
            }
        } catch (error) {
            console.error('Error al guardar perfil:', error);
            // Fallback for local update if cloud fails
            const result = updateProfile({ name: name.trim(), avatar });
            if (result.success && result.user) {
                onUpdate(result.user);
                toast.success('Perfil actualizado localmente');
                onClose();
            }
        } finally {
            setIsUpdating(false);
        }
    };

    if (!user) return null;

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[800px] overflow-y-auto md:overflow-hidden"
                    >
                        {/* Left Sidebar - Stats & Account Level */}
                        <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-800/50 p-8 border-r border-slate-100 dark:border-slate-800 flex flex-col items-center">
                            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl relative ring-4 ring-rose-500/20 ring-offset-2">
                                    <img
                                        src={avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                                        alt={name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="text-white w-8 h-8" />
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleAvatarChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-rose-500 text-white p-2 rounded-full shadow-lg">
                                    <Zap className="w-4 h-4 fill-current" />
                                </div>
                            </div>

                            <h3 className="mt-6 font-bold text-xl text-slate-900 dark:text-white">{name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">{user.email}</p>

                            <div className="w-full space-y-4">
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-3 text-rose-500 mb-1">
                                        <Award className="w-5 h-5" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Nivel VIP</span>
                                    </div>
                                    <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
                                        {stats.totalInvitations >= 10 ? 'Organizador Maestro' : stats.totalInvitations >= 3 ? 'Organizador Pro' : 'Organizador Novel'}
                                    </p>
                                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div 
                                            className="bg-rose-500 h-full transition-all duration-1000" 
                                            style={{ width: `${Math.min(((stats.totalInvitations % 10) / 10) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1 text-right">
                                        {10 - (stats.totalInvitations % 10)} invitaciones para sig. nivel
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
                                        <p className="text-xl font-bold text-rose-500">{stats.totalInvitations}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Eventos</p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
                                        <p className="text-xl font-bold text-purple-500">{stats.totalGuests}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Invitados</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-8 w-full flex flex-col gap-2">
                                <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 text-sm font-medium">
                                    <BarChart className="w-4 h-4" />
                                    Estadísticas
                                </button>
                                <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 text-sm font-medium">
                                    <Shield className="w-4 h-4" />
                                    Seguridad
                                </button>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 p-8 md:p-12 overflow-y-auto min-h-max">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Perfil de Usuario</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="profile-name" className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                            Nombre Completo
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
                                            <Input
                                                id="profile-name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="pl-12 h-14 bg-slate-50 dark:bg-slate-800/50 border-transparent focus:border-rose-300 rounded-xl"
                                                placeholder="Tu nombre"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 opacity-60">
                                        <Label htmlFor="profile-email" className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                            Correo Electrónico
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <Input
                                                id="profile-email"
                                                value={user.email}
                                                disabled
                                                className="pl-12 h-14 bg-slate-100 dark:bg-slate-800 border-transparent cursor-not-allowed rounded-xl"
                                            />
                                        </div>
                                        <p className="text-[10px] italic text-slate-400">El email no se puede cambiar por seguridad.</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Ajustes de Cuenta</h4>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                                                    <Settings className="w-5 h-5 text-purple-500" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-slate-800 dark:text-slate-200">Notificaciones</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Recibe avisos sobre nuevas confirmaciones</p>
                                                </div>
                                            </div>
                                            <div className="w-12 h-6 bg-rose-500 rounded-full relative shadow-inner cursor-pointer">
                                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                                                    <Shield className="w-5 h-5 text-emerald-500" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-slate-800 dark:text-slate-200">Idioma</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Selecciona tu idioma preferido</p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-900/30 px-3 py-1 rounded-full uppercase">Español</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 flex gap-4">
                                    <Button
                                        onClick={onClose}
                                        variant="ghost"
                                        className="flex-1 h-14 rounded-xl font-bold"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        disabled={isUpdating}
                                        className="flex-1 h-14 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 rounded-xl font-bold shadow-lg shadow-rose-500/20"
                                    >
                                        {isUpdating ? 'Guardando...' : 'Guardar Cambios'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
