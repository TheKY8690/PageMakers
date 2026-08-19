import { db } from '@/lib/db'
import { portfolioRequests, profiles } from '@/lib/db/schema'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { eq, sql } from 'drizzle-orm'
import * as s from '@/styles/dashboard/dashboard.css'
import ClickableRow from './ClickableRow'

export default async function AdminUsersPage() {
  const { data: { users } } = await supabaseAdmin.auth.admin.listUsers()

  const counts = await db
    .select({ userId: portfolioRequests.userId, count: sql<number>`count(*)::int` })
    .from(portfolioRequests)
    .groupBy(portfolioRequests.userId)

  const adminProfiles = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(eq(profiles.role, 'admin'))

  const countMap = Object.fromEntries(counts.map((c) => [c.userId, c.count]))
  const adminIds = new Set(adminProfiles.map((p) => p.id))

  return (
    <>
      <div className={s.pageHeader}>
        <h1 className={s.pageTitle}>유저 목록 ({users.length})</h1>
      </div>
      <div className={s.tableWrapper}>
        {users.length === 0 ? (
          <div className={s.emptyState}>
            <p className={s.emptyStateTitle}>유저가 없습니다</p>
          </div>
        ) : (
          <table className={s.table}>
            <thead>
              <tr>
                <th className={s.th}>이메일</th>
                <th className={s.th}>가입일</th>
                <th className={s.th}>마지막 로그인</th>
                <th className={s.th}>요청수</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <ClickableRow key={u.id} href={`/admin/users/${u.id}`}>
                  <td className={s.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 500 }}>{u.email ?? '-'}</span>
                      {adminIds.has(u.id) && (
                        <span className={s.badgeTemplateSelection}>admin</span>
                      )}
                    </div>
                  </td>
                  <td className={s.td}>
                    {u.created_at ? new Date(u.created_at).toLocaleDateString('ko-KR') : '-'}
                  </td>
                  <td className={s.td}>
                    {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString('ko-KR') : '-'}
                  </td>
                  <td className={s.td}>{countMap[u.id] ?? 0}</td>
                </ClickableRow>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
