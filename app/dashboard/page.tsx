'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Progress {
  id: number
  quizId: number
  title: string
  subjectName: string
  score: number
  status: string
  completedAt?: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [progress, setProgress] = useState<Progress[]>([])
  const [stats, setStats] = useState({ completedQuizzes: 0, averageScore: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      fetchProgress()
    }
  }, [session])

  const fetchProgress = async () => {
    try {
      const res = await fetch('/api/user/progress')
      if (!res.ok) throw new Error('Failed to fetch progress')
      const data = await res.json()
      setProgress(data.progress)
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching progress:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-main)]"></div>
          <p className="mt-4 text-[var(--text-dark)]">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-light)] to-opacity-80">
      {/* Header */}
      <header className="bg-white shadow-brand p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--primary-main)]">
            🧭 Boussole du Savoir
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-[var(--text-dark)]">{session.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-brand p-6">
            <div className="text-4xl font-bold text-[var(--primary-main)] mb-2">
              {stats.completedQuizzes}
            </div>
            <p className="text-[var(--text-dark)] opacity-75">Quizzes Complétés</p>
          </div>

          <div className="bg-white rounded-lg shadow-brand p-6">
            <div className="text-4xl font-bold text-[var(--accent-gold)] mb-2">
              {stats.averageScore}%
            </div>
            <p className="text-[var(--text-dark)] opacity-75">Score Moyen</p>
          </div>

          <div className="bg-white rounded-lg shadow-brand p-6">
            <div className="text-4xl font-bold text-[var(--accent-secondary)] mb-2">
              {Math.max(...progress.map((p) => p.score || 0), 0)}%
            </div>
            <p className="text-[var(--text-dark)] opacity-75">Meilleur Score</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-brand p-6 mb-8">
          <h2 className="text-xl font-bold text-[var(--primary-main)] mb-4">Actions</h2>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/learning"
              className="px-6 py-3 bg-gradient-to-r from-[var(--primary-main)] to-[var(--accent-secondary)] text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              📚 Continuer l&apos;apprentissage
            </Link>
            <Link
              href="/dashboard/profile"
              className="px-6 py-3 border-2 border-[var(--primary-main)] text-[var(--primary-main)] font-semibold rounded-lg hover:bg-[var(--primary-light)] transition"
            >
              👤 Modifier Profil
            </Link>
          </div>
        </div>

        {/* Recent Progress */}
        <div className="bg-white rounded-lg shadow-brand p-6">
          <h2 className="text-xl font-bold text-[var(--primary-main)] mb-4">
            Progression Récente
          </h2>

          {progress.length === 0 ? (
            <p className="text-[var(--text-dark)] opacity-75 text-center py-8">
              Tu n&apos;as pas encore complété de quizzes. <br />
              <Link href="/learning" className="text-[var(--primary-main)] font-semibold hover:underline">
                Commence maintenant →
              </Link>
            </p>
          ) : (
            <div className="space-y-3">
              {progress.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="flex justify-between items-center p-4 bg-[var(--primary-light)] rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-[var(--text-dark)]">{p.title}</p>
                    <p className="text-sm text-[var(--text-dark)] opacity-70">
                      {p.subjectName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[var(--primary-main)]">{p.score}%</p>
                    <p className="text-sm text-[var(--text-dark)] opacity-70">
                      {p.status === 'completed' ? '✅ Complété' : '⏳ En cours'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
