import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--primary-light)] to-opacity-80 py-16">
      <div className="container-app bg-white rounded-3xl shadow-brand p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-[var(--primary-main)] mb-4">À propos de Boussole du Savoir</h1>
            <p className="text-[var(--text-dark)] opacity-80 leading-relaxed">
              Boussole du Savoir est une plateforme éducative pensée pour accompagner chaque enfant, chaque adolescent et chaque étudiant du système béninois, du primaire jusqu&apos;à l&apos;université.
              Notre approche mêle pédagogie, ludification et contenu contextualisé pour rendre l&apos;apprentissage progressif, motivant et adapté à chaque étape de la scolarité.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-[var(--primary-light)] rounded-3xl p-6">
              <h2 className="text-2xl font-semibold text-[var(--primary-main)] mb-3">Mission</h2>
              <p className="text-[var(--text-dark)] opacity-80 leading-relaxed">
                Aider les élèves béninois à consolider leurs acquis, progresser par niveau et garder la confiance en utilisant un parcours ludique et visuel.
              </p>
            </div>
            <div className="bg-[var(--primary-light)] rounded-3xl p-6">
              <h2 className="text-2xl font-semibold text-[var(--primary-main)] mb-3">Philosophie</h2>
              <p className="text-[var(--text-dark)] opacity-80 leading-relaxed">
                Chaque concept est expliqué par petites étapes, avec des quiz, des vidéos pédagogiques et un système de cœurs pour apprendre sans stress.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[var(--border)] p-8">
            <h2 className="text-2xl font-semibold text-[var(--primary-main)] mb-4">Pourquoi une seule application pour tous les cycles ?</h2>
            <ul className="space-y-3 text-[var(--text-dark)] opacity-80 leading-relaxed list-disc list-inside">
              <li>Pour garder une progression continue du primaire à l&apos;université.</li>
              <li>Pour offrir une expérience cohérente aux familles et aux enseignants.</li>
              <li>Pour permettre aux élèves de mieux comprendre leur orientation avec des topos de domaine.</li>
            </ul>
          </div>

          <div className="text-center">
            <Link
              href="/about/author"
              className="inline-block px-8 py-4 bg-[var(--primary-main)] text-white rounded-full font-semibold hover:opacity-90 transition"
            >
              Découvrir l&apos;auteur du projet
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
