'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// module-level — SPA 재방문 시 재생 방지
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
    // SPA 재방문 시 즉시 완료
    if (shownSet.has(variantId)) {
      onDone()
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      shownSet.add(variantId)
      onDone()
      return
    }

    shownSet.add(variantId)
    const overlay = overlayRef.current!
    const tl = gsap.timeline()

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

    // Phase 3 — Radial reveal
    tl.add(() => {
      let r = 0
      const target = Math.hypot(window.innerWidth, window.innerHeight)
      const feather = 90
      const dur = 900
      const start = performance.now()

      const animate = (now: number) => {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        r = eased * target
        const grad = `radial-gradient(circle at 50% 50%, transparent ${r}px, ${bgColor} calc(${r}px + ${feather}px))`
        overlay.style.maskImage = grad
        ;(overlay.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = grad
        if (p < 1) {
          requestAnimationFrame(animate)
        } else {
          overlay.style.opacity = '0'
          setTimeout(onDone, 300)
        }
      }
      requestAnimationFrame(animate)
    }, '+=0.1')

    return () => { tl.kill() }
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
