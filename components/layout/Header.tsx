'use client'

import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { getAvatarUrl } from '@/lib/utils'

interface HeaderProps {
  title?: string
  showNav?: boolean
}

export default function Header({ title, showNav = true }: HeaderProps) {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-brand sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={session ? '/dashboard' : '/'} className="flex items-center gap-2">
            <span className="text-2xl">🧭</span>
            <span className="font-bold text-lg text-[var(--primary-main)]">
              Boussole du Savoir
            </span>
          </Link>

          {/* Title (optional) */}
          {title && (
            <h1 className="text-xl font-semibold text-[var(--text-dark)] hidden md:block">
              {title}
            </h1>
          )}

          {/* Nav & User Menu */}
          <div className="flex items-center gap-6">
            {showNav && (
              <nav className="hidden md:flex gap-6">
                {session && (
                  <>
                    <Link
                      href="/learning"
                      className="text-[var(--text-dark)] hover:text-[var(--primary-main)] transition"
                    >
                      📚 Apprendre
                    </Link>
                    <Link
                      href="/dashboard"
                      className="text-[var(--text-dark)] hover:text-[var(--primary-main)] transition"
                    >
                      📊 Tableau de bord
                    </Link>
                    <Link
                      href="/chat"
                      className="text-[var(--text-dark)] hover:text-[var(--primary-main)] transition"
                    >
                      💬 Chat
                    </Link>
                  </>
                )}
                <Link
                  href="/about"
                  className="text-[var(--text-dark)] hover:text-[var(--primary-main)] transition"
                >
                  ℹ️ À propos
                </Link>
              </nav>
            )}

            {/* User Menu */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-[var(--primary-light)] transition"
                >
                  <Image
                    src={getAvatarUrl(session.user?.email || '')}
                    alt={session.user?.email || 'User'}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="hidden sm:inline text-sm font-medium text-[var(--text-dark)]">
                    {session.user?.email?.split('@')[0]}
                  </span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[var(--border)] py-1">
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-[var(--text-dark)] hover:bg-[var(--primary-light)]"
                    >
                      👤 Profil
                    </Link>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: '/' })
                        setMenuOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      🚪 Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-[var(--primary-main)] hover:bg-[var(--primary-light)] rounded-lg transition"
                >
                  Se connecter
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-[var(--primary-main)] text-white rounded-lg hover:opacity-90 transition"
                >
                  S&apos;inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
