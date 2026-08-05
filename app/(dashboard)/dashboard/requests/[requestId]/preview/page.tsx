import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
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

  return (
    <main style={{ minHeight: '100dvh', background: '#F8FAFC', padding: '48px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }}>템플릿 선택</h1>
          <p style={{ fontSize: '15px', color: '#64748B', margin: 0 }}>
            <strong style={{ color: '#0F172A' }}>{request.brandName}</strong>에 어울리는 스타일을 골라주세요
          </p>
        </div>

        <TemplatePicker
          requestId={requestId}
          brandName={request.brandName}
          brandDescription={request.brandDescription}
          brandColors={request.brandColors ?? []}
          imageUrls={request.imageUrls ?? []}
        />
      </div>
    </main>
  )
}
