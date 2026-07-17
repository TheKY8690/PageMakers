'use client'

import * as s from '@/styles/dayditto/marquee.css'

const ITEMS = [
  'AI 번역',
  '원어민 발음',
  '일기 작성',
  '캘린더',
  'Claude AI',
  'Google TTS',
  '영어 학습',
  '나만의 일기',
]

const text = ITEMS.join('  ·  ') + '  ·  '

export default function MarqueeSection() {
  return (
    <div className={s.section}>
      <div className={s.track} aria-hidden>
        {/* 두 번 반복해서 무한 루프 효과 */}
        <span className={s.item}>{text}</span>
        <span className={s.item}>{text}</span>
      </div>
    </div>
  )
}
