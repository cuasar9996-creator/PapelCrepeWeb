'use client';

import { motion } from 'framer-motion';
import { Hammer, Clock, ShieldCheck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MaintenanceMode() {
    return (
        <div className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center p-6 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full text-center relative z-10"
            >
                <div className="mb-8 inline-flex p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                    <Hammer className="w-12 h-12 text-purple-400 animate-pulse" />
                </div>

                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                    Estamos Ajustando <br /> los Detalles Finales
                </h1>

                <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
                    Papel Crepé está recibiendo una actualización importante para brindarte la mejor experiencia en tus invitaciones digitales. ¡Volvemos pronto!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <Clock className="w-6 h-6 text-purple-400 mb-3 mx-auto" />
                        <h3 className="font-bold text-sm mb-1">Tiempo Estimado</h3>
                        <p className="text-xs text-slate-500">2-4 Horas</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <ShieldCheck className="w-6 h-6 text-emerald-400 mb-3 mx-auto" />
                        <h3 className="font-bold text-sm mb-1">Tus Datos</h3>
                        <p className="text-xs text-slate-500">100% Protegidos</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <Mail className="w-6 h-6 text-blue-400 mb-3 mx-auto" />
                        <h3 className="font-bold text-sm mb-1">Soporte</h3>
                        <p className="text-xs text-slate-500">Activo 24/7</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button className="bg-white text-black hover:bg-slate-200 rounded-full px-8 h-12 font-bold transition-all shadow-xl shadow-white/5">
                        Notificarme al volver
                    </Button>
                    <p className="text-xs text-slate-500">
                        O visita nuestro <a href="#" className="underline text-purple-400">Instagram</a> para novedades.
                    </p>
                </div>

                <div className="mt-16 text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold">
                    Papel Crepé Digital © 2026 • Buenos Aires
                </div>
            </motion.div>
        </div>
    );
}
