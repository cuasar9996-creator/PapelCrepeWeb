'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User as UserIcon, Settings, Calendar, LogOut, ChevronDown } from 'lucide-react';
import type { User } from '@/lib/auth';

interface UserMenuProps {
  user: User;
  onLogout: () => void;
  onDashboard: () => void;
  onProfile: () => void;
}

export function UserMenu({ user, onLogout, onDashboard, onProfile }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <img
          src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
          alt={user.name}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-purple-400"
        />
        <span className="hidden md:block text-sm font-medium text-gray-700">
          {user.name.split(' ')[0]}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <button
                onClick={() => {
                  onProfile();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                Mi Perfil
              </button>

              <button
                onClick={() => {
                  onDashboard();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Mis Eventos
              </button>

              <button
                onClick={() => {
                  onProfile();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Configuración
              </button>

              <div className="mx-2 my-1 h-px bg-gray-100" />

              {user.email === 'cuasar9996@gmail.com' && (
                <button
                  onClick={() => {
                    window.location.href = '/admin';
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-600 font-semibold hover:bg-rose-50 transition-colors"
                >
                  <div className="p-1 bg-rose-100 rounded">
                    <Settings className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  Panel Admin
                </button>
              )}

              <button
                onClick={() => {
                  // Coming soon — do not navigate externally
                  setIsOpen(false);
                }}
                disabled
                className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-amber-700/50 transition-colors rounded-lg cursor-not-allowed"
              >
                <div className="w-4 h-4 text-amber-400">✨</div>
                Ir a Papel Crepé Pro
              </button>
            </div>

            {/* Logout */}
            <div className="border-t border-gray-100 pt-1">
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
