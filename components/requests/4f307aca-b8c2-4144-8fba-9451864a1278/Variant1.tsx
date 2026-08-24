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

// ── Work project creative copy (photography) ─────────────────────────────
const WORK_TITLES = [
  '빛의 조각', '숨결이 머문 곳', '고요한 순간들',
  '경계의 빛', '감정의 온도', '시선이 닿는 곳', '기억의 형태', '존재의 결',
]
const WORK_TAGS = [
  ['Emotional', 'Editorial', 'Natural Light'],
  ['Nature', 'Emotion', 'Documentary'],
  ['Brand', 'Commercial', 'Identity'],
  ['Space', 'Architecture', 'Atmosphere'],
  ['Lifestyle', 'Family', 'Connection'],
  ['Event', 'Moment', 'Candid'],
  ['Product', 'Still', 'Commercial'],
  ['Film', 'Reels', 'Motion'],
]

// ── Photography service cards ─────────────────────────────────────────────
const SERVICES = [
  { code: '01', title: '웨딩 & 커플', desc: '두 사람의 이야기를 빛으로 기록합니다' },
  { code: '02', title: '프로필 촬영', desc: '당신만의 아이덴티티를 포착합니다' },
  { code: '03', title: '브랜드 촬영', desc: '브랜드의 철학을 이미지로 번역합니다' },
  { code: '04', title: '공간 & 인테리어', desc: '공간이 가진 고유한 분위기를 담습니다' },
  { code: '05', title: '가족 & 신생아', desc: '시간이 지나도 변하지 않는 순간들' },
  { code: '06', title: '행사 & 이벤트', desc: '특별한 날의 모든 감동을 기록합니다' },
  { code: '07', title: '제품 & 스틸', desc: '제품의 가치를 극대화하는 시각화' },
  { code: '08', title: '영상 & 릴스', desc: '움직이는 이미지로 전하는 브랜드 스토리' },
]

// ── Fallback copy ─────────────────────────────────────────────────────────
const QUOTE_FALLBACK = '빛이 머문 자리에 이야기가 남는다'
const QUOTE_SUB_FALLBACK = '카메라는 기억보다 정직하고, 눈보다 솔직합니다.\n그 순간의 온도를 오래 간직하는 일.'

const CSS = `
  @keyframes v1Ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .v1-ticker {
    display: flex; gap: 56px; white-space: nowrap; align-items: center;
    animation: v1Ticker 28s linear infinite;
  }

  /* ── NAV ── */
  .v1-nav {
    position: sticky; top: 0; z-index: 50;
    background: rgba(12,12,12,0.88);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(245,245,245,0.05);
  }
  .v1-nav-inner {
    display: flex; justify-content: space-between; align-items: center;
    padding: 18px 56px;
  }
  .v1-nav-links { display: flex; gap: 32px; align-items: center; }
  .v1-nav-link {
    font-size: 10px; font-weight: 600; letter-spacing: 0.18em;
    text-transform: uppercase; color: rgba(245,245,245,0.36);
    text-decoration: none; transition: color 0.25s;
    cursor: pointer; background: none; border: none; padding: 0;
  }
  .v1-nav-link:hover { color: rgba(245,245,245,0.9); }

  /* ── HERO ── */
  .v1-hero {
    display: grid; grid-template-columns: 44fr 56fr;
    height: 100vh; min-height: 600px; overflow: hidden;
  }
  .v1-hero-left {
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 48px 56px;
    border-right: 1px solid rgba(245,245,245,0.08);
    background: #0C0C0C;
  }
  .v1-hero-box {
    border: 1px solid rgba(245,245,245,0.18);
    padding: 36px 40px;
    flex: 1; display: flex; flex-direction: column; justify-content: space-between;
    margin: 24px 0;
  }
  .v1-hero-right {
    overflow: hidden; position: relative; background: #111;
  }
  .v1-hero-right img {
    width: 100%; height: 100%; object-fit: cover; object-position: center;
    filter: saturate(0.88); display: block;
  }

  /* ── INTRO GRID ── */
  .v1-intro-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2px; height: 58vh; background: #0C0C0C;
  }
  .v1-intro-cell {
    overflow: hidden; position: relative; background: #111;
  }
  .v1-intro-cell img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: saturate(0.85);
    transition: transform 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.9s ease;
  }
  .v1-intro-cell:hover img { transform: scale(1.05); filter: saturate(1); }

  /* ── WORK rows ── */
  .v1-work-section { padding: 80px 0 60px; }
  .v1-work-header { padding: 0 56px; margin-bottom: 40px; display: flex; align-items: baseline; gap: 20px; }
  .v1-work-row {
    position: relative; overflow: hidden;
    display: flex; align-items: baseline; gap: 0;
    border-top: 1px solid rgba(245,245,245,0.07);
    padding: 28px 56px;
    cursor: default;
    transition: background 0.3s ease, padding-left 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .v1-work-row:last-child { border-bottom: 1px solid rgba(245,245,245,0.07); }
  .v1-work-row:hover { background: rgba(245,245,245,0.02); padding-left: 72px; }
  .v1-work-num {
    font-size: 10px; font-weight: 600; letter-spacing: 0.14em;
    color: rgba(245,245,245,0.22); width: 52px; flex-shrink: 0;
  }
  .v1-work-title {
    font-size: clamp(20px, 2.4vw, 34px); font-weight: 700;
    letter-spacing: -0.03em; color: #F5F5F5;
    flex: 1; min-width: 0;
  }
  .v1-work-tags {
    display: flex; gap: 10px; align-items: center;
    padding: 0 32px;
  }
  .v1-work-tag {
    font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(245,245,245,0.28);
  }
  .v1-work-count {
    font-size: 10px; letter-spacing: 0.1em;
    color: rgba(245,245,245,0.18); font-weight: 500;
    min-width: 36px; text-align: right;
  }
  /* Hover preview */
  .v1-work-preview {
    position: absolute; right: 56px; top: 50%;
    transform: translateY(-50%);
    width: 280px; height: 180px;
    overflow: hidden; pointer-events: none;
    opacity: 0;
    transition: opacity 0.35s ease;
    z-index: 3;
    border: 1px solid rgba(245,245,245,0.08);
  }
  .v1-work-preview img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .v1-work-row:hover .v1-work-preview { opacity: 1; }
  /* When hovered, push count/tags behind preview */
  .v1-work-row:hover .v1-work-tags,
  .v1-work-row:hover .v1-work-count { opacity: 0; transition: opacity 0.2s; }

  /* ── SERVICES ── */
  .v1-services-section { padding: 100px 56px; background: #111; }
  .v1-services-header { margin-bottom: 64px; }
  .v1-services-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
    border: 1px solid rgba(245,245,245,0.07);
  }
  .v1-service-card {
    padding: 36px 28px;
    border-right: 1px solid rgba(245,245,245,0.07);
    border-bottom: 1px solid rgba(245,245,245,0.07);
    background: #111;
    transition: background 0.3s;
  }
  .v1-service-card:hover { background: rgba(245,245,245,0.03); }
  .v1-service-card:nth-child(4n) { border-right: none; }

  /* ── ABOUT ── */
  .v1-about-section { padding: 100px 56px; background: #0C0C0C; }
  .v1-about-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
    margin-top: 64px;
  }
  .v1-about-img-wrap {
    overflow: hidden; margin-bottom: 40px; line-height: 0;
  }
  .v1-about-img-wrap img {
    width: 100%; max-width: 55%; height: auto; display: block;
    object-fit: initial;
    filter: saturate(0.88);
  }
  .v1-roster-item {
    display: flex; align-items: baseline; gap: 16px;
    border-bottom: 1px solid rgba(245,245,245,0.06);
    padding: 18px 0;
    transition: padding-left 0.35s cubic-bezier(0.16,1,0.3,1);
    cursor: default;
  }
  .v1-roster-item:hover { padding-left: 12px; }

  /* ── TICKER + CTA ── */
  .v1-bottom-row { display: flex; background: #111; }
  .v1-ticker-wrap {
    flex: 2; padding: 40px 0; overflow: hidden;
    border-right: 1px solid rgba(245,245,245,0.06);
  }
  .v1-cta-block {
    flex: 1; padding: 48px 44px;
    display: flex; flex-direction: column; justify-content: center;
  }

  /* ── PHILOSOPHY ── */
  .v1-philosophy { padding: 120px 56px; background: #F0EFE9; color: #0C0C0C; }
  .v1-qword { display: inline; opacity: 0.1; will-change: opacity; }
  .v1-quote-sub { opacity: 0; }

  /* ── Text split utilities ── */
  .v1-char-wrap { display: inline-block; overflow: hidden; vertical-align: bottom; }
  .v1-char { display: inline-block; will-change: transform; }
  .v1-word-wrap { display: inline-block; overflow: hidden; vertical-align: bottom; }
  .v1-word { display: inline-block; will-change: transform; }

  /* ── Scroll indicator ── */
  @keyframes v1ScrollHint {
    0%, 100% { opacity: 0.28; transform: translateY(0); }
    50%       { opacity: 0.6;  transform: translateY(6px); }
  }
  .v1-scroll-hint { animation: v1ScrollHint 2.2s ease-in-out infinite; }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .v1-ticker, .v1-scroll-hint { animation: none !important; }
    .v1-char, .v1-word { transform: none !important; opacity: 1 !important; }
    .v1-qword { opacity: 1 !important; }
    .v1-quote-sub { opacity: 1 !important; }
    .v1-work-row { transition: none !important; }
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .v1-nav-inner { padding: 16px 24px !important; }
    .v1-nav-links { gap: 18px !important; }
    .v1-hero { grid-template-columns: 1fr !important; height: auto !important; }
    .v1-hero-left { min-height: 60vh; padding: 36px 24px !important; }
    .v1-hero-right { height: 70vw; }
    .v1-intro-grid { grid-template-columns: 1fr !important; height: auto !important; }
    .v1-intro-cell { height: 60vw; }
    .v1-work-header { padding: 0 24px !important; }
    .v1-work-row { padding: 22px 24px !important; }
    .v1-work-row:hover { padding-left: 32px !important; }
    .v1-work-title { font-size: 18px !important; }
    .v1-work-tags { display: none !important; }
    .v1-work-preview { width: 160px !important; height: 110px !important; right: 24px !important; }
    .v1-services-section { padding: 80px 24px !important; }
    .v1-services-grid { grid-template-columns: 1fr 1fr !important; }
    .v1-about-section { padding: 80px 24px !important; }
    .v1-about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
    .v1-about-img-wrap img { max-width: 80% !important; }
    .v1-philosophy { padding: 80px 24px !important; }
    .v1-bottom-row { flex-direction: column !important; }
    .v1-ticker-wrap { border-right: none !important; border-bottom: 1px solid rgba(245,245,245,0.06) !important; }
    .v1-cta-block { padding: 40px 24px !important; }
  }
  @media (max-width: 480px) {
    .v1-services-grid { grid-template-columns: 1fr !important; }
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

  const containerRef  = useRef<HTMLDivElement>(null)
  const navRef        = useRef<HTMLElement>(null)
  const heroNameRef   = useRef<HTMLDivElement>(null)
  const heroTagRef    = useRef<HTMLDivElement>(null)
  const heroMetaRef   = useRef<HTMLDivElement>(null)
  const scrollerRef   = useRef<HTMLElement | Window | null>(null)

  const accent    = brandColors[0] ?? '#940000'
  const descLines = brandDescription.split(/\r?\n/).filter(Boolean)
  const tagline   = descLines[0] ?? brandName

  const lastLine       = descLines[descLines.length - 1] ?? ''
  const useLastAsQuote = descLines.length > 1 && lastLine.length >= 20
  const bioLines       = useLastAsQuote ? descLines.slice(1, -1) : descLines.slice(1)
  const quoteText      = useLastAsQuote ? lastLine : QUOTE_FALLBACK
  const quoteSub       = QUOTE_SUB_FALLBACK

  // Image distribution
  // imageUrls[0]    → HERO 우측 이미지 박스
  // imageUrls[1-3]  → INTRO GRID 3-col strip (총 4개 미만이면 grid 생략)
  // imageUrls[4+]   → WORK rows hover preview
  // mainImageUrl    → ABOUT 섹션 포트레이트
  const heroImg  = imageUrls[0] ?? null
  const hasGrid  = imageUrls.length >= 4
  const gridImgs = hasGrid ? imageUrls.slice(1, 4) : []
  const workImgs = hasGrid ? imageUrls.slice(4) : imageUrls.slice(1)
  const aboutImg = mainImageUrl ?? (imageUrls.length >= 2 ? imageUrls[imageUrls.length - 1] : null)

  const instagramContact = contacts.find((c) => c.type === 'instagram')

  // ── Detect scroll container ─────────────────────────────────────────────
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

  // ── Hero entrance (post-preloader) ──────────────────────────────────────
  useEffect(() => {
    if (!preloaderDone || isPreview) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (navRef.current) {
      tl.fromTo(navRef.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0)
    }
    const chars = heroNameRef.current?.querySelectorAll<HTMLElement>('.v1-char')
    if (chars?.length) {
      tl.fromTo(chars, { y: '115%' }, { y: '0%', duration: 1.3, stagger: 0.028 }, 0.1)
    }
    const words = heroTagRef.current?.querySelectorAll<HTMLElement>('.v1-word')
    if (words?.length) {
      tl.fromTo(words, { y: '75%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.0, stagger: 0.05 }, 0.4)
    }
    if (heroMetaRef.current) {
      tl.fromTo(heroMetaRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 0.85)
    }
  }, [preloaderDone, isPreview])

  // ── Scroll animations ──────────────────────────────────────────────────
  useEffect(() => {
    if (!preloaderDone || !containerRef.current || isPreview) return
    const scroller = scrollerRef.current ?? window

    const ctx = gsap.context(() => {

      // Work rows stagger
      const workRows = gsap.utils.toArray<HTMLElement>('[data-v1-work-row]', containerRef.current!)
      if (workRows.length) {
        gsap.fromTo(workRows, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, stagger: 0.07, duration: 0.75, ease: 'power2.out',
          scrollTrigger: { trigger: workRows[0], start: 'top 85%', scroller },
        })
      }

      // Service cards stagger
      const services = gsap.utils.toArray<HTMLElement>('[data-v1-service]', containerRef.current!)
      if (services.length) {
        gsap.fromTo(services, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, stagger: 0.055, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: services[0], start: 'top 88%', scroller },
        })
      }

      // About section
      const aboutEl = containerRef.current!.querySelector('.v1-about-section')
      if (aboutEl) {
        gsap.fromTo(aboutEl.querySelectorAll<HTMLElement>('[data-v1-about-item]'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.75, ease: 'power2.out',
            scrollTrigger: { trigger: aboutEl, start: 'top 80%', scroller } }
        )
      }

      // Philosophy quote word scrub
      const quoteEl = containerRef.current!.querySelector('.v1-philosophy')
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

      // CTA block
      const ctaEl = containerRef.current!.querySelector('[data-v1-cta]')
      if (ctaEl) {
        gsap.fromTo(ctaEl.querySelectorAll<HTMLElement>('[data-v1-cta-item]'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: ctaEl, start: 'top 85%', scroller } }
        )
      }

    }, containerRef)

    return () => ctx.revert()
  }, [preloaderDone, isPreview])

  return (
    <div
      ref={containerRef}
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#0C0C0C', color: '#F5F5F5' }}
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
          1. STICKY NAV
      ════════════════════════════════════════════════════════ */}
      <header
        ref={navRef}
        className="v1-nav"
        style={{ opacity: isPreview ? 1 : 0 }}
      >
        <div className="v1-nav-inner">
          <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.5)' }}>
            {brandName}
          </span>
          <nav className="v1-nav-links">
            {['WORK', 'ABOUT', 'CONTACT'].map((label) => (
              <a
                key={label}
                href={`#v1-${label.toLowerCase()}`}
                className="v1-nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  containerRef.current
                    ?.querySelector(`#v1-${label.toLowerCase()}`)
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {label}
              </a>
            ))}
            {instagramContact && (
              <span style={{ fontSize: '10px', color: accent, letterSpacing: '0.1em', fontWeight: 600 }}>
                {instagramContact.value}
              </span>
            )}
          </nav>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════
          2. HERO — 2-col split: text box (left) + image (right)
      ════════════════════════════════════════════════════════ */}
      <section className="v1-hero">
        {/* Left — text panel */}
        <div className="v1-hero-left">
          {/* Top label */}
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.3)', fontWeight: 600, margin: 0 }}>
            {websiteType ?? 'Portfolio'}
          </p>

          {/* Central bordered box */}
          <div className="v1-hero-box">
            {/* Brand caption */}
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, fontWeight: 700, margin: '0 0 14px' }}>
              {brandName}
            </p>

            {/* Brand name — char split headline */}
            <div ref={heroNameRef} aria-label={brandName} style={{ marginBottom: '16px' }}>
              <h1 style={{ fontSize: 'clamp(28px, 3.8vw, 60px)', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.92, color: '#F5F5F5', margin: 0, display: 'flex', flexWrap: 'wrap' }}>
                {brandName.split('').map((char, i) => (
                  <span key={i} className="v1-char-wrap">
                    <span className="v1-char">{char === ' ' ? '\u00A0' : char}</span>
                  </span>
                ))}
              </h1>
            </div>

            {/* Tagline — word split */}
            <div ref={heroTagRef}>
              <p style={{ fontSize: 'clamp(12px, 1.2vw, 15px)', fontWeight: 400, lineHeight: 1.65, color: 'rgba(245,245,245,0.55)', margin: 0, letterSpacing: '-0.003em' }}>
                {tagline.split(' ').map((word, i, arr) => (
                  <span key={i} className="v1-word-wrap">
                    <span className="v1-word">{word}{i < arr.length - 1 ? '\u00A0' : ''}</span>
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Bottom — color bars + scroll hint */}
          <div ref={heroMetaRef} style={{ display: 'flex', alignItems: 'center', gap: '16px', opacity: 0 }}>
            <div style={{ display: 'flex', gap: '3px' }}>
              {brandColors.map((c, i) => (
                <div key={i} style={{ height: '2px', width: '28px', background: c }} />
              ))}
            </div>
            <div className="v1-scroll-hint" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '1px', height: '32px', background: 'rgba(245,245,245,0.12)' }} />
              <span style={{ fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.2)', writingMode: 'vertical-rl' }}>
                Scroll
              </span>
            </div>
          </div>
        </div>

        {/* Right — image panel */}
        <div className="v1-hero-right">
          {heroImg ? (
            <img src={heroImg} alt={`${brandName} hero`} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, #111 60%, ${accent}18)` }} />
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. INTRO GRID — imageUrls[1,2,3] 3-col strip
      ════════════════════════════════════════════════════════ */}
      {gridImgs.length > 0 && (
        <div className="v1-intro-grid">
          {gridImgs.map((url, i) => (
            <div key={i} className="v1-intro-cell">
              <img src={url} alt={`${brandName} ${i + 1}`} />
            </div>
          ))}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          4. WORK — Indexed rows
      ════════════════════════════════════════════════════════ */}
      {workImgs.length > 0 && (
        <section id="v1-work" className="v1-work-section" style={{ background: '#0C0C0C' }}>
          <div className="v1-work-header">
            <span style={{ fontSize: 'clamp(28px, 3.6vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#F5F5F5' }}>
              WORK
            </span>
            <span style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(245,245,245,0.2)' }}>
              {workImgs.length} projects
            </span>
          </div>

          {workImgs.map((url, i) => {
            const titleIdx = i % WORK_TITLES.length
            const tagsIdx  = i % WORK_TAGS.length
            return (
              <div
                key={i}
                data-v1-work-row
                className="v1-work-row"
              >
                <span className="v1-work-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="v1-work-title">{WORK_TITLES[titleIdx]}</span>
                <div className="v1-work-tags">
                  {WORK_TAGS[tagsIdx].map((tag) => (
                    <span key={tag} className="v1-work-tag">{tag}</span>
                  ))}
                </div>
                <span className="v1-work-count">{i + 1}/{workImgs.length}</span>

                {/* Hover preview */}
                <div className="v1-work-preview">
                  <img src={url} alt={WORK_TITLES[titleIdx]} />
                </div>
              </div>
            )
          })}
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          5. SERVICES — 4×2 grid
      ════════════════════════════════════════════════════════ */}
      <section className="v1-services-section">
        <div className="v1-services-header">
          <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.28)', margin: '0 0 16px' }}>
            Services
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#F5F5F5', margin: '0 0 16px' }}>
            SERVICES
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(245,245,245,0.38)', lineHeight: 1.7, margin: 0, maxWidth: '480px' }}>
            {bioLines[0] ?? `${brandName}의 모든 순간을 특별하게 담습니다. — `}
            <span style={{ color: accent }}>문의하기</span>
          </p>
        </div>

        <div className="v1-services-grid">
          {SERVICES.map((svc) => (
            <div
              key={svc.code}
              data-v1-service
              className="v1-service-card"
            >
              <p style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, margin: '0 0 16px', fontWeight: 700 }}>
                {svc.code} / SERVICE
              </p>
              <p style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#F5F5F5', margin: '0 0 12px' }}>
                {svc.title}
              </p>
              <p style={{ fontSize: '12px', color: 'rgba(245,245,245,0.38)', lineHeight: 1.65, margin: 0 }}>
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. PHILOSOPHY — quote word scrub
      ════════════════════════════════════════════════════════ */}
      <section className="v1-philosophy">
        <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(12,12,12,0.28)', marginBottom: '44px' }}>
          Philosophy
        </p>
        <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '28px', marginBottom: '32px', maxWidth: '800px' }}>
          <p style={{ fontSize: 'clamp(26px, 3.4vw, 54px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2, margin: 0, color: '#0C0C0C' }}>
            {quoteText.split(' ').map((word, i, arr) => (
              <span key={i} className="v1-qword">{word}{i < arr.length - 1 ? ' ' : ''}</span>
            ))}
          </p>
        </div>
        <p
          className="v1-quote-sub"
          style={{ fontSize: '15px', color: 'rgba(12,12,12,0.5)', lineHeight: 1.9, letterSpacing: '-0.003em', margin: 0, paddingLeft: '31px', whiteSpace: 'pre-line', maxWidth: '640px' }}
        >
          {quoteSub}
        </p>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. ABOUT — Bio (left) + Roster (right)
      ════════════════════════════════════════════════════════ */}
      <section id="v1-about" className="v1-about-section">
        <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.28)', margin: '0 0 16px' }}>
          About
        </p>
        <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#F5F5F5', margin: 0 }}>
          ABOUT
        </h2>

        <div className="v1-about-grid">
          {/* Left — Bio */}
          <div>
            {aboutImg && (
              <div data-v1-about-item className="v1-about-img-wrap">
                <img src={aboutImg} alt={`${brandName} about`} />
              </div>
            )}
            <div>
              {(bioLines.length > 0 ? bioLines : [tagline]).map((line, li) => (
                <p
                  key={li}
                  data-v1-about-item
                  style={{
                    fontSize: li === 0 ? 'clamp(18px, 2vw, 26px)' : '14px',
                    fontWeight: li === 0 ? 600 : 400,
                    letterSpacing: li === 0 ? '-0.025em' : '-0.003em',
                    lineHeight: li === 0 ? 1.4 : 1.85,
                    color: li === 0 ? '#F5F5F5' : 'rgba(245,245,245,0.5)',
                    margin: '0 0 18px',
                  }}
                >
                  {line}
                </p>
              ))}
              <div data-v1-about-item style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                {brandColors.map((c, i) => (
                  <div key={i} style={{ width: '24px', height: '24px', background: c, border: '1px solid rgba(245,245,245,0.08)' }} />
                ))}
              </div>
            </div>
          </div>

          {/* Right — Roster / Contacts */}
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.28)', margin: '0 0 32px' }}>
              ROSTER
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(245,245,245,0.38)', lineHeight: 1.7, margin: '0 0 40px', maxWidth: '360px' }}>
              {bioLines[1] ?? '함께하는 모든 순간이 작품이 됩니다. 촬영 의뢰 및 협업 문의는 아래 채널을 통해 연락 주세요.'}
            </p>
            {contacts.length > 0 ? (
              contacts.map((c) => (
                <div key={c.type} data-v1-about-item className="v1-roster-item">
                  <span style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, width: '80px', flexShrink: 0, fontWeight: 700 }}>
                    {CONTACT_LABELS[c.type] ?? c.type}
                  </span>
                  <span style={{ fontSize: 'clamp(14px, 1.8vw, 20px)', fontWeight: 300, color: '#F5F5F5', letterSpacing: '-0.01em' }}>
                    {c.value}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ fontSize: '13px', color: 'rgba(245,245,245,0.2)', fontStyle: 'italic' }}>
                연락처를 추가해주세요
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. TICKER + CTA BLOCK
      ════════════════════════════════════════════════════════ */}
      <div id="v1-contact" className="v1-bottom-row">
        {/* Ticker */}
        <div className="v1-ticker-wrap">
          <div className="v1-ticker">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                style={{ fontSize: 'clamp(11px, 1.3vw, 14px)', fontWeight: 500, letterSpacing: '0.14em', color: 'rgba(245,245,245,0.28)', textTransform: 'uppercase', flexShrink: 0 }}
              >
                {tagline}
                <span style={{ margin: '0 32px', color: 'rgba(245,245,245,0.08)' }}>—</span>
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          data-v1-cta
          className="v1-cta-block"
          style={{ background: accent }}
        >
          <p data-v1-cta-item style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 16px', opacity: 0 }}>
            CONTACT CTA
          </p>
          <h3 data-v1-cta-item style={{ fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#FFF', margin: '0 0 12px', lineHeight: 1.05, opacity: 0 }}>
            LET&apos;S TALK
          </h3>
          <p data-v1-cta-item style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: '0 0 28px', opacity: 0 }}>
            지금 바로 시작할 준비가 됐나요?<br />
            촬영 의뢰 · 협업 · 문의
          </p>
          {contacts[0] && (
            <div data-v1-cta-item style={{ opacity: 0 }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                {contacts[0].value}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          9. FOOTER
      ════════════════════════════════════════════════════════ */}
      <footer
        style={{ background: '#0C0C0C', borderTop: '1px solid rgba(245,245,245,0.05)', padding: '20px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}
      >
        <span style={{ fontSize: '11px', color: 'rgba(245,245,245,0.18)', letterSpacing: '0.05em' }}>
          © {brandName}
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {brandColors.map((c, i) => (
            <span key={i} style={{ width: '8px', height: '8px', background: c, border: '1px solid rgba(245,245,245,0.06)', display: 'inline-block' }} />
          ))}
        </div>
      </footer>
    </div>
  )
}
