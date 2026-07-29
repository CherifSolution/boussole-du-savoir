import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/providers/Providers'
import Header from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'Boussole du Savoir',
  description: 'Plateforme éducative ludo-éducative pour le système béninois (primaire → université)',
  icons: {
    icon: '🧭',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}