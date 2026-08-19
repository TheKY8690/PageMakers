import Link from 'next/link'
import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { createClient } from '@/lib/supabase/server'
import { eq, desc } from 'drizzle-orm'
import * as s from '../../../styles/dashboard/dashboard.css'

const badgeMap: Record<string, { label: string; className: string }> = {
  pending: { label: '대기중', className: s.badgePending },
  cancelled: { label: '취소', className: s.badgeCancelled },
  template_selection: { label: '선택요망', className: s.badgeTemplateSelection },
  done: { label: '제작완료', className: s.badgeDone },
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const requests = await db
    .select({
      id: portfolioRequests.id,
      brandName: portfolioRequests.brandName,
      status: portfolioRequests.status,
      createdAt: portfolioRequests.createdAt,
    })
    .from(portfolioRequests)
    .where(eq(portfolioRequests.userId, user!.id))
    .orderBy(desc(portfolioRequests.createdAt))

  return (
    <>
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
