'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react'
import type { TemplateProps } from '@/lib/templates/types'
import PagePreloader from './PagePreloader'

const VARIANT_ID = '4f307aca-v1'

const CSS = `
  @keyframes v1SlideUp {
    from { clip-path: inset(0 0 100% 0); opacity: 0; }
    to   { clip-path: inset(0 0 0% 0);   opacity: 1; }
  }
  @keyframes v1FadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .v1-hero-line { overflow: hidden; }
  .v1-hero-name {
    display: block;
    animation: v1SlideUp 1.1s cubic-bezier(0.16,1,0.3,1) both;
  }
  .v1-hero-meta { animation: v1FadeIn 0.8s ease 0.8s both; }
  .v1-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .v1-reveal.visible { opacity: 1; transform: translateY(0); }

  .v1-img-wrap { overflow: hidden; position: relative; }
  .v1-img-wrap img {
    display: block; width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.16,1,0.3,1);
    filter: saturate(0.7);
  }
  .v1-img-wrap:hover img { transform: scale(1.04); filter: saturate(1); }
  .v1-img-num {
    position: absolute; top: 14px; left: 14px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
    color: rgba(255,255,255,0.3);
    transition: color 0.3s ease;
  }
  .v1-img-wrap:hover .v1-img-num { color: #940000; }

  .v1-ticker {
    display: flex; gap: 48px; white-space: nowrap; align-items: center;
    animation: v1Ticker 18s linear infinite;
  }
  @keyframes v1Ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .v1-contact-row {
    display: flex; align-items: baseline; gap: 24px;
    border-bottom: 1px solid rgba(245,245,245,0.06);
    padding: 22px 0;
    transition: background 0.2s ease;
  }
  .v1-contact-row:hover { background: rgba(148,0,0,0.06); padding-left: 12px; }

  @media (prefers-reduced-motion: reduce) {
    .v1-hero-name, .v1-hero-meta, .v1-reveal {
      animation: none !important; transition: none !important;
      opacity: 1 !important; transform: none !important; clip-path: none !important;
    }
    .v1-ticker { animation: none !important; }
    .v1-img-wrap img { transition: none !important; }
  }
  @media (max-width: 768px) {
    .v1-nav { padding: 16px 20px !important; }
    .v1-hero-inner { padding: 0 20px 48px !important; }
    .v1-statement { padding: 60px 20px !important; }
    .v1-stmt-grid { grid-template-columns: 1fr !important; }
    .v1-stmt-sidebar { display: none !important; }
    .v1-gallery { padding: 60px 20px !important; }
    .v1-gallery-grid { grid-template-columns: 1fr !important; }
    .v1-gallery-grid .v1-img-wrap { grid-column: span 1 !important; height: 260px !important; }
    .v1-accent { padding: 28px 20px !important; overflow: hidden; }
    .v1-contact-section { padding: 60px 20px !important; }
    .v1-footer { padding: 24px 20px !important; }
  }
`

const CONTACT_LABELS: Record<string, string> = {
  phone: '전화', kakao: '카카오', instagram: 'Instagram',
  naver: '네이버', youtube: 'YouTube', facebook: 'Facebook',
  twitter: 'X', tiktok: 'TikTok',
}

export default function Variant1({
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
  const accent = brandColors[0] ?? '#940000'

  // brandDescription 파싱
  const descLines = brandDescription.split(/\r?\n/).filter(Boolean)
  const tagline = descLines[0] ?? ''
  const bodyLines = descLines.slice(1)

  useEffect(() => {
    const el = pageRef.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('.v1-reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { rootMargin: '-60px' }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  const instagramContact = contacts.find((c) => c.type === 'instagram')

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
          theme="dark"
          variantId={VARIANT_ID}
          onDone={() => setPreloaderDone(true)}
        />
      )}

      {/* ── Hero ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* Nav */}
        <header
          className="v1-nav"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
            padding: '20px 48px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'rgba(245,245,245,0.55)',
            }}
          >
            {brandName}
          </span>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {instagramContact && (
              <span style={{ fontSize: '12px', color: 'rgba(245,245,245,0.35)', letterSpacing: '0.04em' }}>
                {instagramContact.value}
              </span>
            )}
            <span
              style={{
                fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: accent, fontWeight: 600,
              }}
            >
              {websiteType ?? 'Portfolio'}
            </span>
          </div>
        </header>

        {/* Main image */}
        {mainImageUrl && (
          <>
            <img
              src={mainImageUrl}
              alt={`${brandName} 대표 이미지`}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center top',
                opacity: 0.32,
                filter: 'saturate(0.4)',
              }}
            />
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, #0C0C0C 32%, rgba(12,12,12,0.05) 65%)',
              }}
            />
          </>
        )}
        {!mainImageUrl && (
          <div
            style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(140deg, #0C0C0C 55%, ${accent}22)`,
            }}
          />
        )}

        {/* Hero text */}
        <div
          className="v1-hero-inner"
          style={{ position: 'relative', padding: '0 48px 64px' }}
        >
          {/* Meta line */}
          <p
            className="v1-hero-meta"
            style={{
              fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase',
              color: accent, marginBottom: '18px', fontWeight: 600,
            }}
          >
            — {tagline} —
          </p>

          {/* Brand name */}
          <h1 style={{ margin: 0, padding: 0 }}>
            <span className="v1-hero-line">
              <span
                className="v1-hero-name"
                style={{
                  fontSize: 'clamp(72px, 12vw, 160px)',
                  fontWeight: 900,
                  letterSpacing: '-0.045em',
                  lineHeight: 0.9,
                  color: '#F5F5F5',
                  textTransform: 'uppercase',
                  animationDelay: '0.1s',
                }}
              >
                {brandName}
              </span>
            </span>
          </h1>

          {/* Color strip */}
          <div style={{ display: 'flex', gap: '3px', marginTop: '28px' }}>
            {brandColors.map((c, i) => (
              <div key={i} style={{ height: '2px', width: '40px', background: c }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Statement ── */}
      <section
        className="v1-statement v1-reveal"
        style={{ background: '#F0EFE9', color: '#0C0C0C', padding: '100px 48px' }}
      >
        <div
          className="v1-stmt-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: '60px',
            maxWidth: '1100px',
          }}
        >
          {/* Sidebar */}
          <div className="v1-stmt-sidebar" style={{ paddingTop: '6px' }}>
            <p
              style={{
                fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(12,12,12,0.35)', margin: '0 0 24px',
              }}
            >
              About
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {brandColors.map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: '28px', height: '28px', background: c,
                    border: '1px solid rgba(12,12,12,0.1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            {bodyLines.map((line, li) => (
              <p
                key={li}
                style={{
                  fontSize: li === 0 ? 'clamp(20px, 2.8vw, 34px)' : '16px',
                  fontWeight: li === 0 ? 700 : 400,
                  lineHeight: li === 0 ? 1.4 : 1.85,
                  letterSpacing: li === 0 ? '-0.02em' : '-0.004em',
                  color: li === 0 ? '#0C0C0C' : 'rgba(12,12,12,0.6)',
                  margin: '0 0 16px',
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      {imageUrls.length > 0 && (
        <section
          className="v1-gallery"
          style={{ background: '#0C0C0C', padding: '80px 48px' }}
        >
          <p
            style={{
              fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(245,245,245,0.22)', marginBottom: '24px',
            }}
          >
            Works
          </p>
          <div
            className="v1-gallery-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridAutoRows: '300px',
              gap: '3px',
            }}
          >
            {imageUrls.map((url, i) => {
              const isWide = i === 0 || i === 5 || i === 9
              return (
                <div
                  key={i}
                  className="v1-reveal v1-img-wrap"
                  style={{
                    gridColumn: isWide ? 'span 2' : 'span 1',
                    height: '300px',
                    transitionDelay: `${(i % 3) * 0.06}s`,
                  }}
                >
                  <img src={url} alt={`${brandName} 작품 ${i + 1}`} />
                  <span className="v1-img-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Accent ticker ── */}
      <section
        className="v1-accent"
        style={{
          background: accent,
          padding: '36px 0',
          overflow: 'hidden',
        }}
      >
        <div className="v1-ticker">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: 'clamp(16px, 2.4vw, 28px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: 'rgba(255,255,255,0.2)',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              {brandName}
              <span style={{ margin: '0 24px', color: 'rgba(255,255,255,0.1)' }}>×</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      {contacts.length > 0 && (
        <section
          className="v1-contact-section"
          style={{ background: '#111', padding: '80px 48px' }}
        >
          <p
            style={{
              fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(245,245,245,0.22)', marginBottom: '36px',
            }}
          >
            Contact
          </p>
          <div style={{ maxWidth: '700px' }}>
            {contacts.map((c) => (
              <div key={c.type} className="v1-contact-row">
                <span
                  style={{
                    fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: accent, width: '90px', flexShrink: 0, fontWeight: 600,
                  }}
                >
                  {CONTACT_LABELS[c.type] ?? c.type}
                </span>
                <span
                  style={{
                    fontSize: 'clamp(16px, 2.2vw, 26px)',
                    fontWeight: 300,
                    color: '#F5F5F5',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {c.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer
        className="v1-footer"
        style={{
          background: '#0C0C0C',
          borderTop: '1px solid rgba(245,245,245,0.06)',
          padding: '24px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span style={{ fontSize: '11px', color: 'rgba(245,245,245,0.22)', letterSpacing: '0.05em' }}>
          © {brandName}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {brandColors.map((c, i) => (
            <span
              key={i}
              style={{
                width: '10px', height: '10px',
                background: c,
                border: '1px solid rgba(245,245,245,0.08)',
              }}
            />
          ))}
        </div>
      </footer>
    </div>
  )
}
