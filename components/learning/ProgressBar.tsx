'use client'

import { cn } from '@/lib/utils'

interface ProgressBarProps {
  hearts: number
  maxHearts?: number
  score: number
  totalQuestions: number
  currentQuestion: number
  showPercentage?: boolean
}

export default function ProgressBar({
  hearts,
  maxHearts = 3,
  score,
  totalQuestions,
  currentQuestion,
  showPercentage = true,
}: ProgressBarProps) {
  const percentage = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0
  // score is stored as a percentage in the UI components; display it directly
  const displayScore = Math.round(score)

  return (
    <div className="bg-white rounded-lg shadow-brand p-4 mb-6">
      {/* Top Row: Title and Score */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {Array.from({ length: maxHearts }).map((_, i) => (
            <span
              key={i}
              className={cn(
                'text-2xl transition-all',
                i < hearts ? 'scale-100' : 'scale-75 opacity-30'
              )}
            >
              ❤️
            </span>
          ))}
        </div>
        {showPercentage && (
          <div className="text-right">
            <p className="text-xs text-[var(--text-dark)] opacity-75">Score</p>
            <p className="text-xl font-bold text-[var(--primary-main)]">{displayScore}%</p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[var(--text-dark)] opacity-75">
            Question {currentQuestion} / {totalQuestions}
          </span>
          <span className="font-semibold text-[var(--primary-main)]">{Math.round(percentage)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--primary-main)] to-[var(--accent-gold)] transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
