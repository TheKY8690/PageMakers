import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { eq, desc } from 'drizzle-orm'
import * as s from '@/styles/dashboard/dashboard.css'

const badgeMap: Record<string, { label: string; className: string }> = {
  pending: { label: '대기중', className: s.badgePending },
  cancelled: { label: '취소', className: s.badgeCancelled },
  template_selection: { label: '선택요망', className: s.badgeTemplateSelection },
  done: { label: '제작완료', className: s.badgeDone },
}

interface Props { params: Promise<{ id: string }> }

export default async function AdminUserDetailPage({ params }: Props) {
  const { id } = await params

  const { data: { user }, error } = await supabaseAdmin.auth.admin.getUserById(id)
  if (error || !user) notFound()

  const requests = await db
    .select({
      id: portfolioRequests.id,
      brandName: portfolioRequests.brandName,
      websiteType: portfolioRequests.websiteType,
      status: portfolioRequests.status,
      createdAt: portfolioRequests.createdAt,
    })
    .from(portfolioRequests)
    .where(eq(portfolioRequests.userId, id))
    .orderBy(desc(portfolioRequests.createdAt))

  return (
    <div style={{ padding: '32px', maxWidth: '760px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <Link href="/admin/users" style={{ color: 'rgba(12,12,12,0.45)', fontSize: '13px', textDecoration: 'none' }}>
          ← 유저 목록
        </Link>
        <h1 style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', margin: 0 }}>
          {user.email ?? id}
        </h1>
      </div>

      {/* 유저 정보 */}
      <div style={{ border: '1px solid rgba(12,12,12,0.1)', backgroundColor: '#fff', marginBottom: '32px' }}>
        {[
          ['이메일', user.email ?? '-'],
          ['UID', user.id],
          ['가입일', user.created_at ? new Date(user.created_at).toLocaleString('ko-KR') : '-'],
          ['마지막 로그인', user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('ko-KR') : '-'],
          ['로그인 수단', user.app_metadata?.provider ?? '-'],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '16px', padding: '12px 20px', borderBottom: '1px solid rgba(12,12,12,0.06)', fontSize: '14px' }}>
            <span style={{ color: 'rgba(12,12,12,0.45)', fontWeight: 500 }}>{label}</span>
            <span style={{ color: '#0C0C0C', wordBreak: 'break-all' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* 요청 목록 */}
      <h2 style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em', marginBottom: '16px' }}>
        요청 목록 ({requests.length})
      </h2>
      {requests.length === 0 ? (
        <p style={{ fontSize: '14px', color: 'rgba(12,12,12,0.45)' }}>요청이 없습니다</p>
      ) : (
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.th}>브랜드명</th>
              <th className={s.th}>유형</th>
              <th className={s.th}>상태</th>
              <th className={s.th}>요청일</th>
              <th className={s.th}></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => {
              const badge = badgeMap[req.status ?? 'pending'] ?? badgeMap.pending
              return (
                <tr key={req.id} className={s.row}>
                  <td className={s.td} style={{ fontWeight: 500 }}>{req.brandName}</td>
                  <td className={s.td}>{req.websiteType}</td>
                  <td className={s.td}><span className={badge.className}>{badge.label}</span></td>
                  <td className={s.td}>{req.createdAt ? new Date(req.createdAt).toLocaleDateString('ko-KR') : '-'}</td>
                  <td className={s.td}>
                    <Link href={`/admin/requests/${req.id}`} className={s.detailLink}>
                      상세보기
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
