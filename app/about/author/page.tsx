export default function AuthorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--primary-light)] to-opacity-80 py-16">
      <div className="container-app bg-white rounded-3xl shadow-brand p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-6xl">👨‍💻</span>
            <h1 className="text-4xl font-bold text-[var(--primary-main)] mt-6">Chérif Chabi</h1>
            <p className="text-[var(--text-dark)] opacity-80 mt-3">
              Technicien en sécurité des systèmes et réseaux, passionné par l&apos;éducation et l&apos;automatisation IA.
            </p>
          </div>

          <div className="bg-[var(--primary-light)] rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-[var(--primary-main)] mb-4">Parcours</h2>
            <p className="text-[var(--text-dark)] opacity-80 leading-relaxed">
              Avec une expérience en sécurité informatique et en automatisation de processus, j&apos;ai choisi de créer Boussole du Savoir pour offrir aux jeunes béninois une plateforme éducative accessible, ludique et adaptée à leurs besoins.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-3xl shadow-brand p-6">
              <h3 className="text-xl font-semibold text-[var(--primary-main)] mb-3">Motivation</h3>
              <p className="text-[var(--text-dark)] opacity-80 leading-relaxed">
                Donner aux élèves un outil qui allie contenu pédagogique et progrès mesurable, tout en tenant compte des réalités éducatives locales.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-brand p-6">
              <h3 className="text-xl font-semibold text-[var(--primary-main)] mb-3">Compétences</h3>
              <p className="text-[var(--text-dark)] opacity-80 leading-relaxed">
                Sécurité réseaux, automatisation IA/HubSpot/Zapier, développement web, expérience utilisateur et déploiement serveurless.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-brand p-8">
            <h2 className="text-2xl font-semibold text-[var(--primary-main)] mb-4">Contact</h2>
            <p className="text-[var(--text-dark)] opacity-80 leading-relaxed">
              Vous pouvez retrouver le projet sur GitHub et me contacter via les réseaux sociaux mentionnés dans le README.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
