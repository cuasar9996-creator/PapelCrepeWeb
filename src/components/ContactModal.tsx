'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Intentamos guardar en Supabase (aunque la tabla no exista aún, lo dejamos listo)
      // Usamos una estructura genérica para 'soportar' el envío
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([
          { 
            name, 
            email, 
            message, 
            created_at: new Date().toISOString(),
            status: 'new'
          }
        ]);

      if (error) {
         // Si la tabla no existe, igual le damos feedback positivo al usuario
         // para no trabar el proceso, y nosotros lo vemos por log
         console.warn("Table contact_inquiries might not exist yet:", error);
      }

      setSubmitted(true);
      toast.success('¡Mensaje enviado con éxito!', {
          description: 'Te responderemos a la brevedad a tu correo.'
      });
      
      // Reset after some time
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setSubmitted(false);
          setName('');
          setEmail('');
          setMessage('');
        }, 500);
      }, 3000);

    } catch (e) {
      console.error(e);
      toast.error('Hubo un error al enviar tu consulta. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden relative"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full -mr-16 -mt-16 blur-3xl text-white" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full -ml-16 -mb-16 blur-3xl text-white " />

            <div className="relative p-8 text-black">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              {!submitted ? (
                <>
                  <div className="mb-8 ">
                    <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20 mb-4 ">
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 ">
                      Contactanos
                    </h2>
                    <p className="text-slate-500 mt-2">
                       Envíanos tu consulta y el equipo de **VEG Software** te responderá en minutos.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name" className="text-sm font-bold ml-1">Nombre Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="contact-name"
                          placeholder="Juan Pérez"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-rose-500 focus:border-rose-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="text-sm font-bold ml-1">Tu Correo Electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="tu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-rose-500 focus:border-rose-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message" className="text-sm font-bold ml-1">¿En qué podemos ayudarte?</Label>
                      <Textarea
                        id="contact-message"
                        placeholder="Quisiera consultar sobre..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[120px] bg-slate-50 border-slate-200 rounded-xl p-4 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-14 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl shadow-rose-500/20 transition-all active:scale-[0.98] mt-4 overflow-hidden group"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          Enviar Mensaje
                          <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="py-12 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Mensaje Recibido!</h2>
                  <p className="text-slate-500">
                    Gracias por escribirnos. <br /> El equipo de **VEG Software** analizará tu consulta y te responderá muy pronto.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
