'use server'

import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function getSignedUploadUrls(
  files: { name: string; isMain: boolean }[]
): Promise<{ path: string; signedUrl: string }[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
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

export async function createPortfolioRequest(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const brandName = formData.get('brandName') as string
  const websiteType = formData.get('websiteType') as string
  const brandDescription = formData.get('brandDescription') as string
  const brandColors = formData.getAll('brandColors') as string[]
  const contactsRaw = formData.get('contacts') as string
  const contacts: { type: string; value: string }[] = contactsRaw ? JSON.parse(contactsRaw) : []
  const mainImageUrl = (formData.get('mainImagePath') as string) || null
  const imageUrls = formData.getAll('imagePaths') as string[]
  const additionalRequest = (formData.get('additionalRequest') as string) || null

  const [inserted] = await db
    .insert(portfolioRequests)
    .values({
      userId: user?.id ?? null,
      brandName,
      websiteType,
      brandDescription,
      brandColors,
      mainImageUrl,
      imageUrls,
      contacts,
      additionalRequest,
    })
    .returning({ id: portfolioRequests.id })

  redirect('/dashboard')
}
