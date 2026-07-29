import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { slugify } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const subjectSlug = searchParams.get('subject')
    const levelNumberParam = searchParams.get('levelNumber')

    if (!subjectSlug || !levelNumberParam) {
      return NextResponse.json(
        { error: 'Subject and levelNumber query parameters are required' },
        { status: 400 }
      )
    }

    const levelNumber = parseInt(levelNumberParam, 10)
    if (Number.isNaN(levelNumber)) {
      return NextResponse.json(
        { error: 'Le numéro de niveau est invalide' },
        { status: 400 }
      )
    }

    const subjectsResult = await query(`SELECT id, name FROM subjects`)
    const subjectRow = subjectsResult.rows.find((row: any) => slugify(row.name) === subjectSlug)

    if (!subjectRow) {
      return NextResponse.json(
        { error: 'Matière introuvable' },
        { status: 404 }
      )
    }

    const levelResult = await query(
      `SELECT id, name FROM levels WHERE level_number = $1`,
      [levelNumber]
    )

    if (levelResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Niveau introuvable' },
        { status: 404 }
      )
    }

    const subject = subjectRow
    const level = levelResult.rows[0]

    const quizzesResult = await query(
      `SELECT q.id, q.title, q.description, q.total_questions AS "totalQuestions", q.estimated_duration_minutes AS "estimatedDurationMinutes"
       FROM quizzes q
       WHERE q.subject_id = $1 AND q.level_id = $2
       ORDER BY q.created_at ASC`,
      [subject.id, level.id]
    )

    return NextResponse.json({
      subject: {
        id: subject.id,
        name: subject.name,
      },
      level: {
        id: level.id,
        name: level.name,
        number: levelNumber,
      },
      quizzes: quizzesResult.rows,
    })
  } catch (error) {
    console.error('Error fetching quizzes list:', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement des quizzes' },
      { status: 500 }
    )
  }
}
