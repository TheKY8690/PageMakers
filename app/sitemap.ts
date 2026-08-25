import type { MetadataRoute } from 'next'
import { supabaseAdmin } from '@/lib/supabase/admin'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: pages } = (await supabaseAdmin
    .from('published_pages')
    .select('slug, created_at')) as unknown as {
    data: { slug: string; created_at: string | null }[] | null
  }

  const portfolioPages = (pages ?? []).map((page) => ({
    url: `https://${page.slug}.pagemakers.co`,
    lastModified: page.created_at ? new Date(page.created_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: 'https://pagemakers.co', changeFrequency: 'weekly' as const, priority: 1 },
    ...portfolioPages,
  ]
}
