import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { query } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()
    const message = body?.message?.toString().trim()

    if (!message) {
      return NextResponse.json({ error: 'Message manquant' }, { status: 400 })
    }

    // Enregistrer le message utilisateur dans la base de données pour historique
    await query(
      'INSERT INTO chat_messages (user_id, message_text, role, created_at) VALUES ($1, $2, $3, NOW())',
      [session.user.id, message, 'user']
    )

    const reply = `Merci pour ta question ! Voici une première réponse simple : ${message}`

    await query(
      'INSERT INTO chat_messages (user_id, message_text, role, created_at) VALUES ($1, $2, $3, NOW())',
      [session.user.id, reply, 'assistant']
    )

    return NextResponse.json({ reply, tokensUsed: 0 })
  } catch (error) {
    console.error('Error in /api/chat:', error)
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    )
  }
}
