'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react'
import type { TemplateProps } from '@/lib/templates/types'
import PagePreloader from './PagePreloader'

const VARIANT_ID = '4f307aca-v3'

const CSS = `
  @keyframes v3SlideLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes v3FadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .v3-hero-eyebrow { animation: v3FadeUp 0.6s ease 0.1s both; }
  .v3-hero-name {
    animation: v3SlideLeft 1s cubic-bezier(0.16,1,0.3,1) both;
  }
  .v3-hero-name-line { overflow: hidden; }
  .v3-hero-tagline { animation: v3FadeUp 0.7s ease 0.5s both; }

  .v3-reveal {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
  }
  .v3-reveal.visible { opacity: 1; transform: translateY(0); }

  .v3-img-wrap { overflow: hidden; position: relative; }
  .v3-img-wrap img {
    display: block; width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .v3-img-wrap:hover img { transform: scale(1.04); }
  .v3-img-tint {
    position: absolute; inset: 0;
    background: rgba(148,0,0,0.25);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .v3-img-wrap:hover .v3-img-tint { opacity: 1; }

  .v3-contact-card {
    padding: 28px 32px;
    border: 1px solid rgba(255,255,255,0.15);
    transition: background 0.25s ease, border-color 0.25s ease;
    cursor: default;
  }
  .v3-contact-card:hover {
    background: rgba(255,255,255,0.06);
    border-color: rgba(255,255,255,0.35);
  }

  @media (prefers-reduced-motion: reduce) {
    .v3-hero-eyebrow, .v3-hero-name, .v3-hero-tagline, .v3-reveal {
      animation: none !important; transition: none !important;
      opacity: 1 !important; transform: none !important;
    }
    .v3-img-wrap img { transition: none !important; }
    .v3-img-tint { transition: none !important; }
  }
  @media (max-width: 768px) {
    .v3-hero { flex-direction: column !important; min-height: auto !important; }
    .v3-hero-left { width: 100% !important; min-height: 60vw; padding: 40px 20px !important; }
    .v3-hero-right { width: 100% !important; height: 70vw; }
    .v3-stmt-wrap { padding: 60px 20px !important; }
    .v3-gallery-wrap { padding: 60px 20px !important; }
    .v3-gallery-grid { grid-template-columns: 1fr !important; }
    .v3-gallery-grid .v3-img-wrap { grid-column: span 1 !important; height: 260px !important; }
    .v3-big-text { font-size: clamp(40px, 10vw, 80px) !important; padding: 60px 20px !important; }
    .v3-contact-wrap { padding: 60px 20px !important; }
    .v3-contact-grid { grid-template-columns: 1fr !important; }
    .v3-footer { padding: 24px 20px !important; }
  }
`

const CONTACT_LABELS: Record<string, string> = {
  phone: '전화', kakao: '카카오', instagram: 'Instagram',
  naver: '네이버', youtube: 'YouTube', facebook: 'Facebook',
  twitter: 'X', tiktok: 'TikTok',
}

export default function Variant3({
  brandName,
  brandDescription,
  brandColors,
  imageUrls,
  mainImageUrl,
  contacts = [],
  websiteType,
}: TemplateProps) {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)
  const accent = brandColors[0] ?? '#940000'   // #940000

  const descLines = brandDescription.split(/\r?\n/).filter(Boolean)
  const tagline = descLines[0] ?? ''
  const quote = descLines[1] ?? tagline         // 두 번째 줄 = 강조 인용구
  const finalLine = descLines[2] ?? ''

  useEffect(() => {
    const el = pageRef.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('.v3-reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { rootMargin: '-50px' }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={pageRef}
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", minHeight: '100vh', background: '#0C0C0C', color: '#F5F5F5' }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {!preloaderDone && (
        <PagePreloader
          brandName={brandName}
          descriptor={tagline}
          accentColor={accent}
          theme="color"
          variantId={VARIANT_ID}
          onDone={() => setPreloaderDone(true)}
        />
      )}

      {/* ── Hero — Split Layout ── */}
      <section
        className="v3-hero"
        style={{
          display: 'flex',
          minHeight: '100vh',
        }}
      >
        {/* Left: crimson side */}
        <div
          className="v3-hero-left"
          style={{
            width: '45%',
            background: accent,
            padding: '48px 52px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top: eyebrow */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span
              className="v3-hero-eyebrow"
              style={{
                fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.65)', fontWeight: 500,
              }}
            >
              {websiteType ?? 'Portfolio'}
            </span>
            <span
              style={{
                fontSize: '10px', letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              {new Date().getFullYear()}
            </span>
          </div>

          {/* Middle: brand name */}
          <div>
            <h1 style={{ margin: 0 }}>
              {brandName.split('').map((ch, i) => (
                <span key={i} className="v3-hero-name-line" style={{ display: 'block', lineHeight: 0.88 }}>
                  <span
                    className="v3-hero-name"
                    style={{
                      display: 'block',
                      fontSize: 'clamp(56px, 8.5vw, 128px)',
                      fontWeight: 900,
                      letterSpacing: '-0.045em',
                      color: '#FFFFFF',
                      textTransform: 'uppercase',
                      animationDelay: `${0.1 + i * 0.05}s`,
                    }}
                  >
                    {ch}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          {/* Bottom: tagline + color dots */}
          <div>
            <p
              className="v3-hero-tagline"
              style={{
                fontSize: '13px', color: 'rgba(255,255,255,0.75)',
                letterSpacing: '-0.01em', lineHeight: 1.6,
                marginBottom: '20px', fontWeight: 400,
              }}
            >
              {tagline}
            </p>
            <div style={{ display: 'flex', gap: '5px' }}>
              {brandColors.map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: '20px', height: '20px',
                    background: c,
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: main image */}
        <div
          className="v3-hero-right"
          style={{
            width: '55%',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          {mainImageUrl ? (
            <img
              src={mainImageUrl}
              alt={`${brandName} 대표 이미지`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#111' }} />
          )}
        </div>
      </section>

      {/* ── Statement — large quote ── */}
      <section
        className="v3-stmt-wrap v3-reveal"
        style={{
          background: '#0C0C0C',
          borderTop: `4px solid ${accent}`,
          padding: '80px 52px',
        }}
      >
        <p
          style={{
            fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(245,245,245,0.25)', marginBottom: '32px',
          }}
        >
          About
        </p>
        <blockquote
          style={{
            margin: 0,
            fontSize: 'clamp(22px, 3.2vw, 42px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.35,
            color: '#F5F5F5',
            maxWidth: '860px',
            borderLeft: `3px solid ${accent}`,
            paddingLeft: '28px',
          }}
        >
          {quote}
        </blockquote>
        {finalLine && (
          <p
            style={{
              marginTop: '24px', paddingLeft: '31px',
              fontSize: '15px', color: 'rgba(245,245,245,0.5)',
              lineHeight: 1.8, letterSpacing: '-0.003em',
            }}
          >
            {finalLine}
          </p>
        )}
      </section>

      {/* ── Gallery ── */}
      {imageUrls.length > 0 && (
        <section
          className="v3-gallery-wrap"
          style={{ padding: '64px 52px', background: '#111' }}
        >
          <p
            style={{
              fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(245,245,245,0.22)', marginBottom: '20px',
            }}
          >
            Works
          </p>
          <div
            className="v3-gallery-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridAutoRows: '280px',
              gap: '4px',
            }}
          >
            {imageUrls.map((url, i) => {
              const isWide = i === 0 || i === 6
              return (
                <div
                  key={i}
                  className="v3-reveal v3-img-wrap"
                  style={{
                    gridColumn: isWide ? 'span 2' : 'span 1',
                    height: '280px',
                    transitionDelay: `${(i % 3) * 0.07}s`,
                  }}
                >
                  <img src={url} alt={`${brandName} 작품 ${i + 1}`} />
                  <div className="v3-img-tint" />
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Big text accent ── */}
      <section
        className="v3-big-text v3-reveal"
        style={{
          padding: '80px 52px',
          background: accent,
          overflow: 'hidden',
        }}
      >
        <p
          style={{
            fontSize: 'clamp(36px, 6vw, 88px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: 'rgba(255,255,255,0.18)',
            textTransform: 'uppercase',
            margin: 0,
            userSelect: 'none',
          }}
        >
          {brandName}
          <br />
          {brandName}
          <br />
          {brandName}
        </p>
      </section>

      {/* ── Contact ── */}
      {contacts.length > 0 && (
        <section
          className="v3-contact-wrap v3-reveal"
          style={{ padding: '80px 52px', background: '#0C0C0C' }}
        >
          <p
            style={{
              fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(245,245,245,0.25)', marginBottom: '32px',
            }}
          >
            Contact
          </p>
          <div
            className="v3-contact-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1px',
              background: 'rgba(255,255,255,0.08)',
            }}
          >
            {contacts.map((c) => (
              <div key={c.type} className="v3-contact-card" style={{ background: '#0C0C0C' }}>
                <p
                  style={{
                    fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: accent, marginBottom: '10px', fontWeight: 600,
                  }}
                >
                  {CONTACT_LABELS[c.type] ?? c.type}
                </p>
                <p
                  style={{
                    fontSize: '16px', fontWeight: 400, color: '#F5F5F5',
                    letterSpacing: '-0.01em', margin: 0,
                  }}
                >
                  {c.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer
        className="v3-footer"
        style={{
          background: '#0C0C0C',
          borderTop: `2px solid ${accent}`,
          padding: '24px 52px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span style={{ fontSize: '11px', color: 'rgba(245,245,245,0.25)', letterSpacing: '0.05em' }}>
          © {brandName}
        </span>
        <span
          style={{
            fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: accent,
          }}
        >
          {tagline}
        </span>
      </footer>
    </div>
  )
}
