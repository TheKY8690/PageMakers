'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Props {
  onDone: () => void
}

const LETTERS = ['P', 'a', 'g', 'e', '\u00A0', 'M', 'a', 'k', 'e', 'r', 's']
const RADIUS = 150
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function LandingPreloader({ onDone }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTimeout(onDone, 100)
      return
    }

    const circle = circleRef.current!
    const overlay = overlayRef.current!

    // Setup circle stroke (initial opacity already 0 in JSX)
    circle.style.strokeDasharray = String(CIRCUMFERENCE)
    circle.style.strokeDashoffset = String(CIRCUMFERENCE)

    const tl = gsap.timeline()

    // Step 1: Letters appear one by one
    tl.to('[data-pl-letter]', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power4.out',
      stagger: 0.06,
    })

    // Step 2: Circle draws
    tl.add(() => {
      circle.style.opacity = '1'
    }, 1.2)

    tl.to(circle, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: 'power2.inOut',
    }, 1.2)

    // Step 3: Radial reveal after circle completes
    tl.add(() => {
      let r = 0
      const target = Math.hypot(window.innerWidth, window.innerHeight)
      const feather = 80
      const dur = 900
      const start = performance.now()

      const animate = (now: number) => {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        r = eased * target
        const grad = `radial-gradient(circle at 50% 50%, transparent ${r}px, black calc(${r}px + ${feather}px))`
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
    }, '+=0.2')

    return () => {
      tl.kill()
    }
  }, [onDone])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0C0C0C',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Full-viewport SVG — circle always at screen center */}
      <svg
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        <circle
          ref={circleRef}
          cx="50%"
          cy="50%"
          r={RADIUS}
          fill="none"
          stroke="rgba(240,239,233,0.6)"
          strokeWidth="1"
          style={{
            opacity: 0,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>

      {/* Letters — centered, above SVG */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'baseline',
          fontSize: 'clamp(26px, 4vw, 42px)',
          fontWeight: 800,
          fontFamily: "'Archivo', system-ui, sans-serif",
          letterSpacing: '-0.04em',
          color: '#F0EFE9',
          userSelect: 'none',
          overflow: 'hidden',
          paddingBottom: '4px',
        }}
      >
        {LETTERS.map((ch, i) => (
          <span
            key={i}
            data-pl-letter
            style={{ display: 'inline-block', opacity: 0, transform: 'translateY(22px)' }}
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  )
}
