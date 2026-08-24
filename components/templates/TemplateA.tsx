'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react'
import type { TemplateProps } from '@/lib/templates/types'

const CSS = `
  @keyframes taSlideUp {
    from { opacity: 0; transform: translateY(100%); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes taFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .ta-hero-line { overflow: hidden; }
  .ta-hero-inner {
    display: block;
    animation: taSlideUp 1s cubic-bezier(0.16,1,0.3,1) both;
  }
  .ta-hero-inner:nth-child(1) { animation-delay: 0.05s; }
  .ta-hero-inner:nth-child(2) { animation-delay: 0.15s; }
  .ta-hero-meta { animation: taFadeIn 0.8s ease 0.6s both; }
  .ta-reveal {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .ta-reveal.visible { opacity: 1; transform: translateY(0); }
  .ta-img-cell {
    overflow: hidden; position: relative;
  }
  .ta-img-cell img {
    display: block; width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .ta-img-cell:hover img { transform: scale(1.05); }
  .ta-img-num {
    position: absolute; top: 16px; left: 16px;
    font-size: '10px'; font-weight: 700; letter-spacing: 0.1em;
    color: rgba(255,255,255,0.4);
    transition: color 0.3s ease;
  }
  .ta-img-cell:hover .ta-img-num { color: rgba(255,255,255,0.9); }
  @media (prefers-reduced-motion: reduce) {
    .ta-hero-inner, .ta-hero-meta, .ta-reveal {
      animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important;
    }
    .ta-img-cell img { transition: none !important; }
  }
  @media (max-width: 768px) {
    .ta-nav { padding: 16px 20px !important; }
    .ta-hero-text { padding: 0 20px 40px !important; }
    .ta-statement-wrap { padding: 60px 20px !important; }
    .ta-statement-grid { grid-template-columns: 1fr !important; gap: 32px !important; max-width: 100% !important; }
    .ta-statement-sidebar { display: none !important; }
    .ta-gallery-grid { grid-template-columns: 1fr !important; }
    .ta-gallery-grid .ta-img-cell { height: 280px !important; }
    .ta-accent-wrap { padding: 32px 20px !important; }
    .ta-contact-wrap { padding: 60px 20px !important; }
    .ta-footer { padding: 24px 20px !important; }
  }
`

const CONTACT_LABELS: Record<string, string> = {
  phone: '전화', kakao: '카카오', instagram: 'Instagram',
  naver: '네이버', youtube: 'YouTube', facebook: 'Facebook',
  twitter: 'X', tiktok: 'TikTok',
}

export default function TemplateA({
  brandName, brandDescription, brandColors, imageUrls,
  mainImageUrl, contacts = [], websiteType,
}: TemplateProps) {
  const accent = brandColors[0] ?? '#E5E5E5'
  const descLines = brandDescription.split(/\r?\n/).filter(Boolean)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = pageRef.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('.ta-reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { rootMargin: '-60px' }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  // brandName을 두 줄로 나누는 시도 (긴 이름이면 공백 기준)
  const nameParts = brandName.length > 8 && brandName.includes(' ')
    ? [brandName.slice(0, brandName.lastIndexOf(' ')), brandName.slice(brandName.lastIndexOf(' ') + 1)]
    : [brandName]

  return (
    <div ref={pageRef} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", minHeight: '100vh', background: '#0C0C0C', color: '#F5F5F5' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Hero (nav inside) */}
      <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {/* Nav — absolute so hero fills 100vh without nav eating height */}
        <header className="ta-nav" style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
          padding: '20px 48px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontWeight: 800, fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.7)' }}>
            {brandName}
          </span>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {contacts.find(c => c.type === 'instagram') && (
              <span style={{ fontSize: '12px', color: 'rgba(245,245,245,0.4)', letterSpacing: '0.05em' }}>
                {contacts.find(c => c.type === 'instagram')!.value}
              </span>
            )}
            <span style={{ fontSize: '11px', color: accent, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
              {websiteType ?? 'Portfolio'}
            </span>
          </div>
        </header>
        {mainImageUrl && (
          <>
            <img
              src={mainImageUrl}
              alt={`${brandName} 대표 이미지`}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 0.38 }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0C0C0C 35%, rgba(12,12,12,0.1) 70%)' }} />
          </>
        )}
        {!mainImageUrl && (
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, #0C0C0C 60%, ${accent}18)` }} />
        )}

        <div className="ta-hero-text" style={{ position: 'relative', padding: '0 48px 64px' }}>
          {/* 메타 */}
          <p className="ta-hero-meta" style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: accent, marginBottom: '20px', fontWeight: 600 }}>
            — {websiteType ?? 'Portfolio'} —
          </p>
          {/* 초대형 브랜드명 */}
          <h1 style={{ margin: 0, padding: 0 }}>
            {nameParts.map((part, pi) => (
              <span key={pi} className="ta-hero-line" style={{ display: 'block' }}>
                <span
                  className="ta-hero-inner"
                  style={{
                    fontSize: 'clamp(64px, 11vw, 148px)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.92,
                    color: '#F5F5F5',
                    textTransform: 'uppercase',
                    animationDelay: `${0.05 + pi * 0.1}s`,
                  }}
                >
                  {part}
                </span>
              </span>
            ))}
          </h1>
          {/* 컬러 스트립 */}
          <div style={{ display: 'flex', gap: '4px', marginTop: '28px' }}>
            {brandColors.map((c, ci) => (
              <div key={ci} style={{ height: '3px', width: '48px', background: c }} />
            ))}
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="ta-reveal ta-statement-wrap" style={{ background: '#F5F5F5', color: '#0C0C0C', padding: '100px 48px' }}>
        <div className="ta-statement-grid" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '60px', maxWidth: '1100px' }}>
          <div className="ta-statement-sidebar" style={{ paddingTop: '8px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(12,12,12,0.35)', margin: '0 0 20px' }}>About</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {brandColors.map((c, ci) => (
                <div key={ci} style={{ width: '32px', height: '32px', background: c, border: '1px solid rgba(12,12,12,0.08)' }} />
              ))}
            </div>
          </div>
          <div>
            {descLines.map((line, li) => (
              <p key={li} style={{
                fontSize: li === 0 ? 'clamp(22px, 3vw, 36px)' : '17px',
                fontWeight: li === 0 ? 700 : 400,
                lineHeight: li === 0 ? 1.35 : 1.8,
                letterSpacing: li === 0 ? '-0.02em' : '-0.005em',
                color: li === 0 ? '#0C0C0C' : 'rgba(12,12,12,0.65)',
                margin: '0 0 12px',
              }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — staggered 3-col grid */}
      {imageUrls.length > 0 && (
        <section style={{ background: '#0C0C0C', padding: '80px 48px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.25)', marginBottom: '24px' }}>Gallery</p>
          <div
            className="ta-gallery-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridAutoRows: '280px',
              gap: '3px',
            }}
          >
            {imageUrls.map((url, gi) => {
              // 첫 이미지는 2열 차지, 5번째도 2열
              const isWide = gi === 0 || gi === 4
              return (
                <div
                  key={gi}
                  className="ta-reveal ta-img-cell"
                  style={{
                    gridColumn: isWide ? 'span 2' : 'span 1',
                    height: '280px',
                    transitionDelay: `${gi * 0.04}s`,
                  }}
                >
                  <img src={url} alt={`${brandName} 포트폴리오 ${gi + 1}`} />
                  <span className="ta-img-num" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em' }}>
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Accent Strip */}
      <section className="ta-accent-wrap" style={{ background: accent, padding: '40px 48px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '40px', whiteSpace: 'nowrap', alignItems: 'center' }}>
          {Array.from({ length: 8 }).map((_, ai) => (
            <span key={ai} style={{ fontSize: 'clamp(18px, 2.8vw, 32px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'rgba(255,255,255,0.18)', flexShrink: 0, textTransform: 'uppercase' }}>
              {brandName}
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      {contacts.length > 0 && (
        <section className="ta-contact-wrap" style={{ background: '#111', padding: '80px 48px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.25)', marginBottom: '40px' }}>Contact</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {contacts.map((c) => (
              <div key={c.type} style={{ display: 'flex', alignItems: 'baseline', gap: '24px', borderBottom: '1px solid rgba(245,245,245,0.06)', padding: '24px 0' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: accent, width: '100px', flexShrink: 0 }}>
                  {CONTACT_LABELS[c.type] ?? c.type}
                </span>
                <span style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 300, color: '#F5F5F5', letterSpacing: '-0.01em' }}>
                  {c.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="ta-footer" style={{ background: '#0C0C0C', borderTop: '1px solid rgba(245,245,245,0.06)', padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '12px', color: 'rgba(245,245,245,0.25)', letterSpacing: '0.05em' }}>
          © {brandName}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {brandColors.map((c, ci) => (
            <span key={ci} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c, border: '1px solid rgba(245,245,245,0.1)' }} />
          ))}
        </div>
      </footer>
    </div>
  )
}
