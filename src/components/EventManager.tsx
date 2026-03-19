'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  UserPlus,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Mail,
  Phone,
  TrendingUp,
  Calendar,
  Eye,
  CreditCard as CardIcon
} from 'lucide-react';
import { Invitation, Guest } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { guestsApi } from '@/lib/api';
import { fonts } from '@/data/templates';
import { EventCountdown } from '@/components/EventCountdown';
import { PreviewModal } from '@/components/PreviewModal';

interface EventManagerProps {
  invitation: Invitation;
  onBack: () => void;
}

// Component
export function EventManager({ invitation, onBack }: EventManagerProps) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadGuests = async () => {
      try {
        const cloudGuests = await guestsApi.getAll(invitation.id);
        setGuests(cloudGuests);
      } catch (e) {
        toast.error('Error al cargar invitados');
      } finally {
        setLoading(false);
      }
    };
    loadGuests();
  }, [invitation.id]);

  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: '',
    plusOnes: 0,
    notes: ''
  });

  const saveGuests = async (updatedGuests: Guest[]) => {
    try {
      await guestsApi.saveAll(invitation.id, updatedGuests);
      setGuests(updatedGuests);
    } catch (e) {
      toast.error('Error al sincronizar con la nube');
    }
  };

  const addGuest = () => {
    if (!newGuest.name.trim()) {
      toast.error('El nombre del invitado es requerido');
      return;
    }

    const guest: Guest = {
      id: uuidv4(),
      invitationId: invitation.id,
      name: newGuest.name,
      email: newGuest.email,
      phone: newGuest.phone,
      status: 'pending',
      plusOnes: newGuest.plusOnes,
      notes: newGuest.notes,
      createdAt: new Date().toISOString()
    };

    const updatedGuests = [...guests, guest];
    saveGuests(updatedGuests);
    setNewGuest({ name: '', email: '', phone: '', plusOnes: 0, notes: '' });
    toast.success('Invitado agregado correctamente');
  };

  const updateGuestStatus = (guestId: string, status: Guest['status']) => {
    const updatedGuests = guests.map(g =>
      g.id === guestId ? { ...g, status } : g
    );
    saveGuests(updatedGuests);
    toast.success('Estado actualizado');
  };

  const removeGuest = (guestId: string) => {
    const updatedGuests = guests.filter(g => g.id !== guestId);
    saveGuests(updatedGuests);
    toast.success('Invitado eliminado');
  };

  // Calculate stats
  const stats = {
    total: guests.length,
    confirmed: guests.filter(g => g.status === 'confirmed').length,
    pending: guests.filter(g => g.status === 'pending').length,
    declined: guests.filter(g => g.status === 'declined').length,
    totalPlusOnes: guests.reduce((acc, g) => acc + g.plusOnes, 0)
  };

  const statusConfig = {
    pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    confirmed: { label: 'Confirmado', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    declined: { label: 'Rechazado', color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  const currentFont = fonts.find(f => f.name === invitation.font) || fonts[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Gestión del Evento</h1>
              <p className="text-sm text-gray-500">{invitation.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[350px_1fr] gap-6">
          {/* Left Panel */}
          <div className="space-y-6">
            {/* Event Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Información del Evento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Título:</span>
                  <span className="font-medium">{invitation.title}</span>
                </div>
                {invitation.eventDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fecha:</span>
                    <span className="font-medium">
                      {new Date(invitation.eventDate + 'T00:00:00').toLocaleDateString('es-ES')}
                    </span>
                  </div>
                )}
                {invitation.eventTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hora:</span>
                    <span className="font-medium">{invitation.eventTime}</span>
                  </div>
                )}
                {invitation.location && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Ubicación:</span>
                    <span className="font-medium text-right max-w-[180px] truncate">{invitation.location}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-gradient-to-br from-purple-50 to-rose-50 border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Estadísticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
                    <div className="text-xs text-gray-500">Total invitados</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
                    <div className="text-xs text-gray-500">Confirmados</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    <div className="text-xs text-gray-500">Pendientes</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <div className="text-2xl font-bold text-red-600">{stats.declined}</div>
                    <div className="text-xs text-gray-500">Rechazados</div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {stats.confirmed + stats.totalPlusOnes}
                  </div>
                  <div className="text-xs text-gray-500">Total de asistentes esperados</div>
                </div>
              </CardContent>
            </Card>

            {/* Design Preview Card */}
            <Card className="overflow-hidden border-rose-100 bg-rose-50/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4 text-rose-500" />
                  Vista del Diseño
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="aspect-[3/4] w-full rounded-lg shadow-lg overflow-hidden relative flex flex-col items-center justify-center text-center p-4"
                  style={{
                    backgroundColor: invitation.colors.background,
                    backgroundImage: invitation.backgroundImage ? `url(${invitation.backgroundImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black/20" />

                  <div className="relative z-10">
                    <h3
                      className="text-lg font-bold mb-1 line-clamp-2"
                      style={{ color: invitation.colors.text, fontFamily: currentFont.family }}
                    >
                      {invitation.title}
                    </h3>
                    <p className="text-[10px] opacity-80 uppercase tracking-widest mb-2" style={{ color: invitation.colors.text }}>
                      {invitation.eventDate ? new Date(invitation.eventDate + 'T00:00:00').toLocaleDateString('es-ES', { month: 'long', day: 'numeric' }) : ''}
                    </p>
                    <div className="w-full scale-75 origin-center">
                      <EventCountdown
                        targetDate={invitation.eventDate || ''}
                        targetTime={invitation.eventTime}
                        color={invitation.colors.accent}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <p className="text-[10px] text-gray-500 italic text-center">Este es el diseño que ven tus invitados</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs gap-1.5 h-9 border-rose-200 text-rose-600 hover:bg-rose-50"
                    onClick={() => setShowPreview(true)}
                  >
                    <Eye className="w-4 h-4" />
                    Ver Invitación Completa
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Add Guest Form */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Agregar Invitado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="guestName">Nombre *</Label>
                  <Input
                    id="guestName"
                    value={newGuest.name}
                    onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                    placeholder="Nombre del invitado"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestEmail">Email</Label>
                  <Input
                    id="guestEmail"
                    type="email"
                    value={newGuest.email}
                    onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestPhone">Teléfono</Label>
                  <Input
                    id="guestPhone"
                    value={newGuest.phone}
                    onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plusOnes">Acompañantes</Label>
                  <Input
                    id="plusOnes"
                    type="number"
                    min="0"
                    value={newGuest.plusOnes}
                    onChange={(e) => setNewGuest({ ...newGuest, plusOnes: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <Button className="w-full" onClick={addGuest}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Agregar Invitado
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Guest List */}
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Lista de Invitados ({guests.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {guests.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>No hay invitados todavía</p>
                  <p className="text-sm">Agrega invitados usando el formulario</p>
                </div>
              ) : (
                <ScrollArea className="max-h-[500px] pr-4">
                  <div className="space-y-3">
                    {guests.map((guest, index) => {
                      const StatusIcon = statusConfig[guest.status].icon;
                      return (
                        <motion.div
                          key={guest.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start justify-between p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{guest.name}</span>
                              {guest.plusOnes > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{guest.plusOnes} acompañantes
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              {guest.email && (
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {guest.email}
                                </span>
                              )}
                              {guest.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {guest.phone}
                                </span>
                              )}
                            </div>
                            {guest.notes && (
                              <p className="text-xs text-gray-400 mt-1">{guest.notes}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Select
                              value={guest.status}
                              onValueChange={(value) => updateGuestStatus(guest.id, value as Guest['status'])}
                            >
                              <SelectTrigger className="w-32 h-8">
                                <Badge className={statusConfig[guest.status].color}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {statusConfig[guest.status].label}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-yellow-600" />
                                    Pendiente
                                  </div>
                                </SelectItem>
                                <SelectItem value="confirmed">
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    Confirmado
                                  </div>
                                </SelectItem>
                                <SelectItem value="declined">
                                  <div className="flex items-center gap-2">
                                    <XCircle className="w-4 h-4 text-red-600" />
                                    Rechazado
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeGuest(guest.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <PreviewModal
        invitation={invitation}
        open={showPreview}
        onClose={() => setShowPreview(false)}
        onManageEvent={() => setShowPreview(false)}
      />
    </div>
  );
}
