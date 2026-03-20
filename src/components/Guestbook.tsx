'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Image as ImageIcon, X, Heart, Star, PartyPopper, Trash2, Camera, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { GuestbookMessage } from '@/types';
import { supabase } from '@/lib/supabase';
import { compressImage } from '@/lib/utils/image-optimization';

interface GuestbookProps {
  invitationId: string;
  accentColor: string;
  isAdmin?: boolean;
}

export function Guestbook({ invitationId, accentColor, isAdmin = false }: GuestbookProps) {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('✨');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emojis = ['✨', '❤️', '🎉', '🥂', '🔥', '💖', '🎊', '🎈', '🧸', '🌸'];

  useEffect(() => {
    fetchMessages();
    
    // Subscribe to new messages
    const channel = supabase
      .channel(`guestbook-${invitationId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'guestbook_messages',
        filter: `invitation_id=eq.${invitationId}`
      }, (payload) => {
        const newMessage = payload.new as any;
        setMessages(prev => [{
          id: newMessage.id,
          invitationId: newMessage.invitation_id,
          guestName: newMessage.guest_name,
          message: newMessage.message,
          imageUrl: newMessage.image_url,
          emoji: newMessage.emoji,
          createdAt: newMessage.created_at
        }, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [invitationId]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook_messages')
        .select('*')
        .eq('invitation_id', invitationId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMessages((data || []).map(m => ({
        id: m.id,
        invitationId: m.invitation_id,
        guestName: m.guest_name,
        message: m.message,
        imageUrl: m.image_url,
        emoji: m.emoji,
        createdAt: m.created_at
      })));
    } catch (e) {
      console.error('Error fetching guestbook:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La foto debe ser menor a 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        try {
          // Comprimimos la imagen para que no pese en la base de datos/localstorage
          const compressed = await compressImage(base64, 1024, 1024, 0.7);
          setImageUrl(compressed);
        } catch (error) {
          console.error('Error comprimiendo imagen:', error);
          setImageUrl(base64); // Fallback al original si falla
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !message.trim()) {
      toast.error('Por favor completa tu nombre y mensaje');
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase
        .from('guestbook_messages')
        .insert({
          invitation_id: invitationId,
          guest_name: guestName,
          message: message,
          image_url: imageUrl,
          emoji: selectedEmoji
        });

      if (error) throw error;

      setGuestName('');
      setMessage('');
      setImageUrl(null);
      toast.success('¡Mensaje enviado al muro!');
    } catch (e) {
      console.error('Error sending message:', e);
      toast.error('No se pudo enviar el mensaje');
    } finally {
      setSending(false);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('guestbook_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;
      
      setMessages(prev => prev.filter(m => m.id !== messageId));
      toast.success('Mensaje eliminado');
    } catch (e) {
      console.error('Error deleting message:', e);
      toast.error('No se pudo eliminar el mensaje');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
        <MessageSquare className="w-5 h-5" style={{ color: accentColor }} />
        <h3 className="font-black uppercase tracking-tighter text-gray-800">Muro de Mensajes</h3>
      </div>

      {/* Form Section */}
      <div className="bg-gray-50/50 p-4 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Tu nombre"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="bg-white rounded-xl border-gray-100 h-10 font-medium"
            />
            <Textarea
              placeholder="Deja un mensaje con buena onda... ✨"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white rounded-xl border-gray-100 min-h-[100px] resize-none font-medium"
            />
          </div>

          {/* Emoji Selector */}
          <div className="flex flex-wrap gap-2">
            {emojis.map(emoji => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedEmoji(emoji)}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                  selectedEmoji === emoji ? 'bg-white scale-125 shadow-md border border-gray-100' : 'opacity-50 hover:opacity-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Image Preview */}
          <AnimatePresence>
            {imageUrl && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-white shadow-lg"
              >
                <img src={imageUrl} className="w-full h-full object-cover" alt="Preview" />
                <button 
                  type="button"
                  onClick={() => setImageUrl(null)}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2 w-full">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageUpload}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl border-gray-200 h-10 flex-1 gap-1.5 text-gray-600 hover:bg-white text-xs"
            >
              <Camera className="w-4 h-4 shrink-0" />
              <span className="truncate">{imageUrl ? 'Cambiar Foto' : 'Subir Foto'}</span>
            </Button>
            <Button
              type="submit"
              disabled={sending}
              className="rounded-xl h-10 px-5 font-bold shadow-md shrink-0 text-xs"
              style={{ backgroundColor: accentColor, color: '#FFFFFF' }}
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <>
                  <span>Enviar</span>
                  <Send className="w-3.5 h-3.5 ml-1.5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Messages Feed */}
      <div className="space-y-6">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-gray-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-sm font-medium">Cargando el muro...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm font-medium">¡Sé el primero en dejar un mensaje!</p>
          </div>
        ) : (
          messages.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm space-y-3 relative group overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-lg">
                    {m.emoji}
                  </div>
                  <div>
                    <h4 className="font-black text-gray-800 text-sm leading-none">{m.guestName}</h4>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {new Date(m.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
                
                {/* Delete button (Restricted to host/admin) */}
                {isAdmin && (
                  <button 
                    onClick={() => deleteMessage(m.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all"
                    title="Eliminar mensaje"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">{m.message}</p>

              {m.imageUrl && (
                <div className="mt-3 rounded-2xl overflow-hidden border border-gray-50 shadow-inner">
                  <img src={m.imageUrl} className="w-full object-cover max-h-64" alt="Post" />
                </div>
              )}

              {/* Decorative accent top right */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-rose-50 to-transparent -rotate-45 translate-x-12 -translate-y-12 transition-transform group-hover:translate-x-10 group-hover:-translate-y-10" />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
