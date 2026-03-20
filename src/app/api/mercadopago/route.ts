import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';

// Inicializar MercadoPago con tu clave de acceso (se saca de variables de entorno por seguridad)
const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, title, price, userEmail } = body;

        // Crear la preferencia (orden de pago)
        const preference = new Preference(client);
        
        const result = await preference.create({
            body: {
                items: [
                    {
                        id: id,
                        title: `Invitación Digital: ${title}`,
                        quantity: 1,
                        unit_price: Number(price),
                        currency_id: 'ARS',
                    }
                ],
                payer: {
                    email: userEmail
                },
                // URL a donde vuelve el usuario después de pagar
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_APP_URL || 'https://papelcrepe.com.ar'}?payment=success&id=${id}`,
                    failure: `${process.env.NEXT_PUBLIC_APP_URL || 'https://papelcrepe.com.ar'}?payment=failure&id=${id}`,
                    pending: `${process.env.NEXT_PUBLIC_APP_URL || 'https://papelcrepe.com.ar'}?payment=pending&id=${id}`
                },
                auto_return: 'approved',
                // Identificador para nosotros (para saber qué invitación se pagó)
                external_reference: id,
                notification_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://papelcrepe.com.ar'}/api/mercadopago/webhook`
            }
        });

        // Devolvemos el link de pago al frontend
        return NextResponse.json({ 
            id: result.id, 
            init_point: result.init_point 
        });

    } catch (error: any) {
        console.error('Error creando preferencia MP:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
