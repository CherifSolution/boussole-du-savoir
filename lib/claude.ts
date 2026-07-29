import Anthropic from '@anthropic-ai/sdk'

let anthropic: Anthropic | null = null

function getAnthropic() {
  if (anthropic) {
    return anthropic
  }

  const apiKey = process.env.CLAUDE_API_KEY ?? process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error(
      'API Claude introuvable. Définissez CLAUDE_API_KEY ou ANTHROPIC_API_KEY dans votre environnement.'
    )
  }

  anthropic = new Anthropic({ apiKey })
  return anthropic
}

export interface GeneratedAnswer {
  text: string
  isCorrect: boolean
}

export interface GeneratedQuestion {
  text: string
  explanation: string
  answers: GeneratedAnswer[]
}

export interface GeneratedQuizPayload {
  title: string
  description: string
  questions: GeneratedQuestion[]
}

export interface GeneratedTopoPayload {
  domain: string
  summary: string
  currentOpportunities: string[]
  futureCareers: string[]
}

function parseJsonPayload<T>(raw: string): T {
  const text = raw.trim()
  const objectStart = text.indexOf('{')
  const arrayStart = text.indexOf('[')
  const start = objectStart >= 0 ? objectStart : arrayStart
  const end = text.lastIndexOf('}')
  const arrayEnd = text.lastIndexOf(']')

  if (start === -1 || (end === -1 && arrayEnd === -1)) {
    throw new Error('Impossible d\'extraire un objet JSON à partir de la réponse de Claude.')
  }

  const finish = end > arrayEnd ? end : arrayEnd
  const jsonText = text.slice(start, finish + 1)

  try {
    return JSON.parse(jsonText) as T
  } catch (error) {
    throw new Error(
      `Impossible d\'analyser le JSON renvoyé par Claude. Réponse brute : ${JSON.stringify(raw)}`
    )
  }
}

function buildContentFromResponse(response: any): string {
  if (!response?.content || !Array.isArray(response.content)) {
    throw new Error('Réponse Claude invalide : contenu manquant')
  }

  return response.content
    .map((block: any) => (block?.type === 'text' ? block.text : ''))
    .join('')
}

export async function generateQuizContent(
  subject: string,
  levelType: string,
  levelNumber: number,
  questionsCount: number
): Promise<GeneratedQuizPayload> {
  const system =
    "Tu es un assistant pédagogique pour une application éducative béninoise. Réponds en français, de manière claire et adaptée aux élèves."

  const prompt = `Génère un quiz pour le sujet "${subject}" destiné aux élèves du niveau ${levelType} (niveau ${levelNumber}). Le quiz doit comporter exactement ${questionsCount} questions à choix multiple. Pour chaque question, fournis : le texte de la question, quatre réponses possibles et une seule réponse correcte. Ajoute aussi une explication simple pour chaque question.

Renvoie uniquement un objet JSON valide avec la structure suivante :
{
  "title": string,
  "description": string,
  "questions": [
    {
      "text": string,
      "explanation": string,
      "answers": [
        { "text": string, "isCorrect": boolean },
        ...
      ]
    }
  ]
}
` 

  const response = await getAnthropic().messages.create({
    model: 'claude-3-opus-20240229',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 1200,
    temperature: 0.2,
    system,
  })

  const output = buildContentFromResponse(response)
  return parseJsonPayload<GeneratedQuizPayload>(output)
}

export async function generateUniversityTopo(
  domain: string
): Promise<GeneratedTopoPayload> {
  const system =
    "Tu es un assistant pédagogique spécialisé dans les orientations universitaires et les métiers de l'avenir. Réponds en français, de manière structurée et adaptée à un public étudiant."

  const prompt = `Fournis un topo sur le domaine universitaire "${domain}". Le topo doit comporter :
1. Un résumé clair du domaine.
2. Les débouchés actuels et les métiers présents aujourd'hui.
3. Les métiers de l'avenir dans ce domaine, en expliquant l'impact de l'IA et de l'automatisation.

Renvoie uniquement un objet JSON valide avec la structure suivante :
{
  "domain": string,
  "summary": string,
  "currentOpportunities": [string],
  "futureCareers": [string]
}
`

  const response = await getAnthropic().messages.create({
    model: 'claude-3-opus-20240229',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 1100,
    temperature: 0.2,
    system,
  })

  const output = buildContentFromResponse(response)
  return parseJsonPayload<GeneratedTopoPayload>(output)
}
