'use server'

import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createPortfolioRequest(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const brandName = formData.get('brandName') as string
  const websiteType = formData.get('websiteType') as string
  const brandDescription = formData.get('brandDescription') as string
  const brandColors = formData.getAll('brandColors') as string[]
  const files = formData.getAll('images') as File[]
  const additionalRequest = (formData.get('additionalRequest') as string) || null

  const imageUrls: string[] = []
  for (const file of files) {
    if (!file.size) continue
    const path = `${user?.id ?? 'anonymous'}/${Date.now()}-${file.name}`
    const { error } = await supabaseAdmin.storage
      .from('sendMe-images')
      .upload(path, file)
    if (!error) {
      imageUrls.push(path)
    }
  }

  const [inserted] = await db
    .insert(portfolioRequests)
    .values({
      userId: user?.id ?? null,
      brandName,
      websiteType,
      brandDescription,
      brandColors,
      imageUrls,
      additionalRequest,
    })
    .returning({ id: portfolioRequests.id })

  redirect(`/dashboard/requests/${inserted.id}/preview`)
}
