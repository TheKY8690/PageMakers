import { supabaseAdmin } from '@/lib/supabase/admin'
import { db } from '@/lib/db'
import { portfolioRequests } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import * as s from '@/styles/dashboard/dashboard.css'
import * as a from '@/styles/admin/admin.css'

export default async function AdminAnalyticsPage() {
  const { data: { users } } = await supabaseAdmin.auth.admin.listUsers()

  // eslint-disable-next-line react-hooks/purity
  const now = Date.now()
  const DAY = 24 * 60 * 60 * 1000
  const dau = users.filter((u) => u.last_sign_in_at && now - new Date(u.last_sign_in_at).getTime() < DAY).length
  const wau = users.filter((u) => u.last_sign_in_at && now - new Date(u.last_sign_in_at).getTime() < 7 * DAY).length
  const mau = users.filter((u) => u.last_sign_in_at && now - new Date(u.last_sign_in_at).getTime() < 30 * DAY).length

  const [totalReqs] = await db.select({ count: sql<number>`count(*)::int` }).from(portfolioRequests)
  const [pendingReqs] = await db.select({ count: sql<number>`count(*)::int` }).from(portfolioRequests).where(eq(portfolioRequests.status, 'pending'))
  const [doneReqs] = await db.select({ count: sql<number>`count(*)::int` }).from(portfolioRequests).where(eq(portfolioRequests.status, 'done'))

  const stats = [
    { label: 'DAU', value: dau, desc: '오늘 활성 유저' },
    { label: 'WAU', value: wau, desc: '주간 활성 유저' },
    { label: 'MAU', value: mau, desc: '월간 활성 유저' },
    { label: '전체 유저', value: users.length, desc: '가입 유저 수' },
    { label: '전체 요청', value: totalReqs.count, desc: '누적 요청 수' },
    { label: '대기중', value: pendingReqs.count, desc: '처리 대기 요청' },
    { label: '제작완료', value: doneReqs.count, desc: '완료된 요청' },
  ]

  return (
    <>
      <div className={s.pageHeader}>
        <h1 className={s.pageTitle}>분석</h1>
      </div>
      <div className={a.pageInner}>
        <div className={a.statGrid}>
          {stats.map((stat) => (
            <div key={stat.label} className={a.statCard}>
              <p className={a.statLabel}>{stat.label}</p>
              <p className={a.statValue}>{stat.value}</p>
              <p className={a.statDesc}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
