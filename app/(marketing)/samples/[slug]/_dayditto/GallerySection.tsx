'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import * as s from '@/styles/dayditto/gallery.css'

const images = [
  { seed: 1, caption: '일기 작성 화면' },
  { seed: 2, caption: '번역 결과 보기' },
  { seed: 3, caption: '원어민 TTS 재생' },
  { seed: 4, caption: '캘린더 뷰' },
  { seed: 5, caption: '즐겨찾기 표현 모음' },
  { seed: 6, caption: '감정/날씨 스티커' },
  { seed: 7, caption: '월별 학습 통계' },
  { seed: 8, caption: '프로필 설정' },
]

export default function GallerySection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()

  const onWheel = (e: React.WheelEvent) => {
    if (!trackRef.current) return
    e.preventDefault()
    trackRef.current.scrollLeft += e.deltaY
  }

  return (
    <section className={s.section}>
      <div
        ref={headerRef}
        className={`${s.header} ${headerVisible ? s.headerVisible : ''}`}
      >
        <p className={s.sectionTag}>스크린샷</p>
        <h2 className={s.sectionTitle}>서비스 화면</h2>
        <p className={s.scrollHint}>← 가로로 스크롤하세요 →</p>
      </div>

      <div ref={trackRef} className={s.track} onWheel={onWheel}>
        {images.map(({ seed, caption }) => (
          <div key={seed} className={s.item}>
            <Image
              src={`https://picsum.photos/seed/${seed}/600/400`}
              alt={caption}
              width={600}
              height={400}
              className={s.img}
            />
            <div className={s.caption}>
              <p className={s.captionText}>{caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
