'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (formData.password !== formData.passwordConfirm) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erreur lors de l\'enregistrement')
        return
      }

      router.push('/login?registered=true')
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
          Crée un compte pour commencer
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-[var(--text-dark)]">
              Nom complet
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary-main)]"
              placeholder="Ex: Ahmed Toukouzou"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-[var(--text-dark)]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary-main)]"
              placeholder="••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-[var(--text-dark)]">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary-main)]"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[var(--primary-main)] to-[var(--accent-secondary)] text-white font-semibold py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? 'Création en cours...' : 'Créer un compte'}
          </button>
        </form>

        <p className="text-center text-[var(--text-dark)] opacity-70 mt-6">
          Tu as déjà un compte ?{' '}
          <Link href="/login" className="text-[var(--primary-main)] font-semibold hover:underline">
            Connecte-toi
          </Link>
        </p>
      </div>
    </div>
  )
}
