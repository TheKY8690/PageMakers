import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { findVariantComponent } from '@/lib/templates/index'

export const revalidate = 3600

interface Props {
  params: Promise<{ username: string; slug: string }>
}

async function getPageData(username: string, slug: string) {
  const { data: pageRaw } = await supabaseAdmin
    .from('published_pages')
    .select('id, request_id, template_id, user_id, username, slug')
    .eq('username', username)
    .eq('slug', slug)
    .single()

  if (!pageRaw) return null

  const { data: raw } = await supabaseAdmin
    .from('portfolio_requests')
    .select('brand_name, brand_description, website_type, brand_colors, main_image_url, image_urls, contacts, additional_request')
    .eq('id', pageRaw.request_id)
    .single()

  if (!raw) return null

  return {
    page: {
      id: pageRaw.id as string,
      requestId: pageRaw.request_id as string,
      templateId: pageRaw.template_id as string,
      userId: pageRaw.user_id as string | null,
      username: pageRaw.username as string,
      slug: pageRaw.slug as string,
    },
    request: {
      brandName: raw.brand_name as string,
      brandDescription: raw.brand_description as string,
      websiteType: raw.website_type as string | null,
      brandColors: (raw.brand_colors ?? []) as string[],
      mainImageUrl: raw.main_image_url as string | null,
      imageUrls: (raw.image_urls ?? []) as string[],
      contacts: (raw.contacts ?? []) as { type: string; value: string }[],
      additionalRequest: raw.additional_request as string | null,
    },
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username: rawUsername, slug } = await params
  const username = decodeURIComponent(rawUsername)
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
  const { username: rawUsername, slug } = await params
  const username = decodeURIComponent(rawUsername)
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
      {/* eslint-disable-next-line react-hooks/static-components */}
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
