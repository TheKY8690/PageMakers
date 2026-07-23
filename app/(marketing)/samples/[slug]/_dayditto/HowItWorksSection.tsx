'use client'

import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import * as s from '@/styles/dayditto/howItWorks.css'

const steps = [
  {
    number: '01',
    title: '일기를 쓰세요',
    desc: '오늘 하루 있었던 일을 한국어로 자유롭게 적어보세요. 이미지, GIF, 감정 스티커도 추가할 수 있습니다.',
  },
  {
    number: '02',
    title: 'AI가 번역해요',
    desc: 'Claude AI가 문맥을 이해하고 자연스러운 영어 문장으로 번역합니다. 직역이 아닌 원어민 표현으로.',
  },
  {
    number: '03',
    title: '원어민처럼 들어요',
    desc: 'Google TTS가 번역된 문장을 원어민 발음으로 읽어줍니다. 줄마다 개별 재생도 가능합니다.',
  },
]

export default function HowItWorksSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollReveal(0.1)

  return (
    <section id="how" className={s.section}>
      <div
        ref={headerRef}
        className={`${s.header} ${headerVisible ? s.headerVisible : ''}`}
      >
        <p className={s.sectionTag}>사용 방법</p>
        <h2 className={s.sectionTitle}>3단계로 시작하는<br />영어 학습</h2>
      </div>

      <div ref={stepsRef} className={s.steps}>
        {steps.map(({ number, title, desc }, i) => (
          <div
            key={number}
            className={`${s.step} ${stepsVisible ? s.stepVisible : ''}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div className={s.stepNumber}>{number}</div>
            <div className={s.stepContent}>
              <h3 className={s.stepTitle}>{title}</h3>
              <p className={s.stepDesc}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
