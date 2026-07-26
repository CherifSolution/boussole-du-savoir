export interface User {
  id: string
  email: string
  createdAt: Date
}

export interface Profile {
  id: number
  userId: string
  fullName: string
  level: 'primaire' | 'college' | 'lycee' | 'universite'
  classDetails?: string // "6eme", "2nde_A", etc
  universityDomain?: string // "ia", "informatique", etc
  avatarUrl?: string
  bio?: string
  language: string
  notificationsEnabled: boolean
}

export interface Session {
  user: {
    id: string
    email: string
  }
  expires: string
}
