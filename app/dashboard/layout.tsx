import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'

export const metadata = {
  title: 'Dashboard - Boussole du Savoir',
  description: 'Ton tableau de bord personnalisé',
}

const dashboardNavItems = [
  { href: '/dashboard', label: 'Accueil', icon: '📊' },
  { href: '/dashboard/profile', label: 'Profil', icon: '👤' },
  { href: '/learning', label: 'Apprendre', icon: '📚' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header title="📊 Tableau de Bord" showNav />
      <div className="flex">
        <Sidebar items={dashboardNavItems} title="Navigation" />
        <main className="flex-1 min-h-screen bg-gradient-to-br from-[var(--primary-light)] to-opacity-80">
          {children}
        </main>
      </div>
    </>
  )
}
