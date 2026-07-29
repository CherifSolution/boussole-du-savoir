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
  questions?: {
    text: string
    answers: { text: string }[]
  }[]
}

export default function LevelPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const subject = (params.subject as string) || ''
  const levelNumber = (params.level as string) || '1'

  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [generatedQuiz, setGeneratedQuiz] = useState<Quiz | null>(null)
  const [generationLoading, setGenerationLoading] = useState(false)
  const [generationError, setGenerationError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (!session?.user?.id) return

    const fetchQuizzes = async () => {
      try {
        const res = await fetch(
          `/api/content/quizzes?subject=${encodeURIComponent(subject)}&levelNumber=${encodeURIComponent(levelNumber)}`
        )
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Failed to fetch quizzes')
        }
        const data = await res.json()
        setQuizzes(data.quizzes || [])
      } catch (error) {
        console.error('Error fetching quizzes:', error)
        setError('Impossible de charger les quizzes pour ce niveau.')
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [session, subject, levelNumber])

  const handleGenerateQuiz = async () => {
    setGenerationLoading(true)
    setGenerationError('')
    setGeneratedQuiz(null)

    try {
      const res = await fetch('/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subject.replace(/-/g, ' '),
          levelNumber: Number(levelNumber),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Impossible de générer le quiz')
      }

      const data = await res.json()
      setGeneratedQuiz(data.quiz)
    } catch (error) {
      console.error('Error generating quiz:', error)
      setGenerationError(
        error instanceof Error ? error.message : 'Erreur lors de la génération du quiz'
      )
    } finally {
      setGenerationLoading(false)
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

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-red-700 text-center">
          {error}
        </div>
      ) : (
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
      )}

      {quizzes.length === 0 && (
        <div className="mt-8 bg-white rounded-3xl shadow-brand p-6">
          <h2 className="text-xl font-bold text-[var(--primary-main)] mb-3">
            Générer un quiz avec Claude
          </h2>
          <p className="text-[var(--text-dark)] opacity-75 mb-4">
            Si aucun quiz n&apos;est disponible pour ce niveau, tu peux en générer un nouveau automatiquement.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleGenerateQuiz}
              disabled={generationLoading}
              className="px-6 py-3 bg-[var(--primary-main)] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {generationLoading ? 'Génération en cours...' : 'Générer le quiz'}
            </button>
          </div>

          {generationError && (
            <p className="mt-4 text-red-600">{generationError}</p>
          )}

          {generatedQuiz && (
            <div className="mt-6 bg-[var(--primary-light)] rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-[var(--primary-main)] mb-2">
                {generatedQuiz.title}
              </h3>
              <p className="text-[var(--text-dark)] opacity-75 mb-4">
                {generatedQuiz.description}
              </p>
              <div className="space-y-4">
                {generatedQuiz.questions?.slice(0, 3).map((question, index) => (
                  <div key={index} className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="font-semibold">Question {index + 1}</p>
                    <p className="text-sm text-[var(--text-dark)] opacity-80 mb-2">{question.text}</p>
                    <ul className="list-disc list-inside text-sm text-[var(--text-dark)] opacity-80 space-y-1">
                      {question.answers.map((answer, answerIndex) => (
                        <li key={answerIndex}>{answer.text}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
