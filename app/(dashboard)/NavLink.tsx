'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as s from '../../styles/dashboard/layout.css'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} className={isActive ? s.navLinkActive : s.navLink}>
      {children}
    </Link>
  )
}
