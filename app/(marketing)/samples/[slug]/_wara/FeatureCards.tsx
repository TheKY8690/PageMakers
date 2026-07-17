'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as s from '@/styles/wara/features.css'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: '◌', title: '일정', desc: '날짜·장소·인원을 한 번에. 반복 모임 템플릿도 지원해요.' },
  { icon: '◎', title: '친구 초대', desc: '링크 하나로 초대. 회원가입 없이도 참석 의사 표현 가능.' },
  { icon: '◆', title: 'DM & 그룹챗', desc: '모임 멤버들과 바로 대화. 사진·파일 공유도 OK.' },
  { icon: '✦', title: '모임 피드', desc: '모임 사진과 후기를 함께 기록하고 추억으로 남기세요.' },
]

export default function FeatureCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="features" className={s.section} ref={containerRef}>
      <div className={s.header}>
        <span className={s.tag}>기능</span>
        <h2 className={s.title}>모임을 더 쉽게<br />만드는 기능들</h2>
      </div>
      <div className={s.grid}>
        {features.map(({ icon, title, desc }, i) => (
          <div
            key={title}
            ref={(el) => { cardRefs.current[i] = el }}
            className={s.card}
          >
            <span className={s.icon}>{icon}</span>
            <h3 className={s.cardTitle}>{title}</h3>
            <p className={s.cardDesc}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
