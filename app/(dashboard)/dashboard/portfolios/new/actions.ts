'use server'

import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createPortfolioRequest(formData: FormData) {
  const brandName = formData.get('brandName') as string
  const websiteType = formData.get('websiteType') as string
  const brandDescription = formData.get('brandDescription') as string
  const brandColors = formData.getAll('brandColors') as string[]
  const files = formData.getAll('images') as File[]
  const additionalRequest = (formData.get('additionalRequest') as string) || null

  const supabase = await createClient()

  const imageUrls: string[] = []
  for (const file of files) {
    if (!file.size) continue
    const path = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage
      .from('portfolio-images')
      .upload(path, file)
    if (!error) {
      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(path)
      imageUrls.push(data.publicUrl)
    }
  }

  const [inserted] = await db
    .insert(portfolioRequests)
    .values({ brandName, websiteType, brandDescription, brandColors, imageUrls, additionalRequest })
    .returning({ id: portfolioRequests.id })

  redirect(`/dashboard/requests/${inserted.id}/preview`)
}
