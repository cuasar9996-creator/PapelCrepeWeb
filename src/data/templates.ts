import { Category, Template } from '@/types';

export const categories: Category[] = [
  {
    id: 'birthday',
    name: 'Cumpleaños Adultos',
    icon: '🥂',
    description: 'Celebra otro año de vida con elegancia y estilo',
    colors: {
      primary: '#FF6B9D',
      secondary: '#FFC4D6',
      accent: '#FF85A2'
    }
  },
  {
    id: 'wedding',
    name: 'Bodas',
    icon: '💍',
    description: 'El día más especial de tu vida',
    colors: {
      primary: '#D4AF37',
      secondary: '#F5E6CC',
      accent: '#C9A227'
    }
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    icon: '👶',
    description: 'Bienvenido al mundo, pequeño',
    colors: {
      primary: '#87CEEB',
      secondary: '#E6F3FF',
      accent: '#5DADE2'
    }
  },
  {
    id: 'baptism',
    name: 'Bautismos',
    icon: '🖋️',
    description: 'Un momento espiritual especial',
    colors: {
      primary: '#E8D5E0',
      secondary: '#F8F4F6',
      accent: '#C9B8C4'
    }
  },
  {
    id: 'anniversary',
    name: 'Aniversarios',
    icon: '💕',
    description: 'Celebra el amor eterno',
    colors: {
      primary: '#E74C3C',
      secondary: '#FADBD8',
      accent: '#C0392B'
    }
  },
  {
    id: 'graduation',
    name: 'Graduaciones',
    icon: '🎓',
    description: 'Celebra un logro académico',
    colors: {
      primary: '#2E86AB',
      secondary: '#E8F4F8',
      accent: '#1B4F72'
    }
  },
  {
    id: 'corporate',
    name: 'Eventos Corporativos',
    icon: '💼',
    description: 'Profesionalismo y elegancia',
    colors: {
      primary: '#2C3E50',
      secondary: '#ECF0F1',
      accent: '#1A252F'
    }
  },
  {
    id: 'sports',
    name: 'Deportes',
    icon: '⚽',
    description: 'Partidos, torneos y juntadas',
    colors: {
      primary: '#25F447',
      secondary: '#F5F8F6',
      accent: '#102213'
    }
  },
  {
    id: 'camping',
    name: 'Camping',
    icon: '⛺',
    description: 'Noche bajo las estrellas',
    colors: {
      primary: '#E67E22',
      secondary: '#FBEEE6',
      accent: '#D35400'
    }
  },
  {
    id: 'hikes',
    name: 'Excursiones',
    icon: '🥾',
    description: 'Aventura en la montaña',
    colors: {
      primary: '#27AE60',
      secondary: '#E9F7EF',
      accent: '#1E8449'
    }
  },
  {
    id: 'dinner',
    name: 'Cenas/Reuniones',
    icon: '🍽️',
    description: 'Un banquete o reunión casual',
    colors: {
      primary: '#F47B25',
      secondary: '#F8F7F5',
      accent: '#221710'
    }
  },
  {
    id: 'cinema',
    name: 'Cine',
    icon: '🎬',
    description: '¡Noche de pelis y pochoclos!',
    colors: {
      primary: '#EE9D2B',
      secondary: '#F8F7F6',
      accent: '#221A10'
    }
  },
  {
    id: 'theater',
    name: 'Teatro',
    icon: '🎭',
    description: 'La magia del escenario',
    colors: {
      primary: '#8E44AD',
      secondary: '#F4ECF7',
      accent: '#7D3C98'
    }
  },
  {
    id: 'fishing',
    name: 'Pesca',
    icon: '🎣',
    description: 'Un día tranquilo en el agua',
    colors: {
      primary: '#1193D4',
      secondary: '#F6F7F8',
      accent: '#101C22'
    }
  },
  {
    id: 'quinceanera',
    name: 'Quince Años',
    icon: '💃',
    description: 'Una noche de sueños y elegancia',
    colors: {
      primary: '#B76E79',
      secondary: '#F8E9E9',
      accent: '#FFD700'
    }
  },
  {
    id: 'communion',
    name: 'Comuniones',
    icon: '🕊️',
    description: 'Un paso importante en la fe',
    colors: {
      primary: '#D4AF37',
      secondary: '#FFFFFF',
      accent: '#F5E6CC'
    }
  },
  {
    id: 'eighteenth',
    name: 'Mis 18 Años',
    icon: '🔞',
    description: '¡Llegó la mayoría de edad! Festeja con todo',
    colors: {
      primary: '#00D4FF',
      secondary: '#001524',
      accent: '#FF007F'
    }
  },
  {
    id: 'corazon',
    name: 'Mensajes del Corazón',
    icon: '❤️',
    description: 'Expresate con el alma. Amor, perdón y emociones',
    colors: {
      primary: '#E91E63',
      secondary: '#1a0010',
      accent: '#FF6B9D'
    }
  },
  {
    id: 'fantasy',
    name: 'Cumpleaños Infantiles',
    icon: '🎈',
    description: 'Aventuras mágicas, héroes y diversión sin fin',
    colors: {
      primary: '#9B59B6',
      secondary: '#F5EEF8',
      accent: '#FFD700'
    }
  },
  {
    id: 'photo-frame',
    name: 'Marcos de Fotos',
    icon: '🖼️',
    description: 'Tus fotos favoritas en marcos espectaculares',
    colors: {
      primary: '#3498DB',
      secondary: '#EBF5FB',
      accent: '#F1C40F'
    }
  },
  {
    id: 'mothers-day',
    name: 'Día de la Madre',
    icon: '💐',
    description: 'Homenajea a mamá en su día especial',
    colors: {
      primary: '#FF69B4',
      secondary: '#FFF0F5',
      accent: '#FF1493'
    }
  },
  {
    id: 'fathers-day',
    name: 'Día del Padre',
    icon: '👔',
    description: 'El mejor regalo para el mejor papá',
    colors: {
      primary: '#2C3E50',
      secondary: '#EBF2F6',
      accent: '#3498DB'
    }
  },
  {
    id: 'godparents',
    name: 'Padrinos y Ahijados',
    icon: '🤲',
    description: 'Celebra ese vínculo sagrado y único',
    colors: {
      primary: '#D4AF37',
      secondary: '#FFFAF0',
      accent: '#B8860B'
    }
  },
  {
    id: 'other',
    name: 'Otras Celebraciones',
    icon: '🎉',
    description: 'Cualquier ocasión especial',
    colors: {
      primary: '#9B59B6',
      secondary: '#F5EEF8',
      accent: '#7D3C98'
    }
  }
];

export const templates: Template[] = [  // --- MENSAJES DEL CORAZÓN ---
  {
    id: 'corazon-lluvia',
    categoryId: 'corazon',
    name: '🌧️ Lluvia de Sentimientos',
    description: 'Para cuando las palabras sobran y las emociones mandan. Fondo lluvioso y música de fondo que acompaña.',
    style: 'elegant',
    preview: '💔 Lo que siento',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a1a',
      text: '#FFFFFF',
      accent: '#6C63FF',
      secondary: '#1a1a2e'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/dinner-candles-dark.jpg',
    backgroundVideo: '/templates/lluvia-ventana-mp4.mp4'
  },
  {
    id: 'corazon-perdon',
    categoryId: 'corazon',
    name: '🙏 Perdóname',
    description: 'Para los que la regaron y quieren pedir disculpas de verdad. Sincero, emotivo, directo al corazón.',
    style: 'elegant',
    preview: '🥲 Lo siento de verdad',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1a0a0a',
      text: '#FFFFFF',
      accent: '#E91E63',
      secondary: '#2d1a1a'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/dinner-candles-dark.jpg',
    backgroundVideo: '/templates/chimenea-mp4.mp4'
  },
  {
    id: 'corazon-amor',
    categoryId: 'corazon',
    name: '❤️ Te Amo',
    description: 'Declará tu amor con una tarjeta única, con tu foto, tu música y tus palabras.',
    style: 'elegant',
    preview: '💕 Amor puro',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0d0010',
      text: '#FFFFFF',
      accent: '#FF6B9D',
      secondary: '#1a0020'
    },
    defaultFont: 'Great Vibes',
    backgroundImage: '/templates/dinner-candles-dark.jpg',
    backgroundVideo: '/templates/cafe-mp4.mp4'
  },
  {
    id: 'corazon-despecho',
    categoryId: 'corazon',
    name: '🔥 Esa No Vuelve',
    description: 'Para los que quieren gritar al mundo que van para adelante. Sin drama, con actitud.',
    style: 'modern',
    preview: '😎 Yo ya sano',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#FF3D00',
      secondary: '#1a0000'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/party-neon-club.jpg',
    backgroundVideo: '/templates/chimenea-mp4.mp4'
  },
  {
    id: 'corazon-nueva-etapa',
    categoryId: 'corazon',
    name: '🌅 Nueva Etapa',
    description: 'Cuando cerraste un capítulo y estás listo para el siguiente. Mensaje de esperanza y nueva energía.',
    style: 'minimal',
    preview: '🌱 Renací',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#f8f9fa',
      text: '#2c3e50',
      accent: '#27AE60',
      secondary: '#ecf0f1'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/camping-forest-glow.jpg',
    backgroundVideo: '/templates/arbol-mp4.mp4'
  },
  {
    id: 'corazon-nostalgia',
    categoryId: 'corazon',
    name: '🌌 Yo Te Extraño',
    description: 'Para los que extrañan a alguien y quieren decirlo con música y palabras propias.',
    style: 'elegant',
    preview: '💔 Me faltás',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0f0020',
      text: '#E0D7FF',
      accent: '#9B59B6',
      secondary: '#1a0033'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/camping-starry-fire.jpg',
    backgroundVideo: '/templates/luna-mp4.mp4'
  },
  {
    id: 'corazon-gracias',
    categoryId: 'corazon',
    name: '🤍 Gracias por Todo',
    description: 'Para agradecerle a alguien especial con un mensaje que se queda en el alma.',
    style: 'playful',
    preview: '😊 Sos lo mejor',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#2c3e50',
      accent: '#F39C12',
      secondary: '#FFF9E3'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/fifteen-decor-pastel.jpg',
    backgroundVideo: '/templates/cafe-mp4.mp4'
  },
  {
    id: 'corazon-segunda-oportunidad',
    categoryId: 'corazon',
    name: '🕊️ Segunda Oportunidad',
    description: 'Para los valientes que dan el paso de pedir otra chance. Una sola oportunidad de hacerlo bien.',
    style: 'elegant',
    preview: '💖 Dame otra oportunidad',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a1a',
      text: '#FFFFFF',
      accent: '#3498DB',
      secondary: '#1a1a2e'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/camping-glamping-stars.jpg',
    backgroundVideo: '/templates/arbol-mp4.mp4'
  },

  // --- MIS 18 AÑOS ---
  {
    id: '18-neon-club',
    categoryId: 'eighteenth',
    name: 'Edición Neon Club',
    description: 'Estética de boliche con neones azules. La opción más elegida para un 18 inolvidable.',
    style: 'modern',
    preview: '🌌 ¡Noche de 18!',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#00D4FF',
      secondary: '#001524'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/party-neon-club.jpg'
  },
  {
    id: '18-dj-session',
    categoryId: 'eighteenth',
    name: 'DJ Session 18',
    description: 'Para los que aman la música electrónica y el ritmo. Una invitación que suena a fiesta.',
    style: 'modern',
    preview: '🎧 Sube el Volumen',
    layout: 'centered',
    defaultColors: {
      background: '#1a0033',
      text: '#ffffff',
      accent: '#ff007f',
      secondary: '#2d0059'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/party-dj-turntable.jpg'
  },
  {
    id: '18-asado-friends',
    categoryId: 'eighteenth',
    name: 'Asado & Amigos',
    description: 'Un clásico para los 18: asado, música y la mejor compañía en un ambiente relajado.',
    style: 'rustic',
    preview: '🥩 Parrilla y 18',
    layout: 'centered',
    defaultColors: {
      background: '#ffffff',
      text: '#2c3e50',
      accent: '#e67e22',
      secondary: '#fbeee6'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/dinner-asado-beer.jpg'
  },
  {
    id: '18-concert-live',
    categoryId: 'eighteenth',
    name: 'Main Stage 18',
    description: 'Si tu fiesta es un festival, esta es tu invitación. Luces, gente y pura adrenalina.',
    style: 'modern',
    preview: '🤘 Festival 18',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#ffffff',
      accent: '#3498db',
      secondary: '#2c3e50'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/party-concert-crowd.jpg'
  },
  // --- MIS 18 AÑOS - LIVE (VIDEO) PREMIUM ---
  {
    id: '18-boliche-live',
    categoryId: 'eighteenth',
    name: '🕺 Noche de Boliche Live',
    description: 'La fiesta más hot del año. Luces, baile y las 18 velas en un video que te pone la piel de gallina.',
    style: 'modern',
    preview: '🔥 ¡A reventar la pista!',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#00D4FF',
      secondary: '#001524'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/party-neon-club.jpg',
    backgroundVideo: '/templates/boliche-18-mp4.mp4'
  },
  {
    id: '18-descorche-live',
    categoryId: 'eighteenth',
    name: '🥂 Descorche de los 18 Live',
    description: 'El chamán del brindis: una botella estallando en movimiento. Para los que festejan a lo grande con estilo.',
    style: 'elegant',
    preview: '🍾 A brindar por los 18',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a0a',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#1a1a1a'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/party-concert-crowd.jpg',
    backgroundVideo: '/templates/descorche-18-mp4.mp4'
  },
  {
    id: '18-remolino-live',
    categoryId: 'eighteenth',
    name: '✨ Remolino de Luces 18 Live',
    description: 'Un torbellino de luces y colores que te arrastra a la fiesta. Dinámico, hipnótico y único para los 18.',
    style: 'modern',
    preview: '🌀 Gira la Pista',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1a0033',
      text: '#FFFFFF',
      accent: '#FF007F',
      secondary: '#2d0059'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/party-dj-turntable.jpg',
    backgroundVideo: '/templates/remolino-18-mp4.mp4'
  },
  {
    id: '18-ondas-live',
    categoryId: 'eighteenth',
    name: '🎧 Ondas de Sonido 18 Live',
    description: 'Visualización de ondas de música en movimiento. La invitación perfecta para los amantes del DJ y la electrónica.',
    style: 'modern',
    preview: '🔊 Bass & Beats',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#00FFAB',
      secondary: '#111111'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/party-neon-club.jpg',
    backgroundVideo: '/templates/ondas-18-mp4.mp4'
  },
  {
    id: '18-transicion-live',
    categoryId: 'eighteenth',
    name: 'Transición a la Adultez Live',
    description: 'Un viaje visual increíble que simboliza el paso a los 18 con efectos cinemáticos.',
    style: 'modern',
    preview: '🚀 El Gran Salto',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#00D4FF',
      secondary: '#001524'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/party-neon-club.jpg',
    backgroundVideo: '/templates/transiciona18-mp4.mp4'
  },
  {
    id: '18-gold-live',
    categoryId: 'eighteenth',
    name: '✨ Mis 18 Gold Live',
    description: 'Elegancia y brillo para recibir la mayoría de edad. Una lluvia dorada que rodea este momento único.',
    style: 'elegant',
    preview: '🥂 Brillo de los 18',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/party-concert-crowd.jpg',
    backgroundVideo: '/templates/mis18-mp4.mp4'
  },
  {
    id: '18-deba-live',
    categoryId: 'eighteenth',
    name: 'Mis 18 Elegance Live',
    description: 'Elegancia y distinción para celebrar la mayoría de edad con un toque sofisticado.',
    style: 'elegant',
    preview: '✨ Distinción 18',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/party-concert-crowd.jpg',
    backgroundVideo: '/templates/debba18-mp4.mp4'
  },
  {
    id: '18-rock-live',
    categoryId: 'eighteenth',
    name: '18 Rock & Party Live',
    description: 'Toda la energía del rock y la fiesta para un cumpleaños inolvidable y vibrante.',
    style: 'modern',
    preview: '🎸 ¡A Puro Rock!',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a0a',
      text: '#FFFFFF',
      accent: '#FF4757',
      secondary: '#2f3542'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/party-lights-stage.jpg',
    backgroundVideo: '/templates/18rock-mp4.mp4'
  },
  {
    id: '18-city-live',
    categoryId: 'eighteenth',
    name: '18 Urban Style Live',
    description: 'Estilo urbano y aventurero por la ciudad para celebrar tus 18 años con toda la onda.',
    style: 'modern',
    preview: '🏙️ Estilo Urbano',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#2c3e50',
      text: '#FFFFFF',
      accent: '#00D4FF',
      secondary: '#34495e'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/party-neon-club.jpg',
    backgroundVideo: '/templates/18porlaciudad-mp4.mp4'
  },


  {
    id: 'party-lights-stage',
    categoryId: 'other',
    name: 'Noche de Luces',
    description: 'Potentes haces de luz naranja cruzando el escenario. Transmite la energía y la emoción de un gran evento en vivo.',
    style: 'modern',
    preview: '✨ Energía Viva',
    layout: 'centered',
    defaultColors: {
      background: '#0F0601',
      text: '#FFFFFF',
      accent: '#FF7F50',
      secondary: '#1A0B02'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/party-lights-stage.jpg'
  },
  {
    id: 'party-neon-club',
    categoryId: 'other',
    name: 'Vibras de Club',
    description: 'Pasillo moderno con tubos de neón azul y atmósfera de fiesta nocturna. Ideal para cumpleaños de adultos o eventos de música electrónica.',
    style: 'modern',
    preview: '🌌 Estilo Neon',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#00D4FF',
      secondary: '#101416'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/party-neon-club.jpg'
  },
  {
    id: 'party-dj-turntable',
    categoryId: 'other',
    name: 'Ritmo en las Manos',
    description: 'Primer plano de una consola de DJ bajo luces violetas. La invitación definitiva para una fiesta donde la música es la protagonista.',
    style: 'modern',
    preview: '🎧 ¡Sube el Volumen!',
    layout: 'centered',
    defaultColors: {
      background: '#1A0033',
      text: '#FFFFFF',
      accent: '#FF007F',
      secondary: '#2D0059'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/party-dj-turntable.jpg'
  },
  {
    id: 'party-concert-crowd',
    categoryId: 'other',
    name: 'Show Inolvidable',
    description: 'La multitud con las manos arriba frente a un escenario iluminado con láseres. Capta la euforia de un concierto o festival.',
    style: 'modern',
    preview: '🤘 Fanatismo Puro',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#3498DB',
      secondary: '#2C3E50'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/party-concert-crowd.jpg'
  },
  {
    id: 'party-confetti-crowd',
    categoryId: 'other',
    name: 'Lluvia de Alegría',
    description: 'Explosión de papel picado sobre la gente bajo focos potentes. Festeja tus logros o eventos especiales con pura energía.',
    style: 'playful',
    preview: '🎉 ¡A Festejar!',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#F1C40F',
      secondary: '#1C2833'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/party-confetti-crowd.jpg'
  },
  {
    id: 'communion-chalice-bread',
    categoryId: 'communion',
    name: 'Pan de Vida Rústico',
    description: 'Un cáliz de plata grabada y pan artesanal sobre una manta de lino. Una imagen clásica y solemne para una primera comunión.',
    style: 'rustic',
    preview: '🍷 Cáliz y Pan',
    layout: 'centered',
    defaultColors: {
      background: '#1A1A1A',
      text: '#F5E6CC',
      accent: '#D4AF37',
      secondary: '#2D3436'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/communion-chalice-bread.jpg'
  },
  {
    id: 'communion-bible-wine',
    categoryId: 'communion',
    name: 'Palabra Sagrada',
    description: 'La Biblia abierta junto a una copa de vino y hostias sobre una mesa de madera cálida. Transmite paz y espiritualidad.',
    style: 'elegant',
    preview: '📖 Fe y Devoción',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A3728',
      accent: '#B76E79',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Lora',
    backgroundImage: '/templates/communion-bible-wine.jpg'
  },
  {
    id: 'communion-crown-chalice',
    categoryId: 'communion',
    name: 'Sacrificio y Gracia',
    description: 'Una corona de espinas junto a un cáliz moderno bajo luces artísticas. Un diseño simbólico y profundo.',
    style: 'modern',
    preview: '🕯️ Símbolos de Fe',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#E67E22',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/communion-crown-chalice.jpg'
  },
  {
    id: 'communion-bread-white',
    categoryId: 'communion',
    name: 'Pureza de la Eucaristía',
    description: 'Pan rústico y un cáliz de plata sobre un mantel blanco impecable. Capta la esencia pura de la ceremonia.',
    style: 'elegant',
    preview: '🕊️ Luz de Fe',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#3498DB',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/communion-bread-white.jpg'
  },
  {
    id: 'wedding-garden-sweets',
    categoryId: 'wedding',
    name: 'Dulzura en el Jardín',
    description: 'Espectacular mesa de postres al aire libre bajo una carpa blanca, capturando la alegría de una celebración en contacto con la naturaleza.',
    style: 'elegant',
    preview: '🍰 Banquete al Aire Libre',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#27AE60',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/wedding-garden-sweets.jpg'
  },
  {
    id: 'wedding-rustic-cupcakes',
    categoryId: 'wedding',
    name: 'Rincón de Cupcakes Rústico',
    description: 'Torres de cupcakes y detalles de madera bajo luces cálidas, ideal para bodas con estilo campestre, boho o rústico.',
    style: 'rustic',
    preview: '🧁 Dulzura Campestre',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A3728',
      accent: '#B76E79',
      secondary: '#F8E9E9'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/wedding-rustic-cupcakes.jpg'
  },
  {
    id: 'fifteen-cake-gold',
    categoryId: 'quinceanera',
    name: 'Mis Quince de Oro',
    description: 'Elegante pastel blanco con flores amarillas y azules y un topper dorado de "15". Ideal para una fiesta clásica y luminosa.',
    style: 'elegant',
    preview: '🎂 Quince Dorado',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2C3E50',
      accent: '#D4AF37',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/fifteen-cake-gold.jpg'
  },
  {
    id: 'fifteen-table-long',
    categoryId: 'quinceanera',
    name: 'Banquete de Sueños',
    description: 'Mesa larga impecablemente servida con detalles en rosa y flores frescas bajo una luz cálida y acogedora.',
    style: 'elegant',
    preview: '🍽️ Mesa de Honor',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A3728',
      accent: '#B76E79',
      secondary: '#F8E9E9'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/fifteen-table-long.jpg'
  },
  {
    id: 'fifteen-decor-pastel',
    categoryId: 'quinceanera',
    name: 'Mundo Pastel',
    description: 'Decoración integral con globos, flores gigantes y números luminosos. Captura la alegría y el color de un festejo inolvidable.',
    style: 'playful',
    preview: '🎈 Fiesta de Color',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#87CEEB',
      secondary: '#E6F3FF'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/fifteen-decor-pastel.jpg'
  },
  {
    id: 'fifteen-party-neon',
    categoryId: 'quinceanera',
    name: 'Noche Mágica de Neón',
    description: 'Mesa de dulces vibrante bajo luces de colores en un ambiente de fiesta nocturna. Para una celebración llena de energía.',
    style: 'modern',
    preview: '✨ Luces y Fiesta',
    layout: 'centered',
    defaultColors: {
      background: '#0F0F0F',
      text: '#FFFFFF',
      accent: '#F1C40F',
      secondary: '#1C2833'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/fifteen-party-neon.jpg'
  },
  {
    id: 'fishing-lures-wood',
    categoryId: 'fishing',
    name: 'Colección de Señuelos',
    description: 'Varios señuelos coloridos sobre una mesa de madera rústica. Ideal para aficionados a la pesca deportiva y encuentros de pescadores.',
    style: 'rustic',
    preview: '🎣 Equipo Listo',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#E67E22',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/fishing-lures-wood.jpg'
  },
  {
    id: 'fishing-rod-sunset',
    categoryId: 'fishing',
    name: 'Pique al Atardecer',
    description: 'La silueta de una caña de pescar curva contra un horizonte naranja intenso. Capta la paz y la emoción de la última pesca del día.',
    style: 'elegant',
    preview: '🌅 Momento de Paz',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#F39C12',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/fishing-rod-sunset.jpg'
  },
  {
    id: 'fishing-boat-mist',
    categoryId: 'fishing',
    name: 'Bote en la Bruma',
    description: 'Un pescador solitario en su bote sobre aguas tranquilas y neblina. Una imagen artística y minimalista para retiros de pesca.',
    style: 'modern',
    preview: '🌫️ Silencio en el Agua',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2C3E50',
      accent: '#3498DB',
      secondary: '#ECF0F1'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/fishing-boat-mist.jpg'
  },
  {
    id: 'fishing-rod-lake',
    categoryId: 'fishing',
    name: 'Tarde de Laguna',
    description: 'Una caña de pescar sobre el agua calma de un lago cristalino. Refleja la tranquilidad de una jornada de pesca clásica.',
    style: 'rustic',
    preview: '🎣 Tranquilidad Pura',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#27AE60',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/fishing-rod-lake.jpg'
  },
  {
    id: 'theater-spotlight-chair',
    categoryId: 'theater',
    name: 'Protagonista por un Día',
    description: 'Una silla solitaria bajo el foco central sobre el escenario de madera. Transmite la emoción del teatro independiente y la actuación.',
    style: 'rustic',
    preview: '🎭 Solo en Escena',
    layout: 'centered',
    defaultColors: {
      background: '#0F0F0F',
      text: '#F5E6CC',
      accent: '#BF953F',
      secondary: '#2D3436'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/theater-spotlight-chair.jpg'
  },
  {
    id: 'theater-stage-lights',
    categoryId: 'theater',
    name: 'Noche de Show',
    description: 'El escenario iluminado desde la perspectiva de la audiencia. Capta la energía de una gran producción teatral o musical.',
    style: 'modern',
    preview: '✨ Escenario Vivo',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#3498DB',
      secondary: '#2980B9'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/theater-stage-lights.jpg'
  },
  {
    id: 'theater-actor-silhouettes',
    categoryId: 'theater',
    name: 'Sombras de Terciopelo',
    description: 'Siluetas de actores detrás del telón rojo. Un diseño artístico y misterioso perfecto para obras de drama o comedia.',
    style: 'elegant',
    preview: '🎭 Detrás del Telón',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#E74C3C',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/theater-actor-silhouettes.jpg'
  },
  {
    id: 'theater-grand-opera',
    categoryId: 'theater',
    name: 'Gala en la Ópera',
    description: 'La majestuosidad de un teatro clásico con sus Palcos y detalles dorados. Para los eventos más prestigiosos y formales.',
    style: 'elegant',
    preview: '🏟️ Gran Gala',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#F5E6CC',
      accent: '#D4AF37',
      secondary: '#5D4037'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/theater-grand-opera.jpg'
  },
  {
    id: 'cinema-hall-seats',
    categoryId: 'cinema',
    name: 'Gran Estreno',
    description: 'Filas de butacas rojas en la penumbra, capturando la expectativa antes de que comience la función.',
    style: 'elegant',
    preview: '🎬 Sala de Estreno',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#E74C3C',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/cinema-hall-seats.jpg'
  },
  {
    id: 'cinema-vintage-projector',
    categoryId: 'cinema',
    name: 'Cine Retro',
    description: 'Un proyector antiguo en acción con su haz de luz, ideal para ciclos de cine clásico o eventos nostálgicos.',
    style: 'rustic',
    preview: '📽️ Magia Analógica',
    layout: 'centered',
    defaultColors: {
      background: '#1A1A1A',
      text: '#F5E6CC',
      accent: '#BF953F',
      secondary: '#2D3436'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/cinema-vintage-projector.jpg'
  },
  {
    id: 'cinema-clapperboard-popcorn',
    categoryId: 'cinema',
    name: 'Noche de Popcorn',
    description: 'Claqueta y pochoclos sobre un fondo amarillo vibrante. La invitación más divertida para una movie-night.',
    style: 'playful',
    preview: '🍿 ¡Acción y Sabor!',
    layout: 'centered',
    defaultColors: {
      background: '#FFD700',
      text: '#000000',
      accent: '#000000',
      secondary: '#FFFFFF'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/cinema-clapperboard-popcorn.jpg'
  },
  {
    id: 'cinema-theatre-curtain',
    categoryId: 'cinema',
    name: 'El Telón se Abre',
    description: 'Clásico telón de terciopelo rojo, perfecto para grandes anuncios, galas o funciones especiales.',
    style: 'elegant',
    preview: '🎭 Función de Gala',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#BF953F',
      secondary: '#E74C3C'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/cinema-theatre-curtain.jpg'
  },
  {
    id: 'dinner-candles-dark',
    categoryId: 'dinner',
    name: 'Cena a la Luz de las Velas',
    description: 'Mesa rústica de madera iluminada por velas, ideal para cenas románticas de aniversario o eventos íntimos.',
    style: 'elegant',
    preview: '🕯️ Romance Sutil',
    layout: 'centered',
    defaultColors: {
      background: '#0F0F0F',
      text: '#F5E6CC',
      accent: '#D4AF37',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/dinner-candles-dark.jpg'
  },
  {
    id: 'dinner-bread-rustic',
    categoryId: 'dinner',
    name: 'Encuentro Rústico',
    description: 'Pan casero y mesa servida con calidez. Perfecto para desayunos de trabajo, meriendas o cenas familiares.',
    style: 'rustic',
    preview: '🥖 Calidez de Hogar',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A3728',
      accent: '#8D6E63',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/dinner-bread-rustic.jpg'
  },
  {
    id: 'dinner-modern-lamp',
    categoryId: 'dinner',
    name: 'Noche Cristalina',
    description: 'Mesa moderna con lámpara de cristal y platos gourmet, para eventos vanguardistas y cenas con estilo.',
    style: 'modern',
    preview: '💎 Brillo Moderno',
    layout: 'centered',
    defaultColors: {
      background: '#1A1A1A',
      text: '#FFFFFF',
      accent: '#BF953F',
      secondary: '#2D3436'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/dinner-modern-lamp.jpg'
  },
  {
    id: 'dinner-meat-skewers',
    categoryId: 'dinner',
    name: 'Banquete de Brochetas',
    description: 'Deliciosas brochetas de carne y vegetales a la vista, para almuerzos festivos y juntadas informales.',
    style: 'playful',
    preview: '🍢 Sabor al Fuego',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#C0392B',
      secondary: '#FADBD8'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/dinner-meat-skewers.jpg'
  },
  {
    id: 'dinner-asado-beer',
    categoryId: 'dinner',
    name: 'Asado y Amigos',
    description: 'La combinación perfecta: una buena picada, una cerveza fría y el fuego de la parrilla de fondo.',
    style: 'rustic',
    preview: '🥩 El Clásico Argentino',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2C3E50',
      accent: '#E67E22',
      secondary: '#FBEEE6'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/dinner-asado-beer.jpg'
  },
  {
    id: 'dinner-mixed-grill',
    categoryId: 'dinner',
    name: 'Gran Banquete',
    description: 'Una tabla repleta de carnes, papas y delicias. Ideal para reuniones familiares o festejos grandes.',
    style: 'playful',
    preview: '🥘 ¡A Comer!',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#C0392B',
      secondary: '#FADBD8'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/dinner-mixed-grill.jpg'
  },

  // --- CENAS/REUNIONES LIVE (VIDEO) ---
  {
    id: 'dinner-asado-live',
    categoryId: 'dinner',
    name: 'Asado Criollo',
    description: 'El ritual del fuego y la carne, ideal para juntadas multitudinarias y domingos en familia.',
    style: 'rustic',
    preview: '🔥 Parrilla y Amigos',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1a1a1a',
      text: '#ffffff',
      accent: '#e67e22',
      secondary: '#2c3e50'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/dinner-mixed-grill.jpg', // Placeholder
    backgroundVideo: '/templates/dinner-asado.mp4'
  },
  {
    id: 'dinner-velas-live',
    categoryId: 'dinner',
    name: 'Cena a las Velas',
    description: 'Ambiente romántico y tenue para cenas íntimas, aniversarios o eventos nocturnos elegantes.',
    style: 'elegant',
    preview: '🕯️ Velada Mágica',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a0a',
      text: '#f1c40f',
      accent: '#bf953f',
      secondary: '#1c2833'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/dinner-elegant-table.jpg',
    backgroundVideo: '/templates/dinner-velas.mp4'
  },
  {
    id: 'dinner-picada-live',
    categoryId: 'dinner',
    name: 'Tabla de Picada',
    description: 'Momento relax con una buena tabla de quesos y fiambres. Perfecto para un after-office o reunión casual.',
    style: 'playful',
    preview: '🧀 Picada y Charla',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#fdfcfb',
      text: '#5d4037',
      accent: '#8d6e63',
      secondary: '#efebe9'
    },
    defaultFont: 'Comfortaa',
    backgroundImage: '/templates/dinner-meat-skewers.jpg',
    backgroundVideo: '/templates/dinner-picada.mp4'
  },
  {
    id: 'dinner-pizza-live',
    categoryId: 'dinner',
    name: 'Pizza & Friends',
    description: 'Diversión garantizada con pizzas caseras y la mejor compañía. Ideal para cumpleaños informales.',
    style: 'playful',
    preview: '🍕 Noche de Pizza',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#ffffff',
      text: '#333333',
      accent: '#e74c3c',
      secondary: '#fdfcfb'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/dinner-bread-rustic.jpg',
    backgroundVideo: '/templates/dinner-pizza.mp4'
  },

  {
    id: 'dinner-sausages-grill',
    categoryId: 'dinner',
    name: 'Choripaneada Vip',
    description: 'Chorizos dorándose en la parrilla, el alma de cualquier juntada casual con amigos.',
    style: 'rustic',
    preview: '🔥 Parrilla Encendida',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#333333',
      accent: '#D35400',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/dinner-sausages-grill.jpg'
  },
  {
    id: 'dinner-elegant-table',
    categoryId: 'dinner',
    name: 'Cena Gourmet',
    description: 'Un ambiente íntimo y sofisticado con platos delicados. Para cenas de aniversario o reuniones exclusivas.',
    style: 'elegant',
    preview: '🍷 Sabor y Elegancia',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#BF953F',
      secondary: '#1C2833'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/dinner-elegant-table.jpg'
  },

  // --- EXCURSIONES LIVE (VIDEO) ---
  {
    id: 'hikes-trekking-live',
    categoryId: 'hikes',
    name: 'Ruta de Trekking',
    description: 'Aventura a pie por senderos naturales, ideal para invitar a grupos de caminata o turismo aventura.',
    style: 'rustic',
    preview: '🥾 Exploración Natural',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#27AE60',
      text: '#FFFFFF',
      accent: '#F39C12',
      secondary: '#1E8449'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/excursion-mountains-lake.jpg', // Placeholder
    backgroundVideo: '/templates/excursion-trekking.mp4'
  },
  {
    id: 'hikes-ciudad-live',
    categoryId: 'hikes',
    name: 'Walking Tour',
    description: 'Recorrido dinámico por el corazón de la ciudad, pensado para paseos urbanos, visitas guiadas y turismo.',
    style: 'modern',
    preview: '🏙️ Tour Urbano',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#2C3E50',
      text: '#FFFFFF',
      accent: '#E74C3C',
      secondary: '#34495E'
    },
    defaultFont: 'Poppins',
    backgroundImage: '/templates/excursion-mountains-lake.jpg',
    backgroundVideo: '/templates/excursion-ciudad.mp4'
  },
  {
    id: 'hikes-barco-live',
    categoryId: 'hikes',
    name: 'Paseo en Barco',
    description: 'Navegación relajante sobre aguas cristalinas, perfecto para excursiones marítimas o jornadas de pesca.',
    style: 'elegant',
    preview: '⛴️ Brisa y Mar',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#2980B9',
      text: '#FFFFFF',
      accent: '#1ABC9C',
      secondary: '#1A5276'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/excursion-mountains-lake.jpg',
    backgroundVideo: '/templates/excursion-barco.mp4'
  },

  {
    id: 'excursion-volcano-path',
    categoryId: 'hikes',
    name: 'Ascenso al Cráter',
    description: 'Camino serpenteante hacia la cima del volcán entre la nieve y la lava fría, una aventura inolvidable.',
    style: 'modern',
    preview: '🌋 Cumbre Nevada',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2C3E50',
      accent: '#3498DB',
      secondary: '#ECF0F1'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/excursion-volcano-path.jpg'
  },
  {
    id: 'excursion-volcano-crater',
    categoryId: 'hikes',
    name: 'Corazón del Volcán',
    description: 'Vista impresionante del cráter activo con fumarolas, ideal para expediciones geológicas y de aventura extrema.',
    style: 'rustic',
    preview: '🔥 Fuego y Roca',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A235A',
      accent: '#E67E22',
      secondary: '#FBEEE6'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/excursion-volcano-crater.jpg'
  },
  {
    id: 'excursion-mountains-lake',
    categoryId: 'hikes',
    name: 'Espejo de Montaña',
    description: 'Picos nevados reflejados en un lago cristalino, el destino perfecto para amantes del trekking y la fotografía.',
    style: 'elegant',
    preview: '🏔️ Reflejos del Fitz',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#27AE60',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/excursion-mountains-lake.jpg'
  },
  {
    id: 'camping-starry-fire',
    categoryId: 'camping',
    name: 'Fogata bajo las Estrellas',
    description: 'Una noche mágica alrededor del fuego con amigos, capturando la esencia pura del camping bajo un cielo estrellado.',
    style: 'rustic',
    preview: '🔥 Noche Mágica',
    layout: 'centered',
    defaultColors: {
      background: '#0B1026',
      text: '#FFFFFF',
      accent: '#E67E22',
      secondary: '#2C3E50'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/camping-starry-fire.jpg'
  },
  {
    id: 'camping-lake-mug',
    categoryId: 'camping',
    name: 'Amanecer en el Lago',
    description: 'Un café caliente frente a las montañas y el lago, ideal para retiros naturales o escapadas de fin de semana.',
    style: 'rustic',
    preview: '☕ Paz en la Montaña',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#3498DB',
      secondary: '#ECF0F1'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/camping-lake-mug.jpg'
  },
  {
    id: 'camping-tent-view',
    categoryId: 'camping',
    name: 'Refugio en el Bosque',
    description: 'La vista perfecta desde tu carpa hacia el bosque y la fogata, invitando a la aventura y la desconexión.',
    style: 'rustic',
    preview: '⛺ Mirada al Bosque',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#27AE60',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/camping-tent-view.jpg'
  },
  {
    id: 'camping-forest-glow',
    categoryId: 'camping',
    name: 'Brillo del Bosque',
    description: 'Una carpa iluminada bajo un cielo estrellado espectacular, simbolizando calidez en medio de la naturaleza salvaje.',
    style: 'modern',
    preview: '✨ Sueños Estrellados',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#F1C40F',
      secondary: '#1C2833'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/camping-forest-glow.jpg'
  },
  {
    id: 'camping-glamping-stars',
    categoryId: 'camping',
    name: 'Glamping Milky Way',
    description: 'Lujo y naturaleza bajo la Vía Láctea, ideal para eventos exclusivos al aire libre y noches inolvidables.',
    style: 'elegant',
    preview: '🌌 Galaxia y Confort',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2C3E50',
      accent: '#8E44AD',
      secondary: '#F4ECF7'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/camping-glamping-stars.jpg'
  },

  // --- ANIVERSARIOS LIVE (VIDEO) ---
  {
    id: 'anniversary-brindis-live',
    categoryId: 'anniversary',
    name: 'Brindis de Amor',
    description: 'Un romántico brindis en video, ideal para celebrar un año más de amor incondicional.',
    style: 'elegant',
    preview: '🥂 Salud por el Amor',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/anniversary-hourglass.jpg',
    backgroundVideo: '/templates/aniversario-brindis.mp4'
  },
  {
    id: 'anniversary-fantasia-live',
    categoryId: 'anniversary',
    name: 'Fantasía Romántica',
    description: 'Hermosa escena de fantasía animada, perfecta para revivir lo mágico de la relación.',
    style: 'modern',
    preview: '✨ Romance Mágico',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A235A',
      accent: '#9B59B6',
      secondary: '#F5EEF8'
    },
    defaultFont: 'Great Vibes',
    backgroundImage: '/templates/anniversary-modern-gifts.jpg',
    backgroundVideo: '/templates/aniversario-fantasia.mp4'
  },
  {
    id: 'anniversary-pasando-vida-live',
    categoryId: 'anniversary',
    name: 'La Vida Juntos',
    description: 'Un emotivo video que celebra el recorrido de la vida acompañados.',
    style: 'rustic',
    preview: '🌅 Un Camino Juntos',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#2C3E50',
      text: '#ECF0F1',
      accent: '#E74C3C',
      secondary: '#34495E'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/anniversary-traditional-tea.jpg',
    backgroundVideo: '/templates/aniversario-pasando-vida.mp4'
  },
  {
    id: 'anniversary-recuerdos-live',
    categoryId: 'anniversary',
    name: 'Recuerdos de Oro',
    description: 'Destellos y luz cálida para honrar los momentos inolvidables construidos en el tiempo.',
    style: 'elegant',
    preview: '📸 Memoria y Amor',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#5D4037',
      accent: '#E67E22',
      secondary: '#FEF5E7'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/anniversary-pink-gift.jpg',
    backgroundVideo: '/templates/aniversario-recuerdos.mp4'
  },

  {
    id: 'anniversary-hourglass',
    categoryId: 'anniversary',
    name: 'El Tiempo a tu Lado',
    description: 'Reloj de arena sobre un fondo negro profundo, capturando la esencia de los momentos eternos compartidos.',
    style: 'elegant',
    preview: '⌛ Momentos Eternos',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#BF953F',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/anniversary-hourglass.jpg'
  },
  {
    id: 'anniversary-traditional-tea',
    categoryId: 'anniversary',
    name: 'Tradición y Armonía',
    description: 'Elegante juego de té tradicional chino sobre una mesa de madera, simbolizando la unión y la paz en el hogar.',
    style: 'elegant',
    preview: '🍵 Armonía Familiar',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#D35400',
      accent: '#27AE60',
      secondary: '#FEF5E7'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/anniversary-traditional-tea.jpg'
  },
  {
    id: 'anniversary-modern-gifts',
    categoryId: 'anniversary',
    name: 'Momentos Preciosos',
    description: 'Composición sofisticada de regalos envueltos en tonos oscuros con flores blancas, ideal para una celebración íntima.',
    style: 'elegant',
    preview: '🎁 Detalles de Amor',
    layout: 'centered',
    defaultColors: {
      background: '#1A1A1A',
      text: '#FFFFFF',
      accent: '#8D6E63',
      secondary: '#2C3E50'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/anniversary-modern-gifts.jpg'
  },
  {
    id: 'anniversary-pink-gift',
    categoryId: 'anniversary',
    name: 'Detalle de Amor',
    description: 'Caja de regalo fucsia vibrante rodeada de corazones dorados brillantes sobre un fondo rosa suave.',
    style: 'playful',
    preview: '💝 Sorpresa Brillante',
    layout: 'centered',
    defaultColors: {
      background: '#FDF2F2',
      text: '#4A235A',
      accent: '#D4AF37',
      secondary: '#FFFFFF'
    },
    defaultFont: 'Pacifico',
    backgroundImage: '/templates/anniversary-pink-gift.jpg'
  },

  // --- DEPORTES LIVE (VIDEO) ---
  {
    id: 'sports-futbol-live',
    categoryId: 'sports',
    name: '¡Golazo!',
    description: 'Emocionante celebración de un gol en un estadio. Ideal para torneos o cumpleaños temáticos de fútbol.',
    style: 'modern',
    preview: '⚽ Pasión de Multitudes',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#27AE60',
      text: '#FFFFFF',
      accent: '#F1C40F',
      secondary: '#1E8449'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/sports-soccer.png', // Placeholder
    backgroundVideo: '/templates/sports-futbol.mp4'
  },
  {
    id: 'sports-boxeo-live',
    categoryId: 'sports',
    name: 'Noche de Pelea',
    description: 'Careo intenso en el ring, perfecto para promocionar exhibiciones de boxeo o eventos de artes marciales.',
    style: 'elegant',
    preview: '🥊 Combate Estelar',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1A1A1A',
      text: '#FFFFFF',
      accent: '#E74C3C',
      secondary: '#000000'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/sports-karate.jpg',
    backgroundVideo: '/templates/sports-boxeo.mp4'
  },
  {
    id: 'sports-running-live',
    categoryId: 'sports',
    name: 'Maratón Activa',
    description: 'Toma inspiradora de zapatillas corriendo, ideal para invitar a maratones, carreras o grupos de running.',
    style: 'modern',
    preview: '🏃‍♂️ Supera tus Metas',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#3498DB',
      text: '#FFFFFF',
      accent: '#F39C12',
      secondary: '#2980B9'
    },
    defaultFont: 'Poppins',
    backgroundImage: '/templates/anniversary-pink-gift.jpg',
    backgroundVideo: '/templates/sports-running.mp4'
  },
  {
    id: 'sports-crossfit-live',
    categoryId: 'sports',
    name: 'Crossfit Extremo',
    description: 'Pura energía y superación. La invitación perfecta para entrenamientos, competencias o cumples fitness.',
    style: 'modern',
    preview: '🏋️‍♂️ Fuerza Total',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#FFD700',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/sports-boxing.jpg',
    backgroundVideo: '/templates/crossfit-mp4.mp4'
  },
  {
    id: 'sports-paddle-live',
    categoryId: 'sports',
    name: 'Paddle Master',
    description: 'Para los fanáticos del 20x10. Una invitación que respira sport y competencia.',
    style: 'modern',
    preview: '🎾 Saque y Red',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#EBF5FB',
      text: '#0C3D5D',
      accent: '#D7FB01',
      secondary: '#EBF5FB'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/sports-tennis.jpg',
    backgroundVideo: '/templates/paddle-mp4.mp4'
  },

  {
    id: 'sports-boxer-art',
    categoryId: 'sports',
    name: 'Promesa del Ring',
    description: 'Ilustración artística de un joven boxeador con estilo manga/cómic, ideal para eventos infantiles de boxeo o exhibiciones.',
    style: 'playful',
    preview: '🥊 El Próximo Campeón',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#0984E3',
      secondary: '#DFE6E9'
    },
    defaultFont: 'Poppins',
    backgroundImage: '/templates/sports-boxer-art.jpg'
  },
  {
    id: 'sports-tennis',
    categoryId: 'sports',
    name: 'Match Point',
    description: 'Impactante toma cenital de raqueta y pelota sobre court profesional, ideal para torneos y eventos exclusivos.',
    style: 'modern',
    preview: '🎾 Juego, Set y Partido',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#0C3D5D',
      accent: '#D7FB01',
      secondary: '#EBF5FB'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/sports-tennis.jpg'
  },
  {
    id: 'sports-boxing',
    categoryId: 'sports',
    name: 'Arena de Campeones',
    description: 'Impactante vista de un ring de boxeo con humo y luces, perfecto para eventos de combate o entrenamientos intensos.',
    style: 'modern',
    preview: '🥊 Fuerza y Determinación',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#E74C3C',
      secondary: '#2C3E50'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/sports-boxing.jpg'
  },
  {
    id: 'sports-racing-flag',
    categoryId: 'sports',
    name: 'Gran Premio',
    description: 'Clásica bandera a cuadros flameando, ideal para torneos de karting, carreras o eventos de automovilismo.',
    style: 'playful',
    preview: '🏁 Velocidad Final',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#1A1A1A',
      accent: '#333333',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/sports-racing-flag.jpg'
  },
  {
    id: 'sports-cycling',
    categoryId: 'sports',
    name: 'Ruta del Esfuerzo',
    description: 'Captura la esencia del ciclismo en ruta con una toma cinematográfica de ciclistas bajo la luz dorada del atardecer.',
    style: 'modern',
    preview: '🚴‍♂️ Kilómetros de Pasión',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#E67E22',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/sports-cycling.jpg'
  },
  {
    id: 'sports-soccer',
    categoryId: 'sports',
    name: 'Pasión por el Gol',
    description: 'Detalle de botín y balón de fútbol en el césped, la invitación definitiva para partidos y torneos.',
    style: 'playful',
    preview: '⚽ Al Ángulo',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#27AE60',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/sports-soccer.png'
  },
  {
    id: 'sports-karate',
    categoryId: 'sports',
    name: 'Dojo de Honor',
    description: 'Atmósfera auténtica de un dojo de artes marciales con practicantes en acción, reflejando disciplina y tradición.',
    style: 'elegant',
    preview: '🥋 Disciplina y Poder',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#C0392B',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/sports-karate.jpg'
  },

  // --- GRADUACIONES LIVE (VIDEO) ---
  {
    id: 'graduation-camino-live',
    categoryId: 'graduation',
    name: 'Comienza el Camino',
    description: 'Animación emotiva y elegante que refleja el inicio de una nueva etapa profesional.',
    style: 'elegant',
    preview: '🌟 Un Nuevo Futuro',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a192f',
      text: '#FFFFFF',
      accent: '#FFD700',
      secondary: '#112240'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/corporate-desk-wood.jpg', // Placeholder background
    backgroundVideo: '/templates/graduacion-camino.mp4'
  },
  {
    id: 'graduation-general-live',
    categoryId: 'graduation',
    name: '¡Graduados!',
    description: 'Celebración animada con confeti y alegría, ideal para el festejo grupal.',
    style: 'playful',
    preview: '🎓 Pura Celebración',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#2C3E50',
      text: '#FFFFFF',
      accent: '#E74C3C',
      secondary: '#34495E'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/corporate-desk-wood.jpg',
    backgroundVideo: '/templates/graduacion-general.mp4'
  },
  {
    id: 'graduation-titulo-live',
    categoryId: 'graduation',
    name: 'Título en Mano',
    description: 'Elegante diploma animado, destacando el gran logro académico con estilo y seriedad.',
    style: 'elegant',
    preview: '📜 Orgullo y Logro',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FDFCFB',
      text: '#2C3E50',
      accent: '#D4AF37',
      secondary: '#FFFFFF'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/corporate-desk-wood.jpg',
    backgroundVideo: '/templates/graduacion-titulo.mp4'
  },

  // --- CORPORATIVOS LIVE (VIDEO) ---
  {
    id: 'corporate-brindis-live',
    categoryId: 'corporate',
    name: 'Brindis de Éxito',
    description: 'Elegante brindis corporativo, ideal para celebrar metas cumplidas o cenas de fin de año de la empresa.',
    style: 'elegant',
    preview: '🥂 Celebración VIP',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1A252F',
      text: '#FFFFFF',
      accent: '#F1C40F',
      secondary: '#2C3E50'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/corporate-desk-wood.jpg', // Placeholder background
    backgroundVideo: '/templates/corporate-brindis.mp4'
  },
  {
    id: 'corporate-conferencia-live',
    categoryId: 'corporate',
    name: 'Conferencia Spotlight',
    description: 'Impresionante escenario iluminado, diseñado para anunciar seminarios, charlas o eventos masivos.',
    style: 'modern',
    preview: '🎤 Escenario Global',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a0a',
      text: '#FFFFFF',
      accent: '#3498DB',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/corporate-modern-chair.jpg',
    backgroundVideo: '/templates/corporate-conferencia.mp4'
  },
  {
    id: 'corporate-tech-live',
    categoryId: 'corporate',
    name: 'Innovación Tech',
    description: 'Fondo dinámico y tecnológico perfecto para presentar nuevos productos o hackathons.',
    style: 'modern',
    preview: '💡 Startups y Futuro',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FDFCFB',
      text: '#2C3E50',
      accent: '#2ECC71',
      secondary: '#FFFFFF'
    },
    defaultFont: 'Poppins',
    backgroundImage: '/templates/corporate-laptop-white.jpg',
    backgroundVideo: '/templates/corporate-tech.mp4'
  },

  {
    id: 'corporate-desk-wood',
    categoryId: 'corporate',
    name: 'Oficina Ejecutiva',
    description: 'Espacio de trabajo sofisticado con escritorio de nogal y luz natural, ideal para reuniones directivas y lanzamientos.',
    style: 'elegant',
    preview: '🖥️ Profesionalismo Puro',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2C3E50',
      accent: '#2980B9',
      secondary: '#ECF0F1'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/corporate-desk-wood.jpg'
  },
  {
    id: 'corporate-laptop-white',
    categoryId: 'corporate',
    name: 'Workshop Creativo',
    description: 'Estética limpia y minimalista con herramientas de trabajo modernas, perfecta para talleres y capacitaciones.',
    style: 'modern',
    preview: '💻 Innovación Digital',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#0984E3',
      secondary: '#F5F6FA'
    },
    defaultFont: 'Poppins',
    backgroundImage: '/templates/corporate-laptop-white.jpg'
  },
  {
    id: 'corporate-lounge-plants',
    categoryId: 'corporate',
    name: 'Networking Lounge',
    description: 'Área social luminosa con vista urbana y vegetación, diseñada para cócteles y encuentros empresariales.',
    style: 'elegant',
    preview: '🌿 Conexión y Apertura',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#27AE60',
      secondary: '#F1F2F6'
    },
    defaultFont: ' Montserrat',
    backgroundImage: '/templates/corporate-lounge-plants.jpg'
  },
  {
    id: 'corporate-modern-chair',
    categoryId: 'corporate',
    name: 'Design Thinking',
    description: 'Composición cenital de diseño vanguardista, ideal para cumbres de tecnología y eventos de innovación.',
    style: 'modern',
    preview: '📐 Visión y Futuro',
    layout: 'centered',
    defaultColors: {
      background: '#1A1A1A',
      text: '#FFFFFF',
      accent: '#FF4757',
      secondary: '#2F3542'
    },
    defaultFont: 'Poppins',
    backgroundImage: '/templates/corporate-modern-chair.jpg'
  },
  {
    id: 'corporate-meeting-room',
    categoryId: 'corporate',
    name: 'Cumbre de Negocios',
    description: 'Sala de juntas contemporánea con acabados de madera y sillas de cuero, perfecta para conferencias y seminarios.',
    style: 'elegant',
    preview: '🤝 Liderazgo y Estrategia',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#3D2B1F',
      accent: '#D35400',
      secondary: '#FEF5E7'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/corporate-meeting-room.jpg'
  },
  {
    id: 'other-celebration-gift',
    categoryId: 'other',
    name: 'Regalos de Sorpresa',
    description: 'Elegante caja de regalo rosa con lazo dorado y confeti, ideal para cualquier tipo de celebración especial.',
    style: 'playful',
    preview: '🎁 ¡Una gran sorpresa!',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#D81B60',
      accent: '#FFC107',
      secondary: '#FCE4EC'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/anniversary-pink-gift.jpg'
  },
  {
    id: 'anniversary-floral-premium',
    categoryId: 'wedding',
    name: 'Aniversario Floral Premium',
    description: 'Una composición completa y elegante para celebrar años de amor con flores y detalles de lujo.',
    style: 'elegant',
    preview: '💍 Aniversario de Oro',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A3728',
      accent: '#D4AF37',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/aniversario2.jpg'
  },
  {
    id: 'anniversary-dried-rose',
    categoryId: 'anniversary',
    name: 'Rosa del Recuerdo',
    description: 'Sutil y minimalista toma de una rosa preservada sobre fondo blanco, símbolo de un amor que trasciende el tiempo.',
    style: 'elegant',
    preview: '🌹 Amor Eterno',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A235A',
      accent: '#9B59B6',
      secondary: '#F5EEF8'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/anniversary-dried-rose.jpg'
  },
  {
    id: 'wedding-gazebo-3d',
    categoryId: 'wedding',
    name: 'Gazebo de Ensueño',
    description: 'Elegante altar de bodas bajo un gazebo clásico rodeado de naturaleza, listo para la ceremonia.',
    style: 'elegant',
    preview: '🏛️ Boda de Cuento de Hadas',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#27AE60',
      secondary: '#F5F6FA'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/wedding-gazebo-3d.jpg'
  },
  {
    id: 'wedding-rings-luxury',
    categoryId: 'wedding',
    name: 'Alianzas Eternas',
    description: 'Enfoque clásico y detallado en las alianzas de boda sobre seda',
    style: 'elegant',
    preview: '💍 Un compromiso para siempre',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A3728',
      accent: '#D4AF37',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Great Vibes',
    backgroundImage: '/templates/wedding-rings.jpg'
  },
  {
    id: 'wedding-rings-floral',
    categoryId: 'wedding',
    name: 'Alianzas y Rosas',
    description: 'Toma artística de las alianzas descansando sobre un delicado ramo de rosas en tonos pastel.',
    style: 'elegant',
    preview: '🌸 Romance y flores',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#5D4037',
      accent: '#B76E79',
      secondary: '#FDF2F2'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/wedding-rings-floral.jpg'
  },
  {
    id: 'wedding-boho-jars',
    categoryId: 'wedding',
    name: 'Flores Silvestres Boho',
    description: 'Estética natural y delicada con flores blancas y lavanda en frascos vintage, ideal para bodas al aire libre.',
    style: 'rustic',
    preview: '🌿 Natural y bohemio',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A4A4A',
      accent: '#7F8C8D',
      secondary: '#F8F9F9'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/wedding-boho-jars.jpg'
  },
  {
    id: 'wedding-rustic-woods',
    categoryId: 'wedding',
    name: 'Madera Rústica Natural',
    description: 'Centro de mesa rústico sobre una rodaja de madera con flores silvestres y u toque de elegancia campestre.',
    style: 'rustic',
    preview: '🍂 Calidez y naturaleza',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#3D2B1F',
      accent: '#4B0082',
      secondary: '#FDF5E6'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/wedding-rustic-woods.jpg'
  },
  {
    id: 'wedding-rings-boxes',
    categoryId: 'wedding',
    name: 'El Gran Momento',
    description: 'Elegante presentación de las alianzas en sus estuches, capturando la esencia del compromiso',
    style: 'elegant',
    preview: '🎁 Alianzas preparadas',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2F3640',
      accent: '#BF953F',
      secondary: '#F5F6FA'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/wedding-rings-boxes.png'
  },
  {
    id: 'wedding-dinner-glow',
    categoryId: 'wedding',
    name: 'Banquete de Gala',
    description: 'Composición minimalista y luminosa de mesa de bodas con copas de cristal, cubiertos dorados y velas aromáticas.',
    style: 'elegant',
    preview: '🥂 Cena y celebración',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#D4AF37',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/wedding-dinner-glow.jpg'
  },
  {
    id: 'wedding-toast-live',
    categoryId: 'wedding',
    name: 'Brindis Vivo Premium',
    description: 'Experiencia inmersiva con video de copas cristatinas brindando y burbujas doradas en movimiento. El máximo nivel de elegancia.',
    style: 'elegant',
    preview: '🥂 Brindis en Movimiento',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#D4AF37',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/wedding-dinner-glow.jpg',
    backgroundVideo: '/templates/wedding-toast-live.mp4'
  },
  {
    id: 'wedding-unicornios-live',
    categoryId: 'wedding',
    name: 'Unicornios Mágicos',
    description: 'Un marco de ensueño con unicornios mágicos, ideal para una boda de cuento de hadas.',
    style: 'elegant',
    preview: '🦄 Cuento de Hadas',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A235A',
      accent: '#9B59B6',
      secondary: '#F5EEF8'
    },
    defaultFont: 'Great Vibes',
    backgroundImage: '/templates/wedding-dinner-glow.jpg',
    backgroundVideo: '/templates/pareja-unicornios.mp4'
  },
  {
    id: 'wedding-atardecer-costa-live',
    categoryId: 'wedding',
    name: 'Atardecer en la Costa',
    description: 'Romántico atardecer costero con olas suaves, perfecto para una boda en la playa.',
    style: 'minimal',
    preview: '🌅 Amor y Mar',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#1F618D',
      accent: '#D35400',
      secondary: '#EBF5FB'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/wedding-dinner-glow.jpg',
    backgroundVideo: '/templates/pareja-atardecer.mp4'
  },
  {
    id: 'wedding-flowers-gala-live',
    categoryId: 'wedding',
    name: 'Ramo de Gala Live',
    description: 'Delicadas flores blancas y follaje verde con un suave movimiento cinemático. Pura frescura y naturaleza.',
    style: 'elegant',
    preview: '🌸 Ramo de Gala Live',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#B76E79',
      secondary: '#FDF2F2'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/wedding-rings-floral.jpg',
    backgroundVideo: '/templates/wedding-flowers-live.mp4'
  },
  {
    id: 'wedding-couple-live',
    categoryId: 'wedding',
    name: 'Pareja de Novios Clásica',
    description: 'La esencia del amor en movimiento. Una pareja de novios en una toma romántica y eterna.',
    style: 'elegant',
    preview: '👫 Amor de Novios',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#D4AF37',
      secondary: '#F5F6FA'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/wedding-rings.jpg',
    backgroundVideo: '/templates/parejadenovios-mp4.mp4'
  },
  {
    id: 'wedding-couple-alt-live',
    categoryId: 'wedding',
    name: 'Unión de Corazón Live',
    description: 'Segunda toma cinemática de la pareja de novios, ideal para invitaciones con un toque más íntimo.',
    style: 'elegant',
    preview: '💍 Nuestra Unión',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A3728',
      accent: '#D4AF37',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Great Vibes',
    backgroundImage: '/templates/wedding-rings.jpg',
    backgroundVideo: '/templates/parejadenovios2.mp4'
  },
  {
    id: 'wedding-gazebo-live',
    categoryId: 'wedding',
    name: 'Altar Vivo Clásico',
    description: 'Hermoso gazebo de bodas con cortinas de seda moviéndose suavemente con la brisa. Ideal para ceremonias románticas.',
    style: 'elegant',
    preview: '🏛️ Altar en Movimiento',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#27AE60',
      secondary: '#F5F6FA'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/wedding-gazebo-3d.jpg',
    backgroundVideo: '/templates/wedding-gazebo-live.mp4'
  },
  {
    id: 'wedding-flowers-live',
    categoryId: 'wedding',
    name: 'Ramo de Gala Vivo',
    description: 'Delicadas flores blancas y follaje verde con un suave movimiento cinemático. Pura frescura y naturaleza.',
    style: 'elegant',
    preview: '🌸 Naturaleza Viva',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#B76E79',
      secondary: '#FDF2F2'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/wedding-rings-floral.jpg',
    backgroundVideo: '/templates/wedding-flowers-live.mp4'
  },
  {
    id: 'wedding-rings-live',
    categoryId: 'wedding',
    name: 'Alianzas de Corazón Vivo',
    description: 'Increíble toma de alianzas de oro formando un corazón con su sombra, con un brillo mágico y sutil.',
    style: 'elegant',
    preview: '💍 Amor Eterno Live',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A3728',
      accent: '#D4AF37',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Great Vibes',
    backgroundImage: '/templates/wedding-rings.jpg',
    backgroundVideo: '/templates/wedding-rings-live.mp4'
  },

  {
    id: 'quince-rose-gold',
    categoryId: 'quinceanera',
    name: 'Quince Sueño Pastel',
    description: 'Decoración integral con globos y tonos pastel, perfecta para una celebración dulce y moderna.',
    style: 'playful',
    preview: '💎 Dulzura y estilo joven',
    layout: 'centered',
    defaultColors: {
      background: '#FFF5F7',
      text: '#4A4A4A',
      accent: '#B76E79',
      secondary: '#F8E9E9'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/fifteen-decor-pastel.jpg'
  },
  {
    id: 'quince-gala-night',
    categoryId: 'quinceanera',
    name: 'Gala de Quince',
    description: 'Elegante banquete iluminado por velas y flores frescas, capturando la calidez y sofisticación de una noche inolvidable.',
    style: 'elegant',
    preview: '✨ Una Noche Mágica',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A3728',
      accent: '#D4AF37',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/quince-gala-night.jpg'
  },
  {
    id: 'quince-tiara-live',
    categoryId: 'quinceanera',
    name: 'Tiara Real Live',
    description: 'Una tiara brillante capturada en un video cinemático con destellos mágicos. Para la verdadera protagonista de la noche.',
    style: 'elegant',
    preview: '👑 Brillo de Realeza',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#D4AF37',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/quince-gala-night.jpg',
    backgroundVideo: '/templates/quince-tiara-live.mp4'
  },
  {
    id: 'quince-princesa-live',
    categoryId: 'quinceanera',
    name: 'De Niña a Princesa Live',
    description: 'El video mágico de la niña en el prado transformándose en princesa con fuegos artificiales. ¡Pura magia!',
    style: 'elegant',
    preview: '👸 Sueño de Princesa',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A3728',
      accent: '#D4AF37',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/quince-gala-night.jpg',
    backgroundVideo: '/templates/deniñaaprincesa-mp4.mp4'
  },
  {
    id: 'quince-confetti-live',
    categoryId: 'quinceanera',
    name: 'Lluvia de Confeti Live',
    description: 'Explosión de confeti dorado y luces festivas en cámara lenta. Pura energía y diversión para tu fiesta.',
    style: 'playful',
    preview: '🎉 Diversión Total',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#FF4081',
      secondary: '#FCE4EC'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/fifteen-decor-pastel.jpg',
    backgroundVideo: '/templates/quince-confetti-live.mp4'
  },
  {
    id: 'quince-flowers-live',
    categoryId: 'quinceanera',
    name: 'Jardín de Quince Live',
    description: 'Rosas delicadas y flores en tonos pastel con un movimiento suave y natural. Elegancia botánica en su máxima expresión.',
    style: 'elegant',
    preview: '🌸 Flores en Movimiento',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A235A',
      accent: '#B76E79',
      secondary: '#F8E9E9'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/fifteen-decor-pastel.jpg',
    backgroundVideo: '/templates/quince-flowers-live.mp4'
  },
  {
    id: 'quince-toast-live',
    categoryId: 'quinceanera',
    name: 'Brindis Mágico Quince',
    description: 'Celebra tus 15 con un brindis lleno de burbujas doradas y elegancia.',
    style: 'elegant',
    preview: '🥂 Brindis de Gala',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A3728',
      accent: '#D4AF37',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/quince-gala-night.jpg',
    backgroundVideo: '/templates/cumpledequince1-mp4.mp4'
  },
  {
    id: 'quince-starry-live',
    categoryId: 'quinceanera',
    name: 'Gala Estelar 15',
    description: 'Una noche bajo las estrellas con efectos cinemáticos para una quinceañera única.',
    style: 'elegant',
    preview: '✨ Noche Estelar',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0F0F0F',
      text: '#FFFFFF',
      accent: '#FFD700',
      secondary: '#1C2833'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/fifteen-party-neon.jpg',
    backgroundVideo: '/templates/cumpledequince2-mp4.mp4'
  },
  {
    id: 'quince-boliche-live',
    categoryId: 'quinceanera',
    name: '🕺 Boliche de Quince Live',
    description: 'La fiesta de 15 más vibrante: luces de discoteca, confeti y toda la energía de la noche. Para la quinceañera moderna.',
    style: 'modern',
    preview: '🔥 Pista llena y corazón feliz',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0f0020',
      text: '#FFFFFF',
      accent: '#FF69B4',
      secondary: '#1a0033'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/fifteen-party-neon.jpg',
    backgroundVideo: '/templates/boliche-15-mp4.mp4'
  },
  {
    id: 'quince-regalo-live',
    categoryId: 'quinceanera',
    name: '🎁 Momento de Regalos Live',
    description: 'Hermosa animación de un regalo abriéndose con sorpresas y destellos. El instante mágico del festejo capturado para siempre.',
    style: 'playful',
    preview: '🎈 ¡Sorpresa Especial!',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A235A',
      accent: '#B76E79',
      secondary: '#F8E9E9'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/fifteen-decor-pastel.jpg',
    backgroundVideo: '/templates/regalo-15-mp4.mp4'
  },
  {
    id: 'quince-chica-canta-live',
    categoryId: 'quinceanera',
    name: 'Estrella del Pop Live',
    description: 'Sentite la estrella de la noche con esta animación llena de música y luces de escenario.',
    style: 'modern',
    preview: '🎤 ¡Soy la Estrella!',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1a0033',
      text: '#FFFFFF',
      accent: '#FF007F',
      secondary: '#2d004d'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/fifteen-party-neon.jpg',
    backgroundVideo: '/templates/chicacanta-mp4.mp4'
  },
  {
    id: 'quince-duena-tiempo-live',
    categoryId: 'quinceanera',
    name: 'Dueña del Tiempo Live',
    description: 'Una atmósfera mágica y surrealista donde vos sos la protagonista de tu propia historia.',
    style: 'elegant',
    preview: '⏳ Instante Eterno',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0F0F0F',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#1C2833'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/quince-gala-night.jpg',
    backgroundVideo: '/templates/dueñadeltiempo-mp4.mp4'
  },
  {
    id: 'quince-universal-live',
    categoryId: 'quinceanera',
    name: 'Quince Universal Live',
    description: 'Toda la galaxia celebra tus 15 con efectos cósmicos y una elegancia fuera de este mundo.',
    style: 'modern',
    preview: '🌌 Destello Universal',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#000020',
      text: '#FFFFFF',
      accent: '#00E5FF',
      secondary: '#000040'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/fifteen-party-neon.jpg',
    backgroundVideo: '/templates/15universal-mp4.mp4'
  },
  {
    id: 'quince-chica-bosque-live',
    categoryId: 'quinceanera',
    name: 'Princesa del Bosque Live',
    description: 'Magia natural y misterio en un bosque encantado, perfecto para una quinceañera soñadora.',
    style: 'rustic',
    preview: '🌿 Magia Natural',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#27AE60',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/wedding-boho-jars.jpg',
    backgroundVideo: '/templates/chicabosque-mp4.mp4'
  },

  // --- CUMPLEAÑOS INFANTIL LIVE (VIDEO) ---
  {
    id: 'birthday-superheroes-live',
    categoryId: 'fantasy',
    name: '¡Súper Héroes! 🦸',
    description: 'Fondo épico de superhéroes perfecta para los pequeños aventureros que quieren celebrar a lo grande.',
    style: 'playful',
    preview: '🦸 Acción y poder',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a2e',
      text: '#FFFFFF',
      accent: '#FFD700',
      secondary: '#1a1a4a'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/birthday-party-table.jpg',
    backgroundVideo: '/templates/superheroes.mp4'
  },
  {
    id: 'fantasy-amazonas',
    categoryId: 'fantasy',
    name: 'Amazonas Salvaje 🦜',
    description: 'Sumérgete en la profundidad de la selva con una temática tropical llena de vida y color.',
    style: 'modern',
    preview: '🌴 Selva profunda',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#064e3b',
      text: '#FFFFFF',
      accent: '#fbbf24',
      secondary: '#065f46'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/excursion-mountains-lake.jpg',
    backgroundVideo: '/templates/amazonas-mp4.mp4'
  },
  {
    id: 'fantasy-amazonas-invitation',
    categoryId: 'fantasy',
    name: 'Amazonas: Invitación Real 🌿',
    description: 'La aventura comienza cuando el Amazonas llega a tu cumpleaños en una explosión de naturaleza.',
    style: 'playful',
    preview: '🦜 Fiesta en la selva',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#14532d',
      text: '#FFFFFF',
      accent: '#f59e0b',
      secondary: '#166534'
    },
    defaultFont: 'Outfit',
    backgroundImage: '/templates/excursion-mountains-lake.jpg',
    backgroundVideo: '/templates/amazonasyendoalcumple-mp4.mp4'
  },
  {
    id: 'fantasy-knight-birthday',
    categoryId: 'fantasy',
    name: 'Caballeros al Rescate 🏰',
    description: '¡Los caballeros han llegado al castillo para la celebración más épica de la historia!',
    style: 'modern',
    preview: '⚔️ Caballeros y fiesta',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1e1b4b',
      text: '#FFFFFF',
      accent: '#fbbf24',
      secondary: '#312e81'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/theater-grand-opera.jpg',
    backgroundVideo: '/templates/caballerosllegandoalcumple-mp4.mp4'
  },
  {
    id: 'fantasy-magic-farm',
    categoryId: 'fantasy',
    name: 'Granja Mágica 🚜',
    description: 'Un cumpleaños diferente donde la magia se encuentra con la paz del campo y sus animales.',
    style: 'playful',
    preview: '🐥 Diversión rural',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#fef3c7',
      text: '#78350f',
      accent: '#d97706',
      secondary: '#fde68a'
    },
    defaultFont: 'Comfortaa',
    backgroundImage: '/templates/camping-forest-glow.jpg',
    backgroundVideo: '/templates/cumpleenlagranja-mp4.mp4'
  },
  {
    id: 'fantasy-fairy-magic',
    categoryId: 'fantasy',
    name: 'Hada Pastelera ✨',
    description: 'La magia de las hadas se mezcla con el dulce sabor de los pasteles para un cumple de ensueño.',
    style: 'elegant',
    preview: '🧚‍♀️ Magia dulce',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#fdf2f8',
      text: '#831843',
      accent: '#ec4899',
      secondary: '#fce7f3'
    },
    defaultFont: 'Great Vibes',
    backgroundImage: '/templates/abstract-pastel-shapes.jpg',
    backgroundVideo: '/templates/hada-mp4.mp4'
  },
  {
    id: 'fantasy-princess-knight',
    categoryId: 'fantasy',
    name: 'Princesas y Caballeros 👑',
    description: 'Un reino unido para celebrar un cumpleaños lleno de honor, magia y baile.',
    style: 'elegant',
    preview: '👸 Reino de fiesta',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#4c1d95',
      text: '#FFFFFF',
      accent: '#fcd34d',
      secondary: '#5b21b6'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/theater-grand-opera.jpg',
    backgroundVideo: '/templates/princesaycaballeros-mp4.mp4'
  },
  {
    id: 'fantasy-hero-cart',
    categoryId: 'fantasy',
    name: 'Héroe en Carreta 🐎',
    description: '¡Incluso los héroes más grandes necesitan un viaje clásico para llegar a la fiesta!',
    style: 'playful',
    preview: '🏎️ Héroe clásico',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#7f1d1d',
      text: '#FFFFFF',
      accent: '#facc15',
      secondary: '#991b1b'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/birthday-party-table.jpg',
    backgroundVideo: '/templates/superheroeencarreta-mp4.mp4'
  },
  {
    id: 'fantasy-hero-kids',
    categoryId: 'fantasy',
    name: 'Superhéroe Infantil 👦',
    description: 'La versión más tierna y poderosa para los héroes más pequeños de la casa.',
    style: 'playful',
    preview: '🦸‍♂️ Pequeño gran héroe',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1e3a8a',
      text: '#FFFFFF',
      accent: '#ef4444',
      secondary: '#1e40af'
    },
    defaultFont: 'Outfit',
    backgroundImage: '/templates/birthday-party-table.jpg',
    backgroundVideo: '/templates/superheroeinfantil-mp4.mp4'
  },
  {
    id: 'fantasy-hero-epic',
    categoryId: 'fantasy',
    name: 'Héroe Épico Live 💥',
    description: 'Acción al máximo con efectos especiales para un cumpleaños que romperá todos los récords.',
    style: 'modern',
    preview: '🌌 Acción total',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a0a',
      text: '#FFFFFF',
      accent: '#f87171',
      secondary: '#1a1a1a'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/birthday-party-table.jpg',
    backgroundVideo: '/templates/superheroes-mp4.mp4'
  },
  {
    id: 'fantasy-hero-gifts',
    categoryId: 'fantasy',
    name: 'Héroe de los Regalos 🎁',
    description: '¡Los regalos llegan volando con este héroe que sabe cómo dar la mejor sorpresa!',
    style: 'playful',
    preview: '🚁 Regalos voladores',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#14532d',
      text: '#FFFFFF',
      accent: '#fbbf24',
      secondary: '#166534'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/birthday-party-table.jpg',
    backgroundVideo: '/templates/superheroevolandoregalos-mp4.mp4'
  },
  // --- MARCOS DE FOTOS PREMIUM ---
  {
    id: 'photo-frame-golden',
    categoryId: 'photo-frame',
    name: 'Marco Real Dorado 👑',
    description: 'Perfecto para bodas o eventos de gala. Un marco dorado señorial para tu foto más elegante.',
    style: 'elegant',
    preview: '🖼️ Elegancia pura',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a0a',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#1a1a1a'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/golden-floral-frame.jpg'
  },
  {
    id: 'photo-frame-polaroid',
    categoryId: 'photo-frame',
    name: 'Instante Mágico (Polaroid) 📸',
    description: 'Un estilo retro y juvenil. Tu foto en un marco tipo Polaroid con detalles festivos.',
    style: 'modern',
    preview: '🎞️ Estilo Retro',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#f8f9fa',
      text: '#333333',
      accent: '#FF6B9D',
      secondary: '#ffffff'
    },
    defaultFont: 'Caveat',
    backgroundImage: '/templates/cute-doodle-party.jpg'
  },
  {
    id: 'photo-frame-angelic',
    categoryId: 'photo-frame',
    name: 'Marco Angelical ✨',
    description: 'Especial para bautismos y comuniones. Un marco suave y luminoso que resalta la pureza.',
    style: 'elegant',
    preview: '🕊️ Pureza y Luz',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#f0f9ff',
      text: '#0369a1',
      accent: '#bae6fd',
      secondary: '#ffffff'
    },
    defaultFont: 'Outfit',
    backgroundImage: '/templates/abstract-pastel-shapes.jpg'
  },
  {
    id: 'birthday-monstruos-kids-live',
    categoryId: 'fantasy',
    name: '¡Monstruos de Colores! 🟢',
    description: 'Divertidos monstruos coloridos y alegres para una fiesta infantil llena de risas y aventuras.',
    style: 'playful',
    preview: '👾 Fiesta de monstruitos',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1a1a1a',
      text: '#FFFFFF',
      accent: '#00E676',
      secondary: '#2d2d2d'
    },
    defaultFont: 'Pacifico',
    backgroundImage: '/templates/birthday_monstruos_kids_fallback_1773176649883.png',
    backgroundVideo: '/templates/monstruos-kids.mp4'
  },
  {
    id: 'birthday-monstruo-rosa-live',
    categoryId: 'fantasy',
    name: 'Monstruita Rosa 🌸',
    description: 'Adorable monstruita rosa entre flores, perfecta para una fiesta infantil femenina y llena de color.',
    style: 'playful',
    preview: '🌸 Rosa y floral',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1a0a1a',
      text: '#FFFFFF',
      accent: '#FF69B4',
      secondary: '#2d1a2d'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/monstruita-rosa-fallback.png',
    backgroundVideo: '/templates/monstruo-rosa.mp4'
  },
  {
    id: 'birthday-payasos-live',
    categoryId: 'fantasy',
    name: '¡Payasos de Cumple! 🎪',
    description: 'Alegres payasos de cumpleaños para una fiesta llena de magia, risas y colores vibrantes.',
    style: 'playful',
    preview: '🎪 Circo de risas',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a0a',
      text: '#FFFFFF',
      accent: '#FF4500',
      secondary: '#1a1a1a'
    },
    defaultFont: 'Pacifico',
    backgroundImage: '/templates/payasos-cumple-fallback.png',
    backgroundVideo: '/templates/payasos-cumple.mp4'
  },

  // --- STANDARD TEMPLATES ---
  {
    id: 'birthday-gold-luxury',
    categoryId: 'birthday',
    name: 'Gala de Estrellas',
    description: 'Elegancia pura en negro y oro para cumpleaños de gala',
    style: 'elegant',
    preview: '✨ Sofisticación en Negro y Oro',
    layout: 'centered',
    defaultColors: {
      background: '#0a0a0a',
      text: '#D4AF37',
      accent: '#FFFFFF',
      secondary: '#1a1a1a'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/backgrounds/birthday-gold-stars.jpg'
  },
  {
    id: 'birthday-baby6',
    categoryId: 'fantasy',
    name: 'Ternura de Bebé',
    description: 'Un diseño delicado y tierno, ideal para celebrar los primeros añitos o un baby shower lleno de amor.',
    style: 'playful',
    preview: '👶 Dulces Momentos',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A235A',
      accent: '#FF7675',
      secondary: '#FFF5F7'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/baby6.jpg'
  },
  {
    id: 'birthday-emoji-3d',
    categoryId: 'fantasy',
    name: 'Emoji Sneakers 3D',
    description: 'Divertido personaje 3D con estilo urbano',
    style: 'playful',
    preview: '👟 Estilo joven y divertido',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#333333',
      accent: '#FF4757',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Poppins',
    backgroundImage: '/templates/emoji-sneakers-clean.png'
  },
  {
    id: 'birthday-sweet-table',
    categoryId: 'fantasy',
    name: 'Mesa Dulce 3D',
    description: 'Increíble mesa de dulces bajo luces festivas, un fondo vibrante y tentador para tu celebración.',
    style: 'playful',
    preview: '🧁 Dulce y Tentador',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#00B894',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/birthday-sweet-table.jpg'
  },
  {
    id: 'birthday-cake-candles',
    categoryId: 'birthday',
    name: 'Sopla las Velas',
    description: 'El momento mágico del deseo en primer plano, con luces cálidas y atmósfera festiva.',
    style: 'modern',
    preview: '🕯️ Luces y deseos',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#FFD700',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/birthday-cake-candles.jpg'
  },
  {
    id: 'birthday-balloons-3d',
    categoryId: 'fantasy',
    name: 'Globos Divertidos 3D',
    description: 'Vibrante ramo de globos con lunares en alta definición',
    style: 'playful',
    preview: '🎈 Color y pura alegría',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#FF7675',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Poppins',
    backgroundImage: '/templates/birthday-balloons-dots.jpg'
  },
  {
    id: 'birthday-chocolates',
    categoryId: 'birthday',
    name: 'Chocolates & Berries',
    description: 'Elegancia gourmet con "Happy Birthday" escrito en una composición profesional de bombones y frutos rojos.',
    style: 'elegant',
    preview: '🍫 Dulce sofisticación',
    layout: 'centered',
    defaultColors: {
      background: '#2C3E50',
      text: '#FFFFFF',
      accent: '#E74C3C',
      secondary: '#34495E'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/birthday-chocolates.jpg'
  },
  {
    id: 'birthday-donuts-fruit',
    categoryId: 'birthday',
    name: 'Donas y Frutos',
    description: 'Increíble y colorida colección de mini donas decoradas con frutas frescas y flores comestibles sobre un fondo blanco impecable.',
    style: 'playful',
    preview: '🍩 Dulzura Frutal',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#E84393',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/birthday-donuts-fruit.jpg'
  },
  {
    id: 'birthday-confetti-blue',
    categoryId: 'birthday',
    name: 'Confeti Mágico Azul',
    description: 'Fondo festivo con luces suaves y confeti de colores sobre azu celeste',
    style: 'playful',
    preview: '✨ Brillos y alegría azul',
    layout: 'centered',
    defaultColors: {
      background: '#E1F5FE',
      text: '#01579B',
      accent: '#FF4081',
      secondary: '#B3E5FC'
    },
    defaultFont: 'Comfortaa',
    backgroundImage: '/templates/cumple-4.jpg'
  },
  {
    id: 'birthday-happy-cake',
    categoryId: 'birthday',
    name: 'Pastel de Alegría',
    description: 'Pastel casero con velas de colores "HAPPY BIRTHDAY" y fresas, capturando la calidez de un festejo tradicional.',
    style: 'playful',
    preview: '🎂 El clásico festejo',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#E74C3C',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Pacifico',
    backgroundImage: '/templates/birthday-happy-cake.jpg'
  },
  {
    id: 'birthday-party-table',
    categoryId: 'fantasy',
    name: 'Mega Fiesta Colorida',
    description: 'Composición vibrante con platos, gorritos y confeti para una fiesta inolvidable',
    style: 'playful',
    preview: '🎉 Explosión de Color',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#E84393',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/birthday-party-table.jpg'
  },
  {
    id: 'birthday-monsters',
    categoryId: 'fantasy',
    name: 'Mundo de Monstruitos',
    description: 'Divertida y colorida invitación llena de personajes amigables para los más chiquitos.',
    style: 'playful',
    preview: '👾 Diversión Monstruosa',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#FF7675',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/backgrounds/monsters.png'
  },
  {
    id: 'birthday-superhero',
    categoryId: 'fantasy',
    name: 'Héroe de la Ciudad',
    description: 'Una noche de acción sobre los rascacielos. Perfecta para pequeños superhéroes.',
    style: 'modern',
    preview: '🦸‍♂️ ¡Al Rescate!',
    layout: 'centered',
    defaultColors: {
      background: '#0B1026',
      text: '#FFFFFF',
      accent: '#FFD700',
      secondary: '#1A237E'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/backgrounds/superhero.png'
  },
  {
    id: 'birthday-stadium',
    categoryId: 'fantasy',
    name: 'El Gran Estadio',
    description: 'Toda la emoción del campo de juego iluminado. Ideal para fanáticos del fútbol.',
    style: 'modern',
    preview: '⚽ ¡Golazo!',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#2ecc71',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/backgrounds/stadium.png'
  },
  {
    id: 'birthday-cute-penguin',
    categoryId: 'fantasy',
    name: 'Pingüino Amigable',
    description: 'Personaje tierno de pingüino en estilo ilustración, perfecto para invitaciones infantiles minimalistas y dulces.',
    style: 'elegant',
    preview: '🐧 Ternura Infinita',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#74b9ff',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/birthday-cute-penguin.png'
  },
  {
    id: 'birthday-1',
    categoryId: 'fantasy',
    name: 'Fiesta Divertida',
    description: 'Diseño colorido y alegre para fiestas infantiles',
    style: 'playful',
    preview: '🎨 Colores vibrantes con globos y confeti',
    layout: 'centered',
    defaultColors: {
      background: '#FFF5F7',
      text: '#2D1B30',
      accent: '#FF6B9D',
      secondary: '#FFC4D6'
    },
    defaultFont: 'Poppins',
    isPremium: true,
    backgroundImage: '/templates/birthday_monstruos_kids_fallback_1773176649883.png',
    backgroundVideo: '/templates/fiestadivertida-mp4.mp4'
  },
  {
    id: 'birthday-2',
    categoryId: 'birthday',
    name: 'Elegante Adulto',
    description: 'Sofisticación para celebraciones de adultos',
    style: 'elegant',
    preview: '✨ Diseño minimalista con toques dorados',
    layout: 'centered',
    defaultColors: {
      background: '#1A1A1A',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#2C2C2C'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1000'
  },

  // --- BAUTISMO LIVE (VIDEO) ---
  {
    id: 'baptism-angel1-live',
    categoryId: 'baptism',
    name: 'Ángel de Luz 1',
    description: 'Hermosa animación de un ángel que trae paz y bendición a la ceremonia.',
    style: 'elegant',
    preview: '👼 Luz y Paz',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#2C3E50',
      accent: '#3498DB',
      secondary: '#EBF5FB'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/baptism-bird-fly.jpg',
    backgroundVideo: '/templates/angel1-mp4.mp4'
  },
  {
    id: 'baptism-bautismo1-live',
    categoryId: 'baptism',
    name: 'Ceremonia Sagrada 1',
    description: 'Capture la solemnidad del bautismo con esta animación clásica y elegante.',
    style: 'elegant',
    preview: '⛪ Bautismo Sagrado',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A3728',
      accent: '#D4AF37',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Great Vibes',
    backgroundImage: '/templates/baptism-candle-tall.jpg',
    backgroundVideo: '/templates/bautismo1-mp4.mp4'
  },
  {
    id: 'baptism-bautismo2-live',
    categoryId: 'baptism',
    name: 'Bendición Celestial 1',
    description: 'Una atmósfera llena de luz y gracia para invitar a este momento tan especial.',
    style: 'elegant',
    preview: '✨ Gracia Divina',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FDFCFB',
      text: '#1B4F72',
      accent: '#3498DB',
      secondary: '#FFFFFF'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/baptism-shell.jpg',
    backgroundVideo: '/templates/bautismo2-mp4.mp4'
  },
  {
    id: 'baptism-bautismo3-live',
    categoryId: 'baptism',
    name: 'Pureza de Fe 1',
    description: 'Estética limpia y pura para celebrar el primer gran paso en la fe.',
    style: 'elegant',
    preview: '🕊️ Pureza y Fe',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#3498DB',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/baptism-dove.jpg',
    backgroundVideo: '/templates/bautismo3-mp4.mp4'
  },
  {
    id: 'baptism-bendicionangel1-live',
    categoryId: 'baptism',
    name: 'Ángel Guardián 1',
    description: 'Tierno ángel animado que acompaña este día de bendición.',
    style: 'playful',
    preview: '👼 Protección Divina',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#5D4037',
      accent: '#D4AF37',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/baptism-water-drop.jpg',
    backgroundVideo: '/templates/bendicionangel1-mp4.mp4'
  },
  {
    id: 'baptism-bendicionangel2-live',
    categoryId: 'baptism',
    name: 'Luz de Bendición 1',
    description: 'Efectos de luz celestiales para una invitación que irradia paz.',
    style: 'elegant',
    preview: '🌟 Luz de Vida',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#F8F9FA',
      text: '#2C3E50',
      accent: '#3498DB',
      secondary: '#ECF0F1'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/baptism-candle.jpg',
    backgroundVideo: '/templates/bendicionangel2-mp4.mp4'
  },
  {
    id: 'baptism-bendicionangel3-live',
    categoryId: 'baptism',
    name: 'Cielo Abierto 1',
    description: 'Majestuosa escena animada para un bautismo inolvidable.',
    style: 'elegant',
    preview: '☁️ Sueño Celestial',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#1B4F72',
      accent: '#D4AF37',
      secondary: '#EBF5FB'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/baptism-bird-fly.jpg',
    backgroundVideo: '/templates/bendicionangel3.mp4.mp4'
  },
  {
    id: 'baptism-arcangel-fuego-live',
    categoryId: 'baptism',
    name: 'Arcángel de Fuego Live',
    description: 'Un efecto épico donde el arcángel desciende en fuego para bendecir la ceremonia.',
    style: 'elegant',
    preview: '🔥 Bendición Épica',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0A0A0A',
      text: '#FFFFFF',
      accent: '#FFD700',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/baptism-candle-tall.jpg',
    backgroundVideo: '/templates/cumpledequince3-mp4.mp4'
  },
  {
    id: 'baptism-paloma-live',
    categoryId: 'baptism',
    name: 'Paloma de Paz',
    description: 'Hermosa paloma volando, símbolo vivo del Espíritu Santo y la pureza.',
    style: 'elegant',
    preview: '🕊️ Vuelo de Paz',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#1B4F72',
      accent: '#3498DB',
      secondary: '#EBF5FB'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/baptism-bird-fly.jpg',
    backgroundVideo: '/templates/paloma-volando.mp4'
  },
  {
    id: 'baptism-vela-live',
    categoryId: 'baptism',
    name: 'Luz Divina',
    description: 'Acogedora vela encendida en movimiento, representando la luz y vida eterna.',
    style: 'elegant',
    preview: '🕯️ Fuego de Fe',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Great Vibes',
    backgroundImage: '/templates/baptism-candle-tall.jpg',
    backgroundVideo: '/templates/vela-encendida.mp4'
  },
  {
    id: 'baptism-cielo-bendito-live',
    categoryId: 'baptism',
    name: 'Cielo Bendito Live',
    description: 'Efectos cinemáticos de cielo y luz para una invitación espiritual y moderna.',
    style: 'elegant',
    preview: '✨ Bendición del Cielo',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FDFCFB',
      text: '#1B4F72',
      accent: '#3498DB',
      secondary: '#FFFFFF'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/baptism-dove.jpg',
    backgroundVideo: '/templates/bautismo12-mp4.mp4'
  },

  {
    id: 'baptism-bird-fly',
    categoryId: 'baptism',
    name: 'Vuelo de Gracia',
    description: 'Majestuoso ave en pleno vuelo contra un cielo azul celeste, simbolizando la libertad y la gracia divina.',
    style: 'elegant',
    preview: '🕊️ Gracia en Vuelo',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#1B4F72',
      accent: '#3498DB',
      secondary: '#EBF5FB'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/baptism-bird-fly.jpg'
  },
  {
    id: 'baptism-dove',
    categoryId: 'baptism',
    name: 'Espíritu de Paz',
    description: 'Paloma blanca en vuelo capturada contra un fondo de naturaleza profunda, símbolo de pureza y paz espiritual.',
    style: 'elegant',
    preview: '🕊️ Paz y Pureza',
    layout: 'centered',
    defaultColors: {
      background: '#0F120F',
      text: '#FFFFFF',
      accent: '#F1C40F',
      secondary: '#1E272E'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/baptism-dove.jpg'
  },
  {
    id: 'baptism-candle-tall',
    categoryId: 'baptism',
    name: 'Llama Espiritual',
    description: 'Una vela esbelta con una llama vertical sobre fondo negro absoluto, representando la luz que guía el alma.',
    style: 'elegant',
    preview: '🕯️ Luz de Esperanza',
    layout: 'centered',
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/baptism-candle-tall.jpg'
  },
  {
    id: 'baptism-candle',
    categoryId: 'baptism',
    name: 'Luz de Fe',
    description: 'Cálida vela en un vaso de cristal, su llama dorada simboliza la guía y la fe en este camino espiritual.',
    style: 'elegant',
    preview: '🕯️ Luz y Guía',
    layout: 'centered',
    defaultColors: {
      background: '#0B0D17',
      text: '#FFFFFF',
      accent: '#FFD700',
      secondary: '#1A1A1A'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/baptism-candle.jpg'
  },
  {
    id: 'baptism-dress',
    categoryId: 'baptism',
    name: 'Pureza en Encaje',
    description: 'Ropita de bautismo en encaje blanco inmaculado sobre un fondo delicado, capturando toda la pureza e inocencia.',
    style: 'elegant',
    preview: '👗 Inocencia y Pureza',
    layout: 'centered',
    defaultColors: {
      background: '#D7BDE2',
      text: '#4A235A',
      accent: '#FFFFFF',
      secondary: '#F5EEF8'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/baptism-dress.jpg'
  },
  {
    id: 'baptism-shell',
    categoryId: 'baptism',
    name: 'Concha Bautismal Galante',
    description: 'Concha bautismal de plata real sobre la pila, un símbolo clásico y solemne para este sacramento sagrado.',
    style: 'elegant',
    preview: '🐚 Tradición y Sacrificio',
    layout: 'centered',
    defaultColors: {
      background: '#1A1A1A',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#2D3436'
    },
    defaultFont: 'Great Vibes',
    backgroundImage: '/templates/baptism-shell.jpg'
  },
  {
    id: 'baptism-water-drop',
    categoryId: 'baptism',
    name: 'Gota de Bendición',
    description: 'Impactante gota de agua cristalina creando ondas perfectas, representando la pureza y el renacer del bautismo.',
    style: 'elegant',
    preview: '💧 Pura Bendición',
    layout: 'centered',
    defaultColors: {
      background: '#154360',
      text: '#FFFFFF',
      accent: '#AED6F1',
      secondary: '#D6EAF8'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/baptism-water-drop.jpg'
  },

  // --- BABY SHOWER LIVE (VIDEO) ---
  {
    id: 'baby-shower-live-1',
    categoryId: 'baby-shower',
    name: 'Dulce Espera Mágica',
    description: 'Tierno fondo animado ideal para dar la bienvenida a tu bebé de una forma única y especial.',
    style: 'playful',
    preview: '🌟 Magia en movimiento',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A4A4A',
      accent: '#FFB6C1',
      secondary: '#FDF2F2'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/baby-shower-pink-booties.jpg',
    backgroundVideo: '/templates/baby-1.mp4'
  },
  {
    id: 'baby-shower-live-2',
    categoryId: 'baby-shower',
    name: 'Bienvenido Bebé',
    description: 'Animación suave y delicada con colores pasteles para acompañar el nacimiento.',
    style: 'elegant',
    preview: '👶 Ternura Animada',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#5D4037',
      accent: '#87CEEB',
      secondary: '#E6F3FF'
    },
    defaultFont: 'Comfortaa',
    backgroundImage: '/templates/baby-shower-teddy-basket.jpg',
    backgroundVideo: '/templates/baby-2.mp4'
  },
  {
    id: 'baby-shower-live-3',
    categoryId: 'baby-shower',
    name: 'Cigüeña Animada',
    description: 'Precioso fondo de baby shower con movimiento y encanto para sorprender a todos tus invitados.',
    style: 'playful',
    preview: '🍼 Alegría y Encanto',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#0984E3',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Pacifico',
    backgroundImage: '/templates/baby-shower-macaron-cake.jpg',
    backgroundVideo: '/templates/baby-3.mp4'
  },
  {
    id: 'baby-shower-bendicion-mama-live',
    categoryId: 'baby-shower',
    name: 'Bendición a Mamá Live',
    description: 'Un momento tierno dedicado a la futura mamá, lleno de amor y dulces deseos.',
    style: 'elegant',
    preview: '💖 Bendición a Mamá',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#B76E79',
      accent: '#FFB6C1',
      secondary: '#FDF2F2'
    },
    defaultFont: 'Great Vibes',
    backgroundImage: '/templates/baby-shower-pink-booties.jpg',
    backgroundVideo: '/templates/bendicionamama-mp4.mp4'
  },
  {
    id: 'baby-shower-habitacion-bb-live',
    categoryId: 'baby-shower',
    name: 'La Habitación del Bebé Live',
    description: 'Una animación acogedora que muestra el rincón lleno de sueños que espera al pequeño.',
    style: 'playful',
    preview: '🏠 El Cuarto del Bebé',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#5D4037',
      accent: '#87CEEB',
      secondary: '#E6F3FF'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/baby-shower-teddy-basket.jpg',
    backgroundVideo: '/templates/habitacionbb-mp4.mp4'
  },
  {
    id: 'baby-shower-teddy-basket',
    categoryId: 'baby-shower',
    name: 'Osito de Peluche',
    description: 'Tierna toma de un osito de peluche junto a una mantita tejida y una cesta, creando una atmósfera cálida y acogedora.',
    style: 'playful',
    preview: '🧸 Dulces sueños',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#5D4037',
      accent: '#D4AF37',
      secondary: '#FDFCFB'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/baby-shower-teddy-basket.jpg'
  },
  {
    id: 'baby-shower-bunny-booties',
    categoryId: 'baby-shower',
    name: 'Conejitos Tiernos',
    description: 'Tiernos zapatitos con orejas de conejo sobre el césped verde, ideal para un baby shower al aire libre y lleno de vida.',
    style: 'playful',
    preview: '🐰 Salto de alegría',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#FFB6C1',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Comfortaa',
    backgroundImage: '/templates/baby-shower-bunny-booties.jpg'
  },
  {
    id: 'baby-shower-pink-booties',
    categoryId: 'baby-shower',
    name: 'Primeros Pasitos Rosa',
    description: 'Delicada toma de zapatitos rosas sobre madera, perfectos para una invitación de niña dulce y minimalista.',
    style: 'playful',
    preview: '👟 Ternura en rosa',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A4A4A',
      accent: '#FFB6C1',
      secondary: '#FDF2F2'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/baby-shower-pink-booties.jpg'
  },
  {
    id: 'baby-shower-macaron-cake',
    categoryId: 'baby-shower',
    name: 'Pastel Macaron Pastel',
    description: 'Increíble pastel decorado con macarons en tonos pastel, ideal para una celebración de bienvenida llena de dulzura.',
    style: 'playful',
    preview: '🍰 Dulzura pastel',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#5D4037',
      accent: '#FFB6C1',
      secondary: '#FFF9E3'
    },
    defaultFont: 'Pacifico',
    backgroundImage: '/templates/baby-shower-macaron-cake.jpg'
  },
  {
    id: 'baby-shower-stroller-pops',
    categoryId: 'baby-shower',
    name: 'Cochecito Sweet',
    description: 'Coloridos cake pops presentados en un adorable cochecito artesanal, una idea creativa para tu baby shower.',
    style: 'playful',
    preview: '🍭 Dulzura en movimiento',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#2D3436',
      accent: '#0984E3',
      secondary: '#F1F2F6'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/baby-shower-stroller-pops.jpg'
  },
  {
    id: 'baby-teddy-3d',
    categoryId: 'baby-shower',
    name: 'Osito de Peluche 3D',
    description: 'Tierno diseño con osito 3D artesanal',
    style: 'playful',
    preview: '🧸 Dulce y acogedor',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#5D4037',
      accent: '#8D6E63',
      secondary: '#EFEBE9'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/baby-shower-stroller.jpg'
  },
  {
    id: 'wedding-floral',
    categoryId: 'wedding',
    name: 'Elegancia Floral',
    description: 'Estilo clásico con detalles botánicos',
    style: 'elegant',
    preview: '🌸 Flores delicadas y acuarelas',
    layout: 'centered',
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A4A4A',
      accent: '#B76E79',
      secondary: '#F8E9E9'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/wedding-rings-floral.jpg'
  },

  // --- CAMPING LIVE (VIDEO) ---
  {
    id: 'camping-fogata-live',
    categoryId: 'camping',
    name: 'Noche de Fogata',
    description: 'Relajante fuego crepitante en la noche, ideal para campamentos, fogones o veladas al aire libre.',
    style: 'rustic',
    preview: '🔥 Calor y Encuentro',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#2C3E50',
      text: '#FFFFFF',
      accent: '#E67E22',
      secondary: '#1A252F'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/wedding-rings-floral.jpg', // Placeholder
    backgroundVideo: '/templates/camping-fogata.mp4'
  },
  {
    id: 'camping-campamento-live',
    categoryId: 'camping',
    name: 'Aventura al Natural',
    description: 'Vista animada de un campamento en medio del bosque. Perfecto para salidas con amigos o retiros.',
    style: 'rustic',
    preview: '🌲 Naturaleza Viva',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#145A32',
      text: '#FFFFFF',
      accent: '#F1C40F',
      secondary: '#0B5345'
    },
    defaultFont: 'Poppins',
    backgroundImage: '/templates/wedding-rings-floral.jpg',
    backgroundVideo: '/templates/camping-campamento.mp4'
  },
  {
    id: 'camping-conexion-live',
    categoryId: 'camping',
    name: 'Conexión Profunda',
    description: 'Estética calma que invita a desconectar la mente y reconectar con la esencia pura de la naturaleza.',
    style: 'elegant',
    preview: '✨ Paz y Armonía',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1B2631',
      text: '#D5D8DC',
      accent: '#AF7AC5',
      secondary: '#212F3D'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/wedding-rings-floral.jpg',
    backgroundVideo: '/templates/camping-conexion.mp4'
  },

  // --- CINE LIVE (VIDEO) ---
  {
    id: 'cinema-pochoclos-live',
    categoryId: 'cinema',
    name: 'Estreno de Pochoclos',
    description: 'Pochoclos saltando en la olla, el aroma del cine en tu invitación. Perfecto para funciones privadas o cumples temáticos.',
    style: 'playful',
    preview: '🍿 ¡Acceso Directo!',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1a1a1a',
      text: '#ffffff',
      accent: '#f1c40f',
      secondary: '#c0392b'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/party-lights-stage.jpg',
    backgroundVideo: '/templates/cinema-pochoclos.mp4'
  },
  {
    id: 'cinema-proyector-retro',
    categoryId: 'cinema',
    name: 'Proyector Vintage',
    description: 'El haz de luz del proyector retro atravesando la oscuridad. Una estética clásica y nostálgica para los amantes del séptimo arte.',
    style: 'rustic',
    preview: '📽️ Cine Clásico',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a0a',
      text: '#d4af37',
      accent: '#bf953f',
      secondary: '#1c2833'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/party-neon-club.jpg',
    backgroundVideo: '/templates/cinema-proyector.mp4'
  },

  // --- TEATRO LIVE (VIDEO) ---
  {
    id: 'theater-telon-live',
    categoryId: 'theater',
    name: 'Telón de Gala',
    description: 'El majestuoso telón rojo abriéndose para dar comienzo a la función. Pura elegancia y expectativa.',
    style: 'elegant',
    preview: '🎭 ¡Comienza el Show!',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#2c0000',
      text: '#ffffff',
      accent: '#d4af37',
      secondary: '#1a0000'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/party-lights-stage.jpg',
    backgroundVideo: '/templates/theater-telon.mp4'
  },
  {
    id: 'theater-mascaras-live',
    categoryId: 'theater',
    name: 'Máscaras del Arte',
    description: 'Drama y comedia en movimiento, capturando la esencia milenaria del teatro en tu invitación.',
    style: 'rustic',
    preview: '🎭 Esencia Teatral',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a0a',
      text: '#e74c3c',
      accent: '#f1c40f',
      secondary: '#2c3e50'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/party-neon-club.jpg',
    backgroundVideo: '/templates/theater-mascaras.mp4'
  },

  // --- PESCA LIVE (VIDEO) ---
  {
    id: 'fishing-boat-live',
    categoryId: 'fishing',
    name: 'Amanecer en el Bote',
    description: 'La calma del agua a primera hora, el motor suave y la caña lista. Un paraíso para pescadores.',
    style: 'rustic',
    preview: '🎣 Mañana de Pesca',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0b2447',
      text: '#ffffff',
      accent: '#2ecc71',
      secondary: '#19376d'
    },
    defaultFont: 'Roboto',
    backgroundImage: '/templates/excursion-mountains-lake.jpg',
    backgroundVideo: '/templates/fishing-1.mp4'
  },
  {
    id: 'fishing-tranquility-live',
    categoryId: 'fishing',
    name: 'Silencio y Caña',
    description: 'Relajante video frente al río, ideal para invitaciones a torneos o asados de pesca entre amigos.',
    style: 'minimal',
    preview: '🎣 Paz en el Agua',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#f8f9fa',
      text: '#2c3e50',
      accent: '#3498db',
      secondary: '#ecf0f1'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/excursion-mountains-lake.jpg',
    backgroundVideo: '/templates/fishing-2.mp4'
  },
  {
    id: 'fishing-nature-live',
    categoryId: 'fishing',
    name: 'Pesca en el Lago',
    description: 'Naturaleza pura y el reflejo del sol sobre el agua. Captura la esencia del deporte al aire libre.',
    style: 'rustic',
    preview: '🎣 Deporte y Aire Libre',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1d332d',
      text: '#ffffff',
      accent: '#f1c40f',
      secondary: '#2c3e50'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/excursion-mountains-lake.jpg',
    backgroundVideo: '/templates/fishing-3.mp4'
  },

  // --- COMUNIÓN LIVE (VIDEO) ---
  {
    id: 'communion-classic-live',
    categoryId: 'communion',
    name: 'Comunión Tradicional',
    description: 'Un video emotivo con símbolos clásicos de comunión, perfecto para una celebración espiritual y familiar.',
    style: 'elegant',
    preview: '🕊️ Fe y Tradición',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#f8f4f6',
      text: '#5d4037',
      accent: '#d4af37',
      secondary: '#ffffff'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/communion-chalice-bread.jpg',
    backgroundVideo: '/templates/communion-classic.mp4'
  },
  {
    id: 'communion-spiritual-live',
    categoryId: 'communion',
    name: 'Comunión Espiritual',
    description: 'Diseño minimalista y sereno que destaca la paz y la importancia de este gran paso en la fe.',
    style: 'minimal',
    preview: '✨ Luz y Paz',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#ffffff',
      text: '#2c3e50',
      accent: '#afa939',
      secondary: '#f5f6fa'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/communion-bible-wine.jpg',
    backgroundVideo: '/templates/communion-spirit.mp4'
  },
  {
    id: 'excursion-sendero-live',
    categoryId: 'hikes',
    name: 'Sendero de Aventura Live',
    description: 'Recorre caminos naturales y descubre paisajes increíbles con esta plantilla animada de senderismo.',
    style: 'rustic',
    preview: '🥾 Caminos por Descubrir',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#ffffff',
      text: '#1d332d',
      accent: '#27ae60',
      secondary: '#f1f8f4'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/excursion-volcano-path.jpg',
    backgroundVideo: '/templates/sendero-mp4.mp4'
  },
  {
    id: 'excursion-viaje-live',
    categoryId: 'hikes',
    name: 'Viaje de Ensueño Live',
    description: 'La emoción de viajar y explorar nuevos destinos plasmada en un video lleno de vida.',
    style: 'modern',
    preview: '✈️ Explorando el Mundo',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#ffffff',
      text: '#2c3e50',
      accent: '#3498db',
      secondary: '#ebf5fb'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/excursion-mountains-lake.jpg',
    backgroundVideo: '/templates/viaje-mp4.mp4'
  },
  
  // --- PLANTILLAS ORIGINALES PREMIUM (DISEÑO PROPIO) ---
  {
    id: 'midnight-gold-premium',
    categoryId: 'quinceanera',
    name: 'Oro de Medianoche ✨',
    description: 'Elegancia pura sobre seda negra con destellos de oro. Un diseño exclusivo y sofisticado.',
    style: 'elegant',
    preview: '✨ Lujo y Sofisticación',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#050510',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#1A1A2E'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/midnight-gold.png'
  },
  {
    id: 'watercolor-garden-premium',
    categoryId: 'birthday',
    name: 'Jardín de Acuarela 🌸',
    description: 'Flores suaves pintadas a mano. Estética etérea y luminosa para momentos especiales.',
    style: 'elegant',
    preview: '🌸 Arte y Naturaleza',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A5A4A',
      accent: '#AF9B9B',
      secondary: '#F8F4F4'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/watercolor-garden.png'
  },
  {
    id: 'modern-neon-pulse-premium',
    categoryId: 'eighteenth',
    name: 'Pulso Digital Neón ⚡',
    description: 'Energía pura en luces vibrantes. Ideal para festejos de noche y celebraciones modernas.',
    style: 'modern',
    preview: '⚡ Energía y Color',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0A0A0A',
      text: '#FFFFFF',
      accent: '#00D4FF',
      secondary: '#1A002E'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/modern-neon.png'
  },
  
  // --- MARCOS DE FOTOS ORIGINALES (ADICIONALES) ---
  {
    id: 'frame-midnight-gold',
    categoryId: 'photo-frame',
    name: 'Marco Gala Midnight',
    description: 'Fondo de seda negra y oro, optimizado para resaltar tus mejores fotografías.',
    style: 'elegant',
    preview: '🖼️ Elegancia Oscura',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a0a',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#1C1C1C'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/midnight-gold.png'
  },
  {
    id: 'frame-watercolor-garden',
    categoryId: 'photo-frame',
    name: 'Marco Soft Garden',
    description: 'Enmarca tus recuerdos con delicadas acuarelas artesanales.',
    style: 'elegant',
    preview: '🖼️ Naturaleza Suave',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#4A5A4A',
      accent: '#AF9B9B',
      secondary: '#F8F4F4'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/watercolor-garden.png'
  },
  {
    id: 'frame-modern-neon',
    categoryId: 'photo-frame',
    name: 'Marco Digital Neon',
    description: 'Estilo cyber y moderno para fotos llenas de energía.',
    style: 'modern',
    preview: '🖼️ Energía Neón',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0A0A0A',
      text: '#FFFFFF',
      accent: '#00D4FF',
      secondary: '#1A002E'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/modern-neon.png'
  },
  {
    id: 'frame-silver-glitter',
    categoryId: 'photo-frame',
    name: 'Marco Silver Glitter',
    description: 'Brillo de plata pura para resaltar momentos únicos con distinción.',
    style: 'elegant',
    preview: '🖼️ Destello de Plata',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#F0F0F0',
      text: '#333333',
      accent: '#A0A0A0',
      secondary: '#E0E0E0'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/silver-glitter.png'
  },

  // --- BAUTISMO NUEVOS VIDEOS ---

  {
    id: 'birthday-monstruitos-live',
    categoryId: 'fantasy',
    name: 'Monstruitos Felices Live',
    description: 'Adorables monstruitos que celebran con alegría y ternura este momento único de fe.',
    style: 'playful',
    preview: '👾 Fiesta de Fe',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FFFFFF',
      text: '#5D4037',
      accent: '#FFD700',
      secondary: '#FFF9E3'
    },
    defaultFont: 'Pacifico',
    backgroundImage: '/templates/baptism-water-drop.jpg',
    backgroundVideo: '/templates/mountritosfelices-mp4.mp4'
  },

  // --- CUMPLEAÑOS / FANTASÍA NUEVOS VIDEOS ---
  {
    id: 'fantasy-lampara-monstruos-live',
    categoryId: 'fantasy',
    name: 'Lámpara Mágica y Monstruos 🪔',
    description: 'Una lámpara mágica de la que salen adorables monstruitos de colores. ¡Para los cumpleaños más creativos!',
    style: 'playful',
    preview: '🪔 Magia y Color',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a1a',
      text: '#FFFFFF',
      accent: '#FFD700',
      secondary: '#1a1a2e'
    },
    defaultFont: 'Pacifico',
    backgroundImage: '/templates/birthday_monstruos_kids_fallback_1773176649883.png',
    backgroundVideo: '/templates/lamparaymountruos-mp4.mp4'
  },
  {
    id: 'fantasy-princesas-jugando-live',
    categoryId: 'fantasy',
    name: 'Princesas Jugando 👸',
    description: 'Una hermosa escena de princesas en un mundo de fantasía, llena de magia y diversión.',
    style: 'elegant',
    preview: '👑 Sueños de Princesa',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#4c1d95',
      text: '#FFFFFF',
      accent: '#fcd34d',
      secondary: '#5b21b6'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/theater-grand-opera.jpg',
    backgroundVideo: '/templates/princesasjugando-mp4.mp4'
  },

  // --- CUMPLEAÑOS / MONSTRUITOS NUEVO VIDEO ---
  {
    id: 'birthday-monstruitos-felices2-live',
    categoryId: 'fantasy',
    name: 'Destello de Monstruitos Live ✨',
    description: 'Adorables monstruitos con brillos y colores mágicos para una fiesta muy especial y divertida.',
    style: 'playful',
    preview: '🌟 Monstruos y Brillo',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a1a',
      text: '#FFFFFF',
      accent: '#00E676',
      secondary: '#1a1a2e'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/birthday_monstruos_kids_fallback_1773176649883.png',
    backgroundVideo: '/templates/mountritosfelices2-mp4.mp4'
  },

  // --- PADRINOS Y AHIJADOS NUEVOS VIDEOS ---
  {
    id: 'godparents-padrino1-live',
    categoryId: 'godparents',
    name: 'Padrinos de Corazón Live',
    description: 'Un video emotivo que celebra el vínculo sagrado entre padrinos y ahijados con elegancia.',
    style: 'elegant',
    preview: '🤲 Vínculo Sagrado',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a1a',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#1a1a2e'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/baptism-candle-tall.jpg',
    backgroundVideo: '/templates/padrino-mp4.mp4'
  },
  {
    id: 'godparents-padrino2-live',
    categoryId: 'godparents',
    name: 'Bendición de Padrinos Live',
    description: 'Momentos únicos e irrepetibles del lazo especial entre padrinos y su ahijado, en movimiento.',
    style: 'elegant',
    preview: '💛 Amor de Padrinos',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#FDFCFB',
      text: '#5D4037',
      accent: '#B8860B',
      secondary: '#FFFAF0'
    },
    defaultFont: 'Great Vibes',
    backgroundImage: '/templates/baptism-bird-fly.jpg',
    backgroundVideo: '/templates/padrino2-mp4.mp4'
  },

  // --- BODAS (INVITACIONES ANIMADAS) ---
  {
    id: 'wedding-sobre-live',
    categoryId: 'wedding',
    name: 'Carta de Invitación Viva 💌',
    description: 'Un sobre que se abre revelando tu invitación. La forma más elegante y sorprendente de convocar a tus invitados.',
    style: 'elegant',
    preview: '✉️ Carta Mágica',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1a0a0a',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#2d1a1a'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/dinner-candles-dark.jpg',
    backgroundVideo: '/templates/sobre-mp4.mp4'
  },
  {
    id: 'wedding-tarjeta-live',
    categoryId: 'wedding',
    name: 'Tarjeta Animada Viva 🎴',
    description: 'Una tarjeta de invitación que cobra vida con movimiento y efectos elegantes. Para cualquier ocasión especial.',
    style: 'modern',
    preview: '🎴 Invitación Animada',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#9B59B6',
      secondary: '#1a1a2e'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/party-neon-club.jpg',
    backgroundVideo: '/templates/tarjeta-mp4.mp4'
  },
  {
    id: 'wedding-tarjeta2-live',
    categoryId: 'wedding',
    name: 'Tarjeta Especial Live ✨',
    description: 'Segunda versión de tarjeta animada, con un estilo más íntimo y emotivo para sorprender a quien más querés.',
    style: 'elegant',
    preview: '💌 Sorpresa con Movimiento',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a0a',
      text: '#FFFFFF',
      accent: '#E91E63',
      secondary: '#1a0010'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/dinner-candles-dark.jpg',
    backgroundVideo: '/templates/tarjeta2-mp4.mp4'
  },

  // --- NUEVOS VIDEOS AGREGADOS ---
  
  // CORPORATIVOS
  {
    id: 'corporate-lanzamiento-live',
    categoryId: 'corporate',
    name: 'Lanzamiento de Empresa 🚀',
    description: 'Imágenes modernas y elegantes para un despegue empresarial o presentación de alto impacto.',
    style: 'modern',
    preview: '🏢 Evento Empresarial',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a192f',
      text: '#FFFFFF',
      accent: '#64ffda',
      secondary: '#112240'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/corporate-desk-wood.jpg',
    backgroundVideo: '/templates/lanzamientodeempresa-mp4.mp4'
  },
  {
    id: 'corporate-futurista-live',
    categoryId: 'corporate',
    name: 'Visión Futurista Live 🌐',
    description: 'Estética cyber y vanguardista para empresas de tecnología o eventos de innovación.',
    style: 'modern',
    preview: '💡 Startups y Futuro',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a0a',
      text: '#FFFFFF',
      accent: '#00D4FF',
      secondary: '#1a1a2e'
    },
    defaultFont: 'Bebas Neue',
    backgroundImage: '/templates/corporate-laptop-white.jpg',
    backgroundVideo: '/templates/futurista-mp4.mp4'
  },

  // DÍA DE LA MADRE
  {
    id: 'mothers-day-eterna-live',
    categoryId: 'mothers-day',
    name: 'Amor de Madre Eterna 💖',
    description: 'La forma más bella de homenajear a mamá en su día con ternura, recuerdos y movimiento.',
    style: 'elegant',
    preview: '🌸 Homenaje a Mamá',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#fff0f5',
      text: '#5d4037',
      accent: '#ff69b4',
      secondary: '#ffe4e1'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/baby-shower-teddy-basket.jpg', // Placeholder
    backgroundVideo: '/templates/madreeterna-mp4.mp4'
  },

  // GRADUACIONES
  {
    id: 'graduation-elite-live',
    categoryId: 'graduation',
    name: 'Graduación Élite Live 🎓',
    description: 'Sofisticación máxima para celebrar el esfuerzo académico en una noche de premios y logros.',
    style: 'elegant',
    preview: '🌟 La Noche del Triunfo',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#D4AF37',
      secondary: '#1a1a1a'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/corporate-modern-chair.jpg', // Placeholder
    backgroundVideo: '/templates/graduacionelite-mp4.mp4'
  },

  // CUMPLEAÑOS ADULTOS
  {
    id: 'birthday-monos-cerezas-live',
    categoryId: 'birthday',
    name: 'Moños y Cerezas Clásico 🍒',
    description: 'Patrón elegante de moños y cerezas que evoca los estilos más chic para tus cumpleaños.',
    style: 'elegant',
    preview: '🎀 Dulzor Elegante',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#ffffff',
      text: '#2d3436',
      accent: '#e84393',
      secondary: '#ffeaa7'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/birthday-chocolates.jpg', // Placeholder
    backgroundVideo: '/templates/moñosyceresas-mp4.mp4'
  },
  {
    id: 'birthday-cerezas-monos-live',
    categoryId: 'birthday',
    name: 'Cerezas y Moños Retro 🍒',
    description: 'Estilo audaz en tonos intensos, perfecto para una celebración retro pero llena de glamour.',
    style: 'modern',
    preview: '👠 Estilo y Color',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a0a',
      text: '#FFFFFF',
      accent: '#d63031',
      secondary: '#2d3436'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/birthday-donuts-fruit.jpg', // Placeholder
    backgroundVideo: '/templates/ceresasymoños-mp4.mp4'
  },
  {
    id: 'birthday-mariposa-cristal-live',
    categoryId: 'birthday',
    name: 'Mariposa de Cristal ✨',
    description: 'La belleza efímera y elegante de una mariposa de cristal iluminada, un símbolo de transformación.',
    style: 'elegant',
    preview: '🦋 Brillo Transformador',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#0a0a1a',
      text: '#FFFFFF',
      accent: '#a29bfe',
      secondary: '#1a1a2e'
    },
    defaultFont: 'Dancing Script',
    backgroundImage: '/templates/wedding-rings.jpg', // Placeholder
    backgroundVideo: '/templates/mariposadecristal-mp4.mp4'
  },
  {
    id: 'birthday-colibri-cristal-live',
    categoryId: 'birthday',
    name: 'Colibrí de Cristal ✨',
    description: 'Vida, energía y elegancia radiante resumidas en el movimiento etéreo del colibrí.',
    style: 'elegant',
    preview: '🐦 Energía y Luz',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#f8f9fa',
      text: '#2d3436',
      accent: '#74b9ff',
      secondary: '#f1f2f6'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/baptism-dove.jpg', // Placeholder
    backgroundVideo: '/templates/colibridecristal-mp4.mp4'
  },
  {
    id: 'birthday-bosque-encantado-live',
    categoryId: 'birthday',
    name: 'Bosque Encantado 🌲',
    description: 'Celebra al aire libre rodeado de la magia mística de la naturaleza profunda.',
    style: 'rustic',
    preview: '🍃 Naturaleza Mágica',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#fdfbf7',
      text: '#2d3436',
      accent: '#00b894',
      secondary: '#dfe6e9'
    },
    defaultFont: 'Quicksand',
    backgroundImage: '/templates/excursion-mountains-lake.jpg', // Placeholder
    backgroundVideo: '/templates/bosqueencantado-mp4.mp4'
  },

  // RESTANTES
  {
    id: 'eighteenth-galactico-live',
    categoryId: 'eighteenth',
    name: 'Espacio Galáctico Live 🌌',
    description: 'Para un cumpleaños de 18 que no conoce fronteras. Un viaje por las estrellas para celebrar tu mayoría de edad.',
    style: 'modern',
    preview: '👽 Un Festejo de Otro Mundo',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#050510',
      text: '#FFFFFF',
      accent: '#6c5ce7',
      secondary: '#1a1a2e'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/fifteen-party-neon.jpg',
    backgroundVideo: '/templates/espacial-galactico-mp4.mp4'
  },
  {
    id: 'anniversary-vintage-oro-live',
    categoryId: 'anniversary',
    name: 'Vintage Oro Viejo Live 🕰️',
    description: 'Nostalgia y lujo clásico. Los tonos oro viejo rememoran los mejores momentos pasados juntos.',
    style: 'rustic',
    preview: '💫 Amor Clásico',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#1A1A1A',
      text: '#FFFFFF',
      accent: '#b8860b',
      secondary: '#2C3E50'
    },
    defaultFont: 'Playfair Display',
    backgroundImage: '/templates/anniversary-hourglass.jpg',
    backgroundVideo: '/templates/vintageoroviejo-mp4.mp4'
  },
  {
    id: 'dinner-nautico-live',
    categoryId: 'dinner',
    name: 'Evento Náutico de Lujo ⛵',
    description: 'Siente la brisa del mar. Una estética impecable para cenas exclusivas, fiestas en yates o veladas sofisticadas.',
    style: 'elegant',
    preview: '⚓ Exclusividad en Altamar',
    layout: 'centered',
    isPremium: true,
    defaultColors: {
      background: '#f8f9fa',
      text: '#0b2447',
      accent: '#19376d',
      secondary: '#e5e8e8'
    },
    defaultFont: 'Montserrat',
    backgroundImage: '/templates/excursion-mountains-lake.jpg', // Placeholder
    backgroundVideo: '/templates/nauticodelujo-mp4.mp4'
  }
];

export const fonts = [
  { id: 'poppins', name: 'Poppins', family: "'Poppins', sans-serif" },
  { id: 'playfair', name: 'Playfair Display', family: "'Playfair Display', serif" },
  { id: 'montserrat', name: 'Montserrat', family: "'Montserrat', sans-serif" },
  { id: 'quicksand', name: 'Quicksand', family: "'Quicksand', sans-serif" },
  { id: 'dancing', name: 'Dancing Script', family: "'Dancing Script', cursive" },
  { id: 'greatvibes', name: 'Great Vibes', family: "'Great Vibes', cursive" },
  { id: 'pacifico', name: 'Pacifico', family: "'Pacifico', cursive" },
  { id: 'bebas', name: 'Bebas Neue', family: "'Bebas Neue', cursive" },
  { id: 'caveat', name: 'Caveat', family: "'Caveat', cursive" },
  { id: 'comfortaa', name: 'Comfortaa', family: "'Comfortaa', sans-serif" }
];

export const getTemplatesByCategory = (categoryId: string) => {
  return templates.filter(t => t.categoryId === categoryId);
};

export const getCategoryById = (id: string) => {
  return categories.find(c => c.id === id);
};
