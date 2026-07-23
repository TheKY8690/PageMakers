'use client'

import { useEffect, useState } from 'react'
import * as s from '@/styles/wara/nav.css'

export default function WaraNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`${s.nav} ${scrolled ? s.navScrolled : ''}`}>
      <a href="#" className={s.logo}>
        와라<span className={s.logoDot} />
      </a>
      <div className={s.navRight}>
        <a href="#features" className={s.navLink}>기능</a>
        <a href="#how" className={s.navLink}>사용법</a>
        <a
          href="https://wara.kr"
          target="_blank"
          rel="noopener noreferrer"
          className={s.navLink}
        >
          시작하기
        </a>
      </div>
    </nav>
  )
}
