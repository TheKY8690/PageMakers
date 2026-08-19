import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import * as s from '../../styles/dashboard/layout.css'
import NavLink from './NavLink'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className={s.shell}>
      <aside className={s.sidebar}>
        <Link href="/" className={s.logo}>
          PageMakers
        </Link>
        <nav className={s.nav}>
          <NavLink href="/dashboard">요청 목록</NavLink>
          <NavLink href="/dashboard/portfolios/new">요청하기</NavLink>
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
