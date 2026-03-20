'use client';
import { getCurrentUser } from '@/lib/auth';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Download,
  Copy,
  Share2,
  Mail,
  MessageCircle,
  Check,
  X,
  MessageSquare
} from 'lucide-react';
import { Guestbook } from '@/components/Guestbook';
import { Invitation } from '@/types';
import { fonts, templates } from '@/data/templates';
import { EventCountdown } from '@/components/EventCountdown';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import { adminApi } from '@/lib/api';
import { PaymentModal } from '@/components/PaymentModal';

interface PreviewModalProps {
  invitation: Invitation | null;
  open: boolean;
  onClose: () => void;
  onManageEvent: () => void;
  onUpdateInvitation?: (invitation: Invitation) => void;
}

export function PreviewModal({ invitation, open, onClose, onManageEvent, onUpdateInvitation }: PreviewModalProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [localIsPaid, setLocalIsPaid] = useState(false);
  const [config, setConfig] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentUser = getCurrentUser();

  // Slideshow Logic
  useEffect(() => {
    if (invitation && (invitation.backgroundImages || []).length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % (invitation.backgroundImages?.length || 1));
      }, (invitation.slideshowDuration || 5) * 1000);
      return () => clearInterval(interval);
    } else {
      setCurrentSlide(0);
    }
  }, [invitation?.backgroundImages, invitation?.slideshowDuration]);

  useEffect(() => {
    setLocalIsPaid(invitation?.isPaid || false);
  }, [invitation?.isPaid]);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await adminApi.getConfig();
        setConfig(data);
      } catch (e) {
        console.error("Error loading config:", e);
      }
    };
    loadConfig();
  }, []);

  if (!invitation) return null;

  const currentFont = fonts.find(f => f.name === invitation.font) || fonts[0];
  const template = templates.find(t => t.id === invitation.templateId);
  const isPremiumTemplate = Boolean(template?.isPremium || template?.backgroundVideo || invitation.backgroundVideo);
  const requiresPayment = !localIsPaid; // Toda invitación requiere pago para ser compartida, ya sea Standard o Premium

  const handleAction = (action: () => void) => {
    if (requiresPayment) {
      setShowPaymentModal(true);
    } else {
      action();
    }
  };

  const onPaymentComplete = () => {
    setShowPaymentModal(false);
    setLocalIsPaid(true);
    
    // Si tenemos la función de actualización y existe la invitación, la marcamos como paga
    if (onUpdateInvitation && invitation) {
      onUpdateInvitation({
        ...invitation,
        isPaid: true
      });
    }

    toast.success('¡Pago Procesado con Éxito!', {
      description: 'Tu invitación ya es Pro y está lista para compartir e imprimir.',
      duration: 5000,
    });
  };

  const handleCopyLink = () => {
    handleAction(() => {
      const link = `${window.location.origin}?invitation=${invitation.id}`;
      navigator.clipboard.writeText(link);
      toast.success('Enlace copiado al portapapeles');
    });
  };

  const handleShareWhatsApp = () => {
    handleAction(() => {
      const text = `¡Estás invitado a ${invitation.title}!\n\n📅 ${invitation.eventDate ? new Date(invitation.eventDate + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}\n⏰ ${invitation.eventTime || ''}\n📍 ${invitation.location || ''}\n\n${invitation.message}`;
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  };

  const handleShareEmail = () => {
    handleAction(() => {
      const subject = `Invitación: ${invitation.title}`;
      const body = `¡Estás invitado!\n\n${invitation.title}\n\n📅 Fecha: ${invitation.eventDate ? new Date(invitation.eventDate + 'T00:00:00').toLocaleDateString('es-ES') : ''}\n⏰ Hora: ${invitation.eventTime || ''}\n📍 Ubicación: ${invitation.location || ''}\n\n${invitation.message}\n\n¡Te esperamos!`;
      const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  };

  const handleDownload = async () => {
    if (requiresPayment) {
      setShowPaymentModal(true);
      return;
    }
    if (!previewRef.current) return;

    const toastId = toast.loading('Generando imagen de alta calidad...');

    try {
      // Temporarily hide video for capture
      const video = previewRef.current.querySelector('video');
      if (video) video.style.display = 'none';

      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        scale: 3, // Mayor calidad para impresión
        backgroundColor: invitation.colors.background,
        logging: false,
        onclone: (clonedDoc) => {
          // Aseguramos que el clon tenga las fuentes y estilos correctos
          const clonedElement = clonedDoc.querySelector('[ref="previewRef"]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.transform = 'none';
          }
        }
      });

      // Show video back
      if (video) video.style.display = 'block';

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `invitacion-${invitation.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.click();

      toast.success('¡Tarjeta descargada con éxito!', {
        id: toastId,
        description: 'La imagen incluye todos tus datos personalizados.',
        duration: 5000
      });
    } catch (e) {
      console.error('Download error:', e);
      // Ensure video is shown back even on error
      const video = previewRef.current.querySelector('video');
      if (video) video.style.display = 'block';
      toast.error('Ocurrió un error al generar la imagen.', { id: toastId });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle>Vista Previa de la Invitación</DialogTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <DialogDescription className="sr-only">
              Vista previa interactiva de tu invitación digital Papel Crepé.
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 pt-4 overflow-y-auto max-h-[calc(90vh-150px)]">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Preview Container - Stacks invitation and guestbook vertically */}
              <div className="flex-1 flex flex-col items-center gap-8 bg-gray-100/50 rounded-2xl p-6 sm:p-10">
                {/* 1. The Invitation Card */}
                <motion.div
                  ref={previewRef}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative w-full max-w-sm aspect-[3/4] rounded-xl shadow-2xl overflow-hidden"
                  style={{ backgroundColor: invitation.colors.background }}
                >
                  {/* Layer 2: Custom or Template Background Image/Video / Slideshow */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* Background Video */}
                    {invitation.backgroundVideo && (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        key={invitation.backgroundVideo}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ 
                          opacity: (invitation.backgroundOpacity || 100) / 100,
                          zIndex: invitation.backgroundVideo ? 1 : 0
                        }}
                      >
                        <source src={invitation.backgroundVideo} type="video/mp4" />
                      </video>
                    )}

                    {/* Slideshow or Single Image */}
                    <AnimatePresence mode="popLayout">
                      {invitation.backgroundImages && invitation.backgroundImages.length > 0 ? (
                        <motion.img
                          key={invitation.backgroundImages[currentSlide]}
                          src={invitation.backgroundImages[currentSlide]}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: (invitation.backgroundOpacity || 100) / 100 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                          className="absolute inset-0 w-full h-full object-cover z-[1]"
                        />
                      ) : invitation.backgroundImage ? (
                        <motion.img
                          key="static-bg"
                          src={invitation.backgroundImage}
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: invitation.backgroundVideo ? 0 : (invitation.backgroundOpacity || 100) / 100 
                          }}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ zIndex: 0 }}
                        />
                      ) : null}
                    </AnimatePresence>
                  </div>

                  {/* Layer 3: Template Decorations */}
                  {/* Wedding Floral */}
                  {invitation.templateId === 'wedding-floral' && (
                    <>
                      <div className="absolute -top-6 -left-6 w-32 h-32 z-10 pointer-events-none drop-shadow-xl">
                        <img src="/backgrounds/wedding-floral-top.png" alt="" className="w-full h-full object-contain rotate-12" />
                      </div>
                      <div className="absolute -bottom-10 -right-10 w-44 h-44 z-10 pointer-events-none drop-shadow-2xl">
                        <img src="/backgrounds/wedding-floral-bottom.png" alt="" className="w-full h-full object-contain -rotate-12" />
                      </div>
                    </>
                  )}

                  {/* Wedding Rustic */}
                  {invitation.templateId === 'wedding-rustic' && (
                    <>
                      <div className="absolute top-0 left-0 w-full h-24 flex justify-between px-4 pointer-events-none z-10 opacity-80">
                        <div className="flex flex-col gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_#fcd34d] animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-amber-300/80 shadow-[0_0_6px_#fcd34d] ml-4"></div>
                        </div>
                        <div className="flex-1"></div>
                        <div className="flex flex-col gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-300/90 shadow-[0_0_8px_#fcd34d] mr-4"></div>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -left-2 w-32 h-32 z-10 pointer-events-none">
                        <img src="/backgrounds/rustic-floral.png" alt="" className="w-full h-full object-contain" />
                      </div>
                    </>
                  )}

                  {/* Wedding Rustic 3D */}
                  {invitation.templateId === 'wedding-rustic-3d' && (
                    <div className="absolute inset-0 z-[30] pointer-events-none">
                      <motion.div
                        animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 -left-2 text-7xl opacity-90 drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] filter brightness-110 contrast-125 select-none"
                      >
                        💍
                      </motion.div>
                      <motion.div
                        animate={{ y: [5, -5, 5], rotate: [2, -2, 2] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-1/4 -right-2 text-7xl opacity-90 drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] filter brightness-110 contrast-125 select-none"
                      >
                        🥂
                      </motion.div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1)_0%,transparent_70%)]" />
                    </div>
                  )}

                  {/* Quinceañera Glam 3D */}
                  {invitation.templateId === 'quinceanera-glam-3d' && (
                    <>
                      <div className="absolute top-20 left-10 w-64 h-64 bg-[#f8b4cc]/10 rounded-full blur-[80px] animate-pulse"></div>
                      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#ffd700]/5 rounded-full blur-[100px]"></div>
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                        <span className="material-symbols-outlined text-6xl text-amber-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          workspace_premium
                        </span>
                        <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-2 shadow-[0_0_10px_#ffd700]"></div>
                      </div>
                      <div className="absolute inset-10 border border-amber-500/10 pointer-events-none rounded-sm"></div>
                      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-amber-500/30 rounded-tl-xl pointer-events-none"></div>
                      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-amber-500/30 rounded-br-xl pointer-events-none"></div>
                    </>
                  )}

                  {/* Photo Frame Golden */}
                  {invitation.templateId === 'photo-frame-golden' && (
                    <div className="absolute inset-0 z-10 pointer-events-none">
                      <div className="absolute inset-0 border-[8px] border-[#D4AF37] shadow-[0_0_15px_rgba(0,0,0,0.3),inset_0_0_10px_rgba(0,0,0,0.3)]" />
                      <div className="absolute inset-[8px] border border-white/20" />
                      <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#FFD700]" />
                      <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#FFD700]" />
                      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#FFD700]" />
                      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#FFD700]" />
                    </div>
                  )}

                  {/* Photo Frame Polaroid */}
                  {invitation.templateId === 'photo-frame-polaroid' && (
                    <div className="absolute inset-0 z-10 pointer-events-none bg-black/5 flex items-center justify-center">
                      <div className="w-[90%] aspect-[4/5] bg-white p-4 pb-20 shadow-[0_20px_40px_rgba(0,0,0,0.4)] rotate-1 relative">
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-10 border-b border-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-[12px] font-medium tracking-[0.4em] uppercase">Nuestros Momentos</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Photo Frame Angelic */}
                  {invitation.templateId === 'photo-frame-angelic' && (
                    <div className="absolute inset-0 z-10 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/80" />
                      <div className="absolute inset-8 rounded-full border-2 border-white/50 blur-[1px] shadow-[0_0_40px_rgba(255,255,255,0.9)]" />
                      <motion.div 
                        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute top-1/3 right-1/4 w-40 h-40 bg-sky-100/40 rounded-full blur-[50px]" 
                      />
                    </div>
                  )}

                  {/* Layer 4: Text Overlay Protection - MAS SUAVE */}
                  {(invitation.backgroundImage || (invitation.backgroundImages && invitation.backgroundImages.length > 0)) && (
                    <div
                      className="absolute inset-0 z-[5] pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.1) 100%)'
                      }}
                    />
                  )}

                  <div
                    className="relative h-full flex flex-col items-center justify-center p-8 text-center"
                    style={{
                      zIndex: 20,
                      textShadow: invitation.colors.text.toUpperCase() === '#FFFFFF'
                        ? '0 2px 10px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,1)'
                        : '0 1px 4px rgba(255,255,255,0.8), 0 0 1px rgba(255,255,255,1)'
                    }}
                  >

                    {/* Decorative top element */}
                    <div
                      className="w-24 h-1 rounded-full mb-8 shadow-sm"
                      style={{ backgroundColor: invitation.colors.accent }}
                    />

                    {/* Title */}
                    <h2
                      className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight px-4"
                      style={{
                        color: invitation.colors.text,
                        fontFamily: currentFont.family,
                        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))'
                      }}
                    >
                      {invitation.title}
                    </h2>

                    {/* Host name */}
                    {invitation.hostName && (
                      <p
                        className="text-[10px] sm:text-xs font-bold mb-6 uppercase tracking-[0.2em]"
                        style={{
                          color: invitation.colors.text,
                          opacity: 1,
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))'
                        }}
                      >
                        Organizado por {invitation.hostName}
                      </p>
                    )}

                    {/* Date & Time */}
                    {invitation.eventDate && (
                      <div className="mb-4">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                            style={{ backgroundColor: invitation.colors.accent + '30' }}
                          >
                            📅
                          </div>
                        </div>
                        <p
                          className="text-lg font-bold"
                          style={{
                            color: invitation.colors.text,
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                          }}
                        >
                          {new Date(invitation.eventDate + 'T00:00:00').toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>

                        <div className="w-full max-w-[280px] mx-auto mt-3">
                          <EventCountdown
                            targetDate={invitation.eventDate}
                            targetTime={invitation.eventTime}
                            color={invitation.colors.accent}
                          />
                        </div>

                        {invitation.eventTime && (
                          <p
                            className="text-lg mt-3 font-semibold"
                            style={{
                              color: invitation.colors.text,
                              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                            }}
                          >
                            {invitation.eventTime}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Location */}
                    {invitation.location && (
                      <div className="mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                            style={{ backgroundColor: invitation.colors.accent + '30' }}
                          >
                            📍
                          </div>
                        </div>
                        <p
                          className="text-lg font-medium"
                          style={{
                            color: invitation.colors.text,
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                          }}
                        >
                          {invitation.location}
                        </p>
                      </div>
                    )}

                    {/* Message */}
                    <p
                      className="text-base leading-relaxed max-w-xs font-medium"
                      style={{
                        color: invitation.colors.text,
                        opacity: 1,
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))'
                      }}
                    >
                      {invitation.message}
                    </p>

                    {/* Decorative bottom element */}
                    <div
                      className="w-24 h-1 rounded-full mt-8 shadow-sm"
                      style={{ backgroundColor: invitation.colors.accent }}
                    />
                  </div>
                </motion.div>
                
                {/* 2. The Guestbook (Now clearly below the card) */}
                {invitation.showGuestbook !== false && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                        <div className="p-6">
                            <Guestbook 
                                invitationId={invitation.id} 
                                accentColor={invitation.colors.accent} 
                            />
                        </div>
                    </motion.div>
                )}
              </div>

              {/* Actions */}
              <div className="lg:w-64 space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium mb-4">Compartir</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3"
                      onClick={handleShareWhatsApp}
                    >
                      <MessageCircle className="w-4 h-4 text-green-600" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3"
                      onClick={handleShareEmail}
                    >
                      <Mail className="w-4 h-4 text-blue-600" />
                      Email
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3"
                      onClick={handleCopyLink}
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                      Copiar enlace
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium mb-4">Exportar</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3"
                      onClick={handleDownload}
                    >
                      <Download className="w-4 h-4 text-purple-600" />
                      Descargar imagen
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium mb-4">Gestión</h4>
                  <Button
                    className="w-full bg-gradient-to-r from-rose-500 to-purple-600"
                    onClick={onManageEvent}
                  >
                    Gestionar Invitados
                  </Button>
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-br from-purple-50 to-rose-50 rounded-xl p-4">
                  <h4 className="font-medium mb-3">Resumen</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Categoría:</span>
                      <span className="font-medium capitalize">{invitation.category.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plantilla:</span>
                      <span className="font-medium">{invitation.templateId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Actualizado:</span>
                      <span className="font-medium">
                        {new Date(invitation.updatedAt).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {template && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          price={template.backgroundVideo || template.isPremium ? config?.pricePremium : config?.priceStandard}
          isPremium={isPremiumTemplate}
          mercadoPagoLink={config?.mercadoPagoLink}
          paypalLink={config?.paypalLink}
          exchangeRate={config?.exchangeRate}
          onPaymentComplete={onPaymentComplete}
          invitationId={invitation.id}
          userEmail={currentUser?.email}
        />
      )}
    </>
  );
}
