'use client'

import { useEffect, useRef } from 'react'
import * as s from '@/styles/wara/preloader.css'

interface Props {
  onDone: () => void
}

export default function Preloader({ onDone }: Props) {
  const maskRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mask = maskRef.current
    const logo = logoRef.current
    if (!mask || !logo) return

    // 로고 fade-in
    requestAnimationFrame(() => {
      logo.style.opacity = '1'
    })

    // 0.4s 후 원형 마스크 expand
    const t1 = setTimeout(() => {
      let r = 0
      const target = Math.hypot(window.innerWidth, window.innerHeight) * 0.8
      const feather = 80
      const duration = 1000
      const start = performance.now()

      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
        r = eased * target

        mask.style.maskImage = `radial-gradient(circle at center, transparent ${r}px, black calc(${r}px + ${feather}px))`
        mask.style.webkitMaskImage = mask.style.maskImage

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          mask.style.opacity = '0'
          logo.style.opacity = '0'
          setTimeout(onDone, 500)
        }
      }

      requestAnimationFrame(animate)
    }, 600)

    return () => clearTimeout(t1)
  }, [onDone])

  return (
    <>
      <div ref={maskRef} className={s.mask} />
      <div className={s.overlay}>
        <div ref={logoRef} className={s.logo}>와라</div>
      </div>
    </>
  )
}
