'use client'

import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import * as s from '@/styles/dayditto/cta.css'

export default function CtaSection() {
  const { ref, isVisible } = useScrollReveal(0.2)

  return (
    <section className={s.section} ref={ref}>
      <h2 className={`${s.title} ${isVisible ? s.titleVisible : ''}`}>
        지금 시작하세요
      </h2>
      <p className={`${s.sub} ${isVisible ? s.subVisible : ''}`}>
        무료로 시작 · 가입 즉시 사용 가능
      </p>
      <a
        href="https://dayditto.co.kr"
        target="_blank"
        rel="noopener noreferrer"
        className={`${s.btn} ${isVisible ? s.btnVisible : ''}`}
      >
        dayditto.co.kr 방문하기
      </a>
      <p className={s.footer}>© 2025 DayDitto · 나의 하루를 다른 언어로 다시 쓰다</p>
    </section>
  )
}
