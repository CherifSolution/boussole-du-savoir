'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const { status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "Bonjour ! Je suis ton tuteur virtuel. Pose-moi une question sur ton quiz ou ton domaine d'étude.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput('')
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage.content }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Erreur de chat')
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.reply || "Je suis là pour t'aider.",
        },
      ])
    } catch (err) {
      console.error(err)
      setError("Impossible d'envoyer le message pour le moment.")
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-main)]"></div>
          <p className="mt-4 text-[var(--text-dark)]">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--primary-light)] to-opacity-80 py-16">
      <div className="container-app">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-brand overflow-hidden">
          <div className="bg-[var(--primary-main)] text-white p-8">
            <h1 className="text-3xl font-bold">Chat Tuteur IA</h1>
            <p className="mt-2 text-[var(--text-light)] opacity-90">
              Pose une question pédagogique, je te réponds de façon simple et adaptée.
            </p>
          </div>

          <div className="p-6 flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-3xl p-4 ${
                  message.role === 'assistant'
                    ? 'bg-[var(--primary-light)] text-[var(--text-dark)] self-start'
                    : 'bg-[var(--accent-secondary)] text-white self-end'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            ))}

            {error && (
              <div className="rounded-3xl bg-red-50 border border-red-200 p-4 text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={sendMessage} className="flex gap-3 mt-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pose ta question..."
                className="flex-1 rounded-full border border-[var(--border)] px-5 py-3 focus:outline-none focus:border-[var(--primary-main)]"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="rounded-full bg-[var(--primary-main)] px-6 py-3 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
