'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Eye,
  Palette,
  Type,
  Calendar,
  MapPin,
  Save,
  Image as ImageIcon,
  Music,
  Sparkles,
  Share2,
  Upload,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle,
  Zap,
  Tag,
  Gift,
  List,
  Clock,
  Shirt,
  Trash2,
  Plus,
  MessageSquare,
  Camera,
  Info
} from 'lucide-react';
import { useRef } from 'react';
import { Slider } from '@/components/ui/slider';
import { Template, Invitation, MusicSettings } from '@/types';
import { fonts } from '@/data/templates';
import { ImageUploader, UploadedImage } from '@/components/ImageUploader';
import { MusicSelector, MusicTrack, DEMO_TRACKS } from '@/components/MusicSelector';
import { EventCountdown } from '@/components/EventCountdown';
import { adminApi } from '@/lib/api';
import { PaymentModal } from '@/components/PaymentModal';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

interface InvitationEditorProps {
  template: Template;
  invitation?: Invitation | null;
  onBack: () => void;
  onPreview: (invitation: Invitation) => void;
  onSave: (invitation: Invitation) => void;
}

export function InvitationEditor({
  template,
  invitation: existingInvitation,
  onBack,
  onPreview,
  onSave
}: InvitationEditorProps) {
  const [invitation, setInvitation] = useState<Invitation>({
    id: existingInvitation?.id || generateId(),
    templateId: template.id,
    category: template.categoryId,
    title: existingInvitation?.title || 'Mi Evento Especial',
    eventDate: existingInvitation?.eventDate || '',
    eventTime: existingInvitation?.eventTime || '',
    location: existingInvitation?.location || '',
    message: existingInvitation?.message || '¡Te invitamos a celebrar con nosotros este momento tan especial!',
    hostName: existingInvitation?.hostName || '',
    colors: existingInvitation?.colors || { ...template.defaultColors },
    font: existingInvitation?.font || template.defaultFont,
    backgroundImage: existingInvitation?.backgroundImage || template.backgroundImage,
    backgroundVideo: existingInvitation?.backgroundVideo || template.backgroundVideo,
    backgroundOpacity: existingInvitation?.backgroundOpacity || 100,
    logoImage: existingInvitation?.logoImage,
    eventImage: existingInvitation?.eventImage,
    music: existingInvitation?.music || {
      trackId: null,
      volume: 50,
      autoplay: false,
      loop: true
    },
    createdAt: existingInvitation?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    // --- Initializing Pro Features ---
    cbu: existingInvitation?.cbu || '',
    alias: existingInvitation?.alias || '',
    bankName: existingInvitation?.bankName || '',
    giftRegistryUrl: existingInvitation?.giftRegistryUrl || '',
    dressCode: existingInvitation?.dressCode || 'none',
    itinerary: existingInvitation?.itinerary || [],
    showCountdown: existingInvitation?.showCountdown ?? true,
    showMap: existingInvitation?.showMap ?? true,
    showGifts: existingInvitation?.showGifts ?? false,
    showDressCode: existingInvitation?.showDressCode ?? false,
    showItinerary: existingInvitation?.showItinerary ?? false,
  });

  const [customImages, setCustomImages] = useState<UploadedImage[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaid, setIsPaid] = useState(existingInvitation?.isPaid || false);
  const [config, setConfig] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Slideshow Logic
  useEffect(() => {
    if ((invitation.backgroundImages || []).length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % (invitation.backgroundImages?.length || 1));
      }, (invitation.slideshowDuration || 5) * 1000);
      return () => clearInterval(interval);
    } else {
      setCurrentSlide(0);
    }
  }, [invitation.backgroundImages, invitation.slideshowDuration]);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await adminApi.getConfig();
        setConfig(data);
      } catch (e) {
        console.error("Error loading editor config:", e);
      }
    };
    loadConfig();
  }, []);

  useEffect(() => {
    // Handle Music Setup for Editor Preview
    if (invitation.music?.trackId || invitation.music?.customTrackUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }

      const trackUrl = invitation.music.customTrackUrl ||
        DEMO_TRACKS.find(t => t.id === invitation.music?.trackId)?.url ||
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

      const audio = new Audio();
      audio.src = trackUrl;
      audio.volume = (invitation.music.volume || 50) / 100;
      audio.loop = invitation.music.loop !== false;
      audioRef.current = audio;

      if (invitation.music.autoplay) {
        // Try autoplay
        const attemptPlay = () => {
          if (!audioRef.current) return;
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(err => console.log('Autoplay prevented in editor:', err));
          window.removeEventListener('mousedown', attemptPlay);
        };
        window.addEventListener('mousedown', attemptPlay);
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [invitation.id, invitation.music?.trackId, invitation.music?.customTrackUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = (invitation.music?.volume || 50) / 100;
    }
  }, [invitation.music?.volume]);

  const toggleMusic = async () => {
    if (!audioRef.current) {
      // If no track but user clicks play, maybe play default
      const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
      audio.volume = (invitation.music?.volume || 50) / 100;
      audioRef.current = audio;
    }

    try {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current?.play();
        setIsPlaying(true);
      }
    } catch (e) {
      toast.error('Toca la pantalla para activar el audio');
    }
  };

  const updateField = (field: keyof Invitation, value: any) => {
    setInvitation(prev => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString()
    }));
  };

  const updateColor = (colorKey: keyof Invitation['colors'], value: string) => {
    setInvitation(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value
      },
      updatedAt: new Date().toISOString()
    }));
  };

  const updateMusic = (music: MusicSettings) => {
    setInvitation(prev => ({
      ...prev,
      music,
      updatedAt: new Date().toISOString()
    }));
  };

  const addItineraryItem = () => {
    const newItem = { id: generateId(), time: '21:00', activity: 'Recepción' };
    setInvitation(prev => ({
      ...prev,
      itinerary: [...(prev.itinerary || []), newItem],
      updatedAt: new Date().toISOString()
    }));
  };

  const removeItineraryItem = (id: string) => {
    setInvitation(prev => ({
      ...prev,
      itinerary: (prev.itinerary || []).filter(item => item.id !== id),
      updatedAt: new Date().toISOString()
    }));
  };

  const updateItineraryItem = (id: string, field: 'time' | 'activity', value: string) => {
    setInvitation(prev => ({
      ...prev,
      itinerary: (prev.itinerary || []).map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
      updatedAt: new Date().toISOString()
    }));
  };

  const handleInsertImage = (image: UploadedImage) => {
    setInvitation(prev => ({
      ...prev,
      backgroundImage: image.dataUrl,
      backgroundVideo: '', // Clear video so image is visible
      backgroundOpacity: image.opacity,
      updatedAt: new Date().toISOString()
    }));
    toast.success('Imagen insertada como fondo');
  };

  const handleTrackSelect = (track: MusicTrack | null) => {
    if (!invitation.music) return;
    updateMusic({
      ...invitation.music,
      trackId: track?.id || null,
      customTrackUrl: track?.url || undefined
    });
  };

  const handleSave = () => {
    onSave(invitation);
    setHasSaved(true);
    toast.success('¡Invitación guardada en tu cuenta!', {
      description: 'Ahora puedes enviarla o verla en tu panel de Mis Eventos.'
    });
  };

  const handleCheckout = () => {
    // First save the invitation
    handleSave();
    // Then show the payment modal
    setShowPaymentModal(true);
  };

  const onPaymentComplete = () => {
    setShowPaymentModal(false);
    setIsPaid(true);
    
    // Save as paid
    const paidInvitation = { ...invitation, isPaid: true };
    setInvitation(paidInvitation);
    onSave(paidInvitation);

    toast.success('¡Pago Procesado con Éxito!', {
      description: 'Tu invitación ya es Pro y está lista para compartir e imprimir.',
      duration: 5000,
    });
  };

  const colorPresets = [
    { name: 'Original', colors: template.defaultColors },
    { name: 'Pure White', colors: { background: '#FFFFFF', text: '#000000', accent: '#333333', secondary: '#F5F5F5' } },
    { name: 'Pure Black', colors: { background: '#000000', text: '#FFFFFF', accent: '#F1C40F', secondary: '#1A1A1A' } },
    { name: 'Rose', colors: { background: '#FFF5F7', text: '#2D1B30', accent: '#E91E63', secondary: '#FCE4EC' } },
    { name: 'Ocean', colors: { background: '#E3F2FD', text: '#0D47A1', accent: '#2196F3', secondary: '#BBDEFB' } },
    { name: 'Forest', colors: { background: '#E8F5E9', text: '#1B5E20', accent: '#4CAF50', secondary: '#C8E6C9' } },
    { name: 'Gold & Night', colors: { background: '#0F0F0F', text: '#FFFFFF', accent: '#D4AF37', secondary: '#1A1A1A' } },
    { name: 'Sunset', colors: { background: '#FFF3E0', text: '#E65100', accent: '#FF9800', secondary: '#FFE0B2' } },
  ];

  const currentFont = fonts.find(f => f.name === invitation.font) || fonts[0];

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-sm sm:text-base mb-0.5">Personalizar Invitación</h1>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${template.backgroundVideo || template.isPremium
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-emerald-100 text-emerald-700'
                  }`}>
                  {template.backgroundVideo || template.isPremium ? 'Plan Pro 3D' : 'Plan Base 2D'}
                </span>
                {config && (
                  <span className="text-[10px] font-bold text-gray-400">
                    • ${(Number(template.backgroundVideo || template.isPremium ? config.pricePremium : config.priceStandard) * (config.exchangeRate || 1250)).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ARS ({template.backgroundVideo || template.isPremium ? config.pricePremium : config.priceStandard} USD)
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isPaid ? (
              <Button
                onClick={onBack}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 shadow-lg flex items-center gap-2 transition-all scale-105"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Todo Listo: Volver</span>
              </Button>
            ) : (
              <div className="relative group">
                <Button
                  className={`${hasSaved ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-rose-500 hover:bg-rose-600'} text-white rounded-full px-6 shadow-lg flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95`}
                  onClick={() => {
                    const menu = document.getElementById('magic-menu');
                    menu?.classList.toggle('hidden');
                  }}
                >
                  {hasSaved ? <Sparkles className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />}
                  <span>{hasSaved ? 'Finalizar Edición' : 'Acciones'}</span>
                </Button>

                <div
                  id="magic-menu"
                  className="hidden absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 flex flex-col p-1.5"
                >
                  <button
                    onClick={() => {
                      handleSave();
                      document.getElementById('magic-menu')?.classList.add('hidden');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 rounded-xl flex items-center gap-3 transition-colors text-sm font-medium"
                  >
                    <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                      <Save className="w-4 h-4" />
                    </div>
                    Guardar Borrador
                  </button>

                  <button
                    onClick={() => {
                      onPreview(invitation);
                      document.getElementById('magic-menu')?.classList.add('hidden');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 rounded-xl flex items-center gap-3 transition-colors text-sm font-medium"
                  >
                    <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
                      <Eye className="w-4 h-4" />
                    </div>
                    Vista Previa Real
                  </button>

                  <div className="h-px bg-slate-100 my-1 mx-2" />

                  <button
                    onClick={() => {
                      handleCheckout();
                      document.getElementById('magic-menu')?.classList.add('hidden');
                    }}
                    className="w-full px-4 py-3 text-left bg-gradient-to-r from-rose-500 to-indigo-600 text-white rounded-xl hover:opacity-90 flex flex-col transition-all active:scale-95"
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-black uppercase tracking-tight">Aceptar y Publicar</span>
                    </div>
                    <span className="text-[10px] text-white/70 font-bold ml-6">Activar versión Pro</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
          {/* Left Panel - Editor Tools */}
          <div className="space-y-4 lg:sticky lg:top-20">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-6 h-16 mb-2 bg-white/80 border border-gray-200 p-1 shadow-sm rounded-xl">
                <TabsTrigger value="content" className="flex flex-col items-center gap-1 h-auto py-1.5 text-[10px] sm:text-[11px] data-[state=active]:text-rose-500 data-[state=active]:bg-rose-50/50 rounded-lg transition-all">
                  <Type className="w-4 h-4" />
                  <span className="font-bold">Datos</span>
                </TabsTrigger>
                <TabsTrigger value="style" className="flex flex-col items-center gap-1 h-auto py-1.5 text-[10px] sm:text-[11px] data-[state=active]:text-rose-500 data-[state=active]:bg-rose-50/50 rounded-lg transition-all">
                  <Palette className="w-4 h-4" />
                  <span className="font-bold">Colores</span>
                </TabsTrigger>
                <TabsTrigger value="backgrounds" className="flex flex-col items-center gap-1 h-auto py-1.5 text-[10px] sm:text-[11px] data-[state=active]:text-rose-500 data-[state=active]:bg-rose-50/50 rounded-lg transition-all">
                  <ImageIcon className="w-4 h-4" />
                  <span className="font-bold">Diseños</span>
                </TabsTrigger>
                <TabsTrigger value="images" className="flex flex-col items-center gap-1 h-auto py-1.5 text-[10px] sm:text-[11px] data-[state=active]:text-rose-500 data-[state=active]:bg-rose-50/50 rounded-lg transition-all">
                  <Upload className="w-4 h-4" />
                  <span className="font-bold">FOTOS</span>
                </TabsTrigger>
                <TabsTrigger value="music" className="flex flex-col items-center gap-1 h-auto py-1.5 text-[10px] sm:text-[11px] data-[state=active]:text-rose-500 data-[state=active]:bg-rose-50/50 rounded-lg transition-all">
                  <Music className="w-4 h-4" />
                  <span className="font-bold">MÚSICA</span>
                </TabsTrigger>
                <TabsTrigger value="interactive" className="flex flex-col items-center gap-1 h-auto py-1.5 text-[10px] sm:text-[11px] data-[state=active]:text-indigo-600 data-[state=active]:bg-indigo-50/50 rounded-lg transition-all relative">
                  <Zap className="w-4 h-4" />
                  <span className="font-bold tracking-tight">PLUS!</span>
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[7px] px-1 rounded-full font-black animate-pulse">NEW</span>
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[calc(100vh-220px)] mt-4">
                {/* Content Tab */}
                <TabsContent value="content" className="space-y-4 mt-0">
                  <Card>
                    <CardHeader className="pb-3 px-4">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        Información del Evento
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 px-4 pb-4">
                      {/* Informational Note without "magical" icons */}
                      <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100 shadow-sm">
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                              Personalización Avanzada
                            </h4>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                              Usa la pestaña <b className="text-indigo-600 uppercase tracking-tighter">MÚSICA</b> para subir tu propia canción favorita. Podrás activar el <b className="text-rose-600 uppercase tracking-tighter">MURO DE MENSAJES</b> en la pestaña <b className="text-indigo-600 uppercase tracking-tighter">PLUS!</b> para que tus invitados dejen saludos.
                            </p>
                          </div>
                        </div>
                      </div>


                      <div className="space-y-2">
                        <Label htmlFor="title">Título del evento</Label>
                        <Input
                          id="title"
                          value={invitation.title}
                          onChange={(e) => updateField('title', e.target.value)}
                          placeholder="Ej: Cumpleaños de María"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hostName">Nombre del anfitrión</Label>
                        <Input
                          id="hostName"
                          value={invitation.hostName}
                          onChange={(e) => updateField('hostName', e.target.value)}
                          placeholder="Ej: Los Pérez"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="date">Fecha</Label>
                          <Input
                            id="date"
                            type="date"
                            value={invitation.eventDate}
                            onChange={(e) => updateField('eventDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Hora</Label>
                          <Input
                            id="time"
                            type="time"
                            value={invitation.eventTime}
                            onChange={(e) => updateField('eventTime', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Ubicación</Label>
                        <Input
                          id="location"
                          value={invitation.location}
                          onChange={(e) => updateField('location', e.target.value)}
                          placeholder="Ej: Hotel Grand, Salón Principal"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Mensaje</Label>
                        <Textarea
                          id="message"
                          value={invitation.message}
                          onChange={(e) => updateField('message', e.target.value)}
                          placeholder="Escribe tu mensaje personalizado..."
                          rows={3}
                        />
                      </div>

                      {/* Quick Toggle for Guestbook */}
                      <div className="pt-2">
                        <div className="flex items-center justify-between p-3 bg-rose-50 rounded-xl border border-rose-100">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-rose-500" />
                            <span className="text-xs font-bold text-rose-800 uppercase tracking-tighter">Activar Muro de Mensajes Interactivos</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={invitation.showGuestbook !== false}
                            onChange={(e) => updateField('showGuestbook', e.target.checked)}
                            className="w-5 h-5 rounded-full border-rose-300 text-rose-500 focus:ring-rose-500 transition-all cursor-pointer"
                          />
                        </div>
                        <p className="text-[9px] text-gray-400 mt-1.5 ml-1">Tus invitados podrán dejar saludos y fotos en la invitación.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Style Tab */}
                <TabsContent value="style" className="space-y-4 mt-0">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Estilo Visual
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Fuente</Label>
                        <Select value={invitation.font} onValueChange={(v) => updateField('font', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fonts.map((font) => (
                              <SelectItem key={font.id} value={font.name}>
                                <span style={{ fontFamily: font.family }}>{font.name}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <Label>Paletas de colores</Label>
                        <div className="grid grid-cols-4 gap-2">
                          {colorPresets.map((preset, index) => (
                            <button
                              key={index}
                              className={`p-2 rounded-lg border-2 transition-all hover:scale-105 ${JSON.stringify(invitation.colors) === JSON.stringify(preset.colors)
                                ? 'border-primary ring-2 ring-primary/20'
                                : 'border-transparent'
                                }`}
                              onClick={() => setInvitation(prev => ({ ...prev, colors: preset.colors }))}
                              title={preset.name}
                            >
                              <div className="flex gap-0.5">
                                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: preset.colors.background }} />
                                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: preset.colors.accent }} />
                                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: preset.colors.text }} />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <Label>Colores personalizados</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Fondo</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={invitation.colors.background}
                                onChange={(e) => updateColor('background', e.target.value)}
                                className="w-10 h-10 p-1 cursor-pointer"
                              />
                              <div className="flex-1 flex gap-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 h-10 text-[10px]"
                                  onClick={() => updateColor('background', '#FFFFFF')}
                                >
                                  Blanco
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 h-10 text-[10px] bg-black text-white hover:bg-gray-900"
                                  onClick={() => updateColor('background', '#000000')}
                                >
                                  Negro
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Texto General</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={invitation.colors.text}
                                onChange={(e) => updateColor('text', e.target.value)}
                                className="w-10 h-10 p-1 cursor-pointer"
                              />
                              <div className="flex-1 flex gap-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 h-10 text-[10px]"
                                  onClick={() => updateColor('text', '#FFFFFF')}
                                >
                                  Blanco
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 h-10 text-[10px] bg-black text-white hover:bg-gray-900"
                                  onClick={() => updateColor('text', '#000000')}
                                >
                                  Negro
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Acento</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={invitation.colors.accent}
                                onChange={(e) => updateColor('accent', e.target.value)}
                                className="w-10 h-10 p-1 cursor-pointer"
                              />
                              <Input
                                value={invitation.colors.accent}
                                onChange={(e) => updateColor('accent', e.target.value)}
                                className="flex-1 text-xs"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Secundario</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={invitation.colors.secondary}
                                onChange={(e) => updateColor('secondary', e.target.value)}
                                className="w-10 h-10 p-1 cursor-pointer"
                              />
                              <Input
                                value={invitation.colors.secondary}
                                onChange={(e) => updateColor('secondary', e.target.value)}
                                className="flex-1 text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Background Library Tab */}
                <TabsContent value="backgrounds" className="space-y-4 mt-0">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Galería de Fondos Premium
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'none', name: 'Fondo Original', url: null, icon: <Sparkles className="w-5 h-5 text-purple-500" /> },
                          { id: 'emoji', name: 'Emoji Party', url: '/backgrounds/emoji-sneakers.jpg', keywords: ['birthday', 'party'] },
                          { id: 'wedding-frame', name: 'Marco Dorado', url: '/templates/golden-floral-frame.jpg', keywords: ['wedding', 'elegant'] },
                          { id: 'abstract', name: 'Armonía Pastel', url: '/templates/abstract-pastel-shapes.jpg', keywords: ['modern', 'art'] },
                          { id: 'doodles', name: 'Doodles Kawaii', url: '/templates/cute-doodle-party.jpg', keywords: ['playful', 'birthday'] },
                          { id: 'cake', name: 'Torta Elegante', url: '/backgrounds/birthday-cake.png', keywords: ['birthday'] },
                          { id: 'monsters', name: 'Monstruitos', url: '/backgrounds/monsters.png', keywords: ['birthday'] },
                          { id: 'superhero', name: 'Superhéroe Ciudad', url: '/backgrounds/superhero.png', keywords: ['birthday'] },
                          { id: 'stadium', name: 'Estadio Estadio', url: '/backgrounds/stadium.png', keywords: ['sports'] },
                        ].map((bg) => (
                          <div
                            key={bg.id}
                            className={`
                              cursor-pointer rounded-lg overflow-hidden border-2 transition-all group relative aspect-[3/4] flex flex-col items-center justify-center bg-gray-50
                              ${invitation.backgroundImage === bg.url ? 'border-rose-500 ring-2 ring-rose-100' : 'border-gray-200 hover:border-gray-300'}
                            `}
                            onClick={() => {
                              setInvitation(prev => ({
                                ...prev,
                                backgroundImage: bg.url || '',
                                backgroundVideo: bg.id === 'none' ? (template.backgroundVideo || '') : '',
                                backgroundOpacity: 100,
                                updatedAt: new Date().toISOString()
                              }));
                              toast.success(bg.url ? `Fondo "${bg.name}" aplicado` : 'Restaurado fondo original');
                            }}
                          >
                            {bg.url ? (
                              <>
                                <img src={bg.url} alt={bg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <span className="text-white text-[10px] font-bold px-2 py-1 bg-black/50 rounded">{bg.name}</span>
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center gap-2 text-gray-500">
                                {bg.icon}
                                <span className="text-[10px] font-bold uppercase">{bg.name}</span>
                              </div>
                            )}
                            {invitation.backgroundImage === (bg.url || '') && (
                              <div className="absolute top-1 right-1 bg-rose-500 rounded-full p-0.5 z-20">
                                <Sparkles className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-500 leading-tight">
                        * Estos fondos son exclusivos y no tienen derechos de autor externos.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Images Tab */}
                <TabsContent value="images" className="space-y-4 mt-0">
                  <ImageUploader
                    images={customImages}
                    onImagesChange={setCustomImages}
                    onInsertImage={handleInsertImage}
                  />
                </TabsContent>

                {/* Music Tab */}
                <TabsContent value="music" className="space-y-4 mt-0">
                  <MusicSelector
                    selectedTrack={invitation.music?.trackId ?
                      (DEMO_TRACKS.find(t => t.id === invitation.music?.trackId) || (invitation.music.customTrackUrl ? {
                        id: invitation.music.trackId,
                        name: 'Música subida',
                        category: 'Personal',
                        duration: 'Música',
                        emoji: '🎵',
                        url: invitation.music.customTrackUrl
                      } : null))
                      : null}
                    onTrackSelect={handleTrackSelect}
                    autoPlay={invitation.music?.autoplay || false}
                    onAutoPlayChange={(autoplay) => {
                      if (invitation.music) {
                        updateMusic({ ...invitation.music, autoplay });
                      }
                    }}
                    volume={invitation.music?.volume || 50}
                    onVolumeChange={(volume) => {
                      if (invitation.music) {
                        updateMusic({ ...invitation.music, volume });
                      }
                    }}
                    suggestedCategory={invitation.category}
                  />
                </TabsContent>
                {/* Interactive/Plus Tab */}
                <TabsContent value="interactive" className="space-y-4 mt-0 pb-20">
                  <Card className="border-indigo-100 bg-indigo-50/10">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-bold flex items-center gap-2 text-indigo-700">
                        <Zap className="w-4 h-4" />
                        Módulos Full Premium
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">

                      {/* Itinerario */}
                      <div className="space-y-3 p-4 bg-white rounded-xl border border-indigo-50 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-indigo-600" />
                            <Label className="font-bold">Cronograma del Evento</Label>
                          </div>
                          <Button
                            variant={invitation.showItinerary ? "default" : "outline"}
                            size="sm"
                            className={`h-8 px-3 text-[10px] font-bold uppercase tracking-wider transition-all ${invitation.showItinerary ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200' : 'text-gray-400'}`}
                            onClick={() => updateField('showItinerary', !invitation.showItinerary)}
                          >
                            {invitation.showItinerary ? '✅ Activado' : '❌ Desactivado'}
                          </Button>
                        </div>

                        {invitation.showItinerary && (
                          <div className="space-y-3 pt-2">
                            {(invitation.itinerary || []).map((item) => (
                              <div key={item.id} className="flex gap-2 items-start group">
                                <Input
                                  type="time"
                                  value={item.time}
                                  onChange={(e) => updateItineraryItem(item.id, 'time', e.target.value)}
                                  className="w-24 h-9 text-xs"
                                />
                                <Input
                                  value={item.activity}
                                  onChange={(e) => updateItineraryItem(item.id, 'activity', e.target.value)}
                                  placeholder="Actividad..."
                                  className="flex-1 h-9 text-xs"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9 text-gray-400 hover:text-red-500"
                                  onClick={() => removeItineraryItem(item.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-dashed border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                              onClick={addItineraryItem}
                            >
                              <Plus className="w-3 h-3 mr-2" />
                              Agregar Actividad
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Regalos / CBU */}
                      <div className="space-y-3 p-4 bg-white rounded-xl border border-indigo-50 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-indigo-600" />
                            <Label className="font-bold">Mesa de Regalos / CBU</Label>
                          </div>
                          <Button
                            variant={invitation.showGifts ? "default" : "outline"}
                            size="sm"
                            className={`h-8 px-3 text-[10px] font-bold uppercase tracking-wider transition-all ${invitation.showGifts ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200' : 'text-gray-400'}`}
                            onClick={() => updateField('showGifts', !invitation.showGifts)}
                          >
                            {invitation.showGifts ? '✅ Activado' : '❌ Desactivado'}
                          </Button>
                        </div>

                        {invitation.showGifts && (
                          <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-top-1">
                            <div className="grid gap-2">
                              <Label className="text-[10px] text-muted-foreground uppercase">Alias / CBU</Label>
                              <Input
                                value={invitation.cbu}
                                onChange={(e) => updateField('cbu', e.target.value)}
                                placeholder="CBU o Alias..."
                                className="h-9 text-xs"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label className="text-[10px] text-muted-foreground uppercase">Nombre del Banco o Titular</Label>
                              <Input
                                value={invitation.bankName}
                                onChange={(e) => updateField('bankName', e.target.value)}
                                placeholder="Ej: Banco Galicia - Juan Pérez"
                                className="h-9 text-xs"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label className="text-[10px] text-muted-foreground uppercase">Link Lista de Regalos (Opcional)</Label>
                              <Input
                                value={invitation.giftRegistryUrl}
                                onChange={(e) => updateField('giftRegistryUrl', e.target.value)}
                                placeholder="https://..."
                                className="h-9 text-xs"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Dress Code */}
                      <div className="space-y-3 p-4 bg-white rounded-xl border border-indigo-50 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Shirt className="w-4 h-4 text-indigo-600" />
                            <Label className="font-bold">Código de Vestimenta</Label>
                          </div>
                          <Button
                            variant={invitation.showDressCode ? "default" : "outline"}
                            size="sm"
                            className={`h-8 px-3 text-[10px] font-bold uppercase tracking-wider transition-all ${invitation.showDressCode ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200' : 'text-gray-400'}`}
                            onClick={() => updateField('showDressCode', !invitation.showDressCode)}
                          >
                            {invitation.showDressCode ? '✅ Activado' : '❌ Desactivado'}
                          </Button>
                        </div>

                        {invitation.showDressCode && (
                          <div className="pt-2">
                            <Select value={invitation.dressCode} onValueChange={(val) => updateField('dressCode', val)}>
                              <SelectTrigger className="h-9 text-xs">
                                <SelectValue placeholder="Seleccionar estilo..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">Sin especificar</SelectItem>
                                <SelectItem value="formal">Elegante (Traje/Vestido)</SelectItem>
                                <SelectItem value="informal">Informal / Casual</SelectItem>
                                <SelectItem value="gala">Gala</SelectItem>
                                <SelectItem value="thematic">Temático</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3 p-4 bg-white rounded-xl border border-rose-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-110" />
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-2">
                             <div className="p-2 bg-rose-100 rounded-lg text-rose-500">
                               <MessageSquare className="w-4 h-4" />
                             </div>
                            <Label className="font-bold text-rose-900">Muro de Mensajes ✨</Label>
                          </div>
                          <Button
                            variant={invitation.showGuestbook !== false ? "default" : "outline"}
                            size="sm"
                            className={`h-8 px-3 text-[10px] font-bold uppercase tracking-wider transition-all ${invitation.showGuestbook !== false ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-200' : 'text-gray-400'}`}
                            onClick={() => updateField('showGuestbook', invitation.showGuestbook === false)}
                          >
                            {invitation.showGuestbook !== false ? '✅ Activado' : '❌ Desactivado'}
                          </Button>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1 relative z-10">Tus invitados podrán dejar saludos y fotos que aparecerán mágicamente al final de la invitación.</p>
                      </div>

                      {/* Slideshow de Fotos */}
                      <div className="space-y-3 p-4 bg-white rounded-xl border border-rose-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-110" />
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-2">
                             <div className="p-2 bg-rose-100 rounded-lg text-rose-500">
                               <Camera className="w-4 h-4" />
                             </div>
                            <Label className="font-bold text-rose-900">Slideshow de Fotos 🎞️</Label>
                          </div>
                          <Button
                            variant={(invitation.backgroundImages || []).length > 0 ? "default" : "outline"}
                            size="sm"
                            className={`h-8 px-3 text-[10px] font-bold uppercase tracking-wider transition-all ${(invitation.backgroundImages || []).length > 0 ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-200' : 'text-gray-400'}`}
                            onClick={() => {
                              if ((invitation.backgroundImages || []).length > 0) {
                                updateField('backgroundImages', []);
                              } else {
                                // Enable with all current uploaded images
                                const uploadedUrls = customImages.map(img => img.dataUrl);
                                if (uploadedUrls.length === 0) {
                                  toast.error('Primero sube algunas fotos en la pestaña FOTOS');
                                  return;
                                }
                                updateField('backgroundImages', uploadedUrls);
                                if (!invitation.slideshowDuration) {
                                  updateField('slideshowDuration', 5);
                                }
                              }
                            }}
                          >
                            {(invitation.backgroundImages || []).length > 0 ? '✅ Activado' : '❌ Desactivado'}
                          </Button>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1 relative z-10">Las fotos que subas rotarán automáticamente como fondo de la invitación.</p>
                        
                        {(invitation.backgroundImages || []).length > 0 && (
                          <div className="space-y-4 pt-3 relative z-10 animate-in fade-in slide-in-from-top-1">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-[10px] text-muted-foreground uppercase">Velocidad de cambio</Label>
                                <span className="text-[10px] font-bold text-rose-600">{invitation.slideshowDuration || 5}s</span>
                              </div>
                              <Slider
                                value={[invitation.slideshowDuration || 5]}
                                onValueChange={([val]) => updateField('slideshowDuration', val)}
                                min={3}
                                max={15}
                                step={1}
                              />
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-rose-50 rounded-lg border border-rose-100">
                              <Info className="w-3 h-3 text-rose-500" />
                              <span className="text-[9px] text-rose-700 leading-tight">Tienes {invitation.backgroundImages?.length} fotos en el slideshow. Sube más en la pestaña FOTOS.</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Visibilidad General y Extras */}
                      <div className="space-y-3 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 border-dashed">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-3 h-3 text-indigo-500" />
                          <Label className="text-[10px] font-black uppercase text-indigo-800">Otros Elementos Activos</Label>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div 
                            className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${invitation.showCountdown !== false ? 'bg-white border-indigo-200 shadow-sm' : 'bg-transparent border-gray-100 opacity-60'}`}
                            onClick={() => updateField('showCountdown', invitation.showCountdown === false)}
                          >
                            <span className="text-[10px] text-indigo-900 font-bold uppercase tracking-tight">Cuenta Regresiva</span>
                            <div className={`w-3 h-3 rounded-full ${invitation.showCountdown !== false ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-gray-200'}`} />
                          </div>
                          
                          <div 
                            className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${invitation.showMap !== false ? 'bg-white border-indigo-200 shadow-sm' : 'bg-transparent border-gray-100 opacity-60'}`}
                            onClick={() => updateField('showMap', invitation.showMap === false)}
                          >
                            <span className="text-[10px] text-indigo-900 font-bold uppercase tracking-tight">Mapa Ubicación</span>
                            <div className={`w-3 h-3 rounded-full ${invitation.showMap !== false ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-gray-200'}`} />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="text-[10px] text-gray-400 text-center italic font-medium">✨ Al activar estos módulos estás creando una invitación FULL PREMIUM ✨</p>
                      </div>

                    </CardContent>
                  </Card>
                </TabsContent>
              </ScrollArea>

            </Tabs>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex flex-col lg:sticky lg:top-8 h-fit">
            <div className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Vista Previa Real</div>
            <div className="flex-1 flex items-start justify-center p-4 bg-gray-100/50 rounded-2xl border-2 border-dashed border-gray-200 min-h-[500px] overflow-hidden">
              <motion.div
                layout
                className="w-full max-w-[360px] aspect-[3/4] rounded-xl shadow-2xl overflow-hidden relative"
                style={{ backgroundColor: invitation.colors.background }}
              >
                {/* Floating Music Control in Preview */}
                {(invitation.music?.trackId || invitation.music?.customTrackUrl) && (
                  <div className="absolute top-4 right-4 z-[40]">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMusic();
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isPlaying
                        ? 'bg-white text-rose-500 animate-pulse'
                        : 'bg-rose-500 text-white opacity-80'
                        }`}
                    >
                      {isPlaying ? (
                        <div className="flex items-center gap-0.5">
                          <Pause className="w-4 h-4" />
                          <div className="flex items-end gap-0.5 h-2.5">
                            <div className="w-0.5 h-1.5 bg-rose-500 animate-[music-bar_0.5s_infinite_alternate]"></div>
                            <div className="w-0.5 h-2 bg-rose-500 animate-[music-bar_0.7s_infinite_alternate]"></div>
                          </div>
                        </div>
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </motion.button>
                  </div>
                )}
                {/* Layer 1: Template Default Backgrounds (Only if no custom image) */}
                {!invitation.backgroundImage && (
                  <>
                    {invitation.templateId === 'baby-teddy-3d' && (
                      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#fff5f8] to-[#fce4ec] opacity-60" />
                    )}
                    {invitation.templateId === 'baby-stellar-3d' && (
                      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc]" />
                    )}
                    {invitation.templateId === 'baby-boho-3d' && (
                      <div className="absolute inset-0 z-0 bg-[#fdfbf7]" style={{ backgroundImage: 'radial-gradient(#4e977d 0.5px, transparent 0.5px)', backgroundSize: '24px 24px', opacity: 0.1 }} />
                    )}
                    {invitation.templateId === 'quinceanera-glam-3d' && (
                      <div className="absolute inset-0 z-0 bg-[#221016]">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #f8b4cc 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#4a2b35] to-transparent" />
                      </div>
                    )}
                  </>
                )}

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
                      style={{ opacity: (invitation.backgroundOpacity || 100) / 100 }}
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
                      />
                    ) : null}
                  </AnimatePresence>
                </div>

                {/* Layer 3: Template Decorations (Corner images, floating items, frames) */}
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
                    {/* Alianzas de Oro */}
                    <motion.div
                      animate={{
                        y: [-5, 5, -5],
                        rotate: [-2, 2, -2]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-1/4 -left-2 text-7xl opacity-90 drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] filter brightness-110 contrast-125 select-none"
                    >
                      💍
                    </motion.div>

                    {/* Copas de Brindis */}
                    <motion.div
                      animate={{
                        y: [5, -5, 5],
                        rotate: [2, -2, 2]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-1/4 -right-2 text-7xl opacity-90 drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] filter brightness-110 contrast-125 select-none"
                    >
                      🥂
                    </motion.div>

                    {/* Brillos mágicos */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1)_0%,transparent_70%)]" />
                    <motion.div
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 z-0"
                      style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                    />
                  </div>
                )}


                {/* Baby Teddy 3D */}
                {invitation.templateId === 'baby-teddy-3d' && (
                  <>
                    <div className="absolute top-10 right-8 z-10 text-amber-500/40 rotate-12 animate-bounce">
                      <span className="material-symbols-outlined !text-4xl text-amber-500">flutter_dash</span>
                    </div>
                    <div className="absolute top-40 left-6 z-10 text-amber-500/30 -rotate-12 animate-pulse">
                      <span className="material-symbols-outlined !text-2xl text-amber-500">flutter_dash</span>
                    </div>
                    <div className="absolute bottom-32 left-16 z-10 text-rose-500 animate-pulse">
                      <span className="material-symbols-outlined !text-6xl text-rose-500" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                      <div className="w-0.5 h-16 bg-rose-500/30 mx-auto -mt-2"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 w-40 h-40 z-20 pointer-events-none drop-shadow-2xl">
                      <img src="/backgrounds/teddy-bear.png" alt="Teddy Bear" className="w-full h-full object-contain" />
                    </div>
                    <div className="absolute bottom-8 right-6 z-10 text-amber-500/40">
                      <span className="material-symbols-outlined !text-3xl text-amber-500">flutter_dash</span>
                    </div>
                  </>
                )}

                {/* Mis 18 Años - Club / DJ Effects */}
                {(invitation.templateId === '18-neon-club' || invitation.templateId === '18-dj-session') && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-500/10 pointer-events-none" />
                    <motion.div
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute top-10 left-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-[60px] pointer-events-none"
                    />
                    <motion.div
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                      className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[70px] pointer-events-none"
                    />
                    <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
                      <motion.span
                        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="material-symbols-outlined text-4xl text-cyan-400 opacity-60"
                      >
                        graphic_eq
                      </motion.span>
                    </div>
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
                      <motion.span
                        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                        className="material-symbols-outlined text-4xl text-purple-400 opacity-60"
                      >
                        music_note
                      </motion.span>
                    </div>
                  </>
                )}

                {/* Baby Stellar 3D */}
                {invitation.templateId === 'baby-stellar-3d' && (
                  <>
                    <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-100 rounded-full shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.1),5px_5px_15px_rgba(253,224,71,0.4)] flex items-center justify-center overflow-hidden z-10">
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/50"></div>
                      <div className="absolute -left-3 top-0 w-full h-full bg-[#e0f2fe] rounded-full"></div>
                    </div>
                    <div className="absolute top-20 left-12 text-slate-300 opacity-60 z-10 animate-pulse">
                      <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                    <div className="absolute top-40 right-20 text-white opacity-80 z-10 animate-bounce">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                    <div className="absolute bottom-60 left-10 text-white opacity-70 z-10">
                      <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                    <div className="absolute bottom-4 right-4 w-32 h-32 pointer-events-none z-20">
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-slate-200 rounded-[40%_60%_70%_30%/40%_50%_50%_60%] shadow-lg border-b-2 border-slate-300/50">
                        <div className="absolute -left-6 top-1 w-14 h-16 bg-slate-300 rounded-full rotate-[-15deg] shadow-sm"></div>
                        <div className="absolute left-6 top-8 w-2 h-2 bg-slate-800 rounded-full"></div>
                        <div className="absolute left-14 top-8 w-2 h-2 bg-slate-800 rounded-full"></div>
                      </div>
                    </div>
                  </>
                )}

                {/* Baby Boho 3D */}
                {invitation.templateId === 'baby-boho-3d' && (
                  <>
                    <div className="absolute top-0 left-0 w-full h-40 pointer-events-none z-10 opacity-60">
                      <div className="absolute top-4 left-10 w-16 h-20 bg-[#e7f3ef] rounded-full blur-[2px]"></div>
                      <div className="absolute top-6 right-16 w-14 h-18 bg-[#19e69b]/20 rounded-full blur-[1px]"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center p-6 z-0">
                      <div className="w-full aspect-square max-w-[320px] rounded-full bg-white/50 shadow-inner border border-white/50"></div>
                    </div>
                    <div className="absolute bottom-10 left-4 w-24 h-24 z-20 pointer-events-none drop-shadow-xl">
                      <img src="/backgrounds/boho-horse.png" alt="Wooden Horse" className="w-full h-full object-contain" />
                    </div>
                    <div className="absolute bottom-6 right-2 w-28 h-28 z-20 pointer-events-none drop-shadow-xl">
                      <img src="/backgrounds/boho-giraffe.png" alt="Plush Giraffe" className="w-full h-full object-contain" />
                    </div>
                  </>
                )}

                {/* Quinceañera Glam 3D */}
                {invitation.templateId === 'quinceanera-glam-3d' && (
                  <>
                    <div className="absolute top-20 left-10 w-64 h-64 bg-[#f8b4cc]/10 rounded-full blur-[80px] animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#ffd700]/5 rounded-full blur-[100px]"></div>
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                      <div className="relative group grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
                        <span className="material-symbols-outlined text-6xl text-amber-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          workspace_premium
                        </span>
                      </div>
                      <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-2 shadow-[0_0_10px_#ffd700]"></div>
                    </div>
                    <div className="absolute top-40 right-[15%] text-amber-200/40 animate-bounce delay-75">
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
                    </div>
                    <div className="absolute top-[60%] left-[8%] text-amber-200/30 animate-pulse">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
                    </div>
                    <div className="absolute top-64 left-[10%] w-6 h-6 bg-[#f8b4cc] rounded-full opacity-40 blur-sm animate-float-slow"></div>
                    <div className="absolute bottom-60 right-[15%] w-4 h-4 bg-[#f8b4cc] rounded-full opacity-30 blur-sm animate-float"></div>
                    <div className="absolute inset-10 border border-amber-500/10 pointer-events-none rounded-sm"></div>
                    <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-amber-500/30 rounded-tl-xl pointer-events-none"></div>
                    <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-amber-500/30 rounded-br-xl pointer-events-none"></div>
                  </>
                )}

                {/* --- MARCOS DE FOTOS DECORATIVOS --- */}
                {/* Photo Frame Golden */}
                {invitation.templateId === 'photo-frame-golden' && (
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    {/* Marco exterior de oro - AHORA EN EL BORDE */}
                    <div className="absolute inset-0 border-[8px] border-[#D4AF37] shadow-[0_0_15px_rgba(0,0,0,0.3),inset_0_0_10px_rgba(0,0,0,0.3)]" />
                    {/* Línea interna fina */}
                    <div className="absolute inset-[8px] border border-white/20" />
                    {/* Esquinas decorativas */}
                    <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#FFD700]" />
                    <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#FFD700]" />
                    <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#FFD700]" />
                    <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#FFD700]" />
                  </div>
                )}

                {/* Photo Frame Polaroid */}
                {invitation.templateId === 'photo-frame-polaroid' && (
                  <div className="absolute inset-0 z-10 pointer-events-none bg-black/5 flex items-center justify-center">
                    <div className="w-[90%] aspect-[4/5] bg-white p-4 pb-16 shadow-[0_20px_40px_rgba(0,0,0,0.3)] rotate-1 relative">
                       {/* El "vacio" para la foto ya sucede por detras en Layer 2 */}
                       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 border-b border-gray-100 flex items-center justify-center">
                         <span className="text-gray-300 text-[10px] font-medium tracking-[0.3em] uppercase">Nuestros Recuerdos</span>
                       </div>
                    </div>
                  </div>
                )}

                {/* Photo Frame Angelic */}
                {invitation.templateId === 'photo-frame-angelic' && (
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/80" />
                    <div className="absolute inset-8 rounded-full border-2 border-white/50 blur-[1px] shadow-[0_0_30px_rgba(255,255,255,0.8)]" />
                    {/* Brillos suaves */}
                    <motion.div 
                      animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute top-1/4 left-1/4 w-32 h-32 bg-sky-100/30 rounded-full blur-[40px]" 
                    />
                  </div>
                )}

                {/* Layer 4: Text Overlay Protection - MAS SUAVE PARA IMAGENES VIBRANTES */}
                {(invitation.backgroundImage || (invitation.backgroundImages && invitation.backgroundImages.length > 0)) && (
                  <div
                    className="absolute inset-0 z-[5] pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.1) 100%)'
                    }}
                  />
                )}

                {/* Layer 5: Content */}
                <div
                  className="relative h-full flex flex-col items-center justify-center p-8 text-center"
                  style={{
                    zIndex: 20,
                    textShadow: invitation.colors.text === '#FFFFFF' || invitation.colors.text.toLowerCase() === '#ffffff'
                      ? '0 2px 8px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9)'
                      : '0 1px 2px rgba(255,255,255,0.4)'
                  }}
                >

                  <h2
                    className="text-3xl sm:text-4xl font-bold mb-4 leading-tight tracking-tight px-4"
                    style={{
                      color: invitation.colors.text,
                      fontFamily: currentFont.family,
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                    }}
                  >
                    {invitation.title || 'Título del Evento'}
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
                  {/* Date and Time */}

                  {invitation.eventDate && (
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4" style={{ color: invitation.colors.accent }} />
                      <span
                        className="text-sm font-medium"
                        style={{ color: invitation.colors.text }}
                      >
                        {new Date(invitation.eventDate + 'T00:00:00').toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}

                  {invitation.eventTime && (
                    <p
                      className="text-sm mb-4"
                      style={{ color: invitation.colors.text, opacity: 0.8 }}
                    >
                      {invitation.eventTime}
                    </p>
                  )}

                  {invitation.eventDate && (
                    <div className="w-full max-w-[280px]">
                      <EventCountdown
                        targetDate={invitation.eventDate}
                        targetTime={invitation.eventTime}
                        color={invitation.colors.accent}
                      />
                    </div>
                  )}

                  {/* Location */}
                  {invitation.location && (
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-4 h-4" style={{ color: invitation.colors.accent }} />
                      <span
                        className="text-sm"
                        style={{ color: invitation.colors.text }}
                      >
                        {invitation.location}
                      </span>
                    </div>
                  )}

                  {/* Message */}
                  <p
                    className="text-xs sm:text-sm leading-relaxed max-w-xs font-medium"
                    style={{
                      color: invitation.colors.text,
                      opacity: 1,
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                    }}
                  >
                    {invitation.message}
                  </p>

                  {/* Music indicator */}
                  {invitation.music?.trackId && (
                    <div
                      className="flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: invitation.colors.accent + '20' }}
                    >
                      <Music className="w-3.5 h-3.5" style={{ color: invitation.colors.accent }} />
                      <span
                        className="text-xs"
                        style={{ color: invitation.colors.accent }}
                      >
                        {invitation.music.autoplay ? '🎵 Con música' : 'Música disponible'}
                      </span>
                    </div>
                  )}

                  {/* Decorative bottom element */}
                  <div
                    className="w-20 h-1 rounded-full mt-6"
                    style={{ backgroundColor: invitation.colors.accent }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        price={template.backgroundVideo || template.isPremium ? config?.pricePremium : config?.priceStandard}
        isPremium={Boolean(template.backgroundVideo || template.isPremium)}
        mercadoPagoLink={config?.mercadoPagoLink}
        paypalLink={config?.paypalLink}
        exchangeRate={config?.exchangeRate}
        onPaymentComplete={onPaymentComplete}
      />
    </div>
  </>
  );
}
