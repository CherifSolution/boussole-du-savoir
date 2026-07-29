import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    if (!token || !token.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const userId = token.id

    // Récupérer la progression de l'utilisateur
    const result = await query(
      `SELECT
        up.id,
        up.quiz_id as quizId,
       q.title,
        q.subject_id as subjectId,
        s.name as subjectName,
       q.level_id as levelId,
       l.level_number as levelNumber,
       up.score,
       up.status,
       up.hearts_remaining as heartsRemaining,
       up.completed_at as completedAt
      FROM user_progress up
      JOIN quizzes q ON up.quiz_id = q.id
      JOIN subjects s ON q.subject_id = s.id
      JOIN levels l ON q.level_id = l.id
      WHERE up.user_id = $1
      ORDER BY up.completed_at DESC`,
      [userId]
    )
    const progress = result.rows.map((row: any) => ({
      id: row.id,
      quizId: row.quizid,
      levelId: row.levelid,
      levelNumber: row.levelnumber,
      title: row.title,
      subjectId: row.subjectid,
      subjectName: row.subjectname,
      score: row.score,
      status: row.status,
      heartsRemaining: row.heartsremaining,
      completedAt: row.completed_at,
    }))

    // Calculer statistiques
    const completedCount = progress.filter((p: any) => p.status === 'completed').length
    const totalScore = progress.reduce((sum: number, p: any) => sum + (p.score || 0), 0)
    const avgScore = completedCount > 0 ? Math.round(totalScore / completedCount) : 0

    return NextResponse.json({
      progress,
      stats: {
        completedQuizzes: completedCount,
        averageScore: avgScore,
      },
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement de la progression' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    if (!token || !token.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const userId = token.id
    const { quizId, score, heartsRemaining } = await request.json()

    if (!quizId || score === undefined || heartsRemaining === undefined) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      )
    }

    // Vérifier si la progression existe
    const existingResult = await query(
      'SELECT id FROM user_progress WHERE user_id = $1 AND quiz_id = $2',
      [userId, quizId]
    )

    let result

    if (existingResult.rows.length > 0) {
      // Update
      result = await query(
        `UPDATE user_progress
         SET score = $1, hearts_remaining = $2, status = $3, completed_at = NOW()
         WHERE user_id = $4 AND quiz_id = $5
         RETURNING id`,
        [score, heartsRemaining, 'completed', userId, quizId]
      )
    } else {
      // Insert
      result = await query(
        `INSERT INTO user_progress (user_id, quiz_id, score, hearts_remaining, status, started_at, completed_at)
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
         RETURNING id`,
        [userId, quizId, score, heartsRemaining, 'completed']
      )
    }

    return NextResponse.json(
      { message: 'Progression sauvegardée', progressId: result.rows[0].id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving progress:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde' },
      { status: 500 }
    )
  }
}
