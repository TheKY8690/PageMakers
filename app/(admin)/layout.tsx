import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { profiles } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import * as s from '@/styles/dashboard/layout.css'
import AdminNavLink from './AdminNavLink'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [profile] = await db.select().from(profiles).where(eq(profiles.id, user.id))
  if (!profile || profile.role !== 'admin') redirect('/dashboard')

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className={s.shell}>
      <aside className={s.sidebar}>
        <Link href="/admin" className={s.logo}>
          Admin
        </Link>
        <nav className={s.nav}>
          <AdminNavLink href="/admin/requests">요청 목록</AdminNavLink>
          <AdminNavLink href="/admin/users">유저 목록</AdminNavLink>
          <AdminNavLink href="/admin/analytics">분석</AdminNavLink>
          <AdminNavLink href="/admin/portfolios">포트폴리오</AdminNavLink>
        </nav>
        <form action={signOut} style={{ marginTop: 'auto' }}>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px 16px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'rgba(12,12,12,0.4)',
              textAlign: 'left',
              fontFamily: 'inherit',
            }}
          >
            로그아웃
          </button>
        </form>
      </aside>
      <main className={s.main}>{children}</main>
    </div>
  )
}
