'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard,
    CheckCircle2,
    X,
    ShieldCheck,
    Zap,
    Globe,
    Smartphone,
    Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    price: string;
    isPremium: boolean;
    onPaymentComplete: () => void;
    invitationId?: string;
    userEmail?: string;
    mercadoPagoLink?: string;
    paypalLink?: string;
    brubankLink?: string;
    exchangeRate?: number;
}

export function PaymentModal({
    isOpen,
    onClose,
    price,
    isPremium,
    onPaymentComplete,
    invitationId,
    userEmail,
    mercadoPagoLink = 'https://mpago.la/example',
    paypalLink = 'https://paypal.me/example',
    brubankLink = '1430001713006092990016',
    exchangeRate = 1250
}: PaymentModalProps) {
    if (!isOpen) return null;

    const [isLoadingMP, setIsLoadingMP] = useState(false);

    const handleMercadoPago = async () => {
        setIsLoadingMP(true);
        try {
            const response = await fetch('/api/mercadopago', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: invitationId || 'temp_' + Date.now(),
                    title: isPremium ? 'Invitación Papel Crepé Premium' : 'Invitación Papel Crepé Standard',
                    price: Number(price) * exchangeRate,
                    userEmail: userEmail || 'cliente@papelcrepe.com.ar'
                })
            });

            const data = await response.json();
            
            if (response.ok && data.init_point) {
                window.open(data.init_point, '_blank');
                toast.info('Se abrió MercadoPago en una ventana nueva');
            } else {
                console.error('Error del servidor:', data);
                const errorMsg = data.details || data.error || 'Error desconocido';
                throw new Error(errorMsg);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(`MercadoPago Error: ${error.message}`);
        } finally {
            setIsLoadingMP(false);
        }
    };

    const handleMethodClick = (link: string) => {
        window.open(link, '_blank');
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Header Section */}
                    <div className={`p-6 text-white ${isPremium ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-gradient-to-r from-rose-500 to-purple-600'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                                    <CreditCard className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-xl font-black uppercase tracking-tight">Finalizar y Activar</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex flex-col mb-2">
                            <span className="text-4xl font-black italic">
                                ${(Number(price) * exchangeRate).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ARS
                            </span>
                            <div className="flex items-center gap-2 opacity-80">
                                <span className="text-lg font-bold">(${price} USD)</span>
                                <span className="text-[10px] font-medium bg-white/20 px-1.5 rounded">Pago Único</span>
                            </div>
                        </div>
                        <p className="text-white/90 text-sm font-medium">
                            {isPremium ? 'Activando versión 3D Premium con Efectos Live' : 'Activando versión 2D Estándar Digital'}
                        </p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Features List */}
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="flex items-center gap-2 text-slate-600">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span>Sin marcas de agua</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span>RSVP Ilimitado</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span>Música de fondo</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span>Link compartible</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                <Smartphone className="w-4 h-4 text-slate-400" />
                                Selecciona tu Método de Pago
                            </h3>

                            {/* Mercado Pago */}
                            <button
                                onClick={handleMercadoPago}
                                disabled={isLoadingMP}
                                className="w-full group flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center p-2 overflow-hidden">
                                        <img 
                                            src="https://http2.mlstatic.com/frontend-assets/mp-web-navigation/5.19.0/mercadopago-logo.svg" 
                                            alt="Mercado Pago" 
                                            className="h-8 w-auto object-contain"
                                            onError={(e) => {
                                                // Fallback if the logo fails to load
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                const parent = (e.target as HTMLElement).parentElement;
                                                if (parent && !parent.querySelector('.mp-fallback')) {
                                                    const span = document.createElement('span');
                                                    span.className = 'mp-fallback font-bold text-blue-600';
                                                    span.innerText = 'Mercado Pago';
                                                    parent.appendChild(span);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-blue-900">
                                            {isLoadingMP ? 'Generando link...' : 'Mercado Pago'}
                                        </p>
                                        <p className="text-[10px] text-blue-700/70 font-medium">Usa tus tarjetas o dinero en cuenta</p>
                                    </div>
                                </div>
                                <Zap className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                            </button>

                            {/* PayPal / International */}
                            <button
                                onClick={() => handleMethodClick(paypalLink)}
                                className="w-full group flex items-center justify-between p-4 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-2xl transition-all active:scale-[0.98]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center p-2">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-full object-contain" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-indigo-900">PayPal / Internacional</p>
                                        <p className="text-[10px] text-indigo-700/70 font-medium">Pago en USD desde cualquier país</p>
                                    </div>
                                </div>
                                <Globe className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        {/* Instruction for the user */}
                        <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 border-dashed">
                            <p className="text-[11px] text-slate-500 font-medium text-center leading-relaxed">
                                <Info className="w-4 h-4 inline-block mr-1 text-slate-400 mb-0.5" />
                                Una vez realizado el pago, tu invitación se activará <b>automáticamente</b> en unos segundos. No hace falta que envíes comprobante.
                            </p>
                        </div>

                        {/* Button to close and check later */}
                        <div className="pt-2">
                            <Button
                                onClick={onClose}
                                className="w-full h-14 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-bold text-lg gap-3 transition-all"
                            >
                                Volver y esperar activación
                            </Button>
                        </div>

                        <div className="flex items-center justify-center gap-4 py-2 border-t border-slate-100">
                            <div className="flex items-center gap-1.5 opacity-40 grayscale">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Pago 100% Seguro</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
