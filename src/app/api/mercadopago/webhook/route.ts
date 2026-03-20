import { MercadoPagoConfig, Payment } from 'mercadopago';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
});

export async function POST(request: Request) {
    try {
        const url = new URL(request.url);
        const type = url.searchParams.get('type');
        const dataId = url.searchParams.get('data.id');

        if (type === 'payment' && dataId) {
            const payment = new Payment(client);
            const paymentData = await payment.get({ id: dataId });

            // Verificar si el pago fue aprobado
            const isApproved = paymentData.status === 'approved';
            const invitationId = paymentData.external_reference;

            if (isApproved && invitationId) {
                console.log(`Pago aprobado para invitación: ${invitationId}`);

                // 1. Obtener la invitación actual desde Supabase para no borrar otros datos
                const { data: invData, error: fetchError } = await supabase
                    .from('invitaciones')
                    .select('data')
                    .eq('id', invitationId)
                    .single();

                if (!fetchError && invData) {
                    const updatedData = { ...invData.data, isPaid: true };

                    // 2. Actualizar el estado de pago en la base de datos
                    const { error: updateError } = await supabase
                        .from('invitaciones')
                        .update({ data: updatedData })
                        .eq('id', invitationId);

                    if (updateError) {
                        console.error('Error al actualizar pago en DB:', updateError);
                    } else {
                        console.log(`Invitación ${invitationId} marcada como PAGADA.`);
                    }
                }
            }
        }

        return NextResponse.json({ received: true });

    } catch (error: any) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
