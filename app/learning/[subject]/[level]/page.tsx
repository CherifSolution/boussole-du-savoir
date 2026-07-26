'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Quiz {
  id: number
  title: string
  description: string
  totalQuestions: number
  estimatedDurationMinutes: number
}

export default function LevelPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const subject = (params.subject as string) || ''
  const levelNumber = (params.level as string) || '1'

  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      fetchQuizzes()
    }
  }, [session, subject, levelNumber])

  const fetchQuizzes = async () => {
    try {
      // Données d'exemple - à adapter avec vos vraies données
      const mockQuizzes: Quiz[] = [
        {
          id: 1,
          title: `Quiz ${levelNumber} - Part 1`,
          description: 'Teste tes connaissances sur les concepts fondamentaux',
          totalQuestions: 10,
          estimatedDurationMinutes: 10,
        },
        {
          id: 2,
          title: `Quiz ${levelNumber} - Part 2`,
          description: 'Approfondie avec des questions plus complexes',
          totalQuestions: 15,
          estimatedDurationMinutes: 15,
        },
      ]
      setQuizzes(mockQuizzes)
    } catch (error) {
      console.error('Error fetching quizzes:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-main)]"></div>
          <p className="mt-4 text-[var(--text-dark)]">Chargement des quizzes...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/learning/${subject}`}
          className="text-[var(--primary-main)] hover:underline mb-4 inline-block"
        >
          ← Retour aux niveaux
        </Link>
        <h1 className="text-4xl font-bold text-[var(--primary-main)] mb-2">
          Niveau {levelNumber}
        </h1>
        <p className="text-[var(--text-dark)] opacity-75">
          Complète tous les quizzes de ce niveau pour progresser
        </p>
      </div>

      {/* Level Info Card */}
      <div className="bg-white rounded-lg shadow-brand p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-[var(--text-dark)] opacity-75">Quizzes disponibles</p>
            <p className="text-3xl font-bold text-[var(--primary-main)]">{quizzes.length}</p>
          </div>
          <div>
            <p className="text-sm text-[var(--text-dark)] opacity-75">Questions totales</p>
            <p className="text-3xl font-bold text-[var(--accent-secondary)]">
              {quizzes.reduce((sum, q) => sum + q.totalQuestions, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-[var(--text-dark)] opacity-75">Durée estimée</p>
            <p className="text-3xl font-bold text-[var(--accent-gold)]">
              {quizzes.reduce((sum, q) => sum + q.estimatedDurationMinutes, 0)} min
            </p>
          </div>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow-brand overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--primary-main)] to-[var(--accent-secondary)] p-6 text-white">
              <h3 className="text-xl font-bold mb-1">{quiz.title}</h3>
              <p className="text-sm opacity-90">{quiz.description}</p>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex gap-6 mb-6">
                <div>
                  <p className="text-xs text-[var(--text-dark)] opacity-75">Questions</p>
                  <p className="text-2xl font-bold text-[var(--primary-main)]">
                    {quiz.totalQuestions}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-dark)] opacity-75">Durée</p>
                  <p className="text-2xl font-bold text-[var(--accent-gold)]">
                    {quiz.estimatedDurationMinutes}m
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/learning/${subject}/${levelNumber}/quiz/${quiz.id}`}
                className="w-full py-3 bg-[var(--primary-main)] text-white font-semibold rounded-lg hover:opacity-90 transition text-center"
              >
                Commencer le Quiz →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="mt-12 bg-[var(--primary-light)] rounded-lg p-6">
        <h3 className="text-lg font-bold text-[var(--primary-main)] mb-3">💡 Conseils</h3>
        <ul className="space-y-2 text-[var(--text-dark)]">
          <li>• Lis attentivement chaque question avant de répondre</li>
          <li>• Prends ton temps - tu dois obtenir au moins 70% pour réussir</li>
          <li>• Tu as {3} vies (cœurs) par quiz</li>
          <li>• Tu peux toujours recommencer si tu échoues</li>
        </ul>
      </div>
    </div>
  )
}
