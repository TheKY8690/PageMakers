'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react'
import type { TemplateProps } from '@/lib/templates/types'

const CONTACT_LABELS: Record<string, string> = {
  phone: '전화', kakao: '카카오', instagram: 'Instagram',
  naver: '네이버', youtube: 'YouTube', facebook: 'Facebook',
  twitter: 'X', tiktok: 'TikTok',
}

const CSS = `
  @keyframes tcFadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes tcFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .tc-hero-vert {
    animation: tcFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both;
  }
  .tc-hero-img {
    animation: tcFadeIn 1.2s ease 0.1s both;
  }
  .tc-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .tc-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .tc-img {
    display: block; width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease;
  }
  .tc-img-wrap { overflow: hidden; }
  .tc-img-bw { filter: grayscale(100%) contrast(1.05); }
  .tc-img-wrap:hover .tc-img { transform: scale(1.04); }
  .tc-img-wrap:hover .tc-img-bw { filter: grayscale(0%) contrast(1); }
  @media (prefers-reduced-motion: reduce) {
    .tc-hero-vert, .tc-hero-img, .tc-reveal {
      animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important;
    }
    .tc-img, .tc-img-bw { transition: none !important; filter: none !important; }
  }
  @media (max-width: 768px) {
    .tc-nav { padding: 16px 20px !important; }
    .tc-hero-inner { flex-direction: column !important; height: auto !important; min-height: 100vh !important; }
    .tc-hero-vert-wrap { display: none !important; }
    .tc-story { padding: 60px 20px !important; }
    .tc-gallery-grid { grid-template-areas: none !important; grid-template-columns: 1fr !important; }
    .tc-gallery-grid > div { grid-area: auto !important; height: 260px !important; }
    .tc-strip { padding: 28px 20px !important; }
    .tc-contact-wrap { padding: 60px 20px !important; }
    .tc-footer { padding: 24px 20px !important; }
  }
`

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('.tc-reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '-60px' }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])
  return ref
}

export default function TemplateC({
  brandName, brandDescription, brandColors, imageUrls,
  mainImageUrl, contacts = [], websiteType,
}: TemplateProps) {
  const accent = brandColors[0] ?? '#B45309'
  const descLines = brandDescription.split(/\r?\n/).filter(Boolean)
  const pageRef = useReveal()

  // 갤러리 그리드 레이아웃 (최대 9장 지정, 나머지는 auto)
  // areas 패턴: a=큰, b/c=작은, d=중간, e=전폭 …
  const gridAreas = imageUrls.length >= 6
    ? '"a a b" "a a c" "d e e" "f g g" "h h i"'
    : '"a a b" "a a c" "d e e"'

  return (
    <div ref={pageRef} style={{ fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: '100vh', background: '#FAF7F2', color: '#1A1A1A' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Nav */}
      <header className="tc-nav" style={{
        position: 'sticky', top: 0, zIndex: 100,
        padding: '18px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(250,247,242,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(26,26,26,0.07)',
      }}>
        <span style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '-0.02em', color: '#1A1A1A' }}>{brandName}</span>
        <span style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.35)', fontFamily: "'Helvetica Neue', sans-serif" }}>
          {websiteType ?? 'Portfolio'}
        </span>
      </header>

      {/* Hero — 이미지 + 세로 텍스트 */}
      <section style={{ position: 'relative', minHeight: '100vh', background: '#1A1A1A' }}>
        <div className="tc-hero-inner" style={{ display: 'flex', height: '100vh' }}>
          {/* 메인 이미지 */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            {mainImageUrl
              ? <img className="tc-hero-img" src={mainImageUrl} alt={`${brandName} 대표 이미지`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              : <div style={{ width: '100%', height: '100%', background: `${accent}` }} />
            }
            {/* 하단 레이블 */}
            <div style={{ position: 'absolute', bottom: '32px', left: '32px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: 0, fontFamily: "'Helvetica Neue', sans-serif" }}>
                {websiteType ?? 'Portfolio'}
              </p>
            </div>
          </div>
          {/* 세로 브랜드명 */}
          <div className="tc-hero-vert-wrap" style={{ width: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAF7F2' }}>
            <span className="tc-hero-vert" style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              fontFamily: "'Helvetica Neue', sans-serif",
            }}>
              {brandName}
            </span>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="tc-story" style={{ background: '#fff', padding: '100px 80px' }}>
        <div className="tc-reveal" style={{ maxWidth: '720px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <div style={{ width: '48px', height: '2px', background: accent }} />
            <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.3)', margin: 0, fontFamily: "'Helvetica Neue', sans-serif" }}>
              About
            </p>
          </div>
          {descLines.map((line, li) => (
            <p key={li} style={{
              fontSize: li === 0 ? 'clamp(22px, 3vw, 34px)' : '18px',
              fontWeight: li === 0 ? 700 : 400,
              lineHeight: li === 0 ? 1.35 : 1.8,
              letterSpacing: li === 0 ? '-0.02em' : '-0.005em',
              color: li === 0 ? '#1A1A1A' : 'rgba(26,26,26,0.65)',
              margin: '0 0 16px',
            }}>
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* Color Palette */}
      {brandColors.length > 0 && (
        <section style={{ display: 'flex' }}>
          {brandColors.map((c, ci) => (
            <div key={ci} style={{ flex: 1, height: '120px', background: c, display: 'flex', alignItems: 'flex-end', padding: '14px 18px' }}>
              <span style={{ fontSize: '10px', fontFamily: "'Helvetica Neue', sans-serif", color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {c.toUpperCase()}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* Gallery — grid-template-areas */}
      {imageUrls.length > 0 && (
        <section style={{ background: '#FAF7F2', padding: '80px 0' }}>
          <div style={{ padding: '0 48px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '36px', height: '1px', background: accent }} />
            <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.3)', margin: 0, fontFamily: "'Helvetica Neue', sans-serif" }}>Gallery</p>
          </div>
          <div
            className="tc-gallery-grid"
            style={{
              display: 'grid',
              gridTemplateAreas: gridAreas,
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4px',
            }}
          >
            {imageUrls.slice(0, 9).map((url, gi) => {
              const areaKeys = ['a','b','c','d','e','f','g','h','i']
              const isBw = gi % 2 !== 0 // 짝수 인덱스는 컬러, 홀수는 흑백
              const isLarge = gi === 0 // 첫 이미지: grid-area a (2×2 크기)
              return (
                <div
                  key={gi}
                  className="tc-reveal tc-img-wrap"
                  style={{
                    gridArea: areaKeys[gi],
                    height: isLarge ? '520px' : '260px',
                    transitionDelay: `${gi * 0.05}s`,
                  }}
                >
                  <img
                    src={url}
                    alt={`${brandName} 포트폴리오 ${gi + 1}`}
                    className={`tc-img${isBw ? ' tc-img-bw' : ''}`}
                  />
                </div>
              )
            })}
          </div>
          {/* 나머지 이미지 (9장 초과) */}
          {imageUrls.length > 9 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', marginTop: '4px' }}>
              {imageUrls.slice(9).map((url, gi) => {
                const isBw = (gi + 9) % 2 !== 0
                return (
                  <div key={gi} className="tc-reveal tc-img-wrap" style={{ height: '280px', transitionDelay: `${gi * 0.05}s` }}>
                    <img src={url} alt={`${brandName} 포트폴리오 ${gi + 10}`} className={`tc-img${isBw ? ' tc-img-bw' : ''}`} />
                  </div>
                )
              })}
            </div>
          )}
        </section>
      )}

      {/* Brand Strip */}
      <section className="tc-strip" style={{ background: accent, padding: '32px 48px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '48px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          {Array.from({ length: 6 }).map((_, ai) => (
            <span key={ai} style={{ fontSize: 'clamp(20px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>
              {brandName}
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      {contacts.length > 0 && (
        <section className="tc-contact-wrap" style={{ background: '#1A1A1A', padding: '80px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
            <div style={{ width: '36px', height: '1px', background: accent }} />
            <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)', margin: 0, fontFamily: "'Helvetica Neue', sans-serif" }}>Contact</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {contacts.map((c, ci) => (
              <div key={c.type} className="tc-reveal" style={{ display: 'flex', alignItems: 'baseline', gap: '32px', borderBottom: '1px solid rgba(250,247,242,0.06)', padding: '24px 0', transitionDelay: `${ci * 0.08}s` }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: accent, width: '80px', flexShrink: 0, fontFamily: "'Helvetica Neue', sans-serif" }}>
                  {CONTACT_LABELS[c.type] ?? c.type}
                </span>
                <span style={{ fontSize: 'clamp(18px, 2.5vw, 30px)', fontWeight: 300, color: '#FAF7F2', letterSpacing: '-0.01em' }}>
                  {c.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="tc-footer" style={{ background: '#1A1A1A', borderTop: '1px solid rgba(250,247,242,0.06)', padding: '28px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontSize: '12px', color: 'rgba(250,247,242,0.25)', letterSpacing: '0.04em', fontFamily: "'Helvetica Neue', sans-serif" }}>
          © {brandName}
        </span>
        <div style={{ display: 'flex', gap: '10px' }}>
          {brandColors.map((c, ci) => (
            <span key={ci} style={{ width: '14px', height: '14px', borderRadius: '50%', background: c, border: '1px solid rgba(255,255,255,0.1)' }} />
          ))}
        </div>
      </footer>
    </div>
  )
}
