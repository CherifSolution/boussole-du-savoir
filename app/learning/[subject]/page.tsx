'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import LevelGrid from '@/components/learning/LevelGrid'
import { getSubjectIcon } from '@/lib/utils'

interface Level {
  id: number
  name: string
  levelNumber: number
  description: string
  theme: string
}

interface LevelProgress {
  levelId: number
  progress: number
  bestScore: number
}

export default function SubjectPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const subjectName = (params.subject as string) || ''

  const [levels, setLevels] = useState<Level[]>([])
  const [progress, setProgress] = useState<Map<number, LevelProgress>>(new Map())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      fetchLevels()
      fetchProgress()
    }
  }, [session, subjectName])

  const fetchLevels = async () => {
    try {
      const mockLevels: Level[] = [
        {
          id: 1,
          name: 'Niveau 1',
          levelNumber: 1,
          description: 'Les bases fondamentales',
          theme: 'Introduction',
        },
        {
          id: 2,
          name: 'Niveau 2',
          levelNumber: 2,
          description: 'Concepts intermédiaires',
          theme: 'Développement',
        },
        {
          id: 3,
          name: 'Niveau 3',
          levelNumber: 3,
          description: 'Concepts avancés',
          theme: 'Maîtrise',
        },
      ]
      setLevels(mockLevels)
    } catch (error) {
      console.error('Error fetching levels:', error)
    }
  }

  const fetchProgress = async () => {
    try {
      const res = await fetch('/api/user/progress')
      if (res.ok) {
        const data = await res.json()
        const progressMap = new Map()
        data.progress?.forEach((p: any) => {
          progressMap.set(p.id, {
            levelId: p.id,
            progress: p.score ? (p.score / 100) * 100 : 0,
            bestScore: p.score || 0,
          })
        })
        setProgress(progressMap)
      }
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
          <p className="mt-4 text-[var(--text-dark)]">Chargement des niveaux...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/learning"
          className="text-[var(--primary-main)] hover:underline mb-4 inline-block"
        >
          ← Retour aux matières
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{getSubjectIcon(subjectName.replace(/-/g, ' '))}</span>
          <h1 className="text-4xl font-bold text-[var(--primary-main)] capitalize">
            {subjectName.replace(/-/g, ' ')}
          </h1>
        </div>
        <p className="text-[var(--text-dark)] opacity-75">
          Progresse à travers 3 niveaux de difficulté
        </p>
      </div>

      <LevelGrid
        levels={levels.map((level) => ({
          ...level,
          locked: false,
          progress: progress.get(level.id)?.progress || 0,
          bestScore: progress.get(level.id)?.bestScore || 0,
          href: `/learning/${subjectName}/${level.levelNumber}`,
        }))}
        subject={subjectName}
      />
    </div>
  )
}
