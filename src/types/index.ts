export type EventCategory =
  | 'birthday'
  | 'wedding'
  | 'baby-shower'
  | 'baptism'
  | 'anniversary'
  | 'graduation'
  | 'corporate'
  | 'sports'
  | 'camping'
  | 'hikes'
  | 'dinner'
  | 'cinema'
  | 'theater'
  | 'fishing'
  | 'quinceanera'
  | 'communion'
  | 'eighteenth'
  | 'corazon'
  | 'fantasy'
  | 'mothers-day'
  | 'fathers-day'
  | 'godparents'
  | 'photo-frame'
  | 'other';

export interface Category {
  id: EventCategory;
  name: string;
  icon: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface Template {
  id: string;
  categoryId: EventCategory;
  name: string;
  description: string;
  style: 'elegant' | 'modern' | 'playful' | 'minimal' | 'rustic';
  preview: string;
  layout: 'centered' | 'left' | 'right' | 'full';
  defaultColors: {
    background: string;
    text: string;
    accent: string;
    secondary: string;
  };
  defaultFont: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  isPremium?: boolean;
}

export interface CustomImage {
  id: string;
  name: string;
  dataUrl: string;
  type: 'background' | 'logo' | 'event';
  opacity: number;
  rotation: number;
}

export interface MusicSettings {
  trackId: string | null;
  volume: number;
  autoplay: boolean;
  loop: boolean;
  customTrackUrl?: string;
}

export interface ItineraryItem {
  id: string;
  time: string;
  activity: string;
}

export interface Invitation {
  id: string;
  templateId: string;
  category: EventCategory;
  title: string;
  eventDate?: string;
  eventTime?: string;
  location?: string;
  message?: string;
  hostName?: string;
  colors: {
    background: string;
    text: string;
    accent: string;
    secondary: string;
  };
  font: string;
  backgroundImage?: string;
  backgroundImages?: string[];
  backgroundVideo?: string;
  backgroundOpacity?: number;
  slideshowDuration?: number; // In seconds
  logoImage?: string;
  eventImage?: string;
  music?: MusicSettings;
  guestCount?: number;
  createdAt: string;
  updatedAt: string;
  // --- Full Premium Features ---
  isPaid?: boolean;
  cbu?: string;
  alias?: string;
  bankName?: string;
  giftRegistryUrl?: string;
  dressCode?: string;
  itinerary?: ItineraryItem[];
  showCountdown?: boolean;
  showMap?: boolean;
  showGifts?: boolean;
  showDressCode?: boolean;
  showItinerary?: boolean;
  showGuestbook?: boolean;
}

export interface GuestbookMessage {
  id: string;
  invitationId: string;
  guestName: string;
  message: string;
  imageUrl?: string;
  emoji?: string;
  createdAt: string;
}

export interface Guest {
  id: string;
  invitationId: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'declined';
  plusOnes: number;
  notes: string;
  songRequest?: string;
  dietaryRestrictions?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  invitationId: string;
  name: string;
  date: string;
  location: string;
  guests: Guest[];
  createdAt: string;
}

export type ViewMode = 'home' | 'templates' | 'editor' | 'preview' | 'events' | 'dashboard';
