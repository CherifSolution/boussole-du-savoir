import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/providers/Providers'

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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}