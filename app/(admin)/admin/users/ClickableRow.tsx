'use client'

import { useRouter } from 'next/navigation'
import * as s from '@/styles/dashboard/dashboard.css'

export default function ClickableRow({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter()
  return (
    <tr
      className={s.row}
      onClick={() => router.push(href)}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </tr>
  )
}
