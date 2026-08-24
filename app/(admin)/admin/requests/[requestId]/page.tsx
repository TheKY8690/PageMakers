import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { eq } from 'drizzle-orm'
import { setTemplateSelection, markDone, resetTemplateChoice, adminCancelRequest } from './actions'
import * as s from '@/styles/dashboard/dashboard.css'
import AdminVariantPreviewer from '@/components/AdminVariantPreviewer'
import AdminStatusChanger from './AdminStatusChanger'
import AdminInfoRequester from './AdminInfoRequester'
import { requestVariants } from '@/lib/templates/index'

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

  const btnBase: React.CSSProperties = {
    padding: '10px 20px', border: '1px solid', cursor: 'pointer',
    fontSize: '14px', fontWeight: 500, fontFamily: 'inherit', borderRadius: '2px',
  }

  return (
    <div style={{ padding: '32px', maxWidth: '760px' }}>
      {/* 헤더 */}
      <div style={{ marginBottom: '32px' }}>
        <Link href="/admin/requests" style={{ color: 'rgba(12,12,12,0.45)', fontSize: '13px', textDecoration: 'none', display: 'inline-block', marginBottom: '12px' }}>
          ← 목록
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <h1 style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', margin: 0 }}>
            {request.brandName}
          </h1>
          <span className={badge.className}>{badge.label}</span>
          <div style={{ marginLeft: 'auto' }}>
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
      <div style={{ border: '1px solid rgba(12,12,12,0.1)', backgroundColor: '#fff', marginBottom: '24px' }}>
        <Row label="홈페이지 유형" value={request.websiteType} />
        <Row label="소개" value={request.brandDescription} />
        <Row label="요청일" value={request.createdAt ? new Date(request.createdAt).toLocaleString('ko-KR') : '-'} />
        <Row
          label="대표 컬러"
          value={
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(request.brandColors ?? []).map((c: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '2px', backgroundColor: c, border: '1px solid rgba(12,12,12,0.1)' }} />
                  <span style={{ fontSize: '13px', fontFamily: 'monospace' }}>{c.toUpperCase()}</span>
                </div>
              ))}
            </div>
          }
        />
        {contacts.length > 0 && (
          <Row
            label="연락처"
            value={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {contacts.map((c) => (
                  <div key={c.type} style={{ fontSize: '14px' }}>
                    <span style={{ color: 'rgba(12,12,12,0.45)', width: '90px', display: 'inline-block' }}>
                      {CONTACT_LABELS[c.type] ?? c.type}
                    </span>
                    {c.value}
                  </div>
                ))}
              </div>
            }
          />
        )}
        {mainSignedUrl && (
          <Row label="메인 이미지" value={
            <img src={mainSignedUrl} alt="메인" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(12,12,12,0.1)', display: 'block' }} />
          } />
        )}
        {additionalSignedUrls.filter(Boolean).length > 0 && (
          <Row label="추가 이미지" value={
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {additionalSignedUrls.filter(Boolean).map((url, i) => (
                <img key={i} src={url!} alt={`추가 ${i + 1}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(12,12,12,0.1)' }} />
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
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em', margin: 0 }}>
              제작된 시안
            </h2>
            {request.selectedTemplateId && status === 'template_selection' && (
              <form action={async () => { 'use server'; await resetTemplateChoice(requestId) }}>
                <button
                  type="submit"
                  style={{ ...btnBase, fontSize: '12px', padding: '6px 14px', color: 'rgba(12,12,12,0.55)', borderColor: 'rgba(12,12,12,0.2)', background: 'transparent' }}
                >
                  선택 초기화
                </button>
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
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {status === 'pending' && (
          <form action={async () => { 'use server'; await setTemplateSelection(requestId) }}>
            <button type="submit" style={{ ...btnBase, background: '#0C0C0C', color: '#fff', borderColor: '#0C0C0C' }}>
              템플릿 선택 요청
            </button>
          </form>
        )}

        {status === 'template_selection' && request.selectedTemplateId && (
          <form action={markDone.bind(null, requestId)}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(12,12,12,0.5)', marginBottom: '4px' }}>username</label>
                <input
                  name="username"
                  required
                  placeholder="예: johndoe"
                  style={{ padding: '8px 12px', border: '1px solid rgba(12,12,12,0.2)', fontSize: '14px', width: '160px', fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(12,12,12,0.5)', marginBottom: '4px' }}>slug</label>
                <input
                  name="slug"
                  required
                  placeholder="예: my-brand"
                  style={{ padding: '8px 12px', border: '1px solid rgba(12,12,12,0.2)', fontSize: '14px', width: '160px', fontFamily: 'inherit' }}
                />
              </div>
              <button type="submit" style={{ ...btnBase, background: '#065F46', color: '#fff', borderColor: '#065F46' }}>
                제작 완료
              </button>
            </div>
          </form>
        )}

        {status === 'template_selection' && !request.selectedTemplateId && (
          <p style={{ fontSize: '13px', color: 'rgba(12,12,12,0.45)', padding: '10px 0' }}>
            유저가 템플릿을 선택하면 제작 완료 버튼이 나타납니다
          </p>
        )}

        {status !== 'cancelled' && status !== 'done' && (
          <form action={async () => { 'use server'; await adminCancelRequest(requestId) }}>
            <button type="submit" style={{ ...btnBase, background: 'transparent', color: '#DC2626', borderColor: 'rgba(220,38,38,0.4)' }}>
              요청 취소
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '16px', padding: '14px 20px', borderBottom: '1px solid rgba(12,12,12,0.06)', fontSize: '14px' }}>
      <span style={{ color: 'rgba(12,12,12,0.45)', fontWeight: 500, paddingTop: '1px' }}>{label}</span>
      <span style={{ color: '#0C0C0C', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{value}</span>
    </div>
  )
}
