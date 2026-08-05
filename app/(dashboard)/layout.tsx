import * as s from '../../styles/dashboard/layout.css'
import NavLink from './NavLink'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={s.shell}>
      <aside className={s.sidebar}>
        <span className={s.logo}>PageMakers</span>
        <nav className={s.nav}>
          <NavLink href="/dashboard">요청 목록</NavLink>
          <NavLink href="/dashboard/portfolios/new">요청하기</NavLink>
        </nav>
      </aside>
      <main className={s.main}>{children}</main>
    </div>
  )
}
