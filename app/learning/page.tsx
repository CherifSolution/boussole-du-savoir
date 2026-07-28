'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LEVELS } from '@/lib/constants'
import { getSubjectIcon } from '@/lib/utils'
import SubjectCard from '@/components/learning/SubjectCard'

interface Subject {
  id: number
  name: string
  level: string
  description: string
}

export default function LearningPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLevel, setSelectedLevel] = useState<string>('primaire')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      const res = await fetch('/api/content/subjects')
      if (!res.ok) throw new Error('Failed to fetch subjects')
      const data = await res.json()
      setSubjects(data.subjects)
    } catch (error) {
      console.error('Error fetching subjects:', error)
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

  if (!session) return null

  const filteredSubjects = subjects.filter((s) => s.level === selectedLevel)

  return (
    <div>
      {/* Level Selector */}
      <div className="mb-8 flex gap-2 flex-wrap">
        {Object.values(LEVELS).map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedLevel === level
                ? 'bg-[var(--primary-main)] text-white'
                : 'bg-white text-[var(--text-dark)] hover:bg-[var(--primary-light)]'
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.length === 0 ? (
          <p className="col-span-full text-center text-[var(--text-dark)] opacity-70 py-8">
            Aucune matière disponible pour ce niveau
          </p>
        ) : (
          filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              name={subject.name}
              description={subject.description}
              icon={getSubjectIcon(subject.name)}
              href={`/learning/${subject.name.toLowerCase().replace(/\s+/g, '-')}`}
            />
          ))
        )}
      </div>
    </div>
  )
}
