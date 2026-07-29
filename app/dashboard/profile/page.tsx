'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


interface Profile {
  id: number
  userId: string
  fullName: string
  level: string
  classDetails?: string
  universityDomain?: string
  bio?: string
  language: string
  notificationsEnabled: boolean
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/user/profile')
      if (res.ok) {
        const data = await res.json()
        setProfile(data.profile)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })

      if (res.ok) {
        setMessage('✅ Profil sauvegardé avec succès!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('❌ Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      setMessage('❌ Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-main)]"></div>
          <p className="mt-4 text-[var(--text-dark)]">Chargement du profil...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="text-[var(--text-dark)]">Profil non trouvé</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-[var(--primary-main)] mb-8">Éditer ton Profil</h1>

      {message && (
        <div className="mb-6 p-4 rounded-lg bg-[var(--primary-light)] border-2 border-[var(--primary-main)]">
          <p className="text-[var(--primary-main)]">{message}</p>
        </div>
      )}

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Full Name */}
        <div className="bg-white rounded-lg shadow-brand p-6">
          <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
            Nom Complet
          </label>
          <input
            type="text"
            value={profile.fullName}
            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
            className="w-full px-4 py-2 border-2 border-[var(--border)] rounded-lg focus:border-[var(--primary-main)] focus:outline-none transition"
            required
          />
        </div>

        {/* Level */}
        <div className="bg-white rounded-lg shadow-brand p-6">
          <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
            Niveau d&apos;Étude
          </label>
          <select
            value={profile.level}
            onChange={(e) => setProfile({ ...profile, level: e.target.value })}
            className="w-full px-4 py-2 border-2 border-[var(--border)] rounded-lg focus:border-[var(--primary-main)] focus:outline-none transition"
            required
          >
            <option value="primaire">Primaire</option>
            <option value="college">Collège</option>
            <option value="lycee">Lycée</option>
            <option value="universite">Université</option>
          </select>
        </div>

        {/* Class Details */}
        <div className="bg-white rounded-lg shadow-brand p-6">
          <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
            Classe / Spécialité (optionnel)
          </label>
          <input
            type="text"
            placeholder="Ex: 3ème, 2nde, Terminale S"
            value={profile.classDetails || ''}
            onChange={(e) => setProfile({ ...profile, classDetails: e.target.value })}
            className="w-full px-4 py-2 border-2 border-[var(--border)] rounded-lg focus:border-[var(--primary-main)] focus:outline-none transition"
          />
        </div>

        {/* Bio */}
        <div className="bg-white rounded-lg shadow-brand p-6">
          <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
            À propos de toi (optionnel)
          </label>
          <textarea
            placeholder="Parle-nous un peu de toi..."
            value={profile.bio || ''}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border-2 border-[var(--border)] rounded-lg focus:border-[var(--primary-main)] focus:outline-none transition resize-none"
          />
        </div>

        {/* Language */}
        <div className="bg-white rounded-lg shadow-brand p-6">
          <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
            Langue
          </label>
          <select
            value={profile.language}
            onChange={(e) => setProfile({ ...profile, language: e.target.value })}
            className="w-full px-4 py-2 border-2 border-[var(--border)] rounded-lg focus:border-[var(--primary-main)] focus:outline-none transition"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-brand p-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={profile.notificationsEnabled}
              onChange={(e) => setProfile({ ...profile, notificationsEnabled: e.target.checked })}
              className="w-5 h-5"
            />
            <span className="font-semibold text-[var(--text-dark)]">
              Activer les notifications
            </span>
          </label>
          <p className="text-sm text-[var(--text-dark)] opacity-75 mt-2">
            Reçois des rappels pour continuer ton apprentissage
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-gradient-to-r from-[var(--primary-main)] to-[var(--accent-secondary)] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition"
        >
          {saving ? '💾 Sauvegarde...' : '✓ Sauvegarder les modifications'}
        </button>
      </form>
    </div>
  )
}
