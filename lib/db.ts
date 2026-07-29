import { Pool, QueryResult } from 'pg'

let pool: Pool | null = null

function getPool(): Pool {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set')
    }

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  }

  return pool
}

export async function query(
  text: string,
  params?: any[]
): Promise<QueryResult> {
  const pool = getPool()
  return pool.query(text, params)
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end()
    pool = null
  }
}

export async function testConnection(): Promise<boolean> {
  try {
    await query('SELECT NOW()')
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}
