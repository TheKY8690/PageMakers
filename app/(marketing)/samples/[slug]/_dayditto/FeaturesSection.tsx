'use client'

import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import * as s from '@/styles/dayditto/features.css'

const features = [
  {
    icon: '✦',
    title: 'AI 번역',
    desc: 'Claude AI가 문맥을 이해하고 자연스러운 영어로 번역합니다. 직역이 아닌, 원어민이 실제로 쓰는 표현으로.',
  },
  {
    icon: '◎',
    title: '원어민 TTS',
    desc: 'Google Cloud TTS로 번역된 문장을 원어민 발음으로 들을 수 있습니다. 줄별 재생도 지원합니다.',
  },
  {
    icon: '✎',
    title: '일기 작성',
    desc: '이미지, GIF, 감정 스티커, 날씨 정보를 포함한 풍부한 일기를 작성하세요.',
  },
  {
    icon: '☽',
    title: '캘린더',
    desc: '월별 캘린더로 학습 기록을 한눈에 확인하세요. 꾸준함이 실력이 됩니다.',
  },
]

export default function FeaturesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.1)

  return (
    <section id="features" className={s.section}>
      <div
        ref={headerRef}
        className={`${s.header} ${headerVisible ? s.headerVisible : ''}`}
      >
        <p className={s.sectionTag}>핵심 기능</p>
        <h2 className={s.sectionTitle}>
          학습을 더 자연스럽게
          <br />
          만드는 4가지 기능
        </h2>
      </div>

      <div ref={gridRef} className={s.grid}>
        {features.map(({ icon, title, desc }, i) => (
          <div
            key={title}
            className={`${s.card} ${gridVisible ? s.cardVisible : ''}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <span className={s.cardIcon}>{icon}</span>
            <h3 className={s.cardTitle}>{title}</h3>
            <p className={s.cardDesc}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
