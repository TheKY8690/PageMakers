'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as s from '@/styles/wara/cta.css'

gsap.registerPlugin(ScrollTrigger)

export default function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to([titleRef.current, subRef.current, btnRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={s.section} ref={sectionRef}>
      <div className={s.glow} />
      <h2 ref={titleRef} className={s.title} style={{ transform: 'translateY(40px)' }}>
        같이 만나요
      </h2>
      <p ref={subRef} className={s.sub} style={{ transform: 'translateY(20px)' }}>
        모든 모임을 더 쉽고 설레게 · 지금 바로 시작하세요
      </p>
      <a
        ref={btnRef}
        href="https://wara.kr"
        target="_blank"
        rel="noopener noreferrer"
        className={s.btn}
        style={{ transform: 'translateY(20px)' }}
      >
        wara.kr 에서 시작하기 →
      </a>
      <p className={s.footer}>© 2025 와라 · 요즘 모이는 방식</p>
    </section>
  )
}
