import { query } from './db'

export interface CachedContent<T = unknown> {
  cacheKey: string
  contentType: string
  generatedContent: T
  tokenCost: number | null
  expiresAt: string | null
  hitCount: number
  lastAccessed: string | null
}

const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24h

export async function getCachedContent<T = unknown>(cacheKey: string): Promise<CachedContent<T> | null> {
  const result = await query(
    `SELECT cache_key, content_type, generated_content, token_cost, expires_at, hit_count, last_accessed
     FROM content_cache
     WHERE cache_key = $1`,
    [cacheKey]
  )

  if (result.rows.length === 0) {
    return null
  }

  const row = result.rows[0]

  if (row.expires_at && new Date(row.expires_at).getTime() < Date.now()) {
    await query('DELETE FROM content_cache WHERE cache_key = $1', [cacheKey])
    return null
  }

  await query(
    'UPDATE content_cache SET hit_count = hit_count + 1, last_accessed = NOW() WHERE cache_key = $1',
    [cacheKey]
  )

  return {
    cacheKey: row.cache_key,
    contentType: row.content_type,
    generatedContent: row.generated_content,
    tokenCost: row.token_cost,
    expiresAt: row.expires_at,
    hitCount: row.hit_count + 1,
    lastAccessed: row.last_accessed,
  }
}

export async function setCachedContent<T = unknown>(
  cacheKey: string,
  contentType: string,
  generatedContent: T,
  tokenCost: number | null,
  quizId: number | null = null
): Promise<void> {
  const expiresAt = new Date(Date.now() + CACHE_TTL_MS).toISOString()

  await query(
    `INSERT INTO content_cache (cache_key, quiz_id, content_type, generated_content, token_cost, expires_at, hit_count, last_accessed)
     VALUES ($1, $2, $3, $4, $5, $6, 0, NOW())
     ON CONFLICT (cache_key) DO UPDATE
     SET quiz_id = COALESCE(EXCLUDED.quiz_id, content_cache.quiz_id),
         content_type = EXCLUDED.content_type,
         generated_content = EXCLUDED.generated_content,
         token_cost = EXCLUDED.token_cost,
         expires_at = EXCLUDED.expires_at,
         last_accessed = NOW()`,
    [cacheKey, quizId, contentType, generatedContent, tokenCost, expiresAt]
  )
}
