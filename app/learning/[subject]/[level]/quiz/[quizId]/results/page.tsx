'use client'

import Link from 'next/link'
import { useSearchParams, useParams } from 'next/navigation'

export default function QuizResultPage() {
  const searchParams = useSearchParams()
  const params = useParams()
  const subject = (params.subject as string) || ''
  const level = (params.level as string) || ''
  const score = searchParams.get('score') || '0'
  const hearts = searchParams.get('hearts') || '0'

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--primary-light)] to-opacity-80 py-16">
      <div className="container-app">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-brand p-10 text-center">
          <h1 className="text-4xl font-bold text-[var(--primary-main)] mb-4">Résultat du Quiz</h1>
          <p className="text-[var(--text-dark)] opacity-80 mb-8">Tu as terminé le niveau {level} de {subject.replace(/-/g, ' ')}.</p>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="bg-[var(--primary-light)] rounded-3xl p-6">
              <p className="text-sm text-[var(--text-dark)] opacity-75">Score</p>
              <p className="text-5xl font-bold text-[var(--primary-main)]">{score}%</p>
            </div>
            <div className="bg-[var(--primary-light)] rounded-3xl p-6">
              <p className="text-sm text-[var(--text-dark)] opacity-75">Cœurs restants</p>
              <p className="text-5xl font-bold text-[var(--accent-secondary)]">{hearts}</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href={`/learning/${subject}/${level}`}
              className="inline-block w-full px-6 py-4 bg-[var(--primary-main)] text-white rounded-full font-semibold hover:opacity-90 transition"
            >
              Revenir au niveau
            </Link>
            <Link
              href="/dashboard"
              className="inline-block w-full px-6 py-4 border-2 border-[var(--primary-main)] text-[var(--primary-main)] rounded-full font-semibold hover:bg-[var(--primary-light)] transition"
            >
              Voir mon tableau de bord
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
