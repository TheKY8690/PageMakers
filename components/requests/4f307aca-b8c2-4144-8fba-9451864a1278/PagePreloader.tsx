'use client'

import { useEffect, useRef, useState } from 'react'
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
  const [typedCount, setTypedCount] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)

  const bgColor =
    theme === 'dark' ? '#0C0C0C'
    : theme === 'light' ? '#FFFFFF'
    : accentColor

  const textColor = theme === 'light' ? '#0C0C0C' : '#FFFFFF'

  const captionColor =
    theme === 'dark' ? 'rgba(255,255,255,0.45)'
    : theme === 'light' ? 'rgba(0,0,0,0.4)'
    : 'rgba(255,255,255,0.75)'

  const chars = descriptor.split('')

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

    // 새로고침 시 스크롤 상단 고정
    window.scrollTo(0, 0)

    // Phase 1 — 타이핑 (React state, 70ms/글자)
    let count = 0
    const typeInterval = setInterval(() => {
      count++
      setTypedCount(count)
      if (count >= chars.length) clearInterval(typeInterval)
    }, 70)

    // 커서 깜빡임
    const blinkInterval = setInterval(() => {
      setCursorVisible(v => !v)
    }, 400)

    // Phase 2 — 타이핑 완료 후 GSAP 시작
    const gsapDelay = chars.length * 70 + 500
    let tl: gsap.core.Timeline | undefined
    let ctx: gsap.Context | undefined

    const gsapTimer = setTimeout(() => {
      clearInterval(blinkInterval)
      setCursorVisible(false)

      const overlay = overlayRef.current!
      tl = gsap.timeline()
      ctx = gsap.context(() => {
        // 캡션 fade-out
        tl!.to('[data-pp-caption]', {
          opacity: 0,
          y: -14,
          duration: 0.4,
          ease: 'power2.in',
        })
        // brandName 등장
        tl!.to('[data-pp-name]', {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power4.out',
          stagger: 0.04,
        }, '-=0.05')
        // brandName exit
        tl!.to('[data-pp-brand]', {
          opacity: 0,
          y: -18,
          duration: 0.45,
          ease: 'power2.in',
        }, '+=0.7')
      }, overlayRef)

      // Phase 3 — Radial reveal
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
              shownSet.add(variantId)
              onDone()
            }, 300)
          }
        }
        requestAnimationFrame(animate)
      }, '+=0.1')
    }, gsapDelay)

    return () => {
      clearInterval(typeInterval)
      clearInterval(blinkInterval)
      clearTimeout(gsapTimer)
      tl?.kill()
      ctx?.revert()
    }
  }, [variantId, onDone, bgColor, chars.length])

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
        willChange: 'mask-image, opacity',
        transform: 'translateZ(0)',
        pointerEvents: 'none',
      }}
    >
      {/* Descriptor caption — 타이핑 커서 실시간 이동 */}
      <div data-pp-caption style={{ textAlign: 'center', userSelect: 'none', marginBottom: '22px' }}>
        <p
          style={{
            fontSize: 'clamp(16px, 2.5vw, 28px)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: captionColor,
            margin: 0,
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 400,
          }}
        >
          {chars.slice(0, typedCount).map((ch, i) => (
            <span key={i}>{ch === ' ' ? '\u00A0' : ch}</span>
          ))}
          <span style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
        </p>
      </div>

      {/* Brand name — letter stagger */}
      <div data-pp-brand style={{ overflow: 'hidden', paddingBottom: '4px' }}>
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
  )
}
