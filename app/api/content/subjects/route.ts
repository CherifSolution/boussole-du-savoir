import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const result = await query(
      `SELECT id, name, description, level, icon_url as iconUrl
       FROM subjects
       ORDER BY level, order_index`
    )

    const subjects = result.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      level: row.level,
      iconUrl: row.iconurl,
    }))

    return NextResponse.json({ subjects })
  } catch (error) {
    console.error('Error fetching subjects:', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement des matières' },
      { status: 500 }
    )
  }
}
