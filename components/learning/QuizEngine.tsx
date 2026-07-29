'use client'

import { useState, useEffect } from 'react'

interface Answer {
  id: number
  text: string
  isCorrect: boolean
}

interface Question {
  id: number
  text: string
  answers: Answer[]
  explanation: string
}

interface QuizEngineProps {
  quizId: string
  quizTitle: string
  totalQuestions: number
  initialQuestions?: Question[]
  onComplete: (score: number, hearts: number) => void
  onCancel: () => void
}

export default function QuizEngine({
  quizId,
  quizTitle,
  totalQuestions,
  onComplete,
  onCancel,
}: QuizEngineProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions ?? [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hearts, setHearts] = useState(3)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [loading, setLoading] = useState(initialQuestions ? false : true)
  const [error, setError] = useState('')

  // Charger les questions
  useEffect(() => {
    if (initialQuestions) {
      return
    }

    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/content/quiz/${quizId}`)
        if (!res.ok) throw new Error('Failed to load questions')
        const data = await res.json()
        setQuestions(data.questions)
      } catch (err) {
        setError('Erreur lors du chargement des questions')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [initialQuestions, quizId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-main)]"></div>
          <p className="mt-4 text-[var(--text-dark)]">Chargement des questions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-[var(--primary-main)] text-white rounded-lg hover:opacity-90"
          >
            Retour
          </button>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-[var(--text-dark)]">Aucune question trouvée</p>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / totalQuestions) * 100

  const handleSelectAnswer = (answerId: number) => {
    if (answered) return

    setSelectedAnswer(answerId)
    const isCorrect = questions[currentIndex].answers.find(
      (a) => a.id === answerId
    )?.isCorrect

    if (isCorrect) {
      // Each correct answer adds an equal share to reach 100% total.
      setScore((prev) => prev + Math.round(100 / totalQuestions))
    } else {
      setHearts((prev) => Math.max(0, prev - 1))
    }

    setAnswered(true)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      // Quiz terminé
      onComplete(Math.round(score), hearts)
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setSelectedAnswer(null)
      setAnswered(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-light)] to-opacity-80 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-brand p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[var(--primary-main)]">
              {quizTitle}
            </h2>
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className={i < hearts ? 'text-2xl' : 'text-2xl opacity-30'}>
                  ❤️
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Question {currentIndex + 1} / {totalQuestions}</span>
          <span>Score: {Math.round(score)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--primary-main)] to-[var(--accent-gold)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-brand p-8 mb-6">
          <h3 className="text-2xl font-bold text-[var(--text-dark)] mb-8">
            {currentQuestion.text}
          </h3>

          {/* Answers */}
          <div className="space-y-3 mb-8">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={answer.id}
                onClick={() => handleSelectAnswer(answer.id)}
                disabled={answered}
                className={`w-full p-4 text-left rounded-lg border-2 transition ${
                  selectedAnswer === answer.id
                    ? answer.isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-[var(--border)] hover:border-[var(--primary-main)]'
                } ${answered ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{answer.text}</span>
                  {answered && answer.isCorrect && <span className="ml-auto">✓</span>}
                  {answered && selectedAnswer === answer.id && !answer.isCorrect && (
                    <span className="ml-auto">✗</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {answered && (
            <div className={`p-4 rounded-lg mb-6 ${
              currentQuestion.answers.find((a) => a.id === selectedAnswer)?.isCorrect
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <p className="font-semibold mb-2">
                {currentQuestion.answers.find((a) => a.id === selectedAnswer)?.isCorrect
                  ? '✓ Correct !'
                  : '✗ Incorrect'}
              </p>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="px-6 py-2 border-2 border-[var(--border)] text-[var(--primary-main)] rounded-lg hover:bg-[var(--primary-light)] disabled:opacity-50"
            >
              ← Précédent
            </button>
            <button
              onClick={handleNext}
              disabled={!answered}
              className="flex-1 px-6 py-2 bg-gradient-to-r from-[var(--primary-main)] to-[var(--accent-secondary)] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {currentIndex === questions.length - 1 ? 'Terminer' : 'Suivant'} →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
