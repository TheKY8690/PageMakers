import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { eq } from 'drizzle-orm'
import { setTemplateSelection, markDone, resetTemplateChoice, adminCancelRequest } from './actions'
import * as s from '@/styles/dashboard/dashboard.css'
import * as a from '@/styles/admin/admin.css'
import AdminVariantPreviewer from '@/components/AdminVariantPreviewer'
import AdminStatusChanger from './AdminStatusChanger'
import AdminInfoRequester from './AdminInfoRequester'
import { requestVariants } from '@/lib/templates/index'
import { slugify } from '@/lib/utils/slugify'

const badgeMap: Record<string, { label: string; className: string }> = {
  pending:            { label: '요청중',     className: s.badgePending },
  waiting:            { label: '작업대기중', className: s.badgeWaiting },
  in_progress:        { label: '작업중',     className: s.badgeInProgress },
  template_selection: { label: '선택요망',   className: s.badgeTemplateSelection },
  done:               { label: '제작완료',   className: s.badgeDone },
  cancelled:          { label: '취소',       className: s.badgeCancelled },
}

const CONTACT_LABELS: Record<string, string> = {
  phone: '전화번호', kakao: '카카오톡', instagram: '인스타그램',
  naver: '네이버 블로그', youtube: '유튜브', facebook: '페이스북',
  twitter: 'X (트위터)', tiktok: '틱톡',
}

interface Props { params: Promise<{ requestId: string }> }

export default async function AdminRequestDetailPage({ params }: Props) {
  const { requestId } = await params

  const [request] = await db.select().from(portfolioRequests).where(eq(portfolioRequests.id, requestId))
  if (!request) notFound()

  const status = request.status ?? 'pending'
  const badge = badgeMap[status] ?? badgeMap.pending

  const mainSignedUrl = request.mainImageUrl
    ? (await supabaseAdmin.storage.from('sendMe-images').createSignedUrl(request.mainImageUrl, 3600)).data?.signedUrl ?? null
    : null

  const additionalSignedUrls = await Promise.all(
    (request.imageUrls ?? []).map(async (path: string) => {
      const { data } = await supabaseAdmin.storage.from('sendMe-images').createSignedUrl(path, 3600)
      return data?.signedUrl ?? null
    })
  )

  const contacts = (request.contacts as { type: string; value: string }[] | null) ?? []

  return (
    <div className={a.pageWrapper}>
      {/* 헤더 */}
      <div className={a.pageHeader}>
        <Link href="/admin/requests" className={a.backLink}>
          ← 목록
        </Link>
        <div className={a.titleRow}>
          <h1 className={a.pageH1}>{request.brandName}</h1>
          <span className={badge.className}>{badge.label}</span>
          <div className={a.titleActions}>
            <AdminStatusChanger requestId={requestId} currentStatus={status} />
          </div>
        </div>
      </div>

      {/* 추가 자료 요청 패널 */}
      <div style={{ marginBottom: '20px' }}>
        <AdminInfoRequester
          requestId={requestId}
          currentMessage={request.infoRequestMessage ?? null}
          requestedAt={request.infoRequestedAt ?? null}
          status={status}
        />
      </div>

      {/* 상세 내용 */}
      <div className={a.infoCard}>
        <Row label="홈페이지 유형" value={request.websiteType} />
        <Row label="소개" value={request.brandDescription} />
        <Row label="요청일" value={request.createdAt ? new Date(request.createdAt).toLocaleString('ko-KR') : '-'} />
        <Row
          label="대표 컬러"
          value={
            <div className={a.colorSwatchList}>
              {(request.brandColors ?? []).map((c: string, i: number) => (
                <div key={i} className={a.colorSwatchItem}>
                  <div className={a.colorSwatchDot} style={{ backgroundColor: c }} />
                  <span className={a.colorSwatchHex}>{c.toUpperCase()}</span>
                </div>
              ))}
            </div>
          }
        />
        {contacts.length > 0 && (
          <Row
            label="연락처"
            value={
              <div className={a.contactsList}>
                {contacts.map((c) => (
                  <div key={c.type} className={a.contactsItem}>
                    <span className={a.contactType}>{CONTACT_LABELS[c.type] ?? c.type}</span>
                    {c.value}
                  </div>
                ))}
              </div>
            }
          />
        )}
        {mainSignedUrl && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <Row label="메인 이미지" value={<img src={mainSignedUrl} alt="메인" className={a.mainImageThumb} />} />
        )}
        {additionalSignedUrls.filter(Boolean).length > 0 && (
          <Row label="추가 이미지" value={
            <div className={a.imageThumbList}>
              {additionalSignedUrls.filter(Boolean).map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={url!} alt={`추가 ${i + 1}`} className={a.imageThumb} />
              ))}
            </div>
          } />
        )}
        {request.additionalRequest && (
          <Row label="추가 요청사항" value={request.additionalRequest} />
        )}
      </div>

      {/* 제작된 시안 — requestVariants에 있으면 전체 표시 */}
      {requestVariants[requestId] && (
        <div className={a.variantSectionMb}>
          <div className={a.variantSectionHeader}>
            <h2 className={a.pageH2} style={{ margin: 0, marginBottom: 0 }}>제작된 시안</h2>
            {request.selectedTemplateId && status === 'template_selection' && (
              <form action={async () => { 'use server'; await resetTemplateChoice(requestId) }}>
                <button type="submit" className={a.btnReset}>선택 초기화</button>
              </form>
            )}
          </div>
          <AdminVariantPreviewer
            requestId={requestId}
            selectedTemplateId={request.selectedTemplateId}
            brandName={request.brandName}
            brandDescription={request.brandDescription}
            brandColors={request.brandColors ?? []}
            imageUrls={additionalSignedUrls.filter(Boolean) as string[]}
            mainImageUrl={mainSignedUrl}
            contacts={contacts}
            websiteType={request.websiteType ?? undefined}
          />
        </div>
      )}

      {/* 액션 패널 */}
      <div className={a.actionPanel}>
        {status === 'pending' && (
          <form action={async () => { 'use server'; await setTemplateSelection(requestId) }}>
            <button type="submit" className={a.btnPrimary}>템플릿 선택 요청</button>
          </form>
        )}

        {status === 'template_selection' && request.selectedTemplateId && (
          <form action={markDone.bind(null, requestId)}>
            <div className={a.publishForm}>
              <div>
                <label className={a.publishLabel}>username</label>
                <input
                  name="username"
                  required
                  defaultValue={slugify(request.requesterName ?? request.brandName)}
                  placeholder="예: johndoe"
                  className={a.publishInput}
                />
              </div>
              <div>
                <label className={a.publishLabel}>slug</label>
                <input
                  name="slug"
                  required
                  defaultValue="portfolio"
                  placeholder="예: portfolio"
                  className={a.publishInput}
                />
              </div>
              <button type="submit" className={a.btnSuccess}>제작 완료</button>
            </div>
          </form>
        )}

        {status === 'template_selection' && !request.selectedTemplateId && (
          <p className={a.statusNote}>유저가 템플릿을 선택하면 제작 완료 버튼이 나타납니다</p>
        )}

        {status !== 'cancelled' && status !== 'done' && (
          <form action={async () => { 'use server'; await adminCancelRequest(requestId) }}>
            <button type="submit" className={a.btnDanger}>요청 취소</button>
          </form>
        )}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className={a.infoRow}>
      <span className={a.infoRowLabel}>{label}</span>
      <span className={a.infoRowValue}>{value}</span>
    </div>
  )
}
