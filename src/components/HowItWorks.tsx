'use client';

import { motion } from 'framer-motion';
import { Palette, Send, Users } from 'lucide-react';

interface HowItWorksProps {
  onGetStarted: () => void;
}

export function HowItWorks({ onGetStarted }: HowItWorksProps) {
  const steps = [
    {
      number: '01',
      icon: Palette,
      title: 'Elige y Personaliza',
      description: 'Selecciona una plantilla y personaliza cada detalle: colores, fuentes, texto y más.',
      color: 'from-rose-500 to-pink-500'
    },
    {
      number: '02',
      icon: Send,
      title: 'Comparte tu Invitación',
      description: 'Envía tu invitación por WhatsApp, email o comparte el enlace único.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      number: '03',
      icon: Users,
      title: 'Gestiona Invitados',
      description: 'Lleva control de confirmaciones, enviados pendientes y estadísticas del evento.',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Crea invitaciones impresionantes en solo 3 pasos simples
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-rose-200 via-purple-200 to-amber-200 -translate-y-1/2" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative z-10">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 text-white`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-bold text-gray-300">{step.number}</span>
                <h3 className="text-xl font-bold mt-2 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Crear mi Primera Invitación
          </button>
        </motion.div>
      </div>
    </section>
  );
}
