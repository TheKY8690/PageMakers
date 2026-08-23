'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { TemplateProps } from '@/lib/templates/types'
import PagePreloader from './PagePreloader'

gsap.registerPlugin(ScrollTrigger)

const VARIANT_ID = '4f307aca-v1'

const CONTACT_LABELS: Record<string, string> = {
  phone: '전화', kakao: '카카오', instagram: 'Instagram',
  naver: '네이버', youtube: 'YouTube', facebook: 'Facebook',
  twitter: 'X', tiktok: 'TikTok',
}

// ── Fallback creative copy (photography portfolio tone) ──────────────────
const QUOTE_FALLBACK = '빛이 머문 자리에 이야기가 남는다'
const QUOTE_SUB_FALLBACK = '카메라는 기억보다 정직하고, 눈보다 솔직합니다.\n그 순간의 온도를 오래 간직하는 일.'

const CSS = `
  @keyframes v1Ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .v1-ticker {
    display: flex; gap: 56px; white-space: nowrap; align-items: center;
    animation: v1Ticker 24s linear infinite;
  }

  /* ── Curtain image (INTRO mainImage only — parallax) ── */
  .v1-curtain { overflow: hidden; position: relative; }
  .v1-curtain img {
    position: absolute; inset: 0;
    width: 100%; height: 115%;
    object-fit: cover; object-position: center top;
    filter: saturate(0.92);
    will-change: transform;
  }

  /* ── Featured cards [0~2] — natural ratio ── */
  .v1-card { overflow: hidden; position: relative; background: #111; }
  .v1-card img {
    width: 100%; height: auto; display: block;
    object-fit: initial;
    filter: saturate(0.85);
    transform-origin: center;
    transition: filter 1.2s ease, transform 1.1s ease;
    will-change: transform, filter;
  }
  .v1-card:hover img { filter: saturate(1); transform: scale(1.01); }

  /* ── Expandable flex gallery [3+] ── */
  .v1-gallery { display: flex; gap: 6px; height: 52vh; padding: 0 64px; overflow: hidden; }
  .v1-gallery-item { overflow: hidden; position: relative; cursor: pointer; }
  .v1-gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease; }
  .v1-gallery-item:hover img { transform: scale(1.05); }

  .v1-img-num {
    position: absolute; top: 14px; left: 14px; z-index: 2;
    font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
    color: rgba(255,255,255,0.22); pointer-events: none;
    transition: color 0.3s ease; mix-blend-mode: screen;
  }
  .v1-curtain:hover .v1-img-num { color: rgba(255,255,255,0.6); }

  /* ── Text split ── */
  .v1-char-wrap { display: inline-block; overflow: hidden; vertical-align: bottom; }
  .v1-char { display: inline-block; will-change: transform; }
  .v1-word-wrap { display: inline-block; overflow: hidden; vertical-align: bottom; }
  .v1-word { display: inline-block; will-change: transform; }

  /* ── Quote word scrub ── */
  .v1-qword { display: inline; opacity: 0.1; will-change: opacity; }

  /* ── Contact ── */
  .v1-contact-row {
    display: flex; align-items: baseline; gap: 24px;
    border-bottom: 1px solid rgba(245,245,245,0.06);
    padding: 22px 0;
    transition: padding-left 0.4s cubic-bezier(0.16,1,0.3,1);
    cursor: default;
  }
  .v1-contact-row:hover { padding-left: 18px; }

  /* ── Scroll indicator ── */
  .v1-scroll-hint {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    animation: v1ScrollHint 2s ease-in-out infinite;
  }
  @keyframes v1ScrollHint {
    0%, 100% { opacity: 0.3; transform: translateY(0); }
    50% { opacity: 0.7; transform: translateY(6px); }
  }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .v1-ticker, .v1-scroll-hint { animation: none !important; }
    .v1-curtain img, .v1-contact-row { transition: none !important; }
    .v1-char, .v1-word { transform: none !important; opacity: 1 !important; }
    .v1-qword { opacity: 1 !important; }
    .v1-curtain { clip-path: none !important; }
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .v1-hero-inner { padding: 0 24px 56px !important; }
    .v1-nav-inner { padding: 20px 24px !important; }
    .v1-intro-grid { grid-template-columns: 1fr !important; }
    .v1-intro-img { height: 70vw !important; }
    .v1-intro-right { padding: 40px 24px 56px !important; }
    .v1-quote-section { padding: 80px 24px !important; }
    .v1-contact-section { padding: 80px 24px !important; }
    .v1-footer-inner { padding: 24px !important; }
    .v1-gallery { padding: 0 24px !important; height: 50vw !important; }
    .v1-card-wrap { padding: 0 24px !important; }
    .v1-card-grid { padding: 0 24px !important; grid-template-columns: 1fr !important; }
    .v1-gallery-header { padding: 0 24px !important; }
  }
`

export default function Variant1({
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
  const [hoveredGalleryIdx, setHoveredGalleryIdx] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const navRef       = useRef<HTMLElement>(null)
  const heroNameRef  = useRef<HTMLDivElement>(null)
  const heroTagRef   = useRef<HTMLDivElement>(null)
  const heroMetaRef  = useRef<HTMLDivElement>(null)
  const scrollerRef  = useRef<HTMLElement | Window | null>(null)

  const accent    = brandColors[0] ?? '#940000'
  const descLines = brandDescription.split(/\r?\n/).filter(Boolean)
  const tagline   = descLines[0] ?? brandName

  // Last line 20자 이상이면 philosophy quote로 분리
  const lastLine  = descLines[descLines.length - 1] ?? ''
  const useLastAsQuote = descLines.length > 1 && lastLine.length >= 20
  const bioLines  = useLastAsQuote ? descLines.slice(1, -1) : descLines.slice(1)
  const quoteText = useLastAsQuote ? lastLine : QUOTE_FALLBACK
  const quoteSub  = QUOTE_SUB_FALLBACK

  const instagramContact = contacts.find((c) => c.type === 'instagram')

  // ── Detect scroll container ───────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let node: HTMLElement | null = el.parentElement
    while (node && node !== document.documentElement) {
      const { overflow, overflowY } = getComputedStyle(node)
      if (['auto', 'scroll'].includes(overflow) || ['auto', 'scroll'].includes(overflowY)) {
        scrollerRef.current = node
        return
      }
      node = node.parentElement
    }
    scrollerRef.current = window
  }, [])

  // ── Hero entrance (post-preloader, immediate — no scroll) ─────────────
  useEffect(() => {
    if (!preloaderDone || isPreview) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Nav slides down
    if (navRef.current) {
      tl.fromTo(navRef.current, { y: -28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0)
    }
    // Brand name — chars slide up from clip mask
    const chars = heroNameRef.current?.querySelectorAll<HTMLElement>('.v1-char')
    if (chars?.length) {
      tl.fromTo(chars, { y: '115%' }, { y: '0%', duration: 1.3, stagger: 0.028 }, 0.1)
    }
    // Tagline — words stagger up
    const words = heroTagRef.current?.querySelectorAll<HTMLElement>('.v1-word')
    if (words?.length) {
      tl.fromTo(words, { y: '75%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.0, stagger: 0.05 }, 0.4)
    }
    // Meta row
    if (heroMetaRef.current) {
      tl.fromTo(heroMetaRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 0.85)
    }
  }, [preloaderDone])

  // ── Scroll-driven animations ──────────────────────────────────────────
  useEffect(() => {
    if (!preloaderDone || !containerRef.current || isPreview) return
    const scroller = scrollerRef.current ?? window

    const ctx = gsap.context(() => {

      // ── INTRO mainImage — curtain reveal + parallax ──
      const curtains = gsap.utils.toArray<HTMLElement>('[data-v1-curtain]', containerRef.current!)
      curtains.forEach((wrap) => {
        const img = wrap.querySelector<HTMLElement>('img')
        gsap.set(wrap, { clipPath: 'inset(0 0 100% 0)' })
        gsap.to(wrap, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.5, ease: 'power3.inOut',
          scrollTrigger: { trigger: wrap, start: 'top 88%', scroller },
        })
        if (img) {
          gsap.fromTo(img, { y: '0%' }, {
            y: '-13%', ease: 'none',
            scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: 1.8, scroller },
          })
        }
      })

      // ── Featured cards [data-v1-card] — curtain reveal + scale ──
      const cards = gsap.utils.toArray<HTMLElement>('[data-v1-card]', containerRef.current!)
      cards.forEach((card) => {
        const img = card.querySelector<HTMLElement>('img')
        gsap.set(card, { clipPath: 'inset(0 0 100% 0)' })
        gsap.to(card, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: card, start: 'top 90%', scroller },
        })
        if (img) {
          gsap.fromTo(img,
            { scale: 1.04 },
            { scale: 1, duration: 1.4, ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 90%', scroller } }
          )
        }
      })

      // ── Intro right: meta labels fade + bio words reveal ──
      const introRight = containerRef.current!.querySelector('.v1-intro-right')
      if (introRight) {
        gsap.fromTo(introRight.querySelectorAll<HTMLElement>('.v1-intro-meta'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: introRight, start: 'top 75%', scroller } }
        )
        const bioWords = introRight.querySelectorAll<HTMLElement>('.v1-bio-word')
        if (bioWords.length) {
          gsap.fromTo(bioWords, { y: '100%' }, {
            y: '0%', duration: 0.9, stagger: 0.022, ease: 'power2.out',
            scrollTrigger: { trigger: introRight, start: 'top 72%', scroller },
          })
        }
        gsap.fromTo(introRight.querySelectorAll<HTMLElement>('.v1-intro-swatches'),
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: introRight, start: 'top 60%', scroller } }
        )
      }

      // ── Philosophy quote word scrub ──
      const quoteEl = containerRef.current!.querySelector('.v1-quote-section')
      if (quoteEl) {
        gsap.to(quoteEl.querySelectorAll<HTMLElement>('.v1-qword'), {
          opacity: 1, stagger: 0.09, ease: 'none',
          scrollTrigger: { trigger: quoteEl, start: 'top 72%', end: 'center 28%', scrub: 1.8, scroller },
        })
        const sub = quoteEl.querySelector('.v1-quote-sub')
        if (sub) {
          gsap.fromTo(sub, { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: quoteEl, start: 'center 60%', scroller } }
          )
        }
      }

      // ── Contact stagger from left ──
      const contactEl = containerRef.current!.querySelector('.v1-contact-section')
      if (contactEl) {
        const label = contactEl.querySelector('.v1-contact-label')
        if (label) {
          gsap.fromTo(label, { opacity: 0 },
            { opacity: 1, duration: 0.6, scrollTrigger: { trigger: contactEl, start: 'top 80%', scroller } }
          )
        }
        gsap.fromTo(contactEl.querySelectorAll<HTMLElement>('.v1-contact-row'),
          { opacity: 0, x: -36 },
          { opacity: 1, x: 0, stagger: 0.09, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: contactEl, start: 'top 80%', scroller } }
        )
      }

    }, containerRef)

    return () => ctx.revert()
  }, [preloaderDone])

  return (
    <div
      ref={containerRef}
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", minHeight: '100vh', background: '#0C0C0C', color: '#F5F5F5' }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {!isPreview && !preloaderDone && (
        <PagePreloader
          brandName={brandName}
          descriptor={tagline}
          accentColor={accent}
          theme="dark"
          variantId={VARIANT_ID}
          onDone={() => setPreloaderDone(true)}
        />
      )}

      {/* ════════════════════════════════════════════════════════
          1. HERO — Typography only, bottom-aligned
      ════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative', minHeight: '100vh',
          display: 'flex', flexDirection: 'column',
          background: `linear-gradient(160deg, #0C0C0C 70%, ${accent}12)`,
          overflow: 'hidden',
        }}
      >
        {/* Nav */}
        <header
          ref={navRef}
          className="v1-nav-inner"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
            padding: '22px 48px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            opacity: 0,
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.4)' }}>
            {brandName}
          </span>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {instagramContact && (
              <span style={{ fontSize: '11px', color: 'rgba(245,245,245,0.3)', letterSpacing: '0.04em' }}>
                {instagramContact.value}
              </span>
            )}
            <span style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, fontWeight: 600 }}>
              {websiteType ?? 'Portfolio'}
            </span>
          </div>
        </header>

        {/* Typography — bottom-aligned */}
        <div
          className="v1-hero-inner"
          style={{ marginTop: 'auto', position: 'relative', padding: '0 48px 88px' }}
        >
          {/* Brand name — char split */}
          <div ref={heroNameRef} aria-label={brandName} style={{ marginBottom: '20px' }}>
            <h1
              style={{
                fontSize: 'clamp(60px, 10vw, 144px)',
                fontWeight: 800,
                letterSpacing: '-0.055em',
                lineHeight: 0.9,
                color: '#F5F5F5',
                margin: 0, padding: 0,
                display: 'flex', flexWrap: 'wrap',
              }}
            >
              {brandName.split('').map((char, i) => (
                <span key={i} className="v1-char-wrap">
                  <span className="v1-char">{char === ' ' ? '\u00A0' : char}</span>
                </span>
              ))}
            </h1>
          </div>

          {/* Tagline — word split */}
          <div ref={heroTagRef} style={{ marginBottom: '40px', maxWidth: '560px' }}>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 18px)', fontWeight: 400, lineHeight: 1.7, color: 'rgba(245,245,245,0.48)', margin: 0, letterSpacing: '-0.003em' }}>
              {tagline.split(' ').map((word, i, arr) => (
                <span key={i} className="v1-word-wrap">
                  <span className="v1-word">{word}{i < arr.length - 1 ? '\u00A0' : ''}</span>
                </span>
              ))}
            </p>
          </div>

          {/* Meta row */}
          <div ref={heroMetaRef} style={{ display: 'flex', alignItems: 'center', gap: '20px', opacity: 0 }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {brandColors.map((c, i) => (
                <div key={i} style={{ height: '2px', width: '32px', background: c }} />
              ))}
            </div>
            <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, fontWeight: 600 }}>
              {websiteType ?? 'Portfolio'}
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute', bottom: '36px', right: '48px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          }}
        >
          <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.22)', writingMode: 'vertical-rl' }}>
            Scroll
          </span>
          <div className="v1-scroll-hint" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '1px', height: '40px', background: 'rgba(245,245,245,0.15)' }} />
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: accent }} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. INTRO — mainImage (좌) + 자기소개 (우)
      ════════════════════════════════════════════════════════ */}
      {(mainImageUrl || bioLines.length > 0) && (
        <section style={{ background: '#0C0C0C' }}>
          <div
            className="v1-intro-grid"
            style={{ display: 'grid', gridTemplateColumns: mainImageUrl ? '55fr 45fr' : '1fr', minHeight: '100vh' }}
          >
            {/* Left — mainImage curtain reveal */}
            {mainImageUrl && (
              <div
                data-v1-curtain
                className="v1-curtain v1-intro-img"
                style={{ height: '100vh', position: 'sticky', top: 0 }}
              >
                <img src={mainImageUrl} alt={`${brandName} 대표 이미지`} />
              </div>
            )}

            {/* Right — bio */}
            <div
              className="v1-intro-right"
              style={{
                padding: '80px 56px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                minHeight: '100vh',
              }}
            >
              <p className="v1-intro-meta" style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.28)', margin: '0 0 20px' }}>
                About
              </p>
              <p className="v1-intro-meta" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, margin: '0 0 6px', fontWeight: 700 }}>
                {brandName}
              </p>
              <p className="v1-intro-meta" style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.28)', margin: '0 0 44px' }}>
                {websiteType ?? 'Portfolio'}
              </p>

              {/* Bio text — word split */}
              <div style={{ marginBottom: '48px' }}>
                {(bioLines.length > 0 ? bioLines : [tagline]).map((line, li) => (
                  <p key={li} style={{ margin: '0 0 16px', lineHeight: li === 0 ? 1.35 : 1.85 }}>
                    <span style={{
                      display: 'block',
                      fontSize: li === 0 ? 'clamp(20px, 2.4vw, 30px)' : '15px',
                      fontWeight: li === 0 ? 600 : 400,
                      letterSpacing: li === 0 ? '-0.025em' : '-0.003em',
                      color: li === 0 ? '#F5F5F5' : 'rgba(245,245,245,0.55)',
                    }}>
                      {line.split(' ').map((word, wi, arr) => (
                        <span key={wi} className="v1-word-wrap">
                          <span className="v1-bio-word">{word}{wi < arr.length - 1 ? '\u00A0' : ''}</span>
                        </span>
                      ))}
                    </span>
                  </p>
                ))}
              </div>

              {/* Color swatches */}
              <div className="v1-intro-swatches" style={{ display: 'flex', gap: '10px' }}>
                {brandColors.map((c, i) => (
                  <div
                    key={i}
                    style={{ width: '28px', height: '28px', background: c, border: '1px solid rgba(245,245,245,0.08)' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          3a. FEATURED CARDS — imageUrls[0~2], 자연비율
      ════════════════════════════════════════════════════════ */}
      {imageUrls.length > 0 && (
        <div style={{ background: '#0C0C0C', padding: '80px 0 0' }}>
          {/* Card 0 — solo */}
          <div className="v1-card-wrap" style={{ padding: '0 64px', marginBottom: '12px' }}>
            <div data-v1-card className="v1-card" style={{ position: 'relative' }}>
              <span className="v1-img-num">01</span>
              <img src={imageUrls[0]} alt={`${brandName} 01`} />
            </div>
          </div>

          {/* Cards [1] + [2] — 2-col equal */}
          {imageUrls[1] && (
            <div className="v1-card-grid" style={{ padding: '0 64px', display: 'grid', gridTemplateColumns: imageUrls[2] ? '1fr 1fr' : '1fr', gap: '12px' }}>
              <div data-v1-card className="v1-card" style={{ position: 'relative' }}>
                <span className="v1-img-num">02</span>
                <img src={imageUrls[1]} alt={`${brandName} 02`} />
              </div>
              {imageUrls[2] && (
                <div data-v1-card className="v1-card" style={{ position: 'relative' }}>
                  <span className="v1-img-num">03</span>
                  <img src={imageUrls[2]} alt={`${brandName} 03`} />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          3b. EXPANDABLE GALLERY — imageUrls[3+]
      ════════════════════════════════════════════════════════ */}
      {imageUrls.length > 3 && (
        <div style={{ background: '#0C0C0C', padding: '48px 0 80px' }}>
          <div className="v1-gallery-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 64px', marginBottom: '16px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.28)' }}>Works</span>
            <span style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(245,245,245,0.2)' }}>{imageUrls.length - 3} images</span>
          </div>
          <div className="v1-gallery">
            {imageUrls.slice(3).map((url, i) => {
              const flex = hoveredGalleryIdx === i
                ? 2.5
                : hoveredGalleryIdx !== null ? 0.5 : 1
              return (
                <div
                  key={i}
                  className="v1-gallery-item"
                  style={{ flex, transition: 'flex 0.5s cubic-bezier(0.4,0,0.2,1)' }}
                  onMouseEnter={() => setHoveredGalleryIdx(i)}
                  onMouseLeave={() => setHoveredGalleryIdx(null)}
                >
                  <img src={url} alt={`${brandName} ${i + 4}`} />
                  <span className="v1-img-num">{String(i + 4).padStart(2, '0')}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          4. PHILOSOPHY — 브랜드 기반 quote, word scrub
      ════════════════════════════════════════════════════════ */}
      <section className="v1-quote-section" style={{ background: '#F0EFE9', color: '#0C0C0C', padding: '120px 48px' }}>
        <div style={{ maxWidth: '800px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(12,12,12,0.28)', marginBottom: '44px' }}>
            Philosophy
          </p>
          <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '28px', marginBottom: '32px' }}>
            <p style={{ fontSize: 'clamp(26px, 3.4vw, 54px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2, margin: 0 }}>
              {quoteText.split(' ').map((word, i, arr) => (
                <span key={i} className="v1-qword">{word}{i < arr.length - 1 ? ' ' : ''}</span>
              ))}
            </p>
          </div>
          <p
            className="v1-quote-sub"
            style={{ fontSize: '15px', color: 'rgba(12,12,12,0.5)', lineHeight: 1.9, letterSpacing: '-0.003em', margin: 0, paddingLeft: '31px', opacity: 0, whiteSpace: 'pre-line' }}
          >
            {quoteSub}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. TICKER
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: accent, padding: '36px 0', overflow: 'hidden' }}>
        <div className="v1-ticker">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              style={{ fontSize: 'clamp(11px, 1.4vw, 15px)', fontWeight: 500, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase', flexShrink: 0 }}
            >
              {tagline}
              <span style={{ margin: '0 32px', color: 'rgba(255,255,255,0.1)' }}>—</span>
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. CONTACT
      ════════════════════════════════════════════════════════ */}
      {contacts.length > 0 && (
        <section className="v1-contact-section" style={{ background: '#111', padding: '100px 48px' }}>
          <p
            className="v1-contact-label"
            style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.2)', marginBottom: '48px', opacity: 0 }}
          >
            Contact
          </p>
          <div style={{ maxWidth: '700px' }}>
            {contacts.map((c) => (
              <div key={c.type} className="v1-contact-row">
                <span style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, width: '90px', flexShrink: 0, fontWeight: 600 }}>
                  {CONTACT_LABELS[c.type] ?? c.type}
                </span>
                <span style={{ fontSize: 'clamp(16px, 2.2vw, 28px)', fontWeight: 300, color: '#F5F5F5', letterSpacing: '-0.01em' }}>
                  {c.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          7. FOOTER
      ════════════════════════════════════════════════════════ */}
      <footer
        className="v1-footer-inner"
        style={{ background: '#0C0C0C', borderTop: '1px solid rgba(245,245,245,0.06)', padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}
      >
        <span style={{ fontSize: '11px', color: 'rgba(245,245,245,0.2)', letterSpacing: '0.05em' }}>
          © {brandName}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {brandColors.map((c, i) => (
            <span key={i} style={{ width: '10px', height: '10px', background: c, border: '1px solid rgba(245,245,245,0.08)', display: 'inline-block' }} />
          ))}
        </div>
      </footer>
    </div>
  )
}
