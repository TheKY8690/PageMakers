'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as s from '@/styles/dashboard/layout.css'

export default function AdminNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(href + '/')
  return (
    <Link href={href} className={isActive ? s.navLinkActive : s.navLink}>
      {children}
    </Link>
  )
}
