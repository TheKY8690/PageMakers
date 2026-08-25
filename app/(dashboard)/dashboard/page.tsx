import Link from 'next/link'
import { db } from '@/lib/db'
import { portfolioRequests, publishedPages } from '@/lib/db/schema'
import { createClient } from '@/lib/supabase/server'
import { eq, desc } from 'drizzle-orm'
import * as s from '../../../styles/dashboard/dashboard.css'

const badgeMap: Record<string, { label: string; className: string }> = {
  pending:            { label: '요청중',     className: s.badgePending },
  waiting:            { label: '작업대기중', className: s.badgeWaiting },
  in_progress:        { label: '작업중',     className: s.badgeInProgress },
  template_selection: { label: '선택요망',   className: s.badgeTemplateSelection },
  done:               { label: '제작완료',   className: s.badgeDone },
  cancelled:          { label: '취소',       className: s.badgeCancelled },
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const [requests, pages] = await Promise.all([
    db
      .select({
        id: portfolioRequests.id,
        brandName: portfolioRequests.brandName,
        status: portfolioRequests.status,
        createdAt: portfolioRequests.createdAt,
        infoRequestMessage: portfolioRequests.infoRequestMessage,
      })
      .from(portfolioRequests)
      .where(eq(portfolioRequests.userId, user!.id))
      .orderBy(desc(portfolioRequests.createdAt)),
    db
      .select({
        id: publishedPages.id,
        username: publishedPages.username,
        slug: publishedPages.slug,
        createdAt: publishedPages.createdAt,
        brandName: portfolioRequests.brandName,
      })
      .from(publishedPages)
      .leftJoin(portfolioRequests, eq(publishedPages.requestId, portfolioRequests.id))
      .where(eq(publishedPages.userId, user!.id))
      .orderBy(desc(publishedPages.createdAt)),
  ])

  return (
    <>
      {/* 내 페이지 */}
      {pages.length > 0 && (
        <section style={{ marginBottom: '48px' }}>
          <div className={s.pageHeader} style={{ marginBottom: '16px' }}>
            <h2 className={s.pageTitle} style={{ fontSize: '16px' }}>내 페이지</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
            {pages.map((page) => (
              <a
                key={page.id}
                href={`/u/${page.username}/${page.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  border: '1px solid rgba(12,12,12,0.1)',
                  background: '#fff',
                  padding: '20px',
                  textDecoration: 'none',
                }}
              >
                <p style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 800, fontSize: '15px', letterSpacing: '-0.02em', color: '#0C0C0C', margin: '0 0 4px' }}>
                  {page.brandName ?? '-'}
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(12,12,12,0.4)', margin: '0 0 16px', fontFamily: 'monospace' }}>
                  {page.slug}.pagemakers.co
                </p>
                <p style={{ fontSize: '12px', color: '#0C0C0C', fontWeight: 600, margin: 0, letterSpacing: '0.02em' }}>
                  페이지 보기 →
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

      <div className={s.pageHeader}>
        <h1 className={s.pageTitle}>요청 목록</h1>
      </div>

      {requests.length === 0 ? (
        <div className={s.emptyState}>
          <p className={s.emptyStateTitle}>아직 요청이 없습니다</p>
          <p className={s.emptyStateText}>첫 번째 포트폴리오 페이지를 요청해보세요.</p>
          <Link href="/dashboard/portfolios/new" className={s.ctaLink}>
            첫 번째 요청하기
          </Link>
        </div>
      ) : (
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                <th className={s.th}>브랜드명</th>
                <th className={s.th}>상태</th>
                <th className={s.th}>요청일</th>
                <th className={s.th}></th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => {
                const status = req.status ?? 'pending'
                const badge = badgeMap[status] ?? badgeMap.pending
                const date = req.createdAt
                  ? new Date(req.createdAt).toLocaleDateString('ko-KR')
                  : '-'
                return (
                  <tr key={req.id} className={s.row}>
                    <td className={s.td}>{req.brandName}</td>
                    <td className={s.td}>
                      <span className={badge.className}>{badge.label}</span>
                      {req.infoRequestMessage && (
                        <span style={{ marginLeft: '6px', fontSize: '10px', fontWeight: 600, color: '#EA580C', letterSpacing: '0.04em' }}>
                          📌 확인 필요
                        </span>
                      )}
                    </td>
                    <td className={s.td}>{date}</td>
                    <td className={s.td}>
                      <Link
                        href={`/dashboard/requests/${req.id}`}
                        className={s.detailLink}
                      >
                        상세보기
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
