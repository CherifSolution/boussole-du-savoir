export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--primary-light)] to-opacity-80">
      <div className="container-app text-center py-20">
        <h1 className="text-5xl font-bold text-[var(--primary-main)] mb-4">
          🧭 Boussole du Savoir
        </h1>
        <p className="text-xl text-[var(--text-dark)] opacity-80 mb-8">
          Plateforme éducative pour le système béninois
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-8 rounded-lg shadow-brand">
            <div className="text-4xl mb-4">🎨</div>
            <h2 className="text-xl font-bold text-[var(--primary-main)] mb-2">Primaire</h2>
            <p className="text-sm text-[var(--text-dark)] opacity-75">
              20 niveaux colorés et ludiques pour les enfants
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-brand">
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-xl font-bold text-[var(--primary-main)] mb-2">Collège/Lycée</h2>
            <p className="text-sm text-[var(--text-dark)] opacity-75">
              20 niveaux adaptés aux programmes béninois
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-brand">
            <div className="text-4xl mb-4">🎓</div>
            <h2 className="text-xl font-bold text-[var(--primary-main)] mb-2">Université</h2>
            <p className="text-sm text-[var(--text-dark)] opacity-75">
              30 niveaux dans 5 domaines de passion
            </p>
          </div>
        </div>

        <p className="text-sm text-[var(--text-dark)] opacity-60 mt-12">
          Phase 1 : En construction... 🚀
        </p>
      </div>
    </main>
  )
}
