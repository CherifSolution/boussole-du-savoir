import { NextRequest, NextResponse } from 'next/server'
import { getCachedContent, setCachedContent } from '@/lib/cache-manager'
import { generateQuizContent } from '@/lib/claude'
import { QUIZ_CONFIG, SUBJECTS_BY_LEVEL } from '@/lib/constants'
import { slugify } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface GenerateQuizBody {
  subject: string
  levelNumber: number
  levelType?: 'primaire' | 'college' | 'lycee' | 'universite'
  questionsPerQuiz?: number
}

function inferLevelType(subject: string): string | undefined {
  const normalizedSubject = subject.trim()
  return Object.entries(SUBJECTS_BY_LEVEL).find(([, subjects]) =>
    subjects.some((item) => item === normalizedSubject)
  )?.[0]
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GenerateQuizBody
    const subject = body.subject?.trim()
    const levelNumber = Number(body.levelNumber)

    if (!subject || Number.isNaN(levelNumber) || levelNumber < 1) {
      return NextResponse.json(
        { error: 'subject et levelNumber sont requis et doivent être valides' },
        { status: 400 }
      )
    }

    const levelType = body.levelType || inferLevelType(subject)
    if (!levelType) {
      return NextResponse.json(
        {
          error:
            'Impossible de déduire le niveau à partir du sujet. Fournissez levelType (primaire, college, lycee, universite).',
        },
        { status: 400 }
      )
    }

    const questionsPerQuiz =
      body.questionsPerQuiz ||
      (levelType === 'primaire'
        ? QUIZ_CONFIG.QUESTIONS_PER_QUIZ_PRIMAIRE
        : levelType === 'college' || levelType === 'lycee'
        ? QUIZ_CONFIG.QUESTIONS_PER_QUIZ_COLLEGE
        : QUIZ_CONFIG.QUESTIONS_PER_QUIZ_UNIVERSITE)

    const cacheKey = `questions_${slugify(subject)}_${levelType}_${levelNumber}_v1`
    const cached = await getCachedContent(cacheKey)
    if (cached) {
      return NextResponse.json({
        cached: true,
        quiz: cached.generatedContent,
        cacheKey,
      })
    }

    const generatedQuiz = await generateQuizContent(
      subject,
      levelType,
      levelNumber,
      questionsPerQuiz
    )

    await setCachedContent(cacheKey, 'questions', generatedQuiz, null)

    return NextResponse.json({ cached: false, quiz: generatedQuiz, cacheKey })
  } catch (error) {
    console.error('Error generating quiz content:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération du quiz' },
      { status: 500 }
    )
  }
}
