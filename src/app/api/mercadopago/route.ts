import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';

// Inicializar MercadoPago con tu clave de acceso
const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
});

export async function POST(request: Request) {
    try {
        // Validaciones previas
        if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
            console.error('CRITICO: Falta MERCADOPAGO_ACCESS_TOKEN en las variables de entorno');
            return NextResponse.json({ error: 'Configuración del servidor incompleta (Falta Token)' }, { status: 500 });
        }

        const body = await request.json();
        const { id, title, price, userEmail } = body;

        // Aseguramos que el precio sea un entero (MP a veces falla con floats largos)
        const finalPrice = Math.round(Number(price));

        if (isNaN(finalPrice) || finalPrice <= 0) {
            return NextResponse.json({ error: 'Precio inválido para cobrar' }, { status: 400 });
        }

        // Crear la preferencia (orden de pago)
        const preference = new Preference(client);
        
        try {
            const result = await preference.create({
                body: {
                    items: [
                        {
                            id: id,
                            title: `Digital: ${title}`,
                            quantity: 1,
                            unit_price: finalPrice,
                            currency_id: 'ARS',
                        }
                    ],
                    payer: {
                        email: userEmail || 'cliente@papelcrepe.com.ar'
                    },
                    back_urls: {
                        success: `${process.env.NEXT_PUBLIC_APP_URL || 'https://papelcrepe.com.ar'}?payment=success&id=${id}`,
                        failure: `${process.env.NEXT_PUBLIC_APP_URL || 'https://papelcrepe.com.ar'}?payment=failure&id=${id}`,
                        pending: `${process.env.NEXT_PUBLIC_APP_URL || 'https://papelcrepe.com.ar'}?payment=pending&id=${id}`
                    },
                    auto_return: 'approved',
                    external_reference: id,
                    notification_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://papelcrepe.com.ar'}/api/mercadopago/webhook`
                }
            });

            return NextResponse.json({ 
                id: result.id, 
                init_point: result.init_point 
            });
        } catch (mpError: any) {
            console.error('ERROR DETALLADO DE MERCADOPAGO:', mpError);
            return NextResponse.json({ 
                error: 'MercadoPago rechazó la solicitud', 
                details: mpError.message,
                cause: mpError.cause 
            }, { status: 500 });
        }

    } catch (error: any) {
        console.error('Error general en API MP:', error);
        return NextResponse.json({ error: 'Error interno del servidor', details: error.message }, { status: 500 });
    }
}
