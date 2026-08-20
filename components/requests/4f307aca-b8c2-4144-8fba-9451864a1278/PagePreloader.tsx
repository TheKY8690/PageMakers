'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// module-level — SPA 재방문 시 재생 방지 (hard reload에서 리셋됨)
const shownSet = new Set<string>()

interface PagePreloaderProps {
  brandName: string
  descriptor: string   // "시선을 담는 포토그래퍼"
  accentColor: string  // brandColors[0]
  theme: 'dark' | 'light' | 'color'
  variantId: string    // SPA 재방문 방지 key
  onDone: () => void
}

export default function PagePreloader({
  brandName,
  descriptor,
  accentColor,
  theme,
  variantId,
  onDone,
}: PagePreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  const bgColor =
    theme === 'dark' ? '#0C0C0C'
    : theme === 'light' ? '#FFFFFF'
    : accentColor

  const textColor = theme === 'light' ? '#0C0C0C' : '#FFFFFF'

  const captionColor =
    theme === 'dark' ? 'rgba(255,255,255,0.45)'
    : theme === 'light' ? 'rgba(0,0,0,0.4)'
    : 'rgba(255,255,255,0.75)'

  useEffect(() => {
    // SPA 재방문 시 즉시 완료 (shownSet은 애니메이션 완료 후 추가되므로 StrictMode에 안전)
    if (shownSet.has(variantId)) {
      onDone()
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      shownSet.add(variantId)
      onDone()
      return
    }

    const overlay = overlayRef.current!
    const tl = gsap.timeline()

    // gsap.context로 셀렉터를 이 overlay 내부로 스코프 제한
    // (AdminVariantPreviewer에서 3개 variant 동시 렌더링 시 충돌 방지)
    const ctx = gsap.context(() => {
      // Phase 1 — descriptor 등장
      tl.to('[data-pp-caption]', {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
      })

      // Phase 1b — brandName 글자 stagger
      tl.to('[data-pp-name]', {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power4.out',
        stagger: 0.04,
      }, '+=0.05')

      // Phase 2 — 텍스트 exit
      tl.to('[data-pp-text]', {
        opacity: 0,
        y: -18,
        duration: 0.45,
        ease: 'power2.in',
      }, '+=0.7')
    }, overlayRef)

    // Phase 3 — Radial reveal (mask는 overlay 전체에 적용, ctx 밖)
    tl.add(() => {
      const target = Math.hypot(window.innerWidth, window.innerHeight)
      const feather = 90
      const dur = 900
      const start = performance.now()

      const animate = (now: number) => {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        const r = eased * target
        const grad = `radial-gradient(circle at 50% 50%, transparent ${r}px, ${bgColor} calc(${r}px + ${feather}px))`
        overlay.style.maskImage = grad
        ;(overlay.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = grad
        if (p < 1) {
          requestAnimationFrame(animate)
        } else {
          overlay.style.opacity = '0'
          setTimeout(() => {
            shownSet.add(variantId)  // 완료 후 추가 — StrictMode 2nd mount가 재실행해도 안전
            onDone()
          }, 300)
        }
      }
      requestAnimationFrame(animate)
    }, '+=0.1')

    return () => { tl.kill(); ctx.revert() }
  }, [variantId, onDone, bgColor])

  const letters = brandName.split('')

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: bgColor,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }}
    >
      <div data-pp-text style={{ textAlign: 'center', userSelect: 'none' }}>
        {/* Descriptor caption */}
        <p
          data-pp-caption
          style={{
            opacity: 0,
            transform: 'translateY(14px)',
            fontSize: '10px',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: captionColor,
            marginBottom: '22px',
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 400,
          }}
        >
          {descriptor}
        </p>

        {/* Brand name — letter stagger */}
        <div style={{ overflow: 'hidden', paddingBottom: '4px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
            }}
          >
            {letters.map((ch, i) => (
              <span
                key={i}
                data-pp-name
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(42px)',
                  fontSize: 'clamp(48px, 9vw, 110px)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  color: textColor,
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  lineHeight: 1,
                }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
