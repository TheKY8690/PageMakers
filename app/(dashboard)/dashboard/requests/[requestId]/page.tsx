import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { and, eq } from 'drizzle-orm'
import TemplatePicker from './preview/TemplatePicker'
import { cancelRequest } from './actions'
import * as s from '@/styles/dashboard/dashboard.css'

const badgeMap: Record<string, { label: string; className: string }> = {
  pending: { label: '대기중', className: s.badgePending },
  cancelled: { label: '취소', className: s.badgeCancelled },
  template_selection: { label: '선택요망', className: s.badgeTemplateSelection },
  done: { label: '제작완료', className: s.badgeDone },
}

const CONTACT_LABELS: Record<string, string> = {
  phone: '전화번호', kakao: '카카오톡', instagram: '인스타그램',
  naver: '네이버 블로그', youtube: '유튜브', facebook: '페이스북',
  twitter: 'X (트위터)', tiktok: '틱톡',
}

interface Props {
  params: Promise<{ requestId: string }>
}

export default async function RequestDetailPage({ params }: Props) {
  const { requestId } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [request] = await db
    .select()
    .from(portfolioRequests)
    .where(and(eq(portfolioRequests.id, requestId), eq(portfolioRequests.userId, user!.id)))

  if (!request) notFound()

  const status = request.status ?? 'pending'
  const badge = badgeMap[status] ?? badgeMap.pending

  const canModify =
    status === 'pending' &&
    request.createdAt != null &&
    Date.now() - new Date(request.createdAt).getTime() < 24 * 60 * 60 * 1000

  // 이미지 signed URL 생성
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
    <div style={{ padding: '32px', maxWidth: '720px' }}>
      {/* 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <Link href="/dashboard" style={{ color: 'rgba(12,12,12,0.45)', fontSize: '13px', textDecoration: 'none' }}>
          ← 목록
        </Link>
        <h1 style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', margin: 0, color: '#0C0C0C' }}>
          {request.brandName}
        </h1>
        <span className={badge.className}>{badge.label}</span>
      </div>

      {/* 상세 내용 */}
      <div style={{ border: '1px solid rgba(12,12,12,0.1)', backgroundColor: '#fff', marginBottom: '24px' }}>
        <DetailRow label="홈페이지 유형" value={request.websiteType} />
        <DetailRow label="소개" value={request.brandDescription} />
        <DetailRow
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
          <DetailRow
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

        {/* 메인 이미지 */}
        {mainSignedUrl && (
          <DetailRow
            label="메인 이미지"
            value={
              <img
                src={mainSignedUrl}
                alt="메인 이미지"
                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(12,12,12,0.1)', display: 'block' }}
              />
            }
          />
        )}

        {/* 추가 이미지 */}
        {additionalSignedUrls.filter(Boolean).length > 0 && (
          <DetailRow
            label="추가 이미지"
            value={
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {additionalSignedUrls.filter(Boolean).map((url, i) => (
                  <img
                    key={i}
                    src={url!}
                    alt={`추가 이미지 ${i + 1}`}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(12,12,12,0.1)' }}
                  />
                ))}
              </div>
            }
          />
        )}

        {request.additionalRequest && (
          <DetailRow label="추가 요청사항" value={request.additionalRequest} />
        )}
        <DetailRow label="요청일" value={request.createdAt ? new Date(request.createdAt).toLocaleString('ko-KR') : '-'} />
      </div>

      {/* 액션 버튼 */}
      {canModify && (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link
            href={`/dashboard/requests/${requestId}/edit`}
            style={{
              padding: '10px 20px',
              border: '1px solid rgba(12,12,12,0.2)',
              background: '#0C0C0C',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              borderRadius: '2px',
            }}
          >
            수정하기
          </Link>
          <form
            action={async () => {
              'use server'
              await cancelRequest(requestId)
            }}
          >
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                border: '1px solid rgba(220,38,38,0.4)',
                background: 'transparent',
                color: '#DC2626',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'inherit',
                borderRadius: '2px',
              }}
            >
              요청 취소
            </button>
          </form>
        </div>
      )}

      {/* 템플릿 선택 */}
      {status === 'template_selection' && (
        <div style={{ marginTop: '32px' }}>
          <h2 style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 700, fontSize: '18px', letterSpacing: '-0.03em', marginBottom: '8px', color: '#0C0C0C' }}>
            템플릿 선택
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(12,12,12,0.45)', marginBottom: '24px' }}>
            브랜드에 어울리는 스타일을 골라주세요
          </p>
          <TemplatePicker
            requestId={requestId}
            brandName={request.brandName}
            brandDescription={request.brandDescription}
            brandColors={request.brandColors ?? []}
            imageUrls={request.imageUrls ?? []}
          />
        </div>
      )}
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '16px', padding: '14px 20px', borderBottom: '1px solid rgba(12,12,12,0.06)', fontSize: '14px' }}>
      <span style={{ color: 'rgba(12,12,12,0.45)', fontWeight: 500, paddingTop: '1px' }}>{label}</span>
      <span style={{ color: '#0C0C0C', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{value}</span>
    </div>
  )
}
