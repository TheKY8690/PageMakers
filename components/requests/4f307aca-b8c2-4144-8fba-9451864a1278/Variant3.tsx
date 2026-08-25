'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react'
import type { TemplateProps } from '@/lib/templates/types'
import PagePreloader from './PagePreloader'

const VARIANT_ID = '4f307aca-v3'

const CONTACT_LABELS: Record<string, string> = {
  phone: '전화', kakao: 'Kakao', instagram: 'Instagram',
  naver: '네이버', youtube: 'YouTube', facebook: 'Facebook',
  twitter: 'X', tiktok: 'TikTok',
}

// ── Portfolio card categories ─────────────────────────────────────────────────
const PORTFOLIO_CATS = [
  { title: 'Emotional', sub: '인물 & 감성' },
  { title: 'Brand', sub: '브랜드 & 상업' },
  { title: 'Nature', sub: '자연 & 풍경' },
  { title: 'Life', sub: '라이프스타일' },
]

const CSS = `
  /* ── Reveal ── */
  .v3-reveal {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                transform 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .v3-reveal.visible { opacity: 1; transform: translateY(0); }

  /* ── NAV ── */
  .v3-nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center;
    padding: 20px 48px;
    background: rgba(245,243,238,0.96);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(12,12,12,0.08);
  }
  .v3-nav-line {
    flex: 1; height: 1px; background: rgba(12,12,12,0.2); margin: 0 32px;
  }
  .v3-nav-links { display: flex; gap: 40px; }
  .v3-nav-link {
    font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    color: #0C0C0C; font-weight: 600; cursor: pointer;
    text-decoration: none; background: none; border: none;
    padding: 0; font-family: inherit; transition: opacity 0.2s;
  }
  .v3-nav-link:hover { opacity: 0.45; }

  /* ── HERO ── */
  .v3-hero {
    padding: 64px 48px 56px;
    background: #F5F3EE; overflow: hidden;
  }
  .v3-hero-line {
    font-size: clamp(56px, 11vw, 168px); font-weight: 900;
    letter-spacing: -0.045em; line-height: 0.88;
    text-transform: uppercase; display: block; margin: 0;
  }
  .v3-solid   { color: #0C0C0C; }
  .v3-outline { -webkit-text-stroke: 2.5px #0C0C0C; color: transparent; }
  .v3-accent-outline { -webkit-text-stroke: 2.5px var(--v3-accent); color: transparent; }

  /* ── FILMSTRIP ── */
  .v3-filmstrip {
    display: flex; align-items: stretch; gap: 6px;
    padding: 0; background: #F5F3EE; overflow: hidden;
  }
  .v3-film-side {
    flex: 0 0 13%; overflow: hidden; background: #ddd;
  }
  .v3-film-side img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: grayscale(100%); aspect-ratio: 3/4;
    transition: filter 0.8s ease;
  }
  .v3-film-side:hover img { filter: grayscale(30%); }
  .v3-film-center {
    flex: 0 0 48%; overflow: hidden; background: #ccc;
  }
  .v3-film-center img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    aspect-ratio: 4/5;
  }

  /* ── ABOUT TEXT ── */
  .v3-about-text {
    padding: 80px 48px;
    background: #F5F3EE;
    border-top: 1px solid rgba(12,12,12,0.1);
  }
  .v3-about-line {
    font-size: clamp(28px, 5vw, 72px); font-weight: 900;
    letter-spacing: -0.04em; line-height: 1;
    text-transform: uppercase; margin: 0 0 4px; display: block;
  }

  /* ── PORTFOLIO CARDS ── */
  .v3-portfolio-grid {
    display: grid; grid-template-columns: 1fr 1fr;
  }
  .v3-portfolio-card {
    position: relative; height: 75vh; overflow: hidden; cursor: default;
    background: #1a1a1a;
  }
  .v3-portfolio-card-img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .v3-portfolio-card:hover .v3-portfolio-card-img { transform: scale(1.04); }
  .v3-portfolio-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.72) 100%);
  }
  .v3-portfolio-caption {
    position: absolute; top: 28px; left: 32px; right: 32px;
  }
  .v3-portfolio-label {
    position: absolute; bottom: 32px; left: 32px;
  }
  .v3-portfolio-title {
    font-size: clamp(28px, 4.5vw, 68px); font-weight: 900;
    letter-spacing: -0.04em; color: #fff; text-transform: uppercase;
    line-height: 0.88; margin: 0;
  }
  .v3-portfolio-sub {
    font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(255,255,255,0.5); margin: 8px 0 0; font-weight: 500;
  }
  .v3-portfolio-num {
    position: absolute; bottom: 16px; right: 28px;
    font-size: clamp(64px, 10vw, 130px); font-weight: 900;
    -webkit-text-stroke: 1px rgba(255,255,255,0.2); color: transparent;
    letter-spacing: -0.06em; line-height: 1; pointer-events: none;
  }

  /* ── STATS ── */
  .v3-stats {
    position: relative; background: #0C0C0C; overflow: hidden;
    min-height: 60vh; padding: 64px 48px;
    display: grid; grid-template-columns: 1fr 38%;
    align-items: center; gap: 48px;
  }
  .v3-stat-line {
    font-size: clamp(36px, 7vw, 112px); font-weight: 900;
    letter-spacing: -0.04em; text-transform: uppercase;
    line-height: 0.88; margin: 0 0 6px;
    display: flex; align-items: baseline; gap: 0.14em; flex-wrap: wrap;
  }
  .v3-stat-solid   { color: #F5F3EE; }
  .v3-stat-outline { -webkit-text-stroke: 2px rgba(245,243,238,0.35); color: transparent; }
  .v3-stat-accent  { color: var(--v3-accent); }
  .v3-stats-portrait { overflow: hidden; align-self: stretch; min-height: 400px; }
  .v3-stats-portrait img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: grayscale(20%);
  }

  /* ── CTA ── */
  .v3-cta {
    padding: 100px 48px; background: #F5F3EE; text-align: center;
    border-top: 1px solid rgba(12,12,12,0.08);
  }
  .v3-cta-text {
    font-size: clamp(44px, 9vw, 148px); font-weight: 900;
    -webkit-text-stroke: 2.5px #0C0C0C; color: transparent;
    text-transform: uppercase; line-height: 0.88; margin: 0 0 52px;
    letter-spacing: -0.04em;
  }
  .v3-cta-btn {
    display: inline-block; padding: 18px 44px;
    background: #0C0C0C; color: #F5F3EE;
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    font-weight: 700; font-family: inherit;
    border: none; cursor: pointer; text-decoration: none;
    transition: background 0.2s, color 0.2s;
  }
  .v3-cta-btn:hover { background: var(--v3-accent); }

  /* ── FOOTER ── */
  .v3-footer { background: #0C0C0C; color: #F5F3EE; }
  .v3-footer-nav {
    display: flex; justify-content: space-between; align-items: center;
    padding: 24px 48px;
    border-bottom: 1px solid rgba(245,243,238,0.1);
  }
  .v3-footer-nav-link {
    font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(245,243,238,0.5); font-weight: 600; cursor: pointer;
    text-decoration: none; background: none; border: none;
    padding: 0; font-family: inherit; transition: color 0.2s;
  }
  .v3-footer-nav-link:hover { color: #F5F3EE; }
  .v3-footer-brand-row {
    display: flex; justify-content: space-between; align-items: flex-end;
    padding: 40px 48px 24px; overflow: hidden; gap: 16px;
  }
  .v3-footer-solid {
    font-size: clamp(56px, 12vw, 190px); font-weight: 900;
    color: #F5F3EE; letter-spacing: -0.05em; line-height: 0.85;
    text-transform: uppercase; margin: 0;
  }
  .v3-footer-outline {
    font-size: clamp(56px, 12vw, 190px); font-weight: 900;
    -webkit-text-stroke: 2px rgba(245,243,238,0.3); color: transparent;
    letter-spacing: -0.05em; line-height: 0.85;
    text-transform: uppercase; margin: 0; text-align: right;
  }
  .v3-footer-bar {
    padding: 18px 48px;
    border-top: 1px solid rgba(245,243,238,0.07);
    display: flex; justify-content: space-between; align-items: center;
  }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .v3-reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
    .v3-portfolio-card-img, .v3-film-side img { transition: none !important; }
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .v3-nav { padding: 16px 24px; }
    .v3-nav-line { display: none; }
    .v3-nav-links { gap: 20px; }
    .v3-hero { padding: 48px 24px 40px; }
    .v3-hero-line { font-size: clamp(40px,14vw,90px) !important; }
    .v3-filmstrip { overflow-x: auto; }
    .v3-film-side { flex: 0 0 24%; }
    .v3-film-center { flex: 0 0 52%; }
    .v3-about-text { padding: 56px 24px !important; }
    .v3-about-line { font-size: clamp(22px,7vw,48px) !important; }
    .v3-portfolio-grid { grid-template-columns: 1fr !important; }
    .v3-portfolio-card { height: 70vw !important; }
    .v3-stats { grid-template-columns: 1fr !important; padding: 48px 24px !important; }
    .v3-stats-portrait { display: none; }
    .v3-stat-line { font-size: clamp(28px,9vw,60px) !important; }
    .v3-cta { padding: 64px 24px !important; }
    .v3-cta-text { font-size: clamp(32px,11vw,72px) !important; }
    .v3-footer-nav { padding: 20px 24px !important; gap: 12px; flex-wrap: wrap; }
    .v3-footer-brand-row { padding: 32px 24px 20px !important; flex-direction: column; }
    .v3-footer-solid, .v3-footer-outline { font-size: clamp(40px,13vw,80px) !important; text-align: left !important; }
    .v3-footer-bar { padding: 16px 24px !important; }
  }
`

export default function Variant3({
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
  const pageRef = useRef<HTMLDivElement>(null)
  const accent = brandColors[0] ?? '#C8A96E'

  const descLines = brandDescription.split(/\r?\n/).filter(Boolean)
  const tagline   = descLines[0] ?? brandName
  const bioLines  = descLines.slice(1)

  // Image distribution
  // imageUrls[0]   → FILMSTRIP center (full color, largest)
  // imageUrls[1+]  → FILMSTRIP sides (grayscale) + PORTFOLIO card bgs
  // mainImageUrl   → STATS portrait
  const filmCenter  = imageUrls[0] ?? null
  const filmSides   = imageUrls.slice(1, 5)   // up to 4 side images (2 left, 2 right)
  const portfolioImgs = imageUrls.slice(1, 5) // reuse for portfolio cards
  const statsImg    = mainImageUrl

  const scrollTo = (id: string) => {
    pageRef.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  // ── IntersectionObserver reveal ────────────────────────────────────────
  useEffect(() => {
    if (isPreview) return
    const el = pageRef.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('.v3-reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { rootMargin: '-60px' }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [isPreview, preloaderDone])

  // Hero headline words: brandName + tagline words, alternating solid/outline
  const heroWords = brandName.trim().toUpperCase().split(/\s+/)
  const tagWords  = tagline.trim().toUpperCase().split(/\s+/)

  return (
    <div
      ref={pageRef}
      {...(isPreview ? { 'data-v3-preview': '' } : {})}
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        minHeight: '100vh', background: '#F5F3EE', color: '#0C0C0C',
        // @ts-expect-error css variable
        '--v3-accent': accent,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {isPreview && (
        <style dangerouslySetInnerHTML={{ __html: `
          [data-v3-preview] .v3-reveal { opacity: 1 !important; transform: none !important; }
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
          1. NAV — brandName + line + links
      ════════════════════════════════════════════════════════ */}
      <header className="v3-nav">
        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0C0C0C', flexShrink: 0 }}>
          {brandName}
        </span>
        <div className="v3-nav-line" />
        <nav className="v3-nav-links">
          {[['About', 'v3-about'], ['Works', 'v3-works'], ['Contact', 'v3-contact']].map(([label, id]) => (
            <button key={label} className="v3-nav-link" onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </nav>
      </header>

      {/* ════════════════════════════════════════════════════════
          2. HERO — oversized solid/outline mixed headline
      ════════════════════════════════════════════════════════ */}
      <section className="v3-hero">
        {/* brandName words — solid (H1 for SEO) */}
        <h1 className="v3-hero-line v3-solid">
          {heroWords.join(' ')}
        </h1>

        {/* tagline — outline */}
        {tagWords.length > 0 && (
          <span className="v3-hero-line v3-outline" style={{ fontSize: 'clamp(48px, 9.5vw, 144px)' }}>
            {tagWords.join(' ')}
          </span>
        )}


        {/* bottom meta */}
        <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {brandColors.map((c, i) => (
              <div key={i} style={{ width: '32px', height: '3px', background: c }} />
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. FILMSTRIP — center large + sides grayscale
      ════════════════════════════════════════════════════════ */}
      {(filmCenter || filmSides.length > 0) && (
        <div className="v3-filmstrip">
          {/* Left sides */}
          {filmSides.slice(0, 2).map((url, i) => (
            <div key={`l${i}`} className="v3-film-side">
              <img src={url} alt={`${brandName} ${i + 1}`} />
            </div>
          ))}

          {/* Center featured */}
          <div className="v3-film-center">
            {filmCenter ? (
              <img src={filmCenter} alt={`${brandName} featured`} />
            ) : (
              <div style={{ width: '100%', aspectRatio: '4/5', background: 'rgba(12,12,12,0.08)' }} />
            )}
          </div>

          {/* Right sides */}
          {filmSides.slice(2, 4).map((url, i) => (
            <div key={`r${i}`} className="v3-film-side">
              <img src={url} alt={`${brandName} ${i + 3}`} />
            </div>
          ))}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          4. ABOUT TEXT — solid/outline mixed statement
      ════════════════════════════════════════════════════════ */}
      <section id="v3-about" className="v3-about-text v3-reveal">
        {/* Main statement — mixed words */}
        <div style={{ marginBottom: '48px' }}>
          {(['WE', 'ARE', 'A', 'PHOTOGRAPHER'].map((w, i) => (
            <span key={i} className={`v3-about-line ${i % 2 === 0 ? 'v3-solid' : 'v3-outline'}`}>
              {w + (i < 3 ? '\u00A0' : '')}
            </span>
          )))}

          <span className="v3-about-line v3-solid" style={{ fontSize: 'clamp(22px, 3.8vw, 56px)' }}>
            {brandName.toUpperCase()}
          </span>
        </div>

        {/* Bio lines */}
        {bioLines.length > 0 && (
          <div style={{ maxWidth: '640px', borderLeft: `3px solid ${accent}`, paddingLeft: '28px' }}>
            {bioLines.map((line, i) => (
              <p key={i} style={{
                fontSize: i === 0 ? '18px' : '15px',
                fontWeight: i === 0 ? 600 : 400,
                lineHeight: 1.75,
                color: i === 0 ? '#0C0C0C' : 'rgba(12,12,12,0.55)',
                margin: '0 0 14px',
                letterSpacing: '-0.003em',
              }}>
                {line}
              </p>
            ))}
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════
          5. PORTFOLIO CARDS — 2-col full-bleed
      ════════════════════════════════════════════════════════ */}
      {portfolioImgs.length > 0 && (
        <section id="v3-works" className="v3-portfolio-grid">
          {portfolioImgs.slice(0, 4).map((url, i) => {
            const cat = PORTFOLIO_CATS[i % PORTFOLIO_CATS.length]
            return (
              <div key={i} className="v3-portfolio-card v3-reveal" style={{ transitionDelay: `${(i % 2) * 0.1}s` }}>
                <img className="v3-portfolio-card-img" src={url} alt={cat.title} />
                <div className="v3-portfolio-overlay" />
                <div className="v3-portfolio-caption">
                  <span style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
                    {cat.sub}
                  </span>
                </div>
                <div className="v3-portfolio-label">
                  <p className="v3-portfolio-title">{cat.title}</p>
                </div>
                <span className="v3-portfolio-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
            )
          })}
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          6. STATS — dark bg + portrait + floating stats
      ════════════════════════════════════════════════════════ */}
      <section className="v3-stats v3-reveal">
        {/* Left: brandName + tagline + contacts */}
        <div>
          {tagline && (
            <p className="v3-stat-line" style={{ marginBottom: '24px' }}>
              {tagline.trim().toUpperCase().split(/\s+/).map((w, i) => (
                <span key={i} className={i % 2 === 0 ? 'v3-stat-solid' : 'v3-stat-outline'}>
                  {w}{' '}
                </span>
              ))}
            </p>
          )}

          {/* contacts strip */}
          {contacts.length > 0 && (
            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {contacts.slice(0, 3).map((c) => (
                <div key={c.type} style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,243,238,0.35)', fontWeight: 700, width: '70px', flexShrink: 0 }}>
                    {CONTACT_LABELS[c.type] ?? c.type}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 500, color: '#F5F3EE', letterSpacing: '-0.01em' }}>
                    {c.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: portrait */}
        <div className="v3-stats-portrait">
          {statsImg ? (
            <img src={statsImg} alt={`${brandName} portrait`} />
          ) : (
            <div style={{ width: '100%', height: '100%', minHeight: '400px', background: 'rgba(245,243,238,0.06)' }} />
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. CTA — outlined question + button
      ════════════════════════════════════════════════════════ */}
      <section id="v3-contact" className="v3-cta v3-reveal">
        <p className="v3-cta-text">
          LET&apos;S<br />WORK?
        </p>
        {contacts[0] ? (
          <button className="v3-cta-btn" onClick={() => {}}>
            GET CONNECTED
          </button>
        ) : (
          <span className="v3-cta-btn" style={{ display: 'inline-block' }}>
            GET CONNECTED
          </span>
        )}
        <span style={{ position: 'absolute', top: '40px', right: '56px', fontSize: '48px', fontWeight: 300, color: 'rgba(12,12,12,0.15)', pointerEvents: 'none' }}>
          ×
        </span>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. FOOTER — nav + brandName solid/outline
      ════════════════════════════════════════════════════════ */}
      <footer className="v3-footer">
        {/* Nav row */}
        <div className="v3-footer-nav">

          <nav style={{ display: 'flex', gap: '40px' }}>
            {[['About', 'v3-about'], ['Works', 'v3-works'], ['Contact', 'v3-contact']].map(([label, id]) => (
              <button key={label} className="v3-footer-nav-link" onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
          </nav>
          <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: accent, fontWeight: 600 }}>
            © {brandName}
          </span>
        </div>

        {/* Brand row — solid left + outline right */}
        <div className="v3-footer-brand-row">
          <p className="v3-footer-solid">{brandName}</p>

        </div>

        {/* Bottom bar */}
        <div className="v3-footer-bar">
          <span style={{ fontSize: '10px', color: 'rgba(245,243,238,0.2)', letterSpacing: '0.06em' }}>
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </span>
          <span style={{ fontSize: '10px', color: accent, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            PageMakers
          </span>
        </div>
      </footer>
    </div>
  )
}
