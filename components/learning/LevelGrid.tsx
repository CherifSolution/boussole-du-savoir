'use client'

import Link from 'next/link'
import { getGradeEmoji, cn } from '@/lib/utils'

interface LevelProps {
  id: number
  name: string
  levelNumber: number
  theme: string
  locked?: boolean
  progress?: number
  bestScore?: number
  href: string
}

interface LevelGridProps {
  levels: LevelProps[]
  subject: string
}

export default function LevelGrid({ levels, subject }: LevelGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {levels.map((level) => (
        <div
          key={level.id}
          className={cn(
            'relative group cursor-pointer transition-all duration-300',
            level.locked ? 'opacity-50' : ''
          )}
        >
          <Link href={level.locked ? '#' : level.href}>
            <div
              className={cn(
                'bg-white rounded-lg shadow-brand overflow-hidden h-full',
                !level.locked && 'hover:shadow-lg hover:scale-105'
              )}
            >
              <div className="bg-gradient-to-r from-[var(--primary-main)] to-[var(--accent-secondary)] p-6 text-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold">{level.name}</h3>
                  {level.locked && <span className="text-2xl">🔒</span>}
                </div>
                <p className="text-sm opacity-90">{level.theme}</p>
              </div>

              <div className="p-6">
                {level.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-semibold text-[var(--text-dark)]">
                        Progression
                      </span>
                      <span className="text-[var(--accent-secondary)]">{level.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--primary-main)] to-[var(--accent-gold)] transition-all duration-300"
                        style={{ width: `${level.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {level.bestScore !== undefined && (
                  <div className="p-3 bg-[var(--primary-light)] rounded-lg text-center mb-4">
                    <p className="text-xs text-[var(--text-dark)] opacity-75">Meilleur Score</p>
                    <p className="text-2xl font-bold text-[var(--primary-main)]">
                      {getGradeEmoji(level.bestScore)} {level.bestScore}%
                    </p>
                  </div>
                )}

                {!level.locked && (
                  <button className="w-full py-2 bg-[var(--accent-secondary)] text-white font-semibold rounded-lg hover:opacity-90 transition">
                    Jouer →
                  </button>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
