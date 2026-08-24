'use server'

import { db } from '@/lib/db'
import { portfolioRequests, publishedPages } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function setTemplateSelection(requestId: string) {
  await db
    .update(portfolioRequests)
    .set({ status: 'template_selection' })
    .where(eq(portfolioRequests.id, requestId))

  revalidatePath(`/admin/requests/${requestId}`)
  revalidatePath('/admin/requests')
}

export async function markDone(requestId: string, formData: FormData) {
  const username = (formData.get('username') as string).trim()
  const slug = (formData.get('slug') as string).trim()

  if (!username || !slug) return

  const [request] = await db
    .select({ userId: portfolioRequests.userId, selectedTemplateId: portfolioRequests.selectedTemplateId })
    .from(portfolioRequests)
    .where(eq(portfolioRequests.id, requestId))

  if (!request || !request.selectedTemplateId) return

  await db.insert(publishedPages).values({
    requestId,
    userId: request.userId,
    username,
    slug,
    templateId: request.selectedTemplateId,
  })

  await db
    .update(portfolioRequests)
    .set({ status: 'done' })
    .where(eq(portfolioRequests.id, requestId))

  revalidatePath(`/admin/requests/${requestId}`)
  revalidatePath('/admin/requests')
  revalidatePath('/admin/portfolios')
  redirect(`/admin/requests/${requestId}`)
}

export async function changeStatus(requestId: string, status: string) {
  await db
    .update(portfolioRequests)
    .set({ status })
    .where(eq(portfolioRequests.id, requestId))

  revalidatePath(`/admin/requests/${requestId}`)
  revalidatePath('/admin/requests')
}

export async function resetTemplateChoice(requestId: string) {
  await db
    .update(portfolioRequests)
    .set({ selectedTemplateId: null })
    .where(eq(portfolioRequests.id, requestId))

  revalidatePath(`/admin/requests/${requestId}`)
  revalidatePath('/admin/requests')
}

export async function sendInfoRequest(requestId: string, message: string) {
  if (!message.trim()) return
  await db
    .update(portfolioRequests)
    .set({ infoRequestMessage: message.trim(), infoRequestedAt: new Date() })
    .where(eq(portfolioRequests.id, requestId))

  revalidatePath(`/admin/requests/${requestId}`)
}

export async function clearInfoRequest(requestId: string) {
  await db
    .update(portfolioRequests)
    .set({ infoRequestMessage: null, infoRequestedAt: null })
    .where(eq(portfolioRequests.id, requestId))

  revalidatePath(`/admin/requests/${requestId}`)
}

export async function adminCancelRequest(requestId: string) {
  await db
    .update(portfolioRequests)
    .set({ status: 'cancelled' })
    .where(eq(portfolioRequests.id, requestId))

  revalidatePath(`/admin/requests/${requestId}`)
  revalidatePath('/admin/requests')
}
