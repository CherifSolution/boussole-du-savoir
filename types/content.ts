export interface Subject {
  id: number
  name: string
  description: string
  level: 'primaire' | 'college' | 'lycee' | 'universite'
  iconUrl?: string
  orderIndex: number
}

export interface Level {
  id: number
  name: string
  levelNumber: number
  description: string
  theme: string
  illustrationUrl?: string
}

export interface AnswerOption {
  id: number
  text: string
  isCorrect: boolean
  orderIndex: number
}

export interface Question {
  id: number
  text: string
  questionType: 'multiple_choice' | 'true_false' | 'short_answer'
  orderIndex: number
  difficulty: number
  explanation: string
  answers: AnswerOption[]
}

export interface Quiz {
  id: number
  subjectId: number
  levelId: number
  title: string
  description: string
  totalQuestions: number
  passingScore: number
  videoUrl?: string
  estimatedDurationMinutes: number
  questions?: Question[]
}

export interface UserProgress {
  id: number
  userId: string
  quizId: number
  startedAt?: Date
  completedAt?: Date
  score?: number
  heartsRemaining: number
  status: 'not_started' | 'in_progress' | 'completed'
}

export interface UserBadge {
  id: number
  userId: string
  badgeName: string
  description: string
  iconUrl?: string
  earnedAt: Date
}
