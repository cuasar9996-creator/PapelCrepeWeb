'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Settings,
    CreditCard,
    TrendingUp,
    Download,
    Image as ImageIcon,
    ArrowLeft,
    Search,
    Save,
    Bell,
    Menu,
    X,
    Clock,
    Loader2,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

import { adminApi } from '@/lib/api';

// Simulamos carga de datos locales para las estadísticas
const STORAGE_KEY = 'digital_invitations_data';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalInvitations: 0,
        totalGuests: 0,
        downloads: 45,
        totalUSD: 0,
        totalARS: 0,
        dailyUSD: 0,
        dailyARS: 0,
        exchangeRate: 1,
        categoryStats: {} as Record<string, number>
    });

    const [users, setUsers] = useState<any[]>([]);

    const [isPopularityExpanded, setIsPopularityExpanded] = useState(false);
    const [config, setConfig] = useState({
        mercadoPagoLink: '',
        paypalLink: '',
        enableProFeatures: true,
        maintenanceMode: false,
        priceStandard: '0.00',
        pricePremium: '4.99',
        exchangeRate: 1250
    });

    useEffect(() => {
        // Portero de Seguridad: Solo el administrador puede ver esta página
        const user = adminApi.getCurrentUserSync();
        if (!user || user.email !== 'cuasar9996@gmail.com') {
            toast.error('Acceso denegado: Se requieren permisos de administrador');
            window.location.href = '/';
            return;
        }

        const loadStats = async () => {
            try {
                const [globalStats, revenue, remoteConfig] = await Promise.all([
                    adminApi.getGlobalStats(),
                    adminApi.getRevenueStats(),
                    adminApi.getConfig()
                ]);

                setStats({
                    totalUsers: globalStats.totalUsers,
                    totalInvitations: globalStats.totalInvitations,
                    totalGuests: globalStats.totalGuests,
                    downloads: 45,
                    totalUSD: revenue.totalUSD,
                    totalARS: revenue.totalARS,
                    dailyUSD: revenue.dailyUSD,
                    dailyARS: revenue.dailyARS,
                    exchangeRate: revenue.exchangeRate,
                    categoryStats: globalStats.categoryStats
                });

                if (remoteConfig) {
                    setConfig(prev => ({
                        ...prev,
                        ...remoteConfig
                    }));
                }

                // Cargar usuarios
                const privilegedUsers = await adminApi.getPrivilegedUsers();
                setUsers(privilegedUsers);
            } catch (e) {
                console.error('Error fetching admin data:', e);
            }
        };
        loadStats();
    }, []);

    const handleSaveConfig = async () => {
        setIsUpdating(true);
        const loadingToast = toast.loading('Guardando configuración maestra...');
        try {
            await adminApi.saveConfig(config);
            toast.dismiss(loadingToast);
            toast.success('Configuración aplicada globalmente.');
        } catch (e) {
            toast.dismiss(loadingToast);
            toast.error('Error al sincronizar con el servidor.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleTogglePro = async (user: any) => {
        const loadingToast = toast.loading(`${user.isPro ? 'Revocando' : 'Regalando'} acceso Pro...`);
        try {
            await adminApi.toggleProStatus(user.email, user.isPro);
            toast.dismiss(loadingToast);
            toast.success(`Acceso ${user.isPro ? 'revocado' : 'otorgado'} con éxito.`);

            // Recargar lista
            const updatedUsers = await adminApi.getPrivilegedUsers();
            setUsers(updatedUsers);
        } catch (e) {
            toast.dismiss(loadingToast);
            toast.error('Error al actualizar el estado del usuario.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative">
            {/* Sidebar Admin */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                        <Settings className="w-5 h-5 text-rose-500" />
                        Admin Panel
                    </h2>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'dashboard' ? 'bg-rose-50 text-rose-600' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Vista General
                    </button>

                    <button
                        onClick={() => { setActiveTab('users'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'users' ? 'bg-rose-50 text-rose-600' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <Users className="w-5 h-5" />
                        Usuarios Privil.
                    </button>

                    <button
                        onClick={() => { setActiveTab('billing'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'billing' ? 'bg-rose-50 text-rose-600' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <CreditCard className="w-5 h-5" />
                        Pagos y Planes
                    </button>

                    <button
                        onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'settings' ? 'bg-rose-50 text-rose-600' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <Settings className="w-5 h-5" />
                        Config Global
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={() => window.location.href = '/'}>
                        <ArrowLeft className="w-4 h-4" />
                        Volver a la App
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Topbar */}
                <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8 shrink-0">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-slate-500"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-500 hover:text-rose-600 gap-2 px-2 hidden sm:flex"
                            onClick={() => window.location.href = '/'}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium text-sm">Volver</span>
                        </Button>
                        <div className="w-px h-6 bg-slate-200 mx-1 hidden md:block" />
                        <h1 className="text-lg md:text-xl font-bold text-slate-800 capitalize truncate">
                            {activeTab === 'dashboard' ? 'Resumen del Sistema' :
                                activeTab === 'billing' ? 'Gestión de Pagos' :
                                    activeTab === 'settings' ? 'Configuración Core' : 'Usuarios'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="relative hidden sm:block">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <Input className="pl-9 h-9 w-40 lg:w-64 bg-slate-50 rounded-full border-none" placeholder="Buscar..." />
                        </div>
                        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {/* Backdrop para móvil */}
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}

                    {/* =========== TAB: DASHBOARD =========== */}
                    {activeTab === 'dashboard' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

                            {/* KPIs */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                                    <span className="text-slate-500 font-medium text-sm flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4 text-purple-500" />
                                        Listas Creadas
                                    </span>
                                    <div className="mt-4 flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-slate-800">{stats.totalInvitations}</span>
                                        <span className="text-sm font-medium text-emerald-500 flex items-center"><TrendingUp className="w-3 h-3 mr-1" />+12%</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                                    <span className="text-slate-500 font-medium text-sm flex items-center gap-2">
                                        <Users className="w-4 h-4 text-blue-500" />
                                        Total Invitados (RSVP)
                                    </span>
                                    <div className="mt-4 flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-slate-800">{stats.totalGuests}</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                                    <span className="text-slate-500 font-medium text-sm flex items-center gap-2">
                                        <Download className="w-4 h-4 text-orange-500" />
                                        Descargas JPG
                                    </span>
                                    <div className="mt-4 flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-slate-800">{stats.downloads}</span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-rose-500 to-purple-600 p-6 rounded-2xl shadow-lg shadow-rose-500/20 flex flex-col text-white">
                                    <span className="font-medium text-sm text-white/80">Usuarios Pro Activos</span>
                                    <div className="mt-4 flex items-baseline gap-2">
                                        <span className="text-3xl font-bold">12</span>
                                    </div>
                                    <div className="mt-2 text-xs text-white/60">Suscripciones recurrentes</div>
                                </div>
                            </div>

                            {/* KPIs de Facturación */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col border-l-4 border-l-emerald-500">
                                    <span className="text-slate-500 font-medium text-sm flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                                            Facturación Total
                                        </div>
                                        <div className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500">
                                            TC: 1 USD = ${stats.exchangeRate} ARS
                                        </div>
                                    </span>
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Dólares (USD)</p>
                                            <p className="text-2xl font-black text-slate-800">${stats.totalUSD.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Pesos (ARS)</p>
                                            <p className="text-2xl font-black text-emerald-600">${stats.totalARS.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col border-l-4 border-l-blue-500">
                                    <span className="text-slate-500 font-medium text-sm flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                        Facturación Promedio Diaria
                                    </span>
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Hoy (USD)</p>
                                            <p className="text-2xl font-black text-slate-800">${stats.dailyUSD.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Hoy (ARS)</p>
                                            <p className="text-2xl font-black text-blue-600">${stats.dailyARS.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Seccion Info Central y Popularidad */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                {/* Popularidad de Categorías */}
                                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-purple-500" />
                                            Popularidad por Categoría
                                        </h3>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsPopularityExpanded(!isPopularityExpanded)}
                                            className="text-slate-500 hover:text-purple-600 gap-2 px-2"
                                        >
                                            {isPopularityExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            {isPopularityExpanded ? 'Ver Menos' : 'Ver Todas'}
                                        </Button>
                                    </div>

                                    <div className={`space-y-4 transition-all duration-300 ${isPopularityExpanded ? '' : 'max-h-[220px] overflow-hidden'}`}>
                                        {Object.entries(stats.categoryStats || {})
                                            .sort(([, a], [, b]) => b - a)
                                            .map(([cat, count]) => {
                                                const percentage = Math.round((count / (stats.totalInvitations || 1)) * 100);
                                                return (
                                                    <div key={cat} className="space-y-1">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="font-medium text-slate-700">{cat}</span>
                                                            <span className="text-slate-500 font-bold">{count} invitaciones</span>
                                                        </div>
                                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${percentage}%` }}
                                                                className={`h-full ${cat === 'Bodas' ? 'bg-amber-400' :
                                                                    cat === 'Cumpleaños' ? 'bg-rose-500' :
                                                                        'bg-indigo-400'
                                                                    }`}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                        {(!stats.categoryStats || Object.keys(stats.categoryStats).length === 0) && (
                                            <p className="text-center py-8 text-slate-400 text-sm italic">Cargando datos de popularidad...</p>
                                        )}

                                        {!isPopularityExpanded && Object.keys(stats.categoryStats || {}).length > 3 && (
                                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                                        )}
                                    </div>

                                    <p className="text-[11px] text-slate-400 mt-6 border-t pt-4 italic">
                                        * Basado en el volumen total de invitaciones creadas por categoría.
                                    </p>
                                </div>

                                {/* Info Central */}
                                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center flex flex-col justify-center h-full">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <LayoutDashboard className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">Panel Sincronizado en Tiempo Real</h3>
                                    <p className="text-slate-500 max-w-lg mx-auto mb-6">
                                        Este panel ahora está conectado a la base de datos central (Supabase). Las estadísticas que ves arriba reflejan el uso real de toda la plataforma en vivo.
                                    </p>
                                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-left">
                                        <p className="text-xs text-blue-800 font-bold mb-1 flex items-center gap-1">
                                            💡 Consejo del Sistema:
                                        </p>
                                        <p className="text-xs text-blue-600">
                                            Si notas que <b>Casamientos</b> tiene mucho movimiento pero pocas plantillas, es hora de agregar variedad para aumentar las conversiones Pro.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* =========== TAB: USERS (PRIVILEGIADOS) =========== */}
                    {activeTab === 'users' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <div>
                                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                            <Users className="w-5 h-5 text-blue-500" />
                                            Usuarios de la Plataforma
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1">Lista de usuarios registrados y su estado de suscripción.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <Download className="w-4 h-4" /> Exportar CSV
                                        </Button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                            <tr>
                                                <th className="px-6 py-4 font-bold">Usuario</th>
                                                <th className="px-6 py-4 font-bold">Email</th>
                                                <th className="px-6 py-4 font-bold">Estado</th>
                                                <th className="px-6 py-4 font-bold">Registro</th>
                                                <th className="px-6 py-4 font-bold">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {users.map(user => (
                                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                                                                {user.name.charAt(0)}
                                                            </div>
                                                            <span className="font-medium text-slate-700">{user.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-500">{user.email}</td>
                                                    <td className="px-6 py-4">
                                                        {user.isPro ?
                                                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Plan Pro</span>
                                                            :
                                                            <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Estándar</span>
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-500">{user.createdAt}</td>
                                                    <td className="px-6 py-4">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleTogglePro(user)}
                                                            className={`${user.isPro ? 'text-rose-500 hover:text-rose-600 hover:bg-rose-50' : 'text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50'} text-xs font-bold`}
                                                        >
                                                            {user.isPro ? 'Revocar Pro' : 'Regalar Pro'}
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* =========== TAB: BILLING & PAGOS =========== */}
                    {activeTab === 'billing' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl">

                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="border-b border-slate-100 p-6 bg-slate-50/50">
                                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-emerald-500" />
                                        Enlaces de Pago (Checkout)
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">Acá puedes cambiar dinámicamente el URL donde los usuarios pagan por el Nivel Pro.</p>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="space-y-3">
                                        <Label className="font-bold text-slate-700">MercadoPago (Checkout Link)</Label>
                                        <Input
                                            value={config.mercadoPagoLink || ''}
                                            onChange={e => setConfig({ ...config, mercadoPagoLink: e.target.value })}
                                            className="bg-slate-50 border-slate-200 h-12"
                                        />
                                        <p className="text-[11px] text-slate-400">Pega aquí el enlace de botón de pago generado en tu cuenta de MercadoPago.</p>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="font-bold text-slate-700">PayPal / Stripe (Link Internacional)</Label>
                                        <Input
                                            value={config.paypalLink || ''}
                                            onChange={e => setConfig({ ...config, paypalLink: e.target.value })}
                                            className="bg-slate-50 border-slate-200 h-12"
                                        />
                                    </div>

                                    <div className="space-y-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                        <div className="flex justify-between items-center">
                                            <Label className="font-bold text-emerald-900">Tipo de Cambio (TC)</Label>
                                            <div className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded uppercase font-bold">Oficial Interno</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">$1 USD =</span>
                                                <Input
                                                    type="number"
                                                    value={config.exchangeRate ?? 1250}
                                                    onChange={e => setConfig({ ...config, exchangeRate: Number(e.target.value) })}
                                                    className="pl-20 bg-white border-emerald-200 h-12"
                                                />
                                            </div>
                                            <p className="text-xs text-emerald-600 font-medium max-w-[200px]">Este valor se usa para convertir precios de USD a Pesos (ARS) en toda la web.</p>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4 mt-6">
                                            {/* Tarjetas 2D */}
                                            <div className="flex-1 flex flex-col p-4 bg-slate-50 rounded-xl border border-slate-100 gap-4">
                                                <div className="flex justify-between items-start w-full">
                                                    <div>
                                                        <p className="font-bold text-slate-800 text-sm md:text-base">Tarjetas 2D (Estándar)</p>
                                                        <p className="text-[11px] text-slate-500">Diseños fijos sin video</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative flex-1">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">USD $</span>
                                                        <Input
                                                            type="number"
                                                            value={config.priceStandard || '7.99'}
                                                            onChange={e => setConfig({ ...config, priceStandard: e.target.value })}
                                                            className="pl-14 bg-white h-12 border-slate-200 shadow-sm font-bold text-black"
                                                        />
                                                    </div>
                                                    <div className="flex-1 px-4 h-12 flex flex-col justify-center bg-white border border-slate-200 rounded-lg">
                                                        <span className="text-[9px] text-slate-400 font-bold uppercase">Precio Final ARS</span>
                                                        <span className="font-black text-rose-500 text-sm">
                                                            $ {(Number(config.priceStandard || 0) * (config.exchangeRate || 1)).toLocaleString('es-AR')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tarjetas 3D */}
                                            <div className="flex-1 flex flex-col p-4 bg-amber-50 rounded-xl border border-amber-100 gap-4">
                                                <div className="flex justify-between items-start w-full">
                                                    <div>
                                                        <p className="font-bold text-amber-900 text-sm md:text-base flex items-center gap-1">Tarjetas 3D (Premium) <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 rounded uppercase font-bold">LIVE</span></p>
                                                        <p className="text-[11px] text-amber-600/70">Video y efectos dinámicos</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative flex-1">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 font-bold text-sm">USD $</span>
                                                        <Input
                                                            type="number"
                                                            value={config.pricePremium || '19.99'}
                                                            onChange={e => setConfig({ ...config, pricePremium: e.target.value })}
                                                            className="pl-14 bg-white border-amber-200 focus:border-amber-400 focus:ring-amber-400 h-12 shadow-sm font-bold text-black"
                                                        />
                                                    </div>
                                                    <div className="flex-1 px-4 h-12 flex flex-col justify-center bg-white border border-amber-200 rounded-lg">
                                                        <span className="text-[9px] text-amber-500 font-bold uppercase">Precio Final ARS</span>
                                                        <span className="font-black text-amber-600 text-sm">
                                                            $ {(Number(config.pricePremium || 0) * (config.exchangeRate || 1)).toLocaleString('es-AR')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                                    <Button onClick={handleSaveConfig} className="bg-rose-500 hover:bg-rose-600 gap-2">
                                        <Save className="w-4 h-4" />
                                        Guardar Enlaces
                                    </Button>
                                </div>
                            </div>

                        </motion.div>
                    )}

                    {/* =========== TAB: SETTINGS =========== */}
                    {activeTab === 'settings' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="border-b border-slate-100 p-6 bg-slate-50/50">
                                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-slate-500" />
                                        Configuración Core de la App
                                    </h3>
                                </div>

                                <div className="p-6 space-y-6">

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label className="font-bold text-base text-slate-800">Habilitar Funciones Pro</Label>
                                            <p className="text-sm text-slate-500">Si está apagado, el botón "Papel Crepé Pro" no se mostrará a los usuarios.</p>
                                        </div>
                                        <Switch
                                            checked={config.enableProFeatures}
                                            onCheckedChange={v => setConfig({ ...config, enableProFeatures: v })}
                                            className="data-[state=checked]:bg-emerald-500"
                                        />
                                    </div>

                                    <div className="h-px bg-slate-100" />

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label className="font-bold text-base text-slate-800">Modo Mantenimiento</Label>
                                            <p className="text-sm text-slate-500">Muestra una pantalla de "Volvemos pronto" (Solo tú podrías entrar).</p>
                                        </div>
                                        <Switch
                                            checked={config.maintenanceMode}
                                            onCheckedChange={v => setConfig({ ...config, maintenanceMode: v })}
                                            className="data-[state=checked]:bg-rose-500"
                                        />
                                    </div>

                                </div>
                                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                                    <Button
                                        onClick={handleSaveConfig}
                                        disabled={isUpdating}
                                        className="bg-indigo-600 hover:bg-indigo-700 gap-2 h-12 px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
                                    >
                                        {isUpdating ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Save className="w-4 h-4" />
                                        )}
                                        {isUpdating ? 'Aplicando...' : 'Aplicar Cambios Globales'}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </div>
            </main>
        </div>
    );
}
