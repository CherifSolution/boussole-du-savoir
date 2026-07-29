export function cn(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function calculateScore(correctAnswers: number, totalQuestions: number): number {
  return Math.round((correctAnswers / totalQuestions) * 100)
}

export function formatDate(date: Date | string | undefined): string {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 70) return 'text-blue-600'
  if (score >= 50) return 'text-orange-600'
  return 'text-red-600'
}

export function getScoreEmoji(score: number): string {
  if (score >= 90) return '🌟'
  if (score >= 80) return '⭐'
  if (score >= 70) return '✅'
  if (score >= 60) return '👍'
  return '📚'
}

export function getGradeEmoji(score: number): string {
  if (score >= 90) return '⭐'
  if (score >= 80) return '👍'
  if (score >= 70) return '✅'
  if (score >= 50) return '⏳'
  return '❌'
}

export function getLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    primaire: '🎨 Primaire',
    college: '📚 Collège',
    lycee: '🎓 Lycée',
    universite: '👨‍🎓 Université',
  }
  return labels[level] || level
}

export function getSubjectIcon(subject: string): string {
  const icons: Record<string, string> = {
    'Français': '📖',
    'Mathématiques': '🧮',
    'Sciences': '🔬',
    'Physique-Chimie': '⚗️',
    'Histoire-Géographie': '🗺️',
    'Anglais': '🌍',
    'SVT': '🌿',
    'Philosophie': '💭',
    'Intelligence Artificielle': '🤖',
    'Informatique': '💻',
    'Médecine': '⚕️',
    'Droit': '⚖️',
    'Économie / Gestion': '💼',
  }
  return icons[subject] || '📚'
}

export function getAvatarUrl(email: string, size: number = 40): string {
  const hash = Array.from(email).reduce(
    (hash, char) => (hash << 5) - hash + char.charCodeAt(0),
    0
  )
  const colors = [
    'FF6B6B',
    '4ECDC4',
    '45B7D1',
    'FFA07A',
    '98D8C8',
    'F7DC6F',
    'BB8FCE',
  ]
  const color = colors[Math.abs(hash) % colors.length]
  const initials = email.split('@')[0].slice(0, 2).toUpperCase()
  return `https://ui-avatars.com/api/?name=${initials}&background=${color}&color=fff&size=${size}`
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function isPassingScore(score: number, passingScore: number = 70): boolean {
  return score >= passingScore
}

export function getDurationInMinutes(startTime: Date, endTime: Date): number {
  return Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60))
}
