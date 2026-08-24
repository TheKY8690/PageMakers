'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react'
import type { TemplateProps } from '@/lib/templates/types'
import PagePreloader from './PagePreloader'

const VARIANT_ID = '4f307aca-v2'

const CONTACT_LABELS: Record<string, string> = {
  phone: '전화', kakao: '카카오', instagram: 'Instagram',
  naver: '네이버', youtube: 'YouTube', facebook: 'Facebook',
  twitter: 'X', tiktok: 'TikTok',
}

// ── Photography services (accordion) ─────────────────────────────────────────
const SERVICES = [
  { num: '01', title: 'Emotional Photography', desc: '자연광과 시선을 담는 감성사진' },
  { num: '02', title: 'Lifestyle Photography', desc: '일상 속 특별한 순간들을 기록합니다' },
  { num: '03', title: 'Branding & Commercial', desc: '브랜드 정체성을 시각적 언어로 번역합니다' },
  { num: '04', title: 'Nature & Events', desc: '특별한 날의 모든 감동을 오래도록 보존합니다' },
]

// ── Gallery cell grid-column placements ───────────────────────────────────────
const GALLERY_COLS = [
  { gridColumn: '1 / 7',  marginTop: '0' },
  { gridColumn: '6 / 11', marginTop: '14%' },
  { gridColumn: '2 / 8',  marginTop: '8%' },
  { gridColumn: '7 / 13', marginTop: '-4%' },
]

// ── Know-me photo absolute positions ─────────────────────────────────────────
const KNOW_POSITIONS: React.CSSProperties[] = [
  { right: '8%',  top: '40px',  width: '34%', height: '46vh' },
  { left: '30%',  top: '38%',   width: '42%', height: '52vh' },
  { left: '2%',   bottom: '0',  width: '30%', height: '40vh' },
]

const CSS = `
  @keyframes v2Ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .v2-ticker {
    display: flex; gap: 64px; white-space: nowrap; align-items: center;
    animation: v2Ticker 26s linear infinite;
  }

  /* ── Reveal ── */
  .v2-reveal {
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1),
                transform 0.85s cubic-bezier(0.16,1,0.3,1);
  }
  .v2-reveal.visible { opacity: 1; transform: translateY(0); }

  /* ── HERO ── */
  .v2-hero {
    position: relative; height: 100vh; min-height: 600px;
    background: #E8E8E8; overflow: hidden;
  }
  .v2-hero-title {
    position: absolute; top: 48px; left: 56px;
    font-size: clamp(60px, 10vw, 150px); font-weight: 900;
    letter-spacing: -0.05em; line-height: 0.92;
    color: #0C0C0C; margin: 0; z-index: 2;
  }
  .v2-hero-tagline {
    position: absolute; bottom: 52px; left: 56px;
    border-left: 2px solid rgba(12,12,12,0.7); padding-left: 16px;
    z-index: 2;
  }
  .v2-hero-scroll {
    position: absolute; bottom: 52px; left: 24px;
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    z-index: 2;
  }
  .v2-hero-portrait {
    position: absolute; right: 0; top: 10%;
    width: 44%; height: 82%; overflow: hidden; z-index: 1;
  }
  .v2-hero-portrait img {
    width: 100%; height: 100%; object-fit: cover;
    object-position: center; display: block;
  }

  /* ── GALLERY scattered 12-col grid ── */
  .v2-gallery {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 12px;
    padding: 80px 56px 100px;
    background: #E8E8E8;
    align-items: start;
  }
  .v2-gallery-cell { overflow: hidden; position: relative; }
  .v2-gallery-cell img {
    width: 100%; display: block; object-fit: cover;
    aspect-ratio: 3/4;
    transition: transform 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .v2-gallery-cell:hover img { transform: scale(1.04); }

  /* ── GET TO KNOW ME ── */
  .v2-know-wrap {
    position: relative; min-height: 90vh;
    padding: 80px 56px 80px;
    background: #E8E8E8;
    border-top: 1px solid rgba(12,12,12,0.1);
    overflow: hidden;
  }
  .v2-know-heading {
    font-size: clamp(44px, 7vw, 110px); font-weight: 900;
    letter-spacing: -0.05em; line-height: 0.92; color: #0C0C0C;
    position: relative; z-index: 2; max-width: 55%; margin: 0;
  }
  .v2-know-photo {
    position: absolute; overflow: hidden; z-index: 1;
  }
  .v2-know-photo img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }

  /* ── BIO ── */
  .v2-bio {
    display: grid; grid-template-columns: 1fr 1fr;
    min-height: 80vh; background: #E8E8E8;
    border-top: 1px solid rgba(12,12,12,0.1);
  }
  .v2-bio-left {
    padding: 64px 48px;
    display: flex; flex-direction: column;
    border-right: 1px solid rgba(12,12,12,0.1);
  }
  .v2-bio-portrait { overflow: hidden; flex: 1; display: flex; align-items: flex-end; }
  .v2-bio-portrait img {
    width: 70%; height: auto; display: block; object-fit: initial;
  }
  .v2-bio-right {
    padding: 64px 56px;
    display: flex; flex-direction: column; justify-content: center;
  }
  .v2-bio-name {
    font-size: clamp(48px, 7.5vw, 120px); font-weight: 900;
    letter-spacing: -0.05em; line-height: 0.88;
    color: #0C0C0C; margin: 0 0 40px;
  }

  /* ── SERVICES accordion ── */
  .v2-services {
    display: grid; grid-template-columns: 280px 1fr;
    min-height: 60vh; background: #E8E8E8;
    border-top: 1px solid rgba(12,12,12,0.1);
  }
  .v2-accord-list { border-right: 1px solid rgba(12,12,12,0.1); }
  .v2-accord-item {
    padding: 28px 36px;
    border-bottom: 1px solid rgba(12,12,12,0.1);
    cursor: pointer; transition: background 0.2s;
  }
  .v2-accord-item.active { background: #0C0C0C; }
  .v2-accord-item:not(.active):hover { background: rgba(12,12,12,0.04); }
  .v2-accord-img {
    overflow: hidden; padding: 56px;
    display: flex; align-items: center;
  }
  .v2-accord-img img {
    width: 100%; max-height: 60vh;
    object-fit: cover; display: block;
    transition: opacity 0.35s ease;
  }

  /* ── Ticker row ── */
  .v2-ticker-row {
    display: flex;
    border-top: 1px solid rgba(12,12,12,0.08);
    border-bottom: 1px solid rgba(12,12,12,0.08);
    background: #E8E8E8;
  }
  .v2-ticker-wrap { flex: 2; overflow: hidden; padding: 28px 0; border-right: 1px solid rgba(12,12,12,0.08); }
  .v2-swatch-wrap {
    flex: 1; padding: 28px 48px;
    display: flex; flex-direction: column; justify-content: center; gap: 12px;
  }

  /* ── Contact card ── */
  .v2-contact-card {
    border: 1px solid rgba(12,12,12,0.1); padding: 24px 28px;
    background: #E8E8E8;
    transition: border-color 0.25s; cursor: default;
  }
  .v2-contact-card:hover { border-color: var(--v2-accent); }

  /* ── Footer ── */
  .v2-footer-inner {
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 16px; padding: 36px 56px;
  }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .v2-ticker { animation: none !important; }
    .v2-reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
    .v2-gallery-cell img { transition: none !important; }
    .v2-accord-item { transition: none !important; }
    .v2-accord-img img { transition: none !important; }
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .v2-hero { height: auto; min-height: 100svh; }
    .v2-hero-title { font-size: clamp(40px,12vw,80px) !important; left: 24px !important; }
    .v2-hero-portrait { width: 55% !important; }
    .v2-hero-tagline { left: 24px !important; bottom: 32px !important; }
    .v2-gallery { grid-template-columns: 1fr 1fr !important; padding: 40px 24px !important; }
    .v2-know-wrap { padding: 60px 24px 48vw !important; }
    .v2-know-heading { max-width: 100% !important; font-size: clamp(36px,10vw,72px) !important; }
    .v2-bio { grid-template-columns: 1fr !important; }
    .v2-bio-left { padding: 48px 24px !important; border-right: none !important; border-bottom: 1px solid rgba(12,12,12,0.1); }
    .v2-bio-right { padding: 40px 24px !important; }
    .v2-bio-name { font-size: clamp(40px,10vw,80px) !important; }
    .v2-services { grid-template-columns: 1fr !important; }
    .v2-accord-img { padding: 32px 24px !important; }
    .v2-ticker-row { flex-direction: column !important; }
    .v2-ticker-wrap { border-right: none !important; border-bottom: 1px solid rgba(12,12,12,0.08) !important; }
    .v2-swatch-wrap { padding: 24px !important; flex-direction: row !important; }
    .v2-footer-inner { padding: 24px !important; }
  }
  @media (max-width: 480px) {
    .v2-gallery { grid-template-columns: 1fr !important; }
  }
`

export default function Variant2({
  brandName,
  brandDescription,
  brandColors,
  imageUrls,
  mainImageUrl,
  contacts = [],
  websiteType,
  isPreview = false,
}: TemplateProps) {
  const [preloaderDone, setPreloaderDone] = useState(isPreview)
  const [selectedSvc, setSelectedSvc] = useState(0)
  const pageRef = useRef<HTMLDivElement>(null)
  const accent = brandColors[0] ?? '#940000'

  const descLines = brandDescription.split(/\r?\n/).filter(Boolean)
  const tagline   = descLines[0] ?? brandName
  const bioLines  = descLines.slice(1)

  // Image distribution
  // imageUrls[0]   → HERO right panel portrait
  // imageUrls[1+]  → GALLERY + KNOW ME + SERVICES image
  // mainImageUrl   → BIO left portrait
  const heroImg     = imageUrls[0] ?? null
  const galleryImgs = imageUrls.slice(1)
  const aboutImg    = mainImageUrl

  const instagramContact = contacts.find((c) => c.type === 'instagram')

  const scrollTo = (id: string) => {
    pageRef.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  // ── IntersectionObserver reveal ────────────────────────────────────────
  useEffect(() => {
    if (isPreview) return
    const el = pageRef.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('.v2-reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { rootMargin: '-40px' }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [isPreview, preloaderDone])

  return (
    <div
      ref={pageRef}
      {...(isPreview ? { 'data-v2-preview': '' } : {})}
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        minHeight: '100vh', background: '#E8E8E8', color: '#0C0C0C',
        // @ts-expect-error css variable
        '--v2-accent': accent,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {isPreview && (
        <style dangerouslySetInnerHTML={{ __html: `
          [data-v2-preview] .v2-reveal { opacity: 1 !important; transform: none !important; }
        `}} />
      )}

      {!isPreview && !preloaderDone && (
        <PagePreloader
          brandName={brandName}
          descriptor={tagline}
          accentColor={accent}
          theme="light"
          variantId={VARIANT_ID}
          onDone={() => setPreloaderDone(true)}
        />
      )}

      {/* ════════════════════════════════════════════════════════
          1. NAV — sticky, numbered
      ════════════════════════════════════════════════════════ */}
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 100,
          padding: '14px 56px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'rgba(232,232,232,0.94)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(12,12,12,0.08)',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0C0C0C' }}>
          {brandName}
        </span>
        <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {[['01/', 'HOME', 'v2-home'], ['02/', 'WORKS', 'v2-works'], ['03/', 'ABOUT', 'v2-about'], ['04/', 'CONTACT', 'v2-contact']].map(([num, label, id]) => (
            <button
              key={label}
              onClick={() => scrollTo(id)}
              style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(12,12,12,0.5)', fontWeight: 500, cursor: 'pointer', background: 'none', border: 'none', padding: 0, fontFamily: 'inherit' }}
            >
              <span style={{ color: 'rgba(12,12,12,0.28)', marginRight: '5px', fontSize: '9px' }}>{num}</span>
              {label}
            </button>
          ))}
          {instagramContact && (
            <span style={{ fontSize: '10px', color: accent, letterSpacing: '0.1em', fontWeight: 600 }}>
              {instagramContact.value}
            </span>
          )}
        </nav>
      </header>

      {/* ════════════════════════════════════════════════════════
          2. HERO — 100vh absolute layout
      ════════════════════════════════════════════════════════ */}
      <section id="v2-home" className="v2-hero">
        {/* Title — top left */}
        <h1 className="v2-hero-title">
          Selected<br />Photos
        </h1>

        {/* Tagline — bottom left */}
        <div className="v2-hero-tagline">
          <p style={{ fontSize: '14px', fontWeight: 500, color: '#0C0C0C', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {tagline}
          </p>
          <p style={{ fontSize: '10px', color: 'rgba(12,12,12,0.4)', margin: '4px 0 0', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {websiteType ?? 'Portfolio'}
          </p>
        </div>

        {/* Scroll hint */}
        <div className="v2-hero-scroll">
          <span style={{ fontSize: '8px', letterSpacing: '0.2em', writingMode: 'vertical-rl', color: 'rgba(12,12,12,0.35)', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <div style={{ width: '1px', height: '48px', background: 'rgba(12,12,12,0.2)' }} />
        </div>

        {/* Portrait — right panel */}
        <div className="v2-hero-portrait">
          {heroImg ? (
            <img src={heroImg} alt={`${brandName} hero`} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'rgba(12,12,12,0.08)' }} />
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. GALLERY — scattered 12-col grid
      ════════════════════════════════════════════════════════ */}
      {galleryImgs.length > 0 && (
        <section id="v2-works" className="v2-gallery">
          {galleryImgs.slice(0, 4).map((url, i) => (
            <div
              key={i}
              className="v2-gallery-cell v2-reveal"
              style={{
                gridColumn: GALLERY_COLS[i % GALLERY_COLS.length].gridColumn,
                marginTop: GALLERY_COLS[i % GALLERY_COLS.length].marginTop,
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <img src={url} alt={`${brandName} ${i + 1}`} />
            </div>
          ))}
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          4. GET TO KNOW ME — heading + scattered photos
      ════════════════════════════════════════════════════════ */}
      {galleryImgs.length > 0 && (
        <section className="v2-know-wrap">
          <h2 className="v2-know-heading">
            Get to<br />know me
          </h2>
          {galleryImgs.slice(0, 3).map((url, i) => (
            <div key={i} className="v2-know-photo v2-reveal" style={{ ...KNOW_POSITIONS[i], transitionDelay: `${i * 0.12}s` }}>
              <img src={url} alt={`${brandName} ${i + 1}`} />
            </div>
          ))}
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          5. BIO — (About) + portrait left + name + bio right
      ════════════════════════════════════════════════════════ */}
      <section id="v2-about" className="v2-bio">
        {/* Left — label + portrait */}
        <div className="v2-bio-left">
          <p style={{ fontSize: '12px', color: 'rgba(12,12,12,0.4)', margin: 0, fontWeight: 500 }}>
            (About)
          </p>
          <div className="v2-bio-portrait">
            {aboutImg ? (
              <img src={aboutImg} alt={`${brandName} portrait`} />
            ) : (
              <div style={{ width: '70%', paddingBottom: '120%', background: 'rgba(12,12,12,0.08)' }} />
            )}
          </div>
        </div>

        {/* Right — name + bio */}
        <div className="v2-bio-right">
          <h2 className="v2-bio-name">
            I&apos;m<br />{brandName}
          </h2>
          {(bioLines.length > 0 ? bioLines : [tagline]).map((line, li) => (
            <p
              key={li}
              className="v2-reveal"
              style={{
                fontSize: li === 0 ? '18px' : '15px',
                fontWeight: 400,
                lineHeight: 1.85,
                letterSpacing: '-0.003em',
                color: 'rgba(12,12,12,0.65)',
                margin: '0 0 16px',
                maxWidth: '520px',
                transitionDelay: `${li * 0.06}s`,
              }}
            >
              {line}
            </p>
          ))}
          <div style={{ display: 'flex', gap: '6px', marginTop: '24px' }}>
            {brandColors.map((c, i) => (
              <div key={i} style={{ width: '28px', height: '3px', background: c }} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. SERVICES — accordion left + image right
      ════════════════════════════════════════════════════════ */}
      <section className="v2-services">
        {/* Left: accordion */}
        <div className="v2-accord-list">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.num}
              className={`v2-accord-item${selectedSvc === i ? ' active' : ''}`}
              onClick={() => setSelectedSvc(i)}
            >
              <p style={{ fontSize: '10px', letterSpacing: '0.12em', color: selectedSvc === i ? 'rgba(232,232,232,0.45)' : 'rgba(12,12,12,0.3)', margin: '0 0 8px', fontWeight: 600 }}>
                {svc.num}/
              </p>
              <p style={{ fontSize: 'clamp(14px, 1.4vw, 18px)', fontWeight: 700, letterSpacing: '-0.02em', color: selectedSvc === i ? '#E8E8E8' : '#0C0C0C', margin: '0 0 6px' }}>
                {svc.title}
              </p>
              <p style={{ fontSize: '12px', color: selectedSvc === i ? 'rgba(232,232,232,0.55)' : 'rgba(12,12,12,0.42)', margin: 0, lineHeight: 1.55 }}>
                {svc.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Right: image */}
        <div className="v2-accord-img">
          {galleryImgs.length > 0 ? (
            <img
              key={selectedSvc}
              src={galleryImgs[selectedSvc % galleryImgs.length]}
              alt={SERVICES[selectedSvc].title}
            />
          ) : (
            <div style={{ width: '100%', height: '60vh', background: 'rgba(12,12,12,0.06)' }} />
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. TICKER + SWATCHES
      ════════════════════════════════════════════════════════ */}
      <div className="v2-ticker-row">
        <div className="v2-ticker-wrap">
          <div className="v2-ticker">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} style={{ fontSize: 'clamp(11px, 1.3vw, 14px)', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(12,12,12,0.28)', flexShrink: 0 }}>
                {tagline}
                <span style={{ margin: '0 28px', color: 'rgba(12,12,12,0.1)' }}>·</span>
              </span>
            ))}
          </div>
        </div>
        <div className="v2-swatch-wrap">
          <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(12,12,12,0.3)', margin: 0, fontWeight: 600 }}>
            Brand Colors
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {brandColors.map((c, i) => (
              <div key={i} style={{ width: '32px', height: '32px', background: c, border: '1px solid rgba(12,12,12,0.06)' }} />
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          8. CONTACT
      ════════════════════════════════════════════════════════ */}
      {contacts.length > 0 && (
        <section id="v2-contact" className="v2-reveal" style={{ padding: '80px 56px', background: '#E8E8E8' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(12,12,12,0.3)', marginBottom: '32px' }}>
            Contact
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
            {contacts.map((c) => (
              <div key={c.type} className="v2-contact-card">
                <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: '10px', fontWeight: 600 }}>
                  {CONTACT_LABELS[c.type] ?? c.type}
                </p>
                <p style={{ fontSize: '16px', fontWeight: 500, color: '#0C0C0C', letterSpacing: '-0.01em', margin: 0 }}>
                  {c.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          9. FOOTER
      ════════════════════════════════════════════════════════ */}
      <footer style={{ background: accent }}>
        <div className="v2-footer-inner">
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 8px', fontWeight: 600 }}>
              {websiteType ?? 'Portfolio'} · {brandName}
            </p>
            <p style={{ fontSize: 'clamp(20px, 2.4vw, 32px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#FFFFFF', margin: 0, lineHeight: 1 }}>
              {tagline}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            {contacts.slice(0, 3).map((c) => (
              <span key={c.type} style={{ fontSize: '11px', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                {c.value}
              </span>
            ))}
            <span style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
              © {brandName}
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
