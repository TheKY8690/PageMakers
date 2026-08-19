'use server'

import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function cancelRequest(requestId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  await db
    .update(portfolioRequests)
    .set({ status: 'cancelled' })
    .where(
      and(
        eq(portfolioRequests.id, requestId),
        eq(portfolioRequests.userId, user.id),
        eq(portfolioRequests.status, 'pending'),
      )
    )

  revalidatePath(`/dashboard/requests/${requestId}`)
  revalidatePath('/dashboard')
}

export async function getSignedUploadUrls(
  files: { name: string; isMain: boolean }[]
): Promise<{ path: string; signedUrl: string }[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  return Promise.all(
    files.map(async ({ name, isMain }) => {
      const path = `${user.id}/${Date.now()}-${isMain ? 'main-' : ''}${name}`
      const { data, error } = await supabaseAdmin.storage
        .from('sendMe-images')
        .createSignedUploadUrl(path)
      if (error) throw error
      return { path, signedUrl: data.signedUrl }
    })
  )
}

export async function updateRequest(requestId: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const brandName = formData.get('brandName') as string
  const websiteType = formData.get('websiteType') as string
  const brandDescription = formData.get('brandDescription') as string
  const brandColors = formData.getAll('brandColors') as string[]
  const contactsRaw = formData.get('contacts') as string
  const contacts: { type: string; value: string }[] = contactsRaw ? JSON.parse(contactsRaw) : []
  const mainImagePath = (formData.get('mainImagePath') as string) || null
  const imagePaths = formData.getAll('imagePaths') as string[]
  const additionalRequest = (formData.get('additionalRequest') as string) || null

  await db
    .update(portfolioRequests)
    .set({
      brandName,
      websiteType,
      brandDescription,
      brandColors,
      contacts,
      mainImageUrl: mainImagePath,
      imageUrls: imagePaths,
      additionalRequest,
    })
    .where(
      and(
        eq(portfolioRequests.id, requestId),
        eq(portfolioRequests.userId, user.id),
        eq(portfolioRequests.status, 'pending'),
      )
    )

  revalidatePath(`/dashboard/requests/${requestId}`)
  revalidatePath('/dashboard')
  redirect(`/dashboard/requests/${requestId}`)
}

export async function confirmTemplate(requestId: string, templateId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  await db
    .update(portfolioRequests)
    .set({ selectedTemplateId: templateId })
    .where(
      and(
        eq(portfolioRequests.id, requestId),
        eq(portfolioRequests.userId, user.id),
        eq(portfolioRequests.status, 'template_selection'),
      )
    )

  revalidatePath(`/dashboard/requests/${requestId}`)
}
