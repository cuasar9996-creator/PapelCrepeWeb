'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Search, Filter, Plus, Clock, Users,
  MapPin, Share2, Edit2, Trash2, Copy, Eye,
  ChevronDown, Sparkles, PartyPopper, Heart, Baby,
  GraduationCap, Briefcase, Church, HeartHandshake,
  Settings, Trophy, Tent, Footprints, Utensils,
  Film, Theater, Anchor, ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Invitation, EventCategory } from '@/types';
import type { User } from '@/lib/auth';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface DashboardProps {
  user: User;
  invitations: Invitation[];
  onCreateNew: (type?: 'standard' | 'premium') => void;
  onEdit: (invitation: Invitation) => void;
  onDelete: (id: string) => void;
  onPreview: (invitation: Invitation) => void;
  onManage: (invitation: Invitation) => void;
  onBack?: () => void;
}

const categoryIcons: Record<EventCategory, React.ReactNode> = {
  birthday: <PartyPopper className="w-4 h-4" />,
  wedding: <Heart className="w-4 h-4" />,
  'baby-shower': <Baby className="w-4 h-4" />,
  baptism: <Church className="w-4 h-4" />,
  anniversary: <HeartHandshake className="w-4 h-4" />,
  graduation: <GraduationCap className="w-4 h-4" />,
  corporate: <Briefcase className="w-4 h-4" />,
  sports: <Trophy className="w-4 h-4" />,
  camping: <Tent className="w-4 h-4" />,
  hikes: <Footprints className="w-4 h-4" />,
  dinner: <Utensils className="w-4 h-4" />,
  cinema: <Film className="w-4 h-4" />,
  theater: <Theater className="w-4 h-4" />,
  fishing: <Anchor className="w-4 h-4" />,
  quinceanera: <Heart className="w-4 h-4" />,
  communion: <Church className="w-4 h-4" />,
  eighteenth: <PartyPopper className="w-4 h-4" />,
  corazon: <Heart className="w-4 h-4" />,
  other: <Sparkles className="w-4 h-4" />,
};

const categoryNames: Record<EventCategory, string> = {
  birthday: 'Cumpleaños',
  wedding: 'Bodas',
  'baby-shower': 'Baby Shower',
  baptism: 'Bautismos',
  anniversary: 'Aniversarios',
  graduation: 'Graduaciones',
  corporate: 'Corporativos',
  sports: 'Deportes',
  camping: 'Camping',
  hikes: 'Excursiones',
  dinner: 'Cena/Comida',
  cinema: 'Cine',
  theater: 'Teatro',
  fishing: 'Pesca',
  quinceanera: 'Quinceañeras',
  communion: 'Comuniones',
  eighteenth: '18 Años',
  corazon: 'Para Dedicar',
  other: 'Otros',
};

const categoryColors: Record<EventCategory, string> = {
  birthday: 'from-pink-500 to-rose-500',
  wedding: 'from-rose-400 to-pink-500',
  'baby-shower': 'from-blue-400 to-cyan-400',
  baptism: 'from-purple-400 to-indigo-400',
  anniversary: 'from-red-400 to-rose-500',
  graduation: 'from-indigo-500 to-purple-500',
  corporate: 'from-slate-500 to-gray-600',
  sports: 'from-green-500 to-emerald-600',
  camping: 'from-orange-500 to-amber-600',
  hikes: 'from-lime-500 to-green-600',
  dinner: 'from-red-400 to-orange-500',
  cinema: 'from-blue-600 to-indigo-700',
  theater: 'from-purple-600 to-pink-700',
  fishing: 'from-cyan-500 to-blue-600',
  quinceanera: 'from-pink-400 to-purple-500',
  communion: 'from-blue-200 to-indigo-300',
  eighteenth: 'from-blue-500 to-indigo-600',
  corazon: 'from-pink-500 to-red-600',
  other: 'from-amber-400 to-orange-400',
};

export function Dashboard({
  user,
  invitations,
  onCreateNew,
  onEdit,
  onDelete,
  onPreview,
  onManage,
  onBack
}: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<EventCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'created'>('created');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredInvitations = useMemo(() => {
    let filtered = [...invitations];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(inv =>
        inv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(inv => inv.category === filterCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.eventDate || 0).getTime() - new Date(b.eventDate || 0).getTime();
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return filtered;
  }, [invitations, searchTerm, filterCategory, sortBy]);

  const stats = useMemo(() => {
    const totalEvents = invitations.length;
    const upcoming = invitations.filter(inv => {
      const eventDate = inv.eventDate ? new Date(inv.eventDate) : null;
      return eventDate && eventDate > new Date();
    }).length;
    const totalGuests = invitations.reduce((sum, inv) => sum + (inv.guestCount || 0), 0);

    return { totalEvents, upcoming, totalGuests };
  }, [invitations]);

  const handleDuplicate = (invitation: Invitation) => {
    toast.success('Invitación duplicada (función simulada)');
  };

  const handleShare = (invitation: Invitation) => {
    onPreview(invitation);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  ¡Hola, {user.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-gray-500 text-sm">
                  Gestiona tus invitaciones e invitados
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => onCreateNew('standard')}
                className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tarjeta Digital (Fija)
              </Button>
              <Button
                onClick={() => onCreateNew('premium')}
                className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 shadow-lg shadow-rose-500/25 border-none"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Experiencia Pro (Video)
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-100 rounded-lg">
                <Calendar className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEvents}</p>
                <p className="text-sm text-gray-500">Eventos creados</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.upcoming}</p>
                <p className="text-sm text-gray-500">Próximos eventos</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalGuests}</p>
                <p className="text-sm text-gray-500">Invitados totales</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as EventCategory | 'all')}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="all">Todas las categorías</option>
                {Object.entries(categoryNames).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'created')}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="created">Más recientes</option>
                <option value="date">Por fecha</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredInvitations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {invitations.length === 0 ? '¡Aún no tienes eventos!' : 'No se encontraron eventos'}
            </h3>
            <p className="text-gray-500 mb-6">
              {invitations.length === 0
                ? 'Crea tu primera invitación y sorprende a tus invitados'
                : 'Intenta con otros filtros de búsqueda'}
            </p>
            {invitations.length === 0 && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => onCreateNew('standard')}
                  variant="outline"
                  className="border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Tarjeta Digital
                </Button>
                <Button
                  onClick={() => onCreateNew('premium')}
                  className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Crear Experiencia Pro (Video)
                </Button>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvitations.map((invitation, index) => (
              <motion.div
                key={invitation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Preview */}
                <div
                  className={`h-40 bg-gradient-to-br ${categoryColors[invitation.category]} p-4 relative`}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative h-full flex flex-col justify-end text-white">
                    <div className="flex items-center gap-2 mb-1">
                      {categoryIcons[invitation.category]}
                      <span className="text-xs font-medium opacity-90">
                        {categoryNames[invitation.category]}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold truncate">{invitation.title}</h3>
                  </div>

                  {/* Quick actions */}
                  <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onPreview(invitation)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      title="Vista previa"
                    >
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => onEdit(invitation)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4">
                  <div className="space-y-2 text-sm text-gray-600">
                    {invitation.eventDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(invitation.eventDate).toLocaleDateString('es-ES', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}</span>
                      </div>
                    )}
                    {invitation.eventTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{invitation.eventTime}</span>
                      </div>
                    )}
                    {invitation.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{invitation.location}</span>
                      </div>
                    )}
                    {invitation.guestCount !== undefined && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className={invitation.guestCount > 0 ? "text-green-600 font-medium" : ""}>
                          {invitation.guestCount} {invitation.guestCount === 1 ? 'confirmado' : 'confirmados'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleShare(invitation)}
                        className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Enviar Invitación"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onManage(invitation)}
                        className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Gestionar Invitados"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(invitation.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onPreview(invitation)}
                        className="text-gray-600 hover:text-gray-800 border-gray-200"
                      >
                        Ver
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEdit(invitation)}
                        className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                      >
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Dialog de Confirmación de Eliminación */}
        <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>¿Eliminar invitación?</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer. Se eliminarán todos los datos del evento y la lista de invitados para siempre.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 sm:flex-none"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (deleteConfirmId) {
                    onDelete(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }
                }}
                className="flex-1 sm:flex-none"
              >
                Eliminar para siempre
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div >
  );
}
