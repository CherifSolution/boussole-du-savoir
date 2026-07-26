import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

async function seedContent() {
  try {
    console.log('🌱 Démarrage du seed contenu...')

    // 1. Créer les subjects
    const subjects = [
      { name: 'Français', level: 'primaire' },
      { name: 'Mathématiques', level: 'primaire' },
      { name: 'Sciences', level: 'primaire' },
      { name: 'Français', level: 'college' },
      { name: 'Mathématiques', level: 'college' },
      { name: 'Physique-Chimie', level: 'college' },
      { name: 'Histoire-Géographie', level: 'college' },
      { name: 'Anglais', level: 'college' },
      { name: 'Mathématiques', level: 'lycee' },
      { name: 'Philosophie', level: 'lycee' },
      { name: 'Intelligence Artificielle', level: 'universite' },
      { name: 'Informatique', level: 'universite' },
    ]

    for (const subject of subjects) {
      await pool.query(
        'INSERT INTO subjects (name, level, description) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
        [subject.name, subject.level, `Cours de ${subject.name}`]
      )
    }
    console.log(`✅ ${subjects.length} subjects créés`)

    // 2. Créer les niveaux
    const levels = [
      { name: 'Niveau 1', levelNumber: 1, theme: 'Découverte' },
      { name: 'Niveau 2', levelNumber: 2, theme: 'Consolidation' },
      { name: 'Niveau 3', levelNumber: 3, theme: 'Approfondissement' },
    ]

    for (const level of levels) {
      await pool.query(
        'INSERT INTO levels (name, level_number, theme, description) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
        [level.name, level.levelNumber, level.theme, `${level.theme} des connaissances`]
      )
    }
    console.log(`✅ ${levels.length} niveaux créés`)

    // 3. Créer des quizzes avec questions
    const quizzesData = [
      {
        subject: 'Français',
        level: 'Niveau 1',
        title: 'Les Lettres de l\'Alphabet',
        questions: [
          {
            text: 'Quelle est la première lettre de l\'alphabet ?',
            answers: [
              { text: 'A', isCorrect: true },
              { text: 'B', isCorrect: false },
              { text: 'C', isCorrect: false },
            ],
            explanation: 'La lettre A est la première de l\'alphabet français.',
          },
          {
            text: 'Combien de voyelles y a-t-il en français ?',
            answers: [
              { text: '5', isCorrect: true },
              { text: '3', isCorrect: false },
              { text: '7', isCorrect: false },
            ],
            explanation: 'Les voyelles sont : A, E, I, O, U (5 au total).',
          },
          {
            text: 'Quelle est la dernière lettre de l\'alphabet ?',
            answers: [
              { text: 'Z', isCorrect: true },
              { text: 'Y', isCorrect: false },
              { text: 'X', isCorrect: false },
            ],
            explanation: 'La lettre Z est la dernière de l\'alphabet.',
          },
        ],
      },
      {
        subject: 'Mathématiques',
        level: 'Niveau 1',
        title: 'Additions Simples',
        questions: [
          {
            text: '2 + 3 = ?',
            answers: [
              { text: '5', isCorrect: true },
              { text: '4', isCorrect: false },
              { text: '6', isCorrect: false },
            ],
            explanation: '2 plus 3 égale 5.',
          },
          {
            text: '4 + 4 = ?',
            answers: [
              { text: '8', isCorrect: true },
              { text: '7', isCorrect: false },
              { text: '9', isCorrect: false },
            ],
            explanation: '4 plus 4 égale 8.',
          },
          {
            text: '5 + 2 = ?',
            answers: [
              { text: '7', isCorrect: true },
              { text: '6', isCorrect: false },
              { text: '8', isCorrect: false },
            ],
            explanation: '5 plus 2 égale 7.',
          },
        ],
      },
    ]

    let quizCount = 0
    for (const quizData of quizzesData) {
      // Récupérer les IDs subject et level
      const subjectRes = await pool.query(
        'SELECT id FROM subjects WHERE name = $1 AND level = $2',
        [quizData.subject, 'primaire']
      )
      const levelRes = await pool.query(
        'SELECT id FROM levels WHERE name = $1',
        [quizData.level]
      )

      if (subjectRes.rows.length === 0 || levelRes.rows.length === 0) {
        console.warn(`⚠️  Subject ou Level non trouvé pour ${quizData.title}`)
        continue
      }

      const subjectId = subjectRes.rows[0].id
      const levelId = levelRes.rows[0].id

      // Créer le quiz
      const quizRes = await pool.query(
        'INSERT INTO quizzes (subject_id, level_id, title, description, total_questions) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [subjectId, levelId, quizData.title, `Quiz : ${quizData.title}`, quizData.questions.length]
      )

      const quizId = quizRes.rows[0].id

      // Créer les questions et réponses
      for (let qIndex = 0; qIndex < quizData.questions.length; qIndex++) {
        const q = quizData.questions[qIndex]

        const questionRes = await pool.query(
          'INSERT INTO questions (quiz_id, question_text, question_type, order_index, explanation) VALUES ($1, $2, $3, $4, $5) RETURNING id',
          [quizId, q.text, 'multiple_choice', qIndex + 1, q.explanation]
        )

        const questionId = questionRes.rows[0].id

        // Créer les options de réponse
        for (let aIndex = 0; aIndex < q.answers.length; aIndex++) {
          const answer = q.answers[aIndex]
          await pool.query(
            'INSERT INTO answer_options (question_id, option_text, is_correct, order_index) VALUES ($1, $2, $3, $4)',
            [questionId, answer.text, answer.isCorrect, aIndex + 1]
          )
        }
      }

      quizCount++
    }

    console.log(`✅ ${quizCount} quizzes avec questions créés`)

    console.log('🎉 Seed contenu complété avec succès !')
    process.exit(0)
  } catch (error) {
    console.error('❌ Erreur lors du seed :', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

seedContent()
