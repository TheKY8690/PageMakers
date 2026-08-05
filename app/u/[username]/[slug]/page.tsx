import { db } from '@/lib/db'
import { publishedPages, portfolioRequests } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { templateRegistry } from '@/lib/templates/index'
import type { TemplateId } from '@/lib/templates/types'

export const revalidate = 3600

interface Props {
  params: Promise<{ username: string; slug: string }>
}

export default async function PortfolioPage({ params }: Props) {
  const { username, slug } = await params

  const [page] = await db
    .select()
    .from(publishedPages)
    .where(and(eq(publishedPages.username, username), eq(publishedPages.slug, slug)))

  if (!page) notFound()

  const [request] = await db
    .select()
    .from(portfolioRequests)
    .where(eq(portfolioRequests.id, page.requestId))

  if (!request) notFound()

  const entry = templateRegistry[page.templateId as TemplateId]
  if (!entry) notFound()

  const Template = entry.component

  return (
    <Template
      brandName={request.brandName}
      brandDescription={request.brandDescription}
      brandColors={request.brandColors ?? []}
      imageUrls={request.imageUrls ?? []}
    />
  )
}
