'use client'

import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import * as s from '@/styles/dayditto/about.css'

const stats = [
  { number: '10,000+', label: '일기 작성' },
  { number: '4가지', label: '지원 언어' },
  { number: 'Claude AI', label: '번역 엔진' },
]

export default function AboutSection() {
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal(0.2)
  const { ref: textRef, isVisible: textVisible } = useScrollReveal(0.2)

  return (
    <section className={s.section}>
      <div ref={statsRef} className={s.statsWrap}>
        {stats.map(({ number, label }, i) => (
          <div
            key={label}
            className={`${s.statItem} ${statsVisible ? s.statItemVisible : ''}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div className={s.statNumber}>{number}</div>
            <div className={s.statLabel}>{label}</div>
          </div>
        ))}
      </div>

      <div ref={textRef} className={s.textWrap}>
        <p className={s.sectionTag}>서비스 소개</p>
        <p className={`${s.bodyText} ${textVisible ? s.bodyTextVisible : ''}`}>
          DayDitto는 나의 하루를 일기로 적으면, Claude AI가 자연스러운 영어로 번역하고
          Google TTS가 원어민 발음으로 읽어주는 학습 서비스입니다.
        </p>
        <p
          className={`${s.bodyText} ${textVisible ? s.bodyTextVisible : ''}`}
          style={{ transitionDelay: '0.15s' }}
        >
          교과서 예문이 아닌, 내 실제 경험으로 만든 문장이기 때문에
          자연스럽게 기억에 오래 남습니다.
        </p>
      </div>
    </section>
  )
}
