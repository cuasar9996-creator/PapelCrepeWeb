// Auth utilities for localStorage-based authentication
import { invitationsApi } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const USERS_KEY = 'invitation_app_users';
const CURRENT_USER_KEY = 'invitation_app_current_user';

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get all registered users
export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

// Save users to localStorage
function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Get current logged in user
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

// Save current user session
function saveCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

// Register new user
export async function register(name: string, email: string, password: string, avatar?: string): Promise<{ success: boolean; user?: User; error?: string }> {
  const users = getUsers();
  
  // Capture old ID for migration before creating new session
  const oldUser = getCurrentUser();
  const oldId = oldUser?.id;

  // Check if email already exists
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'Este email ya está registrado' };
  }
  
  // Validate inputs
  if (!name.trim()) {
    return { success: false, error: 'El nombre es requerido' };
  }
  if (!email.trim() || !email.includes('@')) {
    return { success: false, error: 'Email inválido' };
  }
  if (password.length < 6) {
    return { success: false, error: 'La contraseña debe tener al menos 6 caracteres' };
  }
  
  // Create new user
  const userId = email.trim().toLowerCase();
  const newUser: User = {
    id: userId,
    name: name.trim(),
    email: userId,
    avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
    createdAt: new Date().toISOString(),
  };
  
  // Save user with password (in real app, password would be hashed)
  const userWithPassword = { ...newUser, password };
  users.push(userWithPassword as User & { password: string });
  saveUsers(users);
  
  // Auto login after registration
  saveCurrentUser(newUser);
  
  // Migrate data if needed
  if (oldId && !oldId.includes('@')) {
    try {
      await invitationsApi.transferInvitations(oldId, newUser.id);
    } catch (e) {
      console.error('Migration failed:', e);
    }
  }

  return { success: true, user: newUser };
}

// Login user
export async function login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  const users = getUsers() as (User & { password: string })[];
  
  // Capture old ID for migration
  const oldUser = getCurrentUser();
  const oldId = oldUser?.id;

  const user = users.find(u => 
    u.email.toLowerCase() === email.toLowerCase() && 
    u.password === password
  );
  
  if (!user) {
    return { success: false, error: 'Email o contraseña incorrectos' };
  }
  
  // Save session (without password)
  const { password: _, ...userWithoutPassword } = user;
  userWithoutPassword.id = userWithoutPassword.email; // Ensure ID is email
  saveCurrentUser(userWithoutPassword);
  
  // Migrate data if needed
  if (oldId && !oldId.includes('@')) {
    try {
      await invitationsApi.transferInvitations(oldId, userWithoutPassword.id);
    } catch (e) {
      console.error('Migration failed:', e);
    }
  }

  return { success: true, user: userWithoutPassword };
}

// Logout user
export function logout(): void {
  saveCurrentUser(null);
}

// Update user profile
export function updateProfile(updates: Partial<User>): { success: boolean; user?: User; error?: string } {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: 'No hay usuario autenticado' };
  }
  
  const users = getUsers() as (User & { password?: string })[];
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex === -1) {
    return { success: false, error: 'Usuario no encontrado' };
  }
  
  const updatedUser = { ...users[userIndex], ...updates };
  users[userIndex] = updatedUser;
  saveUsers(users);
  
  // Update session
  const { password: _, ...userWithoutPassword } = updatedUser;
  saveCurrentUser(userWithoutPassword);
  
  return { success: true, user: userWithoutPassword };
}
