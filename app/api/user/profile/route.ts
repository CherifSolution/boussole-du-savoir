import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { query } from '@/lib/db'
import { ApiResponse } from '@/types/api'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as ApiResponse,
        { status: 401 }
      )
    }

    const result = await query(
      `SELECT id, user_id, full_name, level, class_details, university_domain, bio, language, notifications_enabled
       FROM profiles
       WHERE user_id = $1`,
      [session.user.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: true, profile: null } as ApiResponse,
        { status: 200 }
      )
    }

    const profile = result.rows[0]

    return NextResponse.json(
      {
        success: true,
        profile: {
          id: profile.id,
          userId: profile.user_id,
          fullName: profile.full_name,
          level: profile.level,
          classDetails: profile.class_details,
          universityDomain: profile.university_domain,
          bio: profile.bio,
          language: profile.language,
          notificationsEnabled: profile.notifications_enabled,
        },
      } as ApiResponse,
      { status: 200 }
    )
  } catch (error) {
    console.error('GET /api/user/profile error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' } as ApiResponse,
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as ApiResponse,
        { status: 401 }
      )
    }

    const body = await req.json()
    const {
      fullName,
      level,
      classDetails,
      universityDomain,
      bio,
      language,
      notificationsEnabled,
    } = body

    // Check if profile exists
    const existsResult = await query(
      'SELECT id FROM profiles WHERE user_id = $1',
      [session.user.id]
    )

    let result

    if (existsResult.rows.length > 0) {
      // Update
      result = await query(
        `UPDATE profiles
         SET full_name = $1, level = $2, class_details = $3,
             university_domain = $4, bio = $5, language = $6,
             notifications_enabled = $7, updated_at = NOW()
         WHERE user_id = $8
         RETURNING id, user_id, full_name, level, class_details, university_domain, bio, language, notifications_enabled`,
        [
          fullName,
          level,
          classDetails,
          universityDomain,
          bio,
          language,
          notificationsEnabled,
          session.user.id,
        ]
      )
    } else {
      // Create
      result = await query(
        `INSERT INTO profiles (user_id, full_name, level, class_details, university_domain, bio, language, notifications_enabled, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
         RETURNING id, user_id, full_name, level, class_details, university_domain, bio, language, notifications_enabled`,
        [
          session.user.id,
          fullName,
          level,
          classDetails,
          universityDomain,
          bio,
          language,
          notificationsEnabled,
        ]
      )
    }

    const profile = result.rows[0]

    return NextResponse.json(
      {
        success: true,
        message: 'Profile saved successfully',
        profile: {
          id: profile.id,
          userId: profile.user_id,
          fullName: profile.full_name,
          level: profile.level,
          classDetails: profile.class_details,
          universityDomain: profile.university_domain,
          bio: profile.bio,
          language: profile.language,
          notificationsEnabled: profile.notifications_enabled,
        },
      } as ApiResponse,
      { status: 200 }
    )
  } catch (error) {
    console.error('POST /api/user/profile error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' } as ApiResponse,
      { status: 500 }
    )
  }
}
