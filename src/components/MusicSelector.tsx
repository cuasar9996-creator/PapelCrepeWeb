'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, Upload, Sparkles, Heart, PartyPopper, Baby, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export interface MusicTrack {
  id: string;
  name: string;
  category: string;
  duration: string;
  emoji: string;
  // Using placeholder URLs for demo - in production these would be real audio files
  url?: string;
}

export const DEMO_TRACKS: MusicTrack[] = [
  // --- ELEGANCIA & GALA ---
  { id: '1', name: 'Destellos de Luna', category: 'Elegancia & Gala', duration: '3:20', emoji: '✨', url: '/audio/cancion1.mp3' },
  { id: '2', name: 'Amanecer Dorado', category: 'Elegancia & Gala', duration: '2:45', emoji: '🌅', url: '/audio/cancion2.mp3' },
  { id: '3', name: 'Brisa de Verano', category: 'Elegancia & Gala', duration: '3:10', emoji: '🍃', url: '/audio/cancion3.mp3' },
  { id: '4', name: 'Armonía de Seda', category: 'Elegancia & Gala', duration: '4:05', emoji: '🎻', url: '/audio/cancion4.mp3' },
  { id: '5', name: 'Cielo Infinito', category: 'Elegancia & Gala', duration: '2:50', emoji: '☁️', url: '/audio/cancion5.mp3' },
  { id: '6', name: 'Misterio Nocturno', category: 'Elegancia & Gala', duration: '3:15', emoji: '🌙', url: '/audio/cancion6.mp3' },
  { id: '7', name: 'Reflejos Eternos', category: 'Elegancia & Gala', duration: '2:30', emoji: '💎', url: '/audio/cancion7.mp3' },
  { id: 'gen16', name: 'Clásico de Piano', category: 'Elegancia & Gala', duration: '3:30', emoji: '🎹', url: '/audio/Richard  Clayderman  -  Para Elisa...(Beethoven).mp3' },
  { id: 'gen17', name: 'Melodía Azul', category: 'Elegancia & Gala', duration: '3:00', emoji: '🎺', url: '/audio/Paul Mauriat - Love Is Blue - A True Extended Cut of The Most Beautiful Song In The World.mp3' },
  { id: 'gen18', name: 'Flauta Clásica', category: 'Elegancia & Gala', duration: '2:40', emoji: '🪈', url: '/audio/MUSICA DE FLAUTA (Sin Copyright) #51 [Instrumental y Clásica].mp3' },
  { id: 'gen19', name: 'Guitarra Acústica', category: 'Elegancia & Gala', duration: '3:15', emoji: '🎸', url: '/audio/MUSICA DE GUITARRA (Sin Copyright) #41  [Instrumental y Acústica].mp3' },

  // --- MODERNO & 18 AÑOS ---
  { id: '8', name: 'Urban Pulse', category: 'Moderno & 18 Años', duration: '2:45', emoji: '⚡', url: '/audio/cancion8.mp3' },
  { id: '9', name: 'Dream Pop Mood', category: 'Moderno & 18 Años', duration: '3:00', emoji: '🎵', url: '/audio/musica9.mp3' },
  { id: '10', name: 'Midnight Vibes', category: 'Moderno & 18 Años', duration: '2:55', emoji: '🌃', url: '/audio/musica 10.mp3' },
  { id: '11', name: 'Electric Love', category: 'Moderno & 18 Años', duration: '3:30', emoji: '🔥', url: '/audio/musica11.mp3' },
  { id: '12', name: 'Skyline Rhythm', category: 'Moderno & 18 Años', duration: '2:40', emoji: '🌆', url: '/audio/musica12.mp3' },
  { id: '13', name: 'Neon Lights', category: 'Moderno & 18 Años', duration: '2:15', emoji: '🌈', url: '/audio/musica 13.mp3' },
  { id: '14', name: 'City Beats', category: 'Moderno & 18 Años', duration: '1:50', emoji: '🎧', url: '/audio/musica14.mp3' },
  { id: '15', name: 'Estela Digital', category: 'Moderno & 18 Años', duration: '3:05', emoji: '🚀', url: '/audio/musica15.mp3' },
  { id: 'gen21', name: 'Rock Energético', category: 'Moderno & 18 Años', duration: '3:00', emoji: '🤘', url: '/audio/MUSICA ROCK (Sin Copyright) #37 [Instrumental Para YouTube].mp3' },
  { id: 'gen23', name: 'Electro Swing Fun', category: 'Moderno & 18 Años', duration: '3:45', emoji: '💃', url: '/audio/Steven Universe - Other Friends [Electro Swing Instrumental]  MÚSICA SIN COPYRIGH - NCM.mp3' },

  // --- Bodas y Romántico ---
  { id: 'boda1', name: 'Ave María (Clásico)', category: 'Bodas', duration: '3:00', emoji: '⛪', url: '/audio/ave_maria.mp3' },
  { id: 'boda2', name: 'Marcha Nupcial Real', category: 'Bodas', duration: '2:30', emoji: '💍', url: '/audio/marcha_nupcial.mp3' },
  { id: 'boda3', name: 'Gran Vals de Gala', category: 'Bodas', duration: '3:10', emoji: '💃', url: '/audio/vals_clasico.mp3' },
  { id: 'boda4', name: 'Vals de los Enamorados', category: 'Bodas', duration: '2:50', emoji: '🎻', url: '/audio/vals_instrumental.mp3' },
  { id: 'boda5', name: 'Celebración de Unión', category: 'Bodas', duration: '3:20', emoji: '🌸', url: '/audio/boda.mp3' },
  { id: 'boda6', name: 'Promesa de Amor', category: 'Bodas', duration: '3:00', emoji: '🎶', url: '/audio/boda_instrumental.mp3' },
  { id: 'boda7', name: 'Nuestra Historia', category: 'Bodas', duration: '3:45', emoji: '❤️', url: '/audio/historia_amor.mp3' },
  { id: 'boda8', name: 'Esencia de Amor', category: 'Bodas', duration: '3:00', emoji: '💕', url: '/audio/debe ser amor.mp3' },
  { id: 'boda9', name: 'Bajo las Estrellas', category: 'Bodas', duration: '3:30', emoji: '✨', url: '/audio/noche_magica.mp3' },
  { id: 'boda10', name: 'Canon Eterno', category: 'Bodas', duration: '4:00', emoji: '🎵', url: '/audio/canon_d.mp3' },
  { id: 'boda11', name: 'Vientos de Oro', category: 'Bodas', duration: '2:55', emoji: '🎼', url: '/audio/clash_instrumental.mp3' },
  { id: 'boda12', name: 'El Danubio (Vals Real)', category: 'Bodas', duration: '3:50', emoji: '🎻', url: '/audio/El Danubio Azul (Vals).mp3' },

  // --- Fiestas & Ritmo ---
  { id: 'fiesta1', name: 'Party Mix Original', category: 'Fiesta & Ritmo', duration: '3:10', emoji: '🎉', url: '/audio/fiesta.mp3' },
  { id: 'fiesta2', name: 'Energía de Noche', category: 'Fiesta & Ritmo', duration: '2:45', emoji: '🕺', url: '/audio/fiesta_upbeat.mp3' },
  { id: 'fiesta3', name: 'Ritmo del Corazón', category: 'Fiesta & Ritmo', duration: '2:30', emoji: '🎊', url: '/audio/fiesta_instrumental.mp3' },
  { id: 'fiesta4', name: 'Cumpleaños Feliz Pro', category: 'Fiesta & Ritmo', duration: '2:00', emoji: '🎂', url: '/audio/cumpleanos.mp3' },
  { id: 'fiesta5', name: 'Noche de Quince', category: 'Fiesta & Ritmo', duration: '3:00', emoji: '💃', url: '/audio/quince.mp3' },
  { id: 'fiesta6', name: 'Alegre Despertar', category: 'Fiesta & Ritmo', duration: '2:50', emoji: '😊', url: '/audio/MUSICA DE FONDO ALEGRE (Sin Copyright) #32.mp3' },
  { id: 'fiesta7', name: 'Fiesta Perseya', category: 'Fiesta & Ritmo', duration: '3:10', emoji: '🕺', url: '/audio/Música de fiesta sin copyright, Perseya Music (Vlog No Copyright Music FREE).mp3' },

  // --- Momentos Tiernos ---
  { id: 'bebe1', name: 'Dulce Cuna', category: 'Momentos Tiernos', duration: '2:30', emoji: '👶', url: '/audio/cuna_bebe.mp3' },
  { id: 'bebe2', name: 'Nube de Algodón', category: 'Momentos Tiernos', duration: '2:45', emoji: '🍼', url: '/audio/cuna_instrumental.mp3' },
  { id: 'bebe3', name: 'Jigsaw Puzzle', category: 'Momentos Tiernos', duration: '2:15', emoji: '🧩', url: '/audio/Música Infantil sin Copyright- Jisaw Puzzle-.mp3' },

  // --- 💌 MENSAJES DEL CORAZÓN (Tus Creaciones Suno Pro) ---
  { id: 'cor1', name: 'Espejo Roto', category: 'Mensajes del Corazón', duration: '3:20', emoji: '💔', url: '/audio/Espejo Roto (1).mp3' },
  { id: 'cor2', name: 'Fantasma', category: 'Mensajes del Corazón', duration: '3:05', emoji: '👻', url: '/audio/Fantasma (1).mp3' },
  { id: 'cor3', name: 'Lo Guardé', category: 'Mensajes del Corazón', duration: '2:55', emoji: '🤫', url: '/audio/Lo Guarde.mp3' },
  { id: 'cor4', name: 'Malos Entendidos', category: 'Mensajes del Corazón', duration: '3:10', emoji: '🥺', url: '/audio/Malos Entendidos.mp3' },
  { id: 'cor5', name: 'No Lo Merecías', category: 'Mensajes del Corazón', duration: '3:00', emoji: '😤', url: '/audio/No Lo Merecías.mp3' },
  { id: 'cor6', name: 'Te Debo Dejar Ir', category: 'Mensajes del Corazón', duration: '3:30', emoji: '🌧️', url: '/audio/Te debo dejar ir.mp3' },
  { id: 'cor7', name: 'Tus Ojos Ya No Brillan', category: 'Mensajes del Corazón', duration: '3:15', emoji: '😢', url: '/audio/Tus Ojos Ya No Brillan.mp3' },
  { id: 'cor8', name: 'Ya No Es Lo Mismo', category: 'Mensajes del Corazón', duration: '2:50', emoji: '🍂', url: '/audio/Ya No Es Lo Mismo.mp3' },
  { id: 'cor9', name: 'Lo que vamos a hacer', category: 'Mensajes del Corazón', duration: '3:00', emoji: '🤔', url: '/audio/Decide Tú.mp3' },
  { id: 'cor10', name: 'Desconexión', category: 'Mensajes del Corazón', duration: '2:45', emoji: '📵', url: '/audio/Desconexión .mp3' },
  { id: 'cor11', name: 'El Mismo de Siempre', category: 'Mensajes del Corazón', duration: '3:20', emoji: '🔄', url: '/audio/El Mismo de Siempre.mp3' },
  { id: 'cor12', name: 'Eso No Pasó', category: 'Mensajes del Corazón', duration: '3:05', emoji: '🙅', url: '/audio/Eso No Paso2.m4a' },
  { id: 'cor13', name: 'La Misma Historia', category: 'Mensajes del Corazón', duration: '2:55', emoji: '📖', url: '/audio/La Misma Historia.m4a' },
  { id: 'cor14', name: 'Me Fui', category: 'Mensajes del Corazón', duration: '3:10', emoji: '🚶', url: '/audio/Me Fui.m4a' },
  { id: 'cor15', name: 'Separarnos', category: 'Mensajes del Corazón', duration: '3:20', emoji: '💔', url: '/audio/Separarnos.m4a' },
];

// Maps event category to the best matching music category
const CATEGORY_MUSIC_MAP: Record<string, string> = {
  'wedding': 'Bodas',
  'anniversary': 'Bodas',
  'baby-shower': 'Momentos Tiernos',
  'baptism': 'Elegancia & Gala',
  'birthday': 'Fiesta & Ritmo',
  'quinceanera': 'Fiesta & Ritmo',
  'eighteenth': 'Moderno & 18 Años',
  'corazon': 'Mensajes del Corazón',
  'graduation': 'Moderno & 18 Años',
  'corporate': 'Elegancia & Gala',
  'mothers-day': 'Elegancia & Gala',
  'fathers-day': 'Elegancia & Gala',
  'godparents': 'Momentos Tiernos',
};

interface MusicSelectorProps {
  selectedTrack: MusicTrack | null;
  onTrackSelect: (track: MusicTrack | null) => void;
  autoPlay: boolean;
  onAutoPlayChange: (autoPlay: boolean) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  suggestedCategory?: string;
}

export function MusicSelector({
  selectedTrack,
  onTrackSelect,
  autoPlay,
  onAutoPlayChange,
  volume,
  onVolumeChange,
  suggestedCategory,
}: MusicSelectorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const mappedCategory = suggestedCategory ? (CATEGORY_MUSIC_MAP[suggestedCategory] || 'all') : 'all';
  const [filter, setFilter] = useState<string>(mappedCategory);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // initialize audio on mount
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const categories = ['all', ...new Set(DEMO_TRACKS.map(t => t.category))];

  const filteredTracks = filter === 'all'
    ? DEMO_TRACKS
    : DEMO_TRACKS.filter(t => t.category === filter);

  // Play actual audio track
  const handlePlayTrack = (track: MusicTrack) => {
    if (!audioRef.current) return;

    if (currentPlayingId === track.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentPlayingId(null);
      toast.info('Reproducción pausada');
    } else {
      audioRef.current.pause(); // stop previous

      if (track.url) {
        audioRef.current.src = track.url;
      } else {
        // Fallback for demo tracks without real URL
        audioRef.current.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Generic instrumental fallback
      }

      audioRef.current.play().catch(e => {
        console.error('Audio play error:', e);
        toast.error('No se pudo reproducir el audio. (Puede requerir interacción previa con la página)');
      });

      setIsPlaying(true);
      setCurrentPlayingId(track.id);
      onTrackSelect(track);
      toast.success(`Reproduciendo: ${track.name}`);

      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentPlayingId(null);
      };
    }
  };

  const handleStopAll = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentPlayingId(null);
    onTrackSelect(null);
  };

  return (
    <div className="space-y-4 w-full min-w-0 overflow-hidden">
      {/* Header */}
      {/* Top Actions: Selection + Upload */}
      <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 space-y-3 min-w-0 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-purple-500" />
            <span className="font-bold text-gray-700 text-xs">Música del Evento</span>
          </div>
          {selectedTrack && (
            <Button
              size="sm"
              variant="link"
              onClick={handleStopAll}
              className="text-red-500 h-auto p-0 text-[10px]"
            >
              Quitar
            </Button>
          )}
        </div>

        {selectedTrack ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-2 shadow-sm border border-purple-100 flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-lg text-white shadow-inner shrink-0">
              {selectedTrack.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-xs truncate">{selectedTrack.name}</p>
              <p className="text-[10px] text-gray-500">{selectedTrack.category}</p>
            </div>
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3 px-1">
                <div className="w-0.5 h-2 bg-purple-400 animate-music-bar"></div>
                <div className="w-0.5 h-3 bg-purple-500 animate-music-bar [animation-delay:0.2s]"></div>
                <div className="w-0.5 h-1.5 bg-purple-400 animate-music-bar [animation-delay:0.4s]"></div>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="text-center py-2 bg-purple-50/50 rounded-lg border border-purple-100/50">
            <p className="text-[10px] text-purple-600 font-bold uppercase tracking-tight">Carga tu propia banda sonora:</p>
            <p className="text-[9px] text-gray-400 mt-0.5">MP3, WAV o M4A son compatibles</p>
          </div>
        )}

        <div className="flex flex-col gap-2 items-start">
          <input
            type="file"
            accept="*"
            className="hidden"
            id="music-upload-v4"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const isAudio = file.type.startsWith('audio/') || 
                                file.name.endsWith('.mp3') || 
                                file.name.endsWith('.wav') || 
                                file.name.endsWith('.m4a') ||
                                file.name.endsWith('.ogg');
                
                if (!isAudio) {
                  toast.error('Por favor, selecciona un archivo de música (MP3, WAV, M4A u OGG)');
                  return;
                }
                
                if (file.size > 10 * 1024 * 1024) {
                  toast.error('El archivo debe ser menor a 10MB');
                  return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                  const dataUrl = event.target?.result as string;
                  const newTrack: MusicTrack = {
                    id: 'custom-' + Date.now(),
                    name: file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name,
                    category: 'Mi Música',
                    duration: 'Personal',
                    emoji: '🎶',
                    url: dataUrl
                  };
                  onTrackSelect(newTrack);
                  toast.success('¡Canción cargada con éxito!');
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <Button
            variant="default"
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-10 px-6 text-[11px] w-fit shadow-md shadow-purple-200 transition-all active:scale-95"
            onClick={() => {
              const input = document.getElementById('music-upload-v4');
              if (input) (input as any).value = null;
              input?.click();
            }}
          >
            <Upload className="w-4 h-4 mr-2 shrink-0" />
            <span className="font-bold">SELECCIONAR MP3</span>
          </Button>
        </div>
      </div>

      {/* Auto-play & Volume Settings */}
      <div className="flex items-center gap-2 w-full min-w-0 overflow-hidden">
        {/* Autoplay toggle — fixed width so it never grows */}
        <div className="flex items-center justify-between px-3 h-10 bg-white rounded-lg border border-gray-100 shrink-0 gap-2">
          <Label htmlFor="autoplay" className="text-[10px] font-bold uppercase text-gray-400 cursor-pointer whitespace-nowrap">
            Autoplay
          </Label>
          <Switch
            id="autoplay"
            checked={autoPlay}
            onCheckedChange={onAutoPlayChange}
            className="scale-75"
          />
        </div>

        {/* Volume slider — takes remaining space, clipped */}
        <div className="flex items-center gap-2 px-3 h-10 bg-white rounded-lg border border-gray-100 flex-1 min-w-0 overflow-hidden">
          <Volume2 className="w-3 h-3 text-purple-400 shrink-0" />
          <div className="flex-1 min-w-0 overflow-hidden">
            <Slider
              value={[volume]}
              onValueChange={([value]) => onVolumeChange(value)}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Category selector */}
      <div className="space-y-2 w-full min-w-0">
        <p className="text-[10px] font-bold uppercase text-gray-400 ml-1">O elige un ritmo:</p>
        <div className="w-full overflow-x-auto scrollbar-hide pb-2">
          <div className="flex gap-2 w-max min-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`
                  px-4 py-2 rounded-xl text-xs whitespace-nowrap transition-all font-medium flex-shrink-0
                  ${filter === cat
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-100 hover:border-purple-200'
                  }
                `}
              >
                {cat === 'all' ? 'Ver Todos' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Track list */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {filteredTracks.map((track) => (
          <motion.button
            key={track.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handlePlayTrack(track)}
            className={`
              w-full flex items-center gap-3 p-3 rounded-xl border transition-all
              ${selectedTrack?.id === track.id
                ? 'border-purple-300 bg-purple-50'
                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }
            `}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${selectedTrack?.id === track.id
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-500'
              }
            `}>
              {currentPlayingId === track.id && isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </div>

            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900 text-sm">{track.name}</p>
              <p className="text-xs text-gray-500">{track.category}</p>
            </div>

            <span className="text-xl">{track.emoji}</span>
            <span className="text-xs text-gray-400">{track.duration}</span>
          </motion.button>
        ))}
      </div>

    </div>
  );
}
