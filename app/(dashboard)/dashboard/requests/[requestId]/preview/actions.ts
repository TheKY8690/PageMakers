'use server'

import { db } from '@/lib/db'
import { publishedPages, portfolioRequests } from '@/lib/db/schema'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import type { TemplateId } from '@/lib/templates/types'

function toSlug(brandName: string) {
  return brandName
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function selectTemplate(requestId: string, templateId: TemplateId) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [request] = await db
    .select()
    .from(portfolioRequests)
    .where(eq(portfolioRequests.id, requestId))

  if (!request) throw new Error('요청을 찾을 수 없습니다')

  const baseSlug = toSlug(request.brandName) || 'page'
  const suffix = Math.random().toString(16).slice(2, 6)
  const slug = `${baseSlug}-${suffix}`

  const username = user ? `user-${user.id.slice(0, 8)}` : 'user'

  await db.insert(publishedPages).values({
    requestId,
    userId: user?.id ?? null,
    username,
    slug,
    templateId,
  })

  redirect(`/u/${username}/${slug}`)
}
