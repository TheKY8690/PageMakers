'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import * as s from '@/styles/wara/aboutStrip.css'

export default function AboutStrip() {
  const { ref, isVisible } = useScrollReveal(0.15)

  return (
    <section className={s.section}>
      <div ref={ref} className={s.inner}>
        <div className={`${s.imageWrap}${isVisible ? ` ${s.imageWrapVisible}` : ''}`}>
          <Image
            src="https://picsum.photos/seed/wara-about/900/700"
            alt="와라 앱 소개"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={s.image}
          />
        </div>

        <div className={`${s.textWrap}${isVisible ? ` ${s.textWrapVisible}` : ''}`}>
          <span className={s.eyebrow}>와라에 대해</span>
          <h2 className={s.headline}>
            준비의 부담을<br />
            <span className={s.accentText}>만남의 설렘으로</span>
          </h2>
          <p className={s.desc}>
            와라는 모임 준비의 번거로움을 없애는 앱이에요.<br />
            일정 조율부터 초대, 알림, 후기까지 — 모든 과정을
            하나의 앱에서. 준비는 와라가, 즐거움은 여러분이.
          </p>
          <a href="https://wara.kr" target="_blank" rel="noopener noreferrer" className={s.link}>
            와라 시작하기 →
          </a>
        </div>
      </div>
    </section>
  )
}
