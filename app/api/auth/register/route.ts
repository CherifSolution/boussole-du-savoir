import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { query } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json()

    // Validation
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, mot de passe et nom requis' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      )
    }

    // Vérifier si l'utilisateur existe
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Créer l'utilisateur
    const result = await query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
      [email, hashedPassword]
    )

    const userId = result.rows[0].id

    // Créer le profil
    await query(
      'INSERT INTO profiles (user_id, full_name, level) VALUES ($1, $2, $3)',
      [userId, fullName, 'primaire']
    )

    return NextResponse.json(
      { message: 'Utilisateur créé avec succès', userId },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement' },
      { status: 500 }
    )
  }
}
