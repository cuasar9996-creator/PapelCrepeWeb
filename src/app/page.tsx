'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { CategoryGrid } from '@/components/CategoryGrid';
import { HowItWorks } from '@/components/HowItWorks';
import { TemplateGallery } from '@/components/TemplateGallery';
import { InvitationEditor } from '@/components/InvitationEditor';
import { PreviewModal } from '@/components/PreviewModal';
import { EventManager } from '@/components/EventManager';
import { AuthModal } from '@/components/AuthModal';
import { UserMenu } from '@/components/UserMenu';
import { Dashboard } from '@/components/Dashboard';
import { ProfileModal } from '@/components/ProfileModal';
import { PublicInvitation } from '@/components/PublicInvitation';
import { ContactModal } from '@/components/ContactModal';
import { EventCategory, Template, Invitation, Guest, ViewMode } from '@/types';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { User, getCurrentUser, logout as authLogout } from '@/lib/auth';
import { invitationsApi, adminApi } from '@/lib/api';
import { MaintenanceMode } from '@/components/MaintenanceMode';
import { 
  Sparkles, 
  Menu, 
  X, 
  Loader2, 
  Facebook, 
  Instagram, 
  Youtube, 
  MessageSquare 
} from 'lucide-react';
import { TikTokIcon } from '@/components/icons/TikTokIcon';
import { Button } from '@/components/ui/button';
import { getCategoryById, categories, templates } from '@/data/templates';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const STORAGE_KEY = 'digital_invitations_data';

interface StoredData {
  events: Record<string, {
    id: string;
    invitationId: string;
    guests: Guest[];
  }>;
  invitations: Record<string, Invitation>;
}

function loadFromStorage(): StoredData {
  if (typeof window === 'undefined') {
    return { events: {}, invitations: {} };
  }
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return { events: {}, invitations: {} };
}

function saveToStorage(data: StoredData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Storage exceeded:', e);
    throw new Error('Imposible guardar. La imagen insertada es demasiado pesada o se ha quedado sin memoria local.');
  }
}

function getInitialInvitation(): Invitation | null {
  if (typeof window === 'undefined') return null;
  const data = loadFromStorage();
  const savedInvitations = Object.values(data.invitations);
  if (savedInvitations.length > 0) {
    return savedInvitations.sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )[0];
  }
  return null;
}

function getAllInvitations(): Invitation[] {
  if (typeof window === 'undefined') return [];
  const data = loadFromStorage();
  const invitations = Object.values(data.invitations);
  return invitations.map(inv => {
    const event = data.events[inv.id];
    // Count only confirmed guests + their plus-ones
    const confirmedCount = event ?
      event.guests.filter(g => g.status === 'confirmed')
        .reduce((sum, g) => sum + 1 + (g.plusOnes || 0), 0)
      : 0;
    return { ...inv, guestCount: confirmedCount };
  });
}

function getInitialUser(): User | null {
  if (typeof window === 'undefined') return null;
  return getCurrentUser();
}

function getInitialInvitations(): Invitation[] {
  if (typeof window === 'undefined') return [];
  return getAllInvitations();
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [currentInvitation, setCurrentInvitation] = useState<Invitation | null>(null);
  const [publicInvitation, setPublicInvitation] = useState<Invitation | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showEventManager, setShowEventManager] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [templateTypeFilter, setTemplateTypeFilter] = useState<'standard' | 'premium' | 'all'>('all');

  useEffect(() => {
    const initApp = async () => {
      // Check for public invitation in URL
      const params = new URLSearchParams(window.location.search);
      const inviteId = params.get('invitation');

      if (inviteId) {
        try {
          const invite = await invitationsApi.getById(inviteId);
          if (invite) {
            setPublicInvitation(invite);
          }
        } catch (e) {
          console.error("Error loading public invite:", e);
        }
      }

      const currentUser = getInitialUser();
      setUser(currentUser);

      // Chequeo de Mantenimiento y Admin
      try {
        const config = await adminApi.getConfig();
        const maintenanceActive = config?.maintenanceMode || false;

        // El admin es ÚNICAMENTE el usuario cuasar9996@gmail.com
        const userIsAdmin = currentUser?.email === 'cuasar9996@gmail.com';
        setIsAdmin(userIsAdmin);

        // Si el sitio está en mantenimiento Y el usuario NO es admin, mostrar pantalla de mantenimiento
        if (maintenanceActive && !userIsAdmin) {
          setIsMaintenance(true);
        } else {
          setIsMaintenance(false);
        }
      } catch (e) {
        console.error("Error checking maintenance:", e);
      }

      if (currentUser) {
        try {
          const userInvites = await invitationsApi.getAll(currentUser.id);
          setInvitations(userInvites);
        } catch (e) {
          console.error("Error loading user invites:", e);
        }
      }

      setIsMounted(true);
    };

    initApp();
  }, []);

  // Refresh invitations list
  const refreshInvitations = async (userId: string) => {
    try {
      const userInvites = await invitationsApi.getAll(userId);
      setInvitations(userInvites);
    } catch (e) {
      console.error("Error refreshing invites:", e);
    }
  };

  if (!isMounted) {
    return <div className="min-h-screen flex items-center justify-center">Cargando aplicación...</div>;
  }

  // If URL has an invitation ID and it exists, render the public RSVP view
  if (publicInvitation) {
    return <PublicInvitation invitation={publicInvitation} />;
  }

  const handleAuth = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    refreshInvitations(authenticatedUser.id);
    toast.success(`¡Bienvenido, ${authenticatedUser.name}!`);
  };

  const handleLogout = () => {
    authLogout();
    setUser(null);
    setViewMode('home');
    toast.info('Sesión cerrada');
  };

  const handleGetStarted = () => {
    if (!user) {
      toast.info('Inicia sesión para comenzar');
      setShowAuthModal(true);
      return;
    }
    window.scrollTo({ top: document.getElementById('categories')?.offsetTop || 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryId: EventCategory) => {
    if (!user) {
      toast.info('Inicia sesión para crear invitaciones');
      setShowAuthModal(true);
      return;
    }
    setSelectedCategory(categoryId);
    setViewMode('templates');
  };

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentInvitation(null);
    setViewMode('editor');
  };

  const handleBackFromTemplates = () => {
    setViewMode('home');
    setSelectedCategory(null);
    setTemplateTypeFilter('all');
  };

  const handleBackFromEditor = () => {
    setViewMode('templates');
    setSelectedTemplate(null);
  };

  const handleSaveInvitation = async (invitation: Invitation) => {
    try {
      const savedId = await invitationsApi.save(invitation, user?.id);
      const updatedInvitation = { ...invitation, id: savedId };
      setCurrentInvitation(updatedInvitation);
      if (user) refreshInvitations(user.id);
      toast.success('¡Invitación guardada en la nube!');
    } catch (e: any) {
      console.error(e);
      toast.error('Error al guardar en la base de datos.');
    }
  };

  const handlePreview = (invitation: Invitation) => {
    setCurrentInvitation(invitation);
    setShowPreview(true);
  };

  const handleManageEvent = () => {
    setShowPreview(false);
    setShowEventManager(true);
  };

  const handleBackFromEventManager = () => {
    setShowEventManager(false);
    setViewMode('home');
  };

  const handleDeleteInvitation = async (id: string) => {
    try {
      await invitationsApi.delete(id);
      if (user) refreshInvitations(user.id);
      toast.success('Invitación eliminada');
    } catch (e) {
      toast.error('Error al eliminar invitación');
    }
  };

  const handleEditInvitation = (invitation: Invitation) => {
    // Find template from invitation
    const template = templates.find(t => t.id === invitation.templateId);
    if (template) {
      setSelectedTemplate(template);
      setCurrentInvitation(invitation);
      setViewMode('editor');
    } else {
      toast.error('No se pudo encontrar la plantilla original.');
    }
  };

  const handleCreateNew = (type: 'standard' | 'premium' = 'standard') => {
    setSelectedTemplate(null);
    setSelectedCategory(null);
    setTemplateTypeFilter(type);
    setViewMode('templates');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToDashboard = () => {
    setViewMode('dashboard');
  };

  if (!isMounted) return null;

  if (isMaintenance) {
    return <MaintenanceMode />;
  }

  // Dashboard view
  if (viewMode === 'dashboard' && user) {
    return (
      <>
        <Dashboard
          user={user}
          invitations={invitations}
          onCreateNew={handleCreateNew}
          onEdit={handleEditInvitation}
          onDelete={handleDeleteInvitation}
          onPreview={handlePreview}
          onManage={(inv) => {
            setCurrentInvitation(inv);
            setShowEventManager(true);
          }}
          onBack={() => setViewMode('home')}
        />
        <PreviewModal
          invitation={currentInvitation}
          open={showPreview}
          onClose={() => setShowPreview(false)}
          onManageEvent={handleManageEvent}
          onUpdateInvitation={handleSaveInvitation}
        />
        <Toaster />
      </>
    );
  }

  // Event Manager view
  if (showEventManager && currentInvitation) {
    return (
      <>
        <EventManager
          invitation={currentInvitation}
          onBack={handleBackFromEventManager}
        />
        <Toaster />
      </>
    );
  }

  // Editor view
  if (viewMode === 'editor' && selectedTemplate) {
    return (
      <>
        <InvitationEditor
          template={selectedTemplate}
          invitation={currentInvitation}
          onBack={handleBackFromEditor}
          onPreview={handlePreview}
          onSave={handleSaveInvitation}
        />
        <PreviewModal
          invitation={currentInvitation}
          open={showPreview}
          onClose={() => setShowPreview(false)}
          onManageEvent={handleManageEvent}
          onUpdateInvitation={handleSaveInvitation}
        />
        <Toaster />
      </>
    );
  }


  // Templates view
  if (viewMode === 'templates' && selectedCategory) {
    return (
      <>
        <TemplateGallery
          categoryId={selectedCategory}
          onBack={handleBackFromTemplates}
          onSelectTemplate={handleSelectTemplate}
          templateType={templateTypeFilter}
        />
        <Toaster />
      </>
    );
  }

  // Home view
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={() => setViewMode('home')}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative h-10 w-auto overflow-hidden">
                <img 
                  src="/logo-papel-crepe.png" 
                  alt="Papel Crepé" 
                  className="h-full w-auto object-contain transition-transform duration-300 group-hover:brightness-110" 
                />
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {user && (
                <button
                  onClick={handleGoToDashboard}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Mis Eventos
                </button>
              )}
              <button
                onClick={handleGetStarted}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Plantillas
              </button>
              <button
                onClick={() => toast.success('Redirigiendo a Papel Crepé Pro... (Próximamente)')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold hover:bg-amber-200 transition-all border border-amber-200 shadow-sm"
              >
                <span>⭐</span>
                <span>PAPEL CREPÉ PRO</span>
              </button>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center gap-4">
              {user ? (
                <UserMenu
                  user={user}
                  onLogout={handleLogout}
                  onDashboard={handleGoToDashboard}
                  onProfile={() => setShowProfileModal(true)}
                />
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600"
                  >
                    Registrarse
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100"
            >
              <div className="px-4 py-4 space-y-2">
                {user && (
                  <button
                    onClick={() => {
                      handleGoToDashboard();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    Mis Eventos
                  </button>
                )}
                <button
                  onClick={() => {
                    handleGetStarted();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  Plantillas
                </button>
                {!user && (
                  <Button
                    onClick={() => {
                      setShowAuthModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-rose-500 to-purple-500"
                  >
                    Iniciar Sesión
                  </Button>
                )}
                <div className="pt-2 pb-1 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Categorías
                </div>
                <div className="grid grid-cols-2 gap-2 px-2 pb-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        handleSelectCategory(cat.id as EventCategory);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-50"
                    >
                      <span>{cat.icon}</span>
                      <span className="truncate">{cat.name}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    toast.success('Redirigiendo a Papel Crepé Pro... (Próximamente)');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-amber-50 text-amber-700 rounded-lg font-bold border border-amber-200"
                >
                  <span>⭐</span>
                  Ir a Papel Crepé Pro
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <div className="pt-16">
        <Hero onGetStarted={handleGetStarted} />

        <div id="categories">
          <CategoryGrid onSelectCategory={handleSelectCategory} />
        </div>

        <HowItWorks onGetStarted={handleGetStarted} />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10">
                  <img src="/logo-papel-crepe.png" alt="Logo" className="h-8 w-auto" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                  Papel Crepé
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Crea invitaciones inolvidables con diseño profesional.
                Personalización total, música, RSVP interactivo y gestión fácil de invitados.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <Accordion type="single" collapsible className="w-full border-none">
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="py-2 text-sm text-gray-400 hover:text-white transition-colors hover:no-underline font-normal">
                    Guías de diseño
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-gray-500 pb-2">
                    <ul className="space-y-1 pl-1 border-l border-gray-800">
                      <li>• Usa fuentes legibles (Montserrat/Lora)</li>
                      <li>• Mantén los textos principales centrados</li>
                      <li>• Aprovecha el alto contraste para legibilidad</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-none">
                  <AccordionTrigger className="py-2 text-sm text-gray-400 hover:text-white transition-colors hover:no-underline font-normal">
                    Plantillas populares
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-gray-500 pb-2">
                    <ul className="space-y-1 pl-1 border-l border-gray-800">
                      <li>• Bodas con estilo Jardín Floral</li>
                      <li>• Cumpleaños Infatiles (Pingüino)</li>
                      <li>• Quinceaños Glamour 3D</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-none">
                  <AccordionTrigger className="py-2 text-sm text-gray-400 hover:text-white transition-colors hover:no-underline font-normal">
                    Centro de ayuda
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-gray-500 pb-2">
                    <ul className="space-y-1 pl-1 border-l border-gray-800">
                      <li>• Comparte vía WhatsApp copiando el link</li>
                      <li>• Configura el RSVP para tus invitados</li>
                      <li>• Agrega música desde el selector de pistas</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Seguinos</h4>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://www.facebook.com/share/18QLJceAj5/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:border-[#1877F2] transition-all hover:bg-[#1877F2]/10 group"
                  title="Facebook"
                >
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://www.tiktok.com/@papelcrepe2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all hover:bg-white/10 group"
                  title="TikTok"
                >
                  <TikTokIcon className="w-5 h-5 group-hover:scale-110 transition-transform fill-current" />
                </a>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); toast.info('Instagram de VEG Software próximamente'); }}
                  className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#E4405F] hover:border-[#E4405F] transition-all hover:bg-[#E4405F]/10 group"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); toast.info('YouTube de VEG Software próximamente'); }}
                  className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#FF0000] hover:border-[#FF0000] transition-all hover:bg-[#FF0000]/10 group"
                  title="YouTube"
                >
                  <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="text-sm text-gray-400 hover:text-rose-400 transition-colors flex items-center gap-2 px-0 py-0 h-auto bg-transparent border-none shadow-none group"
                >
                  <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-rose-400" />
                  Contacto Directo
                </button>
              </div>
            </div>
          </div>

          {/* Payment Methods — full-width row, CSS-only badges, never depends on external URLs */}
          <div className="border-t border-gray-800 mt-8 pt-6">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Medios de Pago Aceptados</p>
            <div className="flex flex-wrap items-center gap-3">
              {/* Mercado Pago */}
              <div className="h-9 px-4 rounded-lg bg-[#009EE3] flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-default">
                <span className="text-white font-black text-xs tracking-tight">💳 Mercado Pago</span>
              </div>
              {/* PayPal */}
              <div className="h-9 px-4 rounded-lg bg-[#003087] flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-default">
                <span className="text-[#00B2E5] font-black text-xs tracking-tight">🌐 PayPal</span>
              </div>
              {/* Brubank */}
              <div className="h-9 px-4 rounded-lg bg-[#00C8FF] flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-default">
                <span className="text-slate-900 font-black text-xs tracking-tight">🏦 Brubank</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Papel Crepé. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />

      <ProfileModal
        user={user}
        open={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onUpdate={(updatedUser) => {
          setUser(updatedUser);
          refreshInvitations(updatedUser.id);
        }}
      />

      <Toaster />

      <ContactModal 
        open={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </main >
  );
}
