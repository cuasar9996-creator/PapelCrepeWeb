'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { login, register } from '@/lib/auth';
import type { User } from '@/lib/auth';
import { toast } from 'sonner';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuth: (user: User) => void;
}

export function AuthModal({ open, onClose, onAuth }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = login(loginEmail, loginPassword);

    if (result.success && result.user) {
      onAuth(result.user);
      onClose();
      resetForms();
    } else {
      setError(result.error || 'Error al iniciar sesión');
    }

    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (registerPassword !== registerConfirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = register(registerName, registerEmail, registerPassword);

    if (result.success && result.user) {
      onAuth(result.user);
      onClose();
      resetForms();
    } else {
      setError(result.error || 'Error al registrarse');
    }

    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulación de búsqueda en localStorage
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = JSON.parse(localStorage.getItem('invitation_app_users') || '[]');
    const user = users.find((u: any) => u.email.toLowerCase() === forgotEmail.toLowerCase());

    if (user) {
      toast.success('¡Usuario encontrado!', { 
        description: `Tu contraseña es: ${user.password}`,
        duration: 10000 
      });
      setActiveTab('login');
      setLoginEmail(forgotEmail);
    } else {
      setError('No encontramos ninguna cuenta con ese email.');
    }

    setLoading(false);
  };

  const resetForms = () => {
    setLoginEmail('');
    setLoginPassword('');
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
    setForgotEmail('');
    setError('');
    setShowPassword(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 p-6 text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center mb-2">
                <img src="/logo-papel-crepe.png" alt="Papel Crepé" className="h-24 w-auto object-contain" />
              </div>
              <p className="text-white/80 text-sm">
                Inicia sesión para crear y gestionar tus invitaciones
              </p>
            </div>

            {/* Tabs */}
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as any); setError(''); }}>
                <TabsList className={`grid w-full ${activeTab === 'forgot' ? 'grid-cols-1' : 'grid-cols-2'} mb-6`}>
                  {activeTab === 'forgot' ? (
                    <TabsTrigger value="forgot">Recuperar Contraseña</TabsTrigger>
                  ) : (
                    <>
                      <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                      <TabsTrigger value="register">Registrarse</TabsTrigger>
                    </>
                  )}
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="tu@email.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setActiveTab('forgot')}
                          className="text-xs text-rose-600 hover:text-rose-700 font-medium"
                        >
                          ¿Olvidaste tu contraseña?
                        </button>
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600"
                      disabled={loading}
                    >
                      {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                    </Button>

                    <p className="text-center text-xs text-gray-500">
                      Demo: usa cualquier email y contraseña (mín. 6 caracteres)
                    </p>
                  </form>
                </TabsContent>

                {/* Register Form */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Nombre</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Tu nombre"
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="tu@email.com"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="register-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Mínimo 6 caracteres"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-confirm">Confirmar Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="register-confirm"
                          type="password"
                          placeholder="Repite tu contraseña"
                          value={registerConfirmPassword}
                          onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600"
                      disabled={loading}
                    >
                      {loading ? 'Registrando...' : 'Crear Cuenta'}
                    </Button>
                  </form>
                </TabsContent>

                {/* Forgot Password Form */}
                <TabsContent value="forgot">
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <p className="text-sm text-gray-500 mb-4">
                      Ingresa tu email y te recordaremos tu contraseña.
                    </p>
                    <div className="space-y-2">
                       <Label htmlFor="forgot-email">Email de tu cuenta</Label>
                       <div className="relative">
                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                         <Input
                           id="forgot-email"
                           type="email"
                           placeholder="tu@email.com"
                           value={forgotEmail}
                           onChange={(e) => setForgotEmail(e.target.value)}
                           className="pl-10"
                           required
                         />
                       </div>
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <div className="flex flex-col gap-2">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600"
                        disabled={loading}
                      >
                        {loading ? 'Buscando...' : 'Recuperar Contraseña'}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setActiveTab('login')}
                        className="w-full text-gray-500"
                        disabled={loading}
                      >
                        Volver al inicio
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
