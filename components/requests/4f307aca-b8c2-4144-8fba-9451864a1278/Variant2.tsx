'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react'
import type { TemplateProps } from '@/lib/templates/types'
import PagePreloader from './PagePreloader'

const VARIANT_ID = '4f307aca-v2'

const CSS = `
  @keyframes v2FadeSlide {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .v2-hero-sub { animation: v2FadeSlide 0.7s ease 0.2s both; }
  .v2-hero-name-line { overflow: hidden; }
  .v2-hero-name-inner {
    display: block;
    animation: v2FadeSlide 1s cubic-bezier(0.16,1,0.3,1) both;
  }
  .v2-hero-name-inner:nth-child(1) { animation-delay: 0.3s; }
  .v2-hero-name-inner:nth-child(2) { animation-delay: 0.42s; }
  .v2-hero-img-wrap { animation: v2FadeSlide 1s ease 0.5s both; }

  .v2-reveal {
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .v2-reveal.visible { opacity: 1; transform: translateY(0); }

  .v2-img-cell { overflow: hidden; position: relative; }
  .v2-img-cell img {
    display: block; width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .v2-img-cell:hover img { transform: scale(1.03); }

  .v2-contact-card {
    border: 1px solid rgba(12,12,12,0.1);
    padding: 24px 28px;
    transition: border-color 0.25s ease, background 0.25s ease;
    cursor: default;
  }
  .v2-contact-card:hover {
    border-color: #940000;
    background: rgba(148,0,0,0.03);
  }

  @media (prefers-reduced-motion: reduce) {
    .v2-hero-sub, .v2-hero-name-inner, .v2-hero-img-wrap, .v2-reveal {
      animation: none !important; transition: none !important;
      opacity: 1 !important; transform: none !important;
    }
    .v2-img-cell img { transition: none !important; }
  }
  @media (max-width: 768px) {
    .v2-nav { padding: 16px 20px !important; }
    .v2-hero { padding: 32px 20px 40px !important; }
    .v2-hero-name { font-size: clamp(56px, 14vw, 100px) !important; }
    .v2-stmt-wrap { padding: 60px 20px !important; }
    .v2-stmt-grid { grid-template-columns: 1fr !important; }
    .v2-stmt-img { display: none !important; }
    .v2-gallery-wrap { padding: 48px 20px !important; }
    .v2-gallery-grid { grid-template-columns: 1fr !important; }
    .v2-gallery-grid .v2-img-cell { height: 260px !important; }
    .v2-contact-wrap { padding: 60px 20px !important; }
    .v2-contact-grid { grid-template-columns: 1fr !important; }
    .v2-footer { padding: 24px 20px !important; }
  }
`

const CONTACT_LABELS: Record<string, string> = {
  phone: '전화', kakao: '카카오', instagram: 'Instagram',
  naver: '네이버', youtube: 'YouTube', facebook: 'Facebook',
  twitter: 'X', tiktok: 'TikTok',
}

export default function Variant2({
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

  const descLines = brandDescription.split(/\r?\n/).filter(Boolean)
  const tagline = descLines[0] ?? ''
  const bodyLines = descLines.slice(1)

  useEffect(() => {
    const el = pageRef.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('.v2-reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { rootMargin: '-50px' }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  // 이름 길면 두 줄로 분리
  const nameParts =
    brandName.length > 8 && brandName.includes(' ')
      ? [brandName.slice(0, brandName.lastIndexOf(' ')), brandName.slice(brandName.lastIndexOf(' ') + 1)]
      : [brandName]

  return (
    <div
      ref={pageRef}
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", minHeight: '100vh', background: '#FFFFFF', color: '#0C0C0C' }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {!preloaderDone && (
        <PagePreloader
          brandName={brandName}
          descriptor={tagline}
          accentColor={accent}
          theme="light"
          variantId={VARIANT_ID}
          onDone={() => setPreloaderDone(true)}
        />
      )}

      {/* ── Nav ── */}
      <header
        className="v2-nav"
        style={{
          position: 'sticky', top: 0, zIndex: 100,
          padding: '18px 48px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(12,12,12,0.06)',
        }}
      >
        <span
          style={{
            fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: '#0C0C0C',
          }}
        >
          {brandName}
        </span>
        <span
          style={{
            fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: accent, fontWeight: 600,
          }}
        >
          {websiteType ?? 'Portfolio'}
        </span>
      </header>

      {/* ── Hero ── */}
      <section
        className="v2-hero"
        style={{ padding: '48px 48px 0' }}
      >
        {/* Sub caption */}
        <p
          className="v2-hero-sub"
          style={{
            fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(12,12,12,0.4)', marginBottom: '16px', fontWeight: 400,
          }}
        >
          {tagline}
        </p>

        {/* Brand name */}
        <h1 style={{ margin: '0 0 40px' }}>
          {nameParts.map((part, pi) => (
            <span key={pi} className="v2-hero-name-line" style={{ display: 'block' }}>
              <span
                className="v2-hero-name v2-hero-name-inner"
                style={{
                  fontSize: 'clamp(64px, 11vw, 148px)',
                  fontWeight: 900,
                  letterSpacing: '-0.045em',
                  lineHeight: 0.9,
                  color: '#0C0C0C',
                  textTransform: 'uppercase',
                  animationDelay: `${0.3 + pi * 0.12}s`,
                }}
              >
                {part}
              </span>
            </span>
          ))}
        </h1>

        {/* Hero image */}
        {mainImageUrl && (
          <div
            className="v2-hero-img-wrap"
            style={{
              width: '100%',
              aspectRatio: '16 / 6',
              overflow: 'hidden',
              marginTop: '8px',
            }}
          >
            <img
              src={mainImageUrl}
              alt={`${brandName} 대표 이미지`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
        )}
      </section>

      {/* ── Divider ── */}
      <div style={{ padding: '0 48px' }}>
        <div style={{ height: '1px', background: accent, marginTop: '60px' }} />
      </div>

      {/* ── Statement ── */}
      <section
        className="v2-stmt-wrap v2-reveal"
        style={{ padding: '80px 48px' }}
      >
        <div
          className="v2-stmt-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          {/* Text */}
          <div>
            <p
              style={{
                fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(12,12,12,0.35)', marginBottom: '28px',
              }}
            >
              About
            </p>
            {bodyLines.map((line, li) => (
              <p
                key={li}
                style={{
                  fontSize: li === 0 ? 'clamp(18px, 2.4vw, 28px)' : '15px',
                  fontWeight: li === 0 ? 700 : 400,
                  lineHeight: li === 0 ? 1.45 : 1.9,
                  letterSpacing: li === 0 ? '-0.02em' : '-0.003em',
                  color: li === 0 ? '#0C0C0C' : 'rgba(12,12,12,0.55)',
                  margin: '0 0 14px',
                }}
              >
                {line}
              </p>
            ))}
            <div style={{ display: 'flex', gap: '6px', marginTop: '28px' }}>
              {brandColors.map((c, i) => (
                <div key={i} style={{ width: '24px', height: '3px', background: c }} />
              ))}
            </div>
          </div>

          {/* Side image */}
          {imageUrls[0] && (
            <div
              className="v2-stmt-img v2-img-cell"
              style={{ aspectRatio: '4 / 5', overflow: 'hidden' }}
            >
              <img
                src={imageUrls[0]}
                alt={`${brandName} 작품`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
      </section>

      {/* ── Gallery ── */}
      {imageUrls.length > 1 && (
        <section
          className="v2-gallery-wrap"
          style={{ padding: '0 48px 80px' }}
        >
          <p
            style={{
              fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(12,12,12,0.3)', marginBottom: '20px',
            }}
          >
            Works
          </p>
          <div
            className="v2-gallery-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px',
            }}
          >
            {imageUrls.slice(1).map((url, i) => (
              <div
                key={i}
                className="v2-reveal v2-img-cell"
                style={{
                  height: i % 3 === 1 ? '420px' : '320px',
                  transitionDelay: `${(i % 2) * 0.08}s`,
                }}
              >
                <img src={url} alt={`${brandName} 작품 ${i + 2}`} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Accent line ── */}
      <section
        style={{
          padding: '40px 48px',
          borderTop: '1px solid rgba(12,12,12,0.08)',
          borderBottom: '1px solid rgba(12,12,12,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(14px, 2vw, 20px)',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: '#0C0C0C',
          }}
        >
          {tagline}
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {brandColors.map((c, i) => (
            <div key={i} style={{ width: '32px', height: '3px', background: c }} />
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      {contacts.length > 0 && (
        <section
          className="v2-contact-wrap v2-reveal"
          style={{ padding: '80px 48px' }}
        >
          <p
            style={{
              fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(12,12,12,0.3)', marginBottom: '32px',
            }}
          >
            Contact
          </p>
          <div
            className="v2-contact-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '12px',
            }}
          >
            {contacts.map((c) => (
              <div key={c.type} className="v2-contact-card">
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
                    fontSize: '16px', fontWeight: 500, color: '#0C0C0C',
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
        className="v2-footer"
        style={{
          borderTop: '1px solid rgba(12,12,12,0.08)',
          padding: '24px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          background: '#FAFAFA',
        }}
      >
        <span style={{ fontSize: '11px', color: 'rgba(12,12,12,0.35)', letterSpacing: '0.05em' }}>
          © {brandName}
        </span>
        <span style={{ fontSize: '10px', color: accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {websiteType ?? 'Portfolio'}
        </span>
      </footer>
    </div>
  )
}
