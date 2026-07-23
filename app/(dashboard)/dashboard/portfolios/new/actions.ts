'use server'

import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createPortfolioRequest(formData: FormData) {
  const brandName = formData.get('brandName') as string
  const brandDescription = formData.get('brandDescription') as string
  const brandColor = formData.get('brandColor') as string
  const files = formData.getAll('images') as File[]

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

  await db.insert(portfolioRequests).values({
    brandName,
    brandDescription,
    brandColor,
    imageUrls,
  })

  redirect('/dashboard')
}
