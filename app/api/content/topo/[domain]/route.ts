import { NextResponse } from 'next/server'
import { getCachedContent, setCachedContent } from '@/lib/cache-manager'
import { generateUniversityTopo } from '@/lib/claude'
import { slugify } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const VALID_DOMAINS = [
  'Intelligence Artificielle',
  'Informatique',
  'Médecine',
  'Droit',
  'Économie / Gestion',
]

function findDomain(domainParam: string | undefined): string | undefined {
  if (!domainParam) return undefined
  const normalized = domainParam.replace(/-/g, ' ').trim()
  return VALID_DOMAINS.find((domain) => slugify(domain) === slugify(normalized))
}

export async function GET(
  _request: unknown,
  { params }: { params: { domain?: string } }
) {
  try {
    const domain = findDomain(params.domain)

    if (!domain) {
      return NextResponse.json(
        { error: 'Domaine universitaire invalide' },
        { status: 404 }
      )
    }

    const cacheKey = `topo_${slugify(domain)}_v1`
    const cached = await getCachedContent(cacheKey)
    if (cached) {
      return NextResponse.json({ cached: true, topo: cached.generatedContent, cacheKey })
    }

    const generatedTopo = await generateUniversityTopo(domain)
    await setCachedContent(cacheKey, 'topo', generatedTopo, null)

    return NextResponse.json({ cached: false, topo: generatedTopo, cacheKey })
  } catch (error) {
    console.error('Error generating topo:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération du topo' },
      { status: 500 }
    )
  }
}
