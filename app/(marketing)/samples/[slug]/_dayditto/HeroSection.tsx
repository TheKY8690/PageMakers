'use client'

import * as s from '@/styles/dayditto/hero.css'

const lines = [
  { text: '나의 하루를', orange: false, delay: '0ms' },
  { text: '다른 언어로', orange: false, delay: '150ms' },
  { text: '다시 쓰다', orange: true, delay: '300ms' },
]

export default function HeroSection() {
  return (
    <section className={s.section}>
      <div>
        {lines.map(({ text, orange, delay }) => (
          <div key={text} className={s.headlineWrap}>
            <span
              className={orange ? s.headlineOrange : s.headline}
              style={{ animationDelay: delay }}
            >
              {text}
            </span>
          </div>
        ))}
      </div>

      <p className={s.sub}>일기 기반 영어 학습 서비스 · AI 번역 + 원어민 TTS</p>

      <div className={s.scrollIndicator}>
        <span className={s.scrollDot} />
        <span className={s.scrollLabel}>scroll</span>
      </div>
    </section>
  )
}
