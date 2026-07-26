export const LEVELS = {
  PRIMAIRE: 'primaire',
  COLLEGE: 'college',
  LYCEE: 'lycee',
  UNIVERSITE: 'universite',
} as const

export const SUBJECTS_BY_LEVEL = {
  primaire: [
    'Français',
    'Mathématiques',
    'Sciences',
  ],
  college: [
    'Français',
    'Mathématiques',
    'Physique-Chimie',
    'Histoire-Géographie',
    'Anglais',
    'SVT',
  ],
  lycee: [
    'Mathématiques',
    'Physique-Chimie',
    'Français',
    'Philosophie',
    'Histoire-Géographie',
    'Anglais',
  ],
  universite: [
    'Intelligence Artificielle',
    'Informatique',
    'Médecine',
    'Droit',
    'Économie / Gestion',
  ],
} as const

export const CLASSES = {
  college: ['6ème', '5ème', '4ème', '3ème'],
  lycee: [
    '2nde',
    '1ère A',
    '1ère B',
    '1ère C',
    '1ère D',
    'Terminale A',
    'Terminale B',
    'Terminale C',
    'Terminale D',
  ],
} as const

export const LEVEL_NUMBERS = {
  NIVEAU_1: 'Niveau 1',
  NIVEAU_2: 'Niveau 2',
  NIVEAU_3: 'Niveau 3',
} as const

export const BADGES = {
  FIRST_QUIZ: { name: '🎯 Premier Quiz', description: 'Complète ton premier quiz' },
  FIVE_QUIZZES: { name: '⭐ 5 Quizzes', description: 'Complète 5 quizzes' },
  PERFECT_SCORE: { name: '💯 Score Parfait', description: 'Obtiens 100% à un quiz' },
  STREAK_7: { name: '🔥 7 Jours', description: 'Joue 7 jours de suite' },
  LEVEL_COMPLETE: { name: '🏆 Niveau Complété', description: 'Complète tous les quizzes d\'un niveau' },
} as const

export const GAMIFICATION = {
  HEARTS_START: 3,
  HEARTS_MAX: 3,
  POINTS_PER_CORRECT: 20,
  PASSING_SCORE: 70,
  SCORE_MULTIPLIER: 1,
} as const

export const QUIZ_CONFIG = {
  QUESTIONS_PER_QUIZ_PRIMAIRE: 10,
  QUESTIONS_PER_QUIZ_COLLEGE: 15,
  QUESTIONS_PER_QUIZ_UNIVERSITE: 20,
} as const

export const LEVELS_OPTIONS = [
  { value: 'primaire', label: 'Primaire', icon: '🎨' },
  { value: 'college', label: 'Collège', icon: '📚' },
  { value: 'lycee', label: 'Lycée', icon: '🎓' },
  { value: 'universite', label: 'Université', icon: '👨‍🎓' },
] as const
