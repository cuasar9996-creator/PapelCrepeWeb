'use client';

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
    mercadoPagoLink = 'https://mpago.la/example',
    paypalLink = 'https://paypal.me/example',
    brubankLink = 'Alias.Brubank.Ejemplo',
    exchangeRate = 1250
}: PaymentModalProps) {
    if (!isOpen) return null;

    const handleMethodClick = (link: string) => {
        window.open(link, '_blank');
        // In a real app, we would wait for a webhook or check status.
        // For now, we provide a button to "Confirm Payment" manually for the demo.
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
                                onClick={() => handleMethodClick(mercadoPagoLink)}
                                className="w-full group flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl transition-all active:scale-[0.98]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center p-2">
                                        <img src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadopago/logo__large.png" alt="Mercado Pago" className="w-full object-contain" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-blue-900">Mercado Pago</p>
                                        <p className="text-[10px] text-blue-700/70 font-medium">Tarjetas de Débito, Crédito o Dinero en cuenta</p>
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

                            {/* Brubank */}
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(brubankLink);
                                    toast.success('Alias copiado: ' + brubankLink);
                                }}
                                className="w-full group flex items-center justify-between p-4 bg-slate-900 hover:bg-slate-950 border border-slate-800 rounded-2xl transition-all active:scale-[0.98] text-white"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl shadow-sm flex items-center justify-center p-2 border border-white/10">
                                        <div className="w-full h-full rounded-md bg-sky-400 flex items-center justify-center font-black text-slate-900 text-xs">BRU</div>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-black">Transferencia Brubank</p>
                                        <p className="text-[10px] text-white/50 font-medium font-mono lowercase">{brubankLink}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[8px] bg-sky-500 text-white px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Sin comisiones</span>
                                    <CheckCircle2 className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                                </div>
                            </button>
                        </div>

                        {/* Verification Button (Simulated flow for the user's request) */}
                        <div className="pt-2">
                            <Button
                                onClick={onPaymentComplete}
                                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-lg gap-3 shadow-xl shadow-slate-200 transition-all hover:-translate-y-1"
                            >
                                He Realizado el Pago
                                <CheckCircle2 className="w-6 h-6" />
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
