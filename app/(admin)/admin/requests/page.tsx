import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import * as s from '@/styles/dashboard/dashboard.css'
import ClickableRow from '../users/ClickableRow'

const badgeMap: Record<string, { label: string; className: string }> = {
  pending:            { label: '요청중',     className: s.badgePending },
  waiting:            { label: '작업대기중', className: s.badgeWaiting },
  in_progress:        { label: '작업중',     className: s.badgeInProgress },
  template_selection: { label: '선택요망',   className: s.badgeTemplateSelection },
  done:               { label: '제작완료',   className: s.badgeDone },
  cancelled:          { label: '취소',       className: s.badgeCancelled },
}

export default async function AdminRequestsPage() {
  const requests = await db
    .select({
      id: portfolioRequests.id,
      brandName: portfolioRequests.brandName,
      websiteType: portfolioRequests.websiteType,
      status: portfolioRequests.status,
      createdAt: portfolioRequests.createdAt,
    })
    .from(portfolioRequests)
    .orderBy(desc(portfolioRequests.createdAt))

  return (
    <>
      <div className={s.pageHeader}>
        <h1 className={s.pageTitle}>요청 목록</h1>
      </div>
      <div className={s.tableWrapper}>
        {requests.length === 0 ? (
          <div className={s.emptyState}>
            <p className={s.emptyStateTitle}>요청이 없습니다</p>
          </div>
        ) : (
          <table className={s.table}>
            <thead>
              <tr>
                <th className={s.th}>브랜드명</th>
                <th className={s.th}>유형</th>
                <th className={s.th}>상태</th>
                <th className={s.th}>요청일</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => {
                const badge = badgeMap[req.status ?? 'pending'] ?? badgeMap.pending
                const date = req.createdAt
                  ? new Date(req.createdAt).toLocaleDateString('ko-KR')
                  : '-'
                return (
                  <ClickableRow key={req.id} href={`/admin/requests/${req.id}`}>
                    <td className={s.td} style={{ fontWeight: 500 }}>{req.brandName}</td>
                    <td className={s.td}>{req.websiteType}</td>
                    <td className={s.td}>
                      <span className={badge.className}>{badge.label}</span>
                    </td>
                    <td className={s.td}>{date}</td>
                  </ClickableRow>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
