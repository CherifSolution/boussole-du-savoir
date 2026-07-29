'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import QuizEngine from '@/components/learning/QuizEngine'

export default function QuizPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const quizId = (params.quizId as string) || ''
  const subject = (params.subject as string) || ''
  const level = (params.level as string) || '1'

  const [quiz, setQuiz] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id && quizId) {
      fetchQuiz()
    }
  }, [session, quizId])

  const fetchQuiz = async () => {
    try {
      const res = await fetch(`/api/content/quiz/${quizId}`)
      if (!res.ok) throw new Error('Failed to fetch quiz')
      const data = await res.json()
      setQuiz(data)
    } catch (error) {
      console.error('Error fetching quiz:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuizComplete = async (score: number, hearts: number) => {
    try {
      // Sauvegarder le progrès
      const res = await fetch('/api/user/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: parseInt(quizId),
          score,
          heartsRemaining: hearts,
          status: 'completed',
        }),
      })

      if (res.ok) {
        // Rediriger vers la page de résultats ou de niveau
        router.push(
          `/learning/${subject}/${level}/quiz/${quizId}/results?score=${score}&hearts=${hearts}`
        )
      }
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-main)]"></div>
          <p className="mt-4 text-[var(--text-dark)]">Chargement du quiz...</p>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-[var(--text-dark)] mb-4">Quiz non trouvé</p>
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-[var(--primary-main)] text-white rounded-lg hover:opacity-90"
          >
            Retour
          </button>
        </div>
      </div>
    )
  }

  return (
    <QuizEngine
      quizId={quizId}
      quizTitle={quiz.quiz?.title || 'Quiz'}
      totalQuestions={quiz.quiz?.totalQuestions || 10}
      initialQuestions={quiz.questions}
      onComplete={handleQuizComplete}
      onCancel={handleCancel}
    />
  )
}
