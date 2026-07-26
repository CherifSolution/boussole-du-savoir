import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { query } from './db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email et mot de passe requis')
        }

        try {
          const result = await query(
            'SELECT id, email, password_hash FROM users WHERE email = $1',
            [credentials.email]
          )

          if (result.rows.length === 0) {
            throw new Error('Utilisateur non trouvé')
          }

          const user = result.rows[0]
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          )

          if (!isPasswordValid) {
            throw new Error('Mot de passe incorrect')
          }

          return {
            id: user.id.toString(),
            email: user.email,
          }
        } catch (error) {
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}
