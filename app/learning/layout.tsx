import Header from '@/components/layout/Header'

export const metadata = {
  title: 'Learning - Boussole du Savoir',
  description: 'Apprentissage interactif avec des quizzes et des niveaux progressifs',
}

export default function LearningLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header title="📚 Mode Apprentissage" showNav />
      <main className="min-h-screen bg-gradient-to-br from-[var(--primary-light)] to-opacity-80 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </>
  )
}
