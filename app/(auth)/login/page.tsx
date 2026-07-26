'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const registered = searchParams.get('registered')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
        return
      }

      if (result?.ok) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Une erreur est survenue')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-light)] to-opacity-80 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-brand p-8">
        <h1 className="text-3xl font-bold text-[var(--primary-main)] mb-2 text-center">
          🧭 Boussole du Savoir
        </h1>
        <p className="text-center text-[var(--text-dark)] opacity-70 mb-6">
          Connecte-toi à ton compte
        </p>

        {registered && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            ✅ Compte créé avec succès ! Connecte-toi maintenant.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-[var(--text-dark)]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary-main)]"
              placeholder="toi@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-[var(--text-dark)]">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary-main)]"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[var(--primary-main)] to-[var(--accent-secondary)] text-white font-semibold py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-[var(--text-dark)] opacity-70 mt-6">
          Tu n'as pas de compte ?{' '}
          <Link href="/register" className="text-[var(--primary-main)] font-semibold hover:underline">
            Crée un compte
          </Link>
        </p>
      </div>
    </div>
  )
}
