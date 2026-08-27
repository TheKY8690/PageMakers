'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react'
import type { TemplateProps } from '@/lib/templates/types'
import PagePreloader from './PagePreloader'
import * as s from '@/styles/requests/4f307aca/v2.css'

const VARIANT_ID = '4f307aca-v2'

const CONTACT_LABELS: Record<string, string> = {
  phone: '전화', kakao: '카카오', instagram: 'Instagram',
  naver: '네이버', youtube: 'YouTube', facebook: 'Facebook',
  twitter: 'X', tiktok: 'TikTok',
}

const SERVICES = [
  { num: '01', title: 'Emotional Photography', desc: '자연광과 시선을 담는 감성사진' },
  { num: '02', title: 'Lifestyle Photography', desc: '일상 속 특별한 순간들을 기록합니다' },
  { num: '03', title: 'Branding & Commercial', desc: '브랜드 정체성을 시각적 언어로 번역합니다' },
  { num: '04', title: 'Nature & Events', desc: '특별한 날의 모든 감동을 오래도록 보존합니다' },
]

const GALLERY_COLS = [
  { gridColumn: '1 / 7',  marginTop: '0' },
  { gridColumn: '6 / 11', marginTop: '14%' },
  { gridColumn: '2 / 8',  marginTop: '8%' },
  { gridColumn: '7 / 13', marginTop: '-4%' },
]

const KNOW_POSITIONS: React.CSSProperties[] = [
  { right: '8%',  top: '40px',  width: '34%', height: '46vh' },
  { left: '30%',  top: '38%',   width: '42%', height: '52vh' },
  { left: '2%',   bottom: '0',  width: '30%', height: '40vh' },
]

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

  const heroImg     = imageUrls[0] ?? null
  const galleryImgs = imageUrls.slice(1)
  const aboutImg    = mainImageUrl

  const instagramContact = contacts.find((c) => c.type === 'instagram')

  const scrollTo = (id: string) => {
    pageRef.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  // ── IntersectionObserver reveal ─────────────────────────────────────────
  useEffect(() => {
    if (isPreview) return
    const el = pageRef.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>(`.${s.reveal}`)
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
      className={s.wrapper}
      style={{ '--v2-accent': accent } as React.CSSProperties}
    >
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
          1. NAV
      ════════════════════════════════════════════════════════ */}
      <header className={s.navHeader}>
        <span className={s.navBrand}>{brandName}</span>
        <nav className={s.navInner}>
          {[['01/', 'HOME', 'v2-home'], ['02/', 'WORKS', 'v2-works'], ['03/', 'ABOUT', 'v2-about'], ['04/', 'CONTACT', 'v2-contact']].map(([num, label, id]) => (
            <button key={label} onClick={() => scrollTo(id)} className={s.navBtn}>
              <span className={s.navBtnNum}>{num}</span>
              {label}
            </button>
          ))}
          {instagramContact && (
            <span className={s.navAccent}>{instagramContact.value}</span>
          )}
        </nav>
      </header>

      {/* ════════════════════════════════════════════════════════
          2. HERO
      ════════════════════════════════════════════════════════ */}
      <section id="v2-home" className={s.hero}>
        <h1 className={s.heroTitle}>
          Selected<br />Photos
        </h1>
        <div className={s.heroTagline}>
          <p className={s.heroTaglineText}>{tagline}</p>
          <p className={s.heroTaglineSub}>{websiteType ?? 'Portfolio'}</p>
        </div>
        <div className={s.heroScroll}>
          <span className={s.heroScrollText}>Scroll</span>
          <div className={s.heroScrollLine} />
        </div>
        <div className={s.heroPortrait}>
          {heroImg ? (
            <img className={s.heroPortraitImg} src={heroImg} alt={`${brandName} hero`} />
          ) : (
            <div className={s.heroPortraitPlaceholder} />
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. GALLERY
      ════════════════════════════════════════════════════════ */}
      {galleryImgs.length > 0 && (
        <section id="v2-works" className={s.gallery}>
          {galleryImgs.slice(0, 4).map((url, i) => (
            <div
              key={i}
              className={`${s.galleryCell} ${s.reveal}`}
              style={{
                gridColumn: GALLERY_COLS[i % GALLERY_COLS.length].gridColumn,
                marginTop: GALLERY_COLS[i % GALLERY_COLS.length].marginTop,
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <img className={s.galleryCellImg} src={url} alt={`${brandName} ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          4. GET TO KNOW ME
      ════════════════════════════════════════════════════════ */}
      {galleryImgs.length > 0 && (
        <section className={s.knowWrap}>
          <h2 className={s.knowHeading}>
            Get to<br />know me
          </h2>
          {galleryImgs.slice(0, 3).map((url, i) => (
            <div
              key={i}
              className={`${s.knowPhoto} ${s.reveal}`}
              style={{ ...KNOW_POSITIONS[i], transitionDelay: `${i * 0.12}s` }}
            >
              <img className={s.knowPhotoImg} src={url} alt={`${brandName} ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          5. BIO
      ════════════════════════════════════════════════════════ */}
      <section id="v2-about" className={s.bio}>
        <div className={s.bioLeft}>
          <p className={s.bioLabel}>(About)</p>
          <div className={s.bioPortraitWrap}>
            {aboutImg ? (
              <img className={s.bioPortraitImg} src={aboutImg} alt={`${brandName} portrait`} loading="lazy" />
            ) : (
              <div className={s.bioPortraitPlaceholder} />
            )}
          </div>
        </div>
        <div className={s.bioRight}>
          <h2 className={s.bioName}>
            I&apos;m<br />{brandName}
          </h2>
          {(bioLines.length > 0 ? bioLines : [tagline]).map((line, li) => (
            <p
              key={li}
              className={`${s.bioParagraph} ${s.reveal}`}
              style={{
                fontSize: li === 0 ? '18px' : '15px',
                transitionDelay: `${li * 0.06}s`,
              }}
            >
              {line}
            </p>
          ))}
          <div className={s.bioColorStrip}>
            {brandColors.map((c, i) => (
              <div key={i} style={{ width: '28px', height: '3px', background: c }} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. SERVICES
      ════════════════════════════════════════════════════════ */}
      <section className={s.services}>
        <div className={s.accordList}>
          {SERVICES.map((svc, i) => (
            <div
              key={svc.num}
              className={selectedSvc === i ? s.accordItemActive : s.accordItem}
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
        <div className={s.accordImg}>
          {galleryImgs.length > 0 ? (
            <img
              className={s.accordImgEl}
              src={galleryImgs[selectedSvc % galleryImgs.length]}
              alt={SERVICES[selectedSvc].title}
              loading="lazy"
            />
          ) : (
            <div className={s.accordImgPlaceholder} />
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. TICKER + SWATCHES
      ════════════════════════════════════════════════════════ */}
      <div className={s.tickerRow}>
        <div className={s.tickerWrap}>
          <div className={s.ticker}>
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className={s.tickerText}>
                {tagline}
                <span className={s.tickerSep}>·</span>
              </span>
            ))}
          </div>
        </div>
        <div className={s.swatchWrap}>
          <p className={s.swatchLabel}>Brand Colors</p>
          <div className={s.swatchRow}>
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
        <section id="v2-contact" className={`${s.contactSection} ${s.reveal}`}>
          <p className={s.contactSectionLabel}>Contact</p>
          <div className={s.contactGrid}>
            {contacts.map((c) => (
              <div key={c.type} className={s.contactCard}>
                <p className={s.contactCardType}>{CONTACT_LABELS[c.type] ?? c.type}</p>
                <p className={s.contactCardValue}>{c.value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          9. FOOTER
      ════════════════════════════════════════════════════════ */}
      <footer style={{ background: accent }}>
        <div className={s.footerInner}>
          <div>
            <p className={s.footerMeta}>{websiteType ?? 'Portfolio'} · {brandName}</p>
            <p className={s.footerTagline}>{tagline}</p>
          </div>
          <div className={s.footerContacts}>
            {contacts.slice(0, 3).map((c) => (
              <span key={c.type} className={s.footerContactItem}>{c.value}</span>
            ))}
            <span className={s.footerCopyright}>© {brandName}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
