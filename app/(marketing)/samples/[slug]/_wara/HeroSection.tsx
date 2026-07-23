'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import * as s from '@/styles/wara/hero.css'

const LINES = ['요즘', '모이는', '방식']

export default function HeroSection() {
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.8 })
    lineRefs.current.forEach((el, i) => {
      if (!el) return
      tl.to(
        el,
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        i * 0.12
      )
    })
    return () => { tl.kill() }
  }, [])

  return (
    <section className={s.section}>
      <Image
        src="https://picsum.photos/seed/wara-hero/1920/1080"
        alt=""
        fill
        priority
        sizes="100vw"
        className={s.bgImage}
      />
      <div className={s.overlay} />

      <div className={s.content}>
        {LINES.map((text, i) => (
          <div key={text} className={s.headlineWrap}>
            <span
              ref={(el) => { lineRefs.current[i] = el }}
              className={s.headline}
              style={{ transform: 'translateY(60px)' }}
            >
              {text}
            </span>
          </div>
        ))}
        <p className={s.sub}>준비의 부담을 만남의 설렘으로</p>
      </div>

      <div className={s.scrollHint}>
        <span className={s.scrollLine} />
        <span className={s.scrollLabel}>scroll</span>
      </div>
    </section>
  )
}
