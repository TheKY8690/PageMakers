import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { publishedPages, portfolioRequests } from '@/lib/db/schema'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { eq, and } from 'drizzle-orm'
import { findVariantComponent } from '@/lib/templates/index'

export const revalidate = 3600

interface Props {
  params: Promise<{ username: string; slug: string }>
}

async function getPageData(username: string, slug: string) {
  const [page] = await db
    .select()
    .from(publishedPages)
    .where(and(eq(publishedPages.username, username), eq(publishedPages.slug, slug)))

  if (!page) return null

  const [request] = await db
    .select()
    .from(portfolioRequests)
    .where(eq(portfolioRequests.id, page.requestId))

  if (!request) return null

  return { page, request }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username, slug } = await params
  const data = await getPageData(username, slug)
  if (!data) return { title: 'Not Found' }

  const { request } = data
  const descriptionPlain = request.brandDescription.replace(/\r?\n/g, ' ').slice(0, 160)

  // Main image OG
  let ogImageUrl: string | undefined
  if (request.mainImageUrl) {
    const { data: signedData } = await supabaseAdmin.storage
      .from('sendMe-images')
      .createSignedUrl(request.mainImageUrl, 3600)
    ogImageUrl = signedData?.signedUrl
  }

  return {
    title: `${request.brandName} | ${request.websiteType ?? 'Portfolio'}`,
    description: descriptionPlain,
    openGraph: {
      title: request.brandName,
      description: descriptionPlain,
      type: 'profile',
      ...(ogImageUrl ? { images: [{ url: ogImageUrl, width: 1200, height: 630, alt: request.brandName }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: request.brandName,
      description: descriptionPlain,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
    alternates: {
      canonical: `/u/${username}/${slug}`,
    },
  }
}

export default async function PortfolioPage({ params }: Props) {
  const { username, slug } = await params
  const data = await getPageData(username, slug)
  if (!data) notFound()

  const { page, request } = data

  const Template = findVariantComponent(page.templateId)
  if (!Template) notFound()

  // Signed URLs — mainImage
  const mainImageUrl = request.mainImageUrl
    ? (await supabaseAdmin.storage.from('sendMe-images').createSignedUrl(request.mainImageUrl, 3600)).data?.signedUrl ?? null
    : null

  // Signed URLs — gallery images
  const imageUrls = await Promise.all(
    (request.imageUrls ?? []).map(async (path: string) => {
      const { data } = await supabaseAdmin.storage.from('sendMe-images').createSignedUrl(path, 3600)
      return data?.signedUrl ?? null
    })
  ).then(urls => urls.filter(Boolean) as string[])

  const contacts = (request.contacts as { type: string; value: string }[] | null) ?? []

  // JSON-LD
  const instagramContact = contacts.find(c => c.type === 'instagram')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: request.brandName,
        description: request.brandDescription.replace(/\r?\n/g, ' '),
        ...(instagramContact ? { sameAs: [`https://instagram.com/${instagramContact.value.replace('@', '')}`] } : {}),
      },
      {
        '@type': 'ProfilePage',
        name: `${request.brandName} | ${request.websiteType ?? 'Portfolio'}`,
        description: request.brandDescription.replace(/\r?\n/g, ' ').slice(0, 160),
        mainEntity: { '@type': 'Person', name: request.brandName },
        url: `https://pagemakers.co/u/${username}/${slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Template
        brandName={request.brandName}
        brandDescription={request.brandDescription}
        brandColors={request.brandColors ?? []}
        imageUrls={imageUrls}
        mainImageUrl={mainImageUrl}
        contacts={contacts}
        websiteType={request.websiteType}
      />
    </>
  )
}
