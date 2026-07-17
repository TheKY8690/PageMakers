'use client'

import { useEffect, useState } from 'react'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import * as s from '@/styles/dayditto/showcase.css'

const DIARY_KO = '오늘 카페에서 친구를 만났다.\n라떼가 정말 맛있었다.\n오랜만에 만나서 기분이 좋았다.'
const DIARY_EN = 'I met a friend at a café today.\nThe latte was absolutely delicious.\nIt felt great to see them after so long.'

const WAVE_DELAYS = ['0ms', '120ms', '240ms', '360ms', '480ms', '360ms', '240ms', '120ms']

function useTyping(text: string, active: boolean, speed = 40) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!active) return
    let i = 0
    const id = setInterval(() => {
      if (i === 0) {
        setDisplayed('')
      } else {
        setDisplayed(text.slice(0, i))
      }
      i++
      if (i > text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [active, text, speed])

  return displayed
}

export default function ShowcaseSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: mockupRef, isVisible: mockupVisible } = useScrollReveal(0.2)

  const koText = useTyping(DIARY_KO, mockupVisible, 35)
  const enText = useTyping(DIARY_EN, mockupVisible, 50)

  return (
    <section className={s.section}>
      <div
        ref={headerRef}
        className={`${s.header} ${headerVisible ? s.headerVisible : ''}`}
      >
        <p className={s.sectionTag}>데모</p>
        <h2 className={s.sectionTitle}>이렇게 동작합니다</h2>
      </div>

      <div
        ref={mockupRef}
        className={`${s.mockup} ${mockupVisible ? s.mockupVisible : ''}`}
      >
        <div className={s.mockupBar}>
          <div className={s.mockupDot} />
          <div className={s.mockupDot} />
          <div className={s.mockupDot} />
        </div>

        <div className={s.mockupBody}>
          <div className={s.panel}>
            <p className={s.panelLabel}>한국어 일기</p>
            <p className={s.panelText} style={{ whiteSpace: 'pre-line' }}>
              {koText}
              {koText.length < DIARY_KO.length && (
                <span className={s.cursor} />
              )}
            </p>
          </div>

          <div className={s.panel}>
            <p className={s.panelLabel}>Claude AI 번역</p>
            <p className={s.panelText} style={{ whiteSpace: 'pre-line' }}>
              {enText}
              {mockupVisible && enText.length < DIARY_EN.length && (
                <span className={s.cursor} />
              )}
            </p>
          </div>

          <div className={s.audioWave}>
            <p style={{ fontSize: '12px', color: '#888', marginRight: '16px', letterSpacing: '0.05em' }}>
              TTS 재생
            </p>
            {WAVE_DELAYS.map((delay, i) => (
              <div
                key={i}
                className={s.bar}
                style={{
                  animation: mockupVisible
                    ? `${s.waveBar} 0.8s ease-in-out ${delay} infinite alternate`
                    : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
