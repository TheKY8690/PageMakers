'use client'

import { useEffect, useState } from 'react'
import * as s from '@/styles/dayditto/nav.css'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const tick = () => {
      const kst = new Date().toLocaleTimeString('ko-KR', {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      setTime(`KST ${kst}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <nav className={`${s.nav} ${scrolled ? s.navScrolled : ''}`}>
      <a href="#" className={s.logo}>
        Day<span className={s.logoAccent}>Ditto</span>
      </a>
      <div className={s.navRight}>
        <a href="#features" className={s.navLink}>특징</a>
        <a href="#how" className={s.navLink}>사용법</a>
        <a
          href="https://dayditto.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className={s.navLink}
        >
          시작하기
        </a>
        {time && <span className={s.clock}>{time}</span>}
      </div>
    </nav>
  )
}
