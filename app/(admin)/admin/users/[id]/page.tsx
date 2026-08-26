import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { portfolioRequests, profiles } from '@/lib/db/schema'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { eq, desc } from 'drizzle-orm'
import * as s from '@/styles/dashboard/dashboard.css'
import * as a from '@/styles/admin/admin.css'
import { setUserRole } from './actions'
import ClickableRow from '../ClickableRow'

const badgeMap: Record<string, { label: string; className: string }> = {
  pending: { label: '대기중', className: s.badgePending },
  cancelled: { label: '취소', className: s.badgeCancelled },
  template_selection: { label: '선택요망', className: s.badgeTemplateSelection },
  done: { label: '제작완료', className: s.badgeDone },
}

interface Props { params: Promise<{ id: string }> }

export default async function AdminUserDetailPage({ params }: Props) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user: me } } = await supabase.auth.getUser()

  const { data: { user }, error } = await supabaseAdmin.auth.admin.getUserById(id)
  if (error || !user) notFound()

  const [profile] = await db.select().from(profiles).where(eq(profiles.id, id))
  const currentRole = profile?.role ?? 'user'
  const isSelf = me?.id === id

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
    <div className={a.pageWrapper}>
      <div className={a.titleRow} style={{ marginBottom: '32px' }}>
        <Link href="/admin/users" className={a.backLinkInline}>← 유저 목록</Link>
        <h1 className={a.pageH1}>{user.email ?? id}</h1>
        {currentRole === 'admin' && <span className={s.badgeTemplateSelection}>admin</span>}
      </div>

      {/* 유저 정보 */}
      <div className={a.infoCard} style={{ marginBottom: '16px' }}>
        {[
          ['이메일', user.email ?? '-'],
          ['UID', user.id],
          ['가입일', user.created_at ? new Date(user.created_at).toLocaleString('ko-KR') : '-'],
          ['마지막 로그인', user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('ko-KR') : '-'],
          ['로그인 수단', user.app_metadata?.provider ?? '-'],
        ].map(([label, value]) => (
          <div key={label} className={a.infoRowSm}>
            <span className={a.infoRowLabelSm}>{label}</span>
            <span className={a.infoRowValueBreak}>{value}</span>
          </div>
        ))}
      </div>

      {/* Role 관리 */}
      <div className={a.roleMgmt}>
        {currentRole === 'user' ? (
          <form action={setUserRole.bind(null, id, 'admin')}>
            <button type="submit" className={a.btnSmPrimary}>Admin으로 승격</button>
          </form>
        ) : (
          <form action={setUserRole.bind(null, id, 'user')}>
            <button type="submit" className={a.btnSmDanger} disabled={isSelf}>Admin 해제</button>
          </form>
        )}
        {isSelf && <span className={a.selfNote}>본인 계정은 해제 불가</span>}
      </div>

      {/* 요청 목록 */}
      <h2 className={a.pageH2}>요청 목록 ({requests.length})</h2>
      {requests.length === 0 ? (
        <p className={a.emptyNote}>요청이 없습니다</p>
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
              return (
                <ClickableRow key={req.id} href={`/admin/requests/${req.id}`}>
                  <td className={`${s.td} ${a.cellNameMed}`}>{req.brandName}</td>
                  <td className={s.td}>{req.websiteType}</td>
                  <td className={s.td}><span className={badge.className}>{badge.label}</span></td>
                  <td className={s.td}>{req.createdAt ? new Date(req.createdAt).toLocaleDateString('ko-KR') : '-'}</td>
                </ClickableRow>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
