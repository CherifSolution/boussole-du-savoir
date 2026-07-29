import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  _request: unknown,
  { params }: { params: { quizId: string } }
) {
  try {
    const quizId = parseInt(params.quizId)

    if (isNaN(quizId)) {
      return NextResponse.json(
        { error: 'ID de quiz invalide' },
        { status: 400 }
      )
    }

    // Récupérer le quiz
    const quizResult = await query(
      'SELECT id, subject_id, level_id, title, description, total_questions, passing_score FROM quizzes WHERE id = $1',
      [quizId]
    )

    if (quizResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Quiz non trouvé' },
        { status: 404 }
      )
    }

    const quiz = quizResult.rows[0]

    // Récupérer les questions
    const questionsResult = await query(
      `SELECT q.id, q.question_text, q.explanation
       FROM questions q
       WHERE q.quiz_id = $1
       ORDER BY q.order_index`,
      [quizId]
    )

    // Récupérer les réponses pour chaque question
    const questions = await Promise.all(
      questionsResult.rows.map(async (question) => {
        const answersResult = await query(
          `          SELECT id, option_text as text, is_correct as "isCorrect"
           FROM answer_options
           WHERE question_id = $1
           ORDER BY order_index`,          [question.id]
        )

        return {
          id: question.id,
          text: question.question_text,
          explanation: question.explanation,
          answers: answersResult.rows.map((a: any) => ({
            id: a.id,
            text: a.text,
            isCorrect: a.isCorrect,
          })),
        }
      })
    )

    return NextResponse.json({
      quiz: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        totalQuestions: quiz.total_questions,
        passingScore: quiz.passing_score,
      },
      questions,
    })
  } catch (error) {
    console.error('Error fetching quiz:', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement du quiz' },
      { status: 500 }
    )
  }
}
