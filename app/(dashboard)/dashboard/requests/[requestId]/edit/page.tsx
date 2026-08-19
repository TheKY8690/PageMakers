import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { createClient } from '@/lib/supabase/server'
import { and, eq } from 'drizzle-orm'
import EditForm from './EditForm'
import * as s from '@/styles/dashboard/requestForm.css'

interface Props {
  params: Promise<{ requestId: string }>
}

export default async function EditRequestPage({ params }: Props) {
  const { requestId } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [request] = await db
    .select()
    .from(portfolioRequests)
    .where(and(eq(portfolioRequests.id, requestId), eq(portfolioRequests.userId, user!.id)))

  if (!request) notFound()

  // 24h 이내 + pending 만 수정 가능
  const canEdit =
    request.status === 'pending' &&
    request.createdAt != null &&
    // eslint-disable-next-line react-hooks/purity
    Date.now() - new Date(request.createdAt).getTime() < 24 * 60 * 60 * 1000

  if (!canEdit) redirect(`/dashboard/requests/${requestId}`)

  return (
    <div className={s.page}>
      <div className={s.card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <Link
            href={`/dashboard/requests/${requestId}`}
            style={{ color: 'rgba(12,12,12,0.45)', fontSize: '13px', textDecoration: 'none' }}
          >
            ← 상세보기
          </Link>
          <h1 className={s.heading}>요청 수정</h1>
        </div>
        <EditForm
          requestId={requestId}
          initial={{
            brandName: request.brandName,
            websiteType: request.websiteType,
            brandDescription: request.brandDescription,
            additionalRequest: request.additionalRequest ?? null,
            brandColors: request.brandColors ?? [],
            contacts: (request.contacts as { type: string; value: string }[]) ?? [],
            mainImageUrl: request.mainImageUrl ?? null,
            imageUrls: request.imageUrls ?? [],
          }}
        />
      </div>
    </div>
  )
}
