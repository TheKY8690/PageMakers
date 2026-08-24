import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { notFound, redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requestVariants } from '@/lib/templates/index'
import TemplatePicker from './TemplatePicker'

interface Props {
  params: Promise<{ requestId: string }>
}

export default async function PreviewPage({ params }: Props) {
  const { requestId } = await params

  const [request] = await db
    .select()
    .from(portfolioRequests)
    .where(eq(portfolioRequests.id, requestId))

  if (!request) notFound()
  if (request.status !== 'template_selection') redirect(`/dashboard/requests/${requestId}`)

  // Signed URL — main image
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

  const variants = requestVariants[requestId] ?? []

  return (
    <main style={{ minHeight: '100dvh', background: '#F8F8F8', padding: '48px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0C0C0C', margin: '0 0 8px' }}>시안 선택</h1>
          <p style={{ fontSize: '15px', color: 'rgba(12,12,12,0.45)', margin: 0 }}>
            <strong style={{ color: '#0C0C0C' }}>{request.brandName}</strong>에 맞게 제작된 시안을 확인하고 선택해주세요
          </p>
        </div>

        <TemplatePicker
          requestId={requestId}
          variants={variants}
          brandName={request.brandName}
          brandDescription={request.brandDescription}
          brandColors={request.brandColors ?? []}
          imageUrls={imageUrls}
          mainImageUrl={mainImageUrl}
          contacts={contacts}
          websiteType={request.websiteType}
        />
      </div>
    </main>
  )
}
