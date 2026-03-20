'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Invitation, Guest } from '@/types';
import { fonts, templates } from '@/data/templates';
import { EventCountdown } from '@/components/EventCountdown';
import { DEMO_TRACKS } from './MusicSelector';
import { guestsApi } from '@/lib/api';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, Music, Play, Pause, Volume2, VolumeX, Loader2, MapPin, Gift, List, Shirt, ExternalLink, Copy, Check, Calendar as CalendarIcon, Clock, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import { Guestbook } from '@/components/Guestbook';
import { supabase } from '@/lib/supabase';

interface PublicInvitationProps {
    invitation: Invitation;
}

const STORAGE_KEY = 'digital_invitations_data';

export function PublicInvitation({ invitation }: PublicInvitationProps) {
    const [hasRsvpd, setHasRsvpd] = useState(false);
    const [guestName, setGuestName] = useState('');
    const [guestStatus, setGuestStatus] = useState<Guest['status']>('confirmed');
    const [companions, setCompanions] = useState(0);
    const [songRequest, setSongRequest] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setCurrentUser(user);
        });
    }, []);

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
        // Check if user already RSVP'd in this browser
        const rsvpStatus = localStorage.getItem(`rsvp_${invitation.id}`);
        if (rsvpStatus) {
            setHasRsvpd(true);
        }

        // Handle Music Setup
        let audio: HTMLAudioElement | null = null;

        if (invitation.music?.trackId || invitation.music?.customTrackUrl) {
            audio = new Audio();
            const trackUrl = invitation.music.customTrackUrl ||
                DEMO_TRACKS.find(t => t.id === invitation.music?.trackId)?.url ||
                'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
            audio.src = trackUrl;
            audio.volume = (invitation.music.volume || 50) / 100;
            audio.loop = invitation.music.loop !== false;

            // Avoid memory leaks
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }

            audioRef.current = audio;

            if (invitation.music.autoplay) {
                const attemptPlay = () => {
                    if (!audioRef.current) return;
                    audioRef.current.play()
                        .then(() => setIsPlaying(true))
                        .catch(err => console.log('Autoplay prevented:', err));
                    window.removeEventListener('mousedown', attemptPlay);
                    window.removeEventListener('touchstart', attemptPlay);
                };
                window.addEventListener('mousedown', attemptPlay);
                window.addEventListener('touchstart', attemptPlay);
            }
        }

        return () => {
            if (audio) {
                audio.pause();
                audio.src = '';
            }
            audioRef.current = null;
        };
    }, [invitation.id, invitation.music?.trackId, invitation.music?.customTrackUrl]);

    const toggleMusic = async () => {
        if (!audioRef.current) return;
        try {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                await audioRef.current.play();
                setIsPlaying(true);
            }
        } catch (e) {
            console.error('Audio play error:', e);
            toast.error('No se pudo reproducir el audio. Toca la pantalla e intenta de nuevo.');
        }
    };

    const currentFont = fonts.find(f => f.name === invitation.font) || fonts[0];

    const handleRsvp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!guestName.trim()) {
            toast.error('Por favor ingresa tu nombre');
            return;
        }

        setLoading(true);
        try {
            // Get current guests from cloud
            const currentGuests = await guestsApi.getAll(invitation.id);

            const newGuest: Guest = {
                id: uuidv4(),
                invitationId: invitation.id,
                name: guestName,
                status: guestStatus,
                plusOnes: companions,
                songRequest: songRequest,
                dietaryRestrictions: dietaryRestrictions,
                email: '',
                phone: '',
                notes: '',
                createdAt: new Date().toISOString()
            };

            const updatedGuests = [...currentGuests, newGuest];
            await guestsApi.saveAll(invitation.id, updatedGuests);

            localStorage.setItem(`rsvp_${invitation.id}`, 'true');
            setHasRsvpd(true);
            toast.success(guestStatus === 'confirmed' ? '¡Genial! Tu asistencia está confirmada.' : 'Entendido, gracias por avisar.');
        } catch (e) {
            console.error(e);
            toast.error('Error al guardar tu confirmación');
        } finally {
            setLoading(false);
        }
    };

    const template = invitation.templateId ? templates.find(t => t.id === invitation.templateId) : null;
    const isPremium = Boolean(template?.isPremium || template?.backgroundVideo || invitation.backgroundVideo);
    const isPaid = invitation.isPaid || false;

    // Si la invitación es Premium y NO está paga, bloqueamos el contenido
    if (isPremium && !isPaid) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900 overflow-hidden relative">
                {/* Fondo animado sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-purple-500/10 to-indigo-500/10 animate-pulse" />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[40px] text-center shadow-2xl z-10"
                >
                    <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
                        <Sparkles className="w-10 h-10 text-white animate-pulse" />
                    </div>
                    
                    <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">¡Invitación en Camino!</h2>
                    
                    <div className="space-y-4 text-white/70 text-sm font-medium leading-relaxed">
                        <p>Esta es una invitación <span className="text-amber-400 font-bold italic">Pro ✨</span>.</p>
                        <p>El anfitrión todavía está finalizando los detalles de activación.</p>
                        <p className="bg-white/5 p-4 rounded-2xl italic">"¡Vuelve a revisar en unos minutos!"</p>
                    </div>
                    
                    <div className="mt-10 pt-6 border-t border-white/10">
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Powered by Papel Crepé</p>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 bg-opacity-90 relative">
            {/* Music control */}
            {(invitation.music?.trackId || invitation.music?.customTrackUrl) && (
                <div className="fixed top-6 right-6 z-[60]">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMusic}
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isPlaying
                            ? 'bg-white text-rose-500 animate-pulse'
                            : 'bg-rose-500 text-white opacity-80'
                            }`}
                        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
                    >
                        {isPlaying ? (
                            <div className="flex items-center gap-0.5">
                                <Pause className="w-5 h-5" />
                                <div className="flex items-end gap-0.5 h-3">
                                    <div className="w-0.5 h-2 bg-rose-500 animate-[music-bar_0.5s_infinite_alternate]"></div>
                                    <div className="w-0.5 h-3 bg-rose-500 animate-[music-bar_0.7s_infinite_alternate]"></div>
                                </div>
                            </div>
                        ) : (
                            <Play className="w-5 h-5 ml-0.5" />
                        )}
                    </motion.button>
                </div>
            )}

            {/* Dynamic Background if no image */}
            {!invitation.backgroundImage && (
                <div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{ backgroundColor: invitation.colors.background }}
                />
            )}

            {/* Main Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 my-8"
            >
                <div
                    className="relative w-full aspect-[3/4] overflow-hidden"
                    style={{ backgroundColor: invitation.colors.background }}
                >
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
                    {invitation.templateId === 'wedding-rustic' && (
                        <>
                            {/* Fairy Lights */}
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
                            {/* Rustic Floral Corner */}
                            <div className="absolute -bottom-2 -left-2 w-32 h-32 z-10 pointer-events-none">
                                <img src="/backgrounds/rustic-floral.png" alt="" className="w-full h-full object-contain" />
                            </div>
                        </>
                    )}
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
                    {invitation.templateId === 'birthday-penguin' && (
                        <div className="absolute inset-0 z-[30] pointer-events-none overflow-hidden">
                            {/* Snowflakes falling */}
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        y: [-100, 900],
                                        x: [0, (i % 2 === 0 ? 30 : -30)],
                                        rotate: 360
                                    }}
                                    transition={{
                                        duration: 6 + Math.random() * 6,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: Math.random() * 5
                                    }}
                                    className="absolute text-3xl opacity-30 select-none text-blue-100"
                                    style={{ left: `${Math.random() * 100}%` }}
                                >
                                    ❄️
                                </motion.div>
                            ))}
                        </div>
                    )}
                    {invitation.templateId === 'birthday-emoji-sneakers' && (
                        <div className="absolute inset-0 z-[30] pointer-events-none overflow-hidden">
                            {/* Stars and Party Poppers */}
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        y: [-50, 900],
                                        x: [(i % 2 === 0 ? -60 : 60), (i % 2 === 0 ? 60 : -60)],
                                        scale: [0, 1.2, 0.7],
                                        rotate: [0, 720],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 4 + Math.random() * 4,
                                        repeat: Infinity,
                                        delay: Math.random() * 5,
                                        ease: "easeOut"
                                    }}
                                    className="absolute text-3xl select-none"
                                    style={{ left: `${Math.random() * 100}%` }}
                                >
                                    {i % 3 === 0 ? '⭐' : i % 3 === 1 ? '🎉' : '🎊'}
                                </motion.div>
                            ))}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,71,87,0.1)_0%,transparent_80%)]" />
                        </div>
                    )}
                    {invitation.templateId === 'baby-teddy-3d' && (

                        <>
                            {/* Floating Butterflies (using flutter_dash) */}
                            <div className="absolute top-10 right-8 z-10 text-amber-500/40 rotate-12 animate-bounce">
                                <span className="material-symbols-outlined !text-4xl text-amber-500">flutter_dash</span>
                            </div>
                            <div className="absolute top-40 left-6 z-10 text-amber-500/30 -rotate-12 animate-pulse">
                                <span className="material-symbols-outlined !text-2xl text-amber-500">flutter_dash</span>
                            </div>

                            {/* Heart Balloon */}
                            <div className="absolute bottom-32 left-16 z-10 text-rose-500 animate-pulse">
                                <span className="material-symbols-outlined !text-6xl text-rose-500" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                <div className="w-0.5 h-16 bg-rose-500/30 mx-auto -mt-2"></div>
                            </div>

                            {/* 3D Teddy Bear */}
                            <div className="absolute bottom-4 left-4 w-40 h-40 z-20 pointer-events-none drop-shadow-2xl">
                                <img src="/backgrounds/teddy-bear.png" alt="Teddy Bear" className="w-full h-full object-contain" />
                            </div>

                            {/* Right side dash */}
                            <div className="absolute bottom-8 right-6 z-10 text-amber-500/40">
                                <span className="material-symbols-outlined !text-3xl text-amber-500">flutter_dash</span>
                            </div>
                        </>
                    )}
                    {invitation.templateId === 'baby-stellar-3d' && (
                        <>
                            {/* 3D Moon - Top Right */}
                            <div className="absolute top-8 right-8 w-24 h-24 bg-yellow-100 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.1),10px_10px_30px_rgba(253,224,71,0.4)] flex items-center justify-center overflow-hidden z-10">
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/50"></div>
                                <div className="absolute -left-4 top-0 w-full h-full bg-[#f0f9ff] rounded-full"></div>
                            </div>

                            {/* Floating stars */}
                            <div className="absolute top-20 left-12 text-slate-300 opacity-60 z-10 animate-pulse">
                                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            </div>
                            <div className="absolute top-40 right-20 text-white opacity-80 z-10 animate-bounce">
                                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            </div>
                            <div className="absolute bottom-60 left-10 text-white opacity-70 z-10">
                                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            </div>

                            {/* 3D Elephant - Bottom Right */}
                            <div className="absolute bottom-4 right-4 w-48 h-48 pointer-events-none z-20">
                                <div className="absolute bottom-4 right-4 w-32 h-32 bg-slate-200 rounded-[40%_60%_70%_30%/40%_50%_50%_60%] shadow-lg border-b-4 border-slate-300/50">
                                    <div className="absolute -left-8 top-2 w-20 h-24 bg-slate-300 rounded-full rotate-[-15deg] shadow-md border-r-4 border-slate-400/20"></div>
                                    <div className="absolute -right-4 top-2 w-16 h-20 bg-slate-300 rounded-full rotate-[15deg] shadow-md"></div>
                                    <div className="absolute left-10 top-12 w-3 h-3 bg-slate-800 rounded-full"></div>
                                    <div className="absolute left-20 top-12 w-3 h-3 bg-slate-800 rounded-full"></div>
                                    <div className="absolute left-12 top-16 w-8 h-12 bg-slate-200 rounded-full rotate-[10deg] shadow-sm"></div>
                                </div>
                            </div>
                        </>
                    )}
                    {invitation.templateId === 'baby-boho-3d' && (
                        <>
                            {/* Top Bubbles/Balloons */}
                            <div className="absolute top-0 left-0 w-full h-40 pointer-events-none z-10 opacity-60">
                                <div className="absolute top-4 left-10 w-16 h-20 bg-[#e7f3ef] rounded-full blur-[2px]"></div>
                                <div className="absolute top-2 left-24 w-12 h-16 bg-white/80 rounded-full blur-[2px]"></div>
                                <div className="absolute top-6 right-16 w-14 h-18 bg-[#19e69b]/20 rounded-full blur-[2px]"></div>
                            </div>

                            {/* Central Circle */}
                            <div className="absolute inset-0 flex items-center justify-center p-6 z-0">
                                <div className="w-full aspect-square max-w-[320px] rounded-full bg-white/50 shadow-inner border border-white/50"></div>
                            </div>

                            {/* 3D Toys */}
                            <div className="absolute bottom-10 left-4 w-32 h-32 z-20 pointer-events-none drop-shadow-2xl translate-y-2">
                                <img src="/backgrounds/boho-horse.png" alt="Wooden Horse" className="w-full h-full object-contain" />
                            </div>
                            <div className="absolute bottom-6 right-2 w-36 h-36 z-20 pointer-events-none drop-shadow-2xl">
                                <img src="/backgrounds/boho-giraffe.png" alt="Plush Giraffe" className="w-full h-full object-contain" />
                            </div>
                        </>
                    )}
                    {invitation.templateId === 'quinceanera-glam-3d' && (
                        <>
                            {/* Floating Gold/Rose Glows */}
                            <div className="absolute top-20 left-10 w-64 h-64 bg-[#f8b4cc]/10 rounded-full blur-[80px] animate-pulse"></div>
                            <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#ffd700]/5 rounded-full blur-[100px]"></div>

                            {/* 3D Gold Crown - Top Center */}
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                                <div className="relative group grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
                                    <span className="material-symbols-outlined text-6xl text-amber-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        workspace_premium
                                    </span>
                                </div>
                                <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-2 shadow-[0_0_10px_#ffd700]"></div>
                            </div>

                            {/* Diamonds / Crystals scattered */}
                            <div className="absolute top-40 right-[15%] text-amber-200/40 animate-bounce delay-75">
                                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
                            </div>
                            <div className="absolute top-[60%] left-[8%] text-amber-200/30 animate-pulse">
                                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
                            </div>

                            {/* Floating Rose Petals / Glow elements */}
                            <div className="absolute top-64 left-[10%] w-6 h-6 bg-[#f8b4cc] rounded-full opacity-40 blur-sm animate-float-slow"></div>
                            <div className="absolute bottom-60 right-[15%] w-4 h-4 bg-[#f8b4cc] rounded-full opacity-30 blur-sm animate-float"></div>

                            {/* Elegant Border Frame */}
                            <div className="absolute inset-10 border border-amber-500/10 pointer-events-none rounded-sm"></div>
                            <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-amber-500/30 rounded-tl-xl pointer-events-none"></div>
                            <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-amber-500/30 rounded-br-xl pointer-events-none"></div>
                        </>
                    )}

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

                    {/* --- MARCOS DE FOTOS DECORATIVOS --- */}
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
                                {/* Zona vacia por detras en Layer 2 */}
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
                            {/* Brillos suaves */}
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

                    {/* Layer 5: Content */}
                    <div
                        className="relative h-full flex flex-col items-center justify-center p-8 text-center"
                        style={{
                            zIndex: 20,
                            textShadow: invitation.colors.text === '#FFFFFF' || invitation.colors.text.toLowerCase() === '#ffffff'
                                ? '0 2px 10px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,1)'
                                : '0 1px 3px rgba(255,255,255,0.4)'
                        }}
                    >
                        {/* Badge/Category - Movido arriba para dejar limpio el centro */}
                        <div
                            className="absolute top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg z-20 whitespace-nowrap"
                            style={{
                                backgroundColor: invitation.colors.accent,
                                color: '#FFFFFF'
                            }}
                        >
                            {invitation.category.toUpperCase()}
                        </div>

                        {/* Title */}
                        <h2
                            className="text-4xl sm:text-5xl font-bold mb-4 leading-tight tracking-tight px-2"
                            style={{
                                color: invitation.colors.text,
                                fontFamily: currentFont.family,
                                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
                            }}
                        >
                            {invitation.title}
                        </h2>

                        {/* Host name */}
                        {invitation.hostName && (
                            <p
                                className="text-sm font-medium mb-6 uppercase tracking-wider"
                                style={{
                                    color: invitation.colors.text,
                                    opacity: 1,
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
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
                                        className="w-8 h-8 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: invitation.colors.accent + '20' }}
                                    >
                                        📅
                                    </div>
                                </div>
                                <p
                                    className="text-lg font-medium"
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

                                <EventCountdown
                                    targetDate={invitation.eventDate}
                                    targetTime={invitation.eventTime}
                                    color={invitation.colors.accent}
                                />

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-2 text-[10px] font-bold uppercase tracking-tighter opacity-60 hover:opacity-100"
                                    onClick={() => {
                                        const event = {
                                            title: invitation.title,
                                            start: `${invitation.eventDate?.replace(/-/g, '')}T${invitation.eventTime?.replace(/:/g, '') || '0000'}00Z`,
                                            location: invitation.location
                                        };
                                        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.start}&details=${encodeURIComponent(invitation.message || '')}&location=${encodeURIComponent(event.location || '')}`;
                                        window.open(url, '_blank');
                                    }}
                                >
                                    <CalendarIcon className="w-3 h-3 mr-1" />
                                    Agendar en mi Calendario
                                </Button>
                            </div>
                        )}

                        {/* Location */}
                        {invitation.location && (
                            <div className="mb-6">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: invitation.colors.accent + '20' }}
                                    >
                                        📍
                                    </div>
                                </div>
                                <p
                                    className="text-base"
                                    style={{
                                        color: invitation.colors.text,
                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                                    }}
                                >
                                    {invitation.location}
                                </p>
                                {invitation.showMap !== false && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mt-3 gap-2 border-dashed"
                                        style={{
                                            borderColor: invitation.colors.accent,
                                            color: invitation.colors.text
                                        }}
                                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitation.location || '')}`, '_blank')}
                                    >
                                        <MapPin className="w-4 h-4" />
                                        Ver ubicación
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* Message */}
                        <p
                            className="text-sm leading-relaxed max-w-xs"
                            style={{
                                color: invitation.colors.text,
                                opacity: 1,
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))'
                            }}
                        >
                            {invitation.message}
                        </p>

                        {/* Decorative bottom */}
                        <div
                            className="w-24 h-1 rounded-full mt-8"
                            style={{ backgroundColor: invitation.colors.accent }}
                        />
                    </div>
                </div>

                {/* --- FULL PREMIUM SECTIONS --- */}
                <div className="bg-white px-8 pb-8 space-y-8">

                    {/* Itinerario / Cronograma */}
                    {invitation.showItinerary && invitation.itinerary && invitation.itinerary.length > 0 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                                <List className="w-5 h-5 text-rose-500" />
                                <h3 className="font-black uppercase tracking-tighter text-gray-800">Cronograma</h3>
                            </div>
                            <div className="space-y-6 relative ml-4 border-l-2 border-rose-100 pl-6">
                                {invitation.itinerary.map((item, idx) => (
                                    <div key={item.id} className="relative">
                                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-rose-500 border-4 border-white shadow-sm" />
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">{item.time}hs</span>
                                            <p className="text-gray-700 font-bold leading-tight">{item.activity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Regalos / CBU */}
                    {invitation.showGifts && (invitation.cbu || invitation.giftRegistryUrl) && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                                <Gift className="w-5 h-5 text-rose-500" />
                                <h3 className="font-black uppercase tracking-tighter text-gray-800">Regalos</h3>
                            </div>
                            <p className="text-xs text-gray-500 mb-4 italic">Tu presencia es nuestro mejor regalo, pero si deseas hacernos un presente...</p>

                            <div className="space-y-3">
                                {invitation.cbu && (
                                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">CBU / ALIAS</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 text-rose-500 hover:text-rose-600 font-bold gap-1"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(invitation.cbu || '');
                                                    setCopied(true);
                                                    setTimeout(() => setCopied(false), 2000);
                                                    toast.success('Copiado al portapapeles');
                                                }}
                                            >
                                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                {copied ? 'Copiado' : 'Copiar'}
                                            </Button>
                                        </div>
                                        <p className="font-black text-gray-800 break-all">{invitation.cbu}</p>
                                        {invitation.bankName && <p className="text-xs text-gray-500">{invitation.bankName}</p>}
                                    </div>
                                )}

                                {invitation.giftRegistryUrl && (
                                    <a
                                        href={invitation.giftRegistryUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 rounded-2xl bg-rose-50 border border-rose-100 group transition-all hover:bg-rose-100"
                                    >
                                        <div>
                                            <p className="font-bold text-rose-700">Lista de Regalos</p>
                                            <p className="text-[10px] text-rose-500 uppercase font-black">Ver online</p>
                                        </div>
                                        <ExternalLink className="w-5 h-5 text-rose-400 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Dress Code */}
                    {invitation.showDressCode && invitation.dressCode && invitation.dressCode !== 'none' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                            <div className="flex items-center justify-center gap-4 p-6 rounded-3xl bg-indigo-50 border border-indigo-100">
                                <div className="bg-white p-3 rounded-2xl shadow-sm text-indigo-500">
                                    <Shirt className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Código de Vestimenta</h4>
                                    <p className="font-black text-indigo-900 text-lg">
                                        {invitation.dressCode === 'formal' && 'Elegante'}
                                        {invitation.dressCode === 'informal' && 'Informal / Casual'}
                                        {invitation.dressCode === 'gala' && 'Gala'}
                                        {invitation.dressCode === 'thematic' && 'Temático'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* RSVP Section */}
                <div id="rsvp-section" className="p-8 bg-white border-t border-gray-100">
                    <h3 className="text-xl font-bold text-center mb-6" style={{ color: invitation.colors.accent }}>
                        Confirma tu Asistencia
                    </h3>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                        <div className="p-4 rounded-2xl text-center space-y-1" style={{ backgroundColor: invitation.colors.accent + '10' }}>
                            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: invitation.colors.accent }}>Fecha Límite</div>
                            <div className="text-sm font-medium text-gray-700">Pronto</div>
                        </div>
                        <div className="p-4 rounded-2xl text-center space-y-1" style={{ backgroundColor: invitation.colors.accent + '10' }}>
                            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: invitation.colors.accent }}>Ubicación</div>
                            <div
                                className="text-sm font-medium text-rose-600 cursor-pointer hover:underline"
                                onClick={() => invitation.location && window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitation.location)}`)}
                            >
                                Ver Mapa
                            </div>
                        </div>
                    </div>

                    {hasRsvpd ? (
                        <div className="text-center p-8 bg-green-50 rounded-2xl border border-green-100 mb-8">
                            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                            <p className="text-green-800 font-bold text-lg">¡Confirmado!</p>
                            <p className="text-sm text-green-600 mt-1">Tu respuesta ha sido enviada al anfitrión.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleRsvp} className="space-y-6 mb-8">
                            <div className="space-y-2">
                                <Label htmlFor="guestName" className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">¿Quién eres?</Label>
                                <Input
                                    id="guestName"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    placeholder="Ingresa tu nombre completo"
                                    className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:ring-rose-500"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">¿Vienes a la fiesta?</Label>
                                <Select value={guestStatus} onValueChange={(val: any) => setGuestStatus(val)}>
                                    <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-100">
                                        <SelectValue placeholder="Selecciona tu respuesta..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="confirmed">¡Sí, ahí estaré! 🎊</SelectItem>
                                        <SelectItem value="declined">No podré asistir 😢</SelectItem>
                                        <SelectItem value="pending">Lo confirmaré luego 🤔</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {guestStatus === 'confirmed' && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                                    <Label htmlFor="companions" className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Acompañantes (+1, +2...)</Label>
                                    <Select value={companions.toString()} onValueChange={(val) => setCompanions(parseInt(val))}>
                                        <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-100">
                                            <SelectValue placeholder="¿Vas con alguien más?" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">Voy solo/a</SelectItem>
                                            {[1, 2, 3, 4, 5].map(n => (
                                                <SelectItem key={n} value={n.toString()}>{n} Acompañantes</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </motion.div>
                            )}

                            {guestStatus === 'confirmed' && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 pt-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="song" className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">¿Qué canción no puede faltar?</Label>
                                        <Input
                                            id="song"
                                            value={songRequest}
                                            onChange={(e) => setSongRequest(e.target.value)}
                                            placeholder="Título o artista..."
                                            className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:ring-rose-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="diet" className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Restricciones Alimentarias</Label>
                                        <Input
                                            id="diet"
                                            value={dietaryRestrictions}
                                            onChange={(e) => setDietaryRestrictions(e.target.value)}
                                            placeholder="Celíaco, vegano, alergias..."
                                            className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:ring-rose-500"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg shadow-rose-200"
                                style={{ backgroundColor: invitation.colors.accent, color: '#FFFFFF' }}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    'Confirmar Asistencia'
                                )}
                            </Button>
                        </form>
                    )}
                </div>

                {/* --- Interactive Guestbook Section --- */}
                {invitation.showGuestbook !== false && (
                    <div className="p-8 bg-gray-50/30 border-t border-gray-100 pb-24">
                        <Guestbook 
                            invitationId={invitation.id} 
                            accentColor={invitation.colors.accent} 
                            isAdmin={currentUser?.email === 'cuasar9996@gmail.com'}
                        />
                    </div>
                )}

                {/* --- Referral Footer --- */}
                <div className="p-8 pb-32 text-center bg-white">
                    <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Hecho con amor en</p>
                        <a 
                            href="/" 
                            target="_blank" 
                            className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all"
                        >
                            <img src="/logo-papel-crepe.png" alt="Papel Crepé" className="h-5 w-auto" />
                            <span className="text-sm font-black tracking-tighter text-gray-800">Papel Crepé</span>
                        </a>
                        <p className="text-[9px] text-gray-400 mt-1 max-w-[200px] mx-auto leading-tight">
                            Crea tu propia invitación digital premium en papelcrepe.com.ar
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Sticky RSVP Button for Mobile - Inspired by user's HTML */}
            {!hasRsvpd && (
                <div className="fixed bottom-6 left-4 right-4 z-50 pointer-events-none sm:hidden flex justify-center">
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        className="pointer-events-auto w-full max-w-sm"
                    >
                        <Button
                            className="w-full h-14 shadow-2xl rounded-2xl font-bold flex items-center justify-center gap-2 group"
                            style={{ backgroundColor: invitation.colors.accent, color: '#FFFFFF' }}
                            onClick={() => {
                                document.getElementById('rsvp-section')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            ¡Confirmar Ahora!
                            <span className="material-symbols-outlined animation-bounce">celebration</span>
                        </Button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
