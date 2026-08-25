'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react'
import type { TemplateProps } from '@/lib/templates/types'
import PagePreloader from './PagePreloader'
import * as s from '@/styles/requests/4f307aca/v3.css'

const VARIANT_ID = '4f307aca-v3'

const CONTACT_LABELS: Record<string, string> = {
  phone: '전화', kakao: 'Kakao', instagram: 'Instagram',
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
  isPreview = false,
}: TemplateProps) {
  const [preloaderDone, setPreloaderDone] = useState(isPreview)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const accent = brandColors[0] ?? '#C8A96E'

  const descLines = brandDescription.split(/\r?\n/).filter(Boolean)
  const tagline   = descLines[0] ?? brandName
  const bioLines  = descLines.slice(1)

  const filmCenter  = imageUrls[0] ?? null
  const filmSides   = imageUrls.slice(1, 5)
  const galleryImgs = imageUrls
  const statsImg    = mainImageUrl

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
      { rootMargin: '-60px' }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [isPreview, preloaderDone])

  const heroWords = brandName.trim().toUpperCase().split(/\s+/)
  const tagWords  = tagline.trim().toUpperCase().split(/\s+/)

  return (
    <div
      ref={pageRef}
      {...(isPreview ? { 'data-v3-preview': '' } : {})}
      className={s.wrapper}
      style={{ '--v3-accent': accent } as React.CSSProperties}
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
      <header className={s.nav}>
        <span className={s.navBrand}>{brandName}</span>
        <div className={s.navLine} />
        <nav className={s.navLinks}>
          {[['About', 'v3-about'], ['Works', 'v3-works'], ['Contact', 'v3-contact']].map(([label, id]) => (
            <button key={label} className={s.navLink} onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </nav>
      </header>

      {/* ════════════════════════════════════════════════════════
          2. HERO
      ════════════════════════════════════════════════════════ */}
      <section className={s.hero}>
        <h1 className={`${s.heroLine} ${s.solid}`}>
          {heroWords.join(' ')}
        </h1>
        {tagWords.length > 0 && (
          <span className={`${s.heroLineTagline} ${s.outline}`}>
            {tagWords.join(' ')}
          </span>
        )}
        <div className={s.heroMeta}>
          <div className={s.colorDots}>
            {brandColors.map((c, i) => (
              <div key={i} style={{ width: '32px', height: '3px', background: c }} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. FILMSTRIP
      ════════════════════════════════════════════════════════ */}
      {(filmCenter || filmSides.length > 0) && (
        <div className={s.filmstrip}>
          {filmSides.slice(0, 2).map((url, i) => (
            <div key={`l${i}`} className={s.filmSide}>
              <img className={s.filmSideImg} src={url} alt={`${brandName} ${i + 1}`} />
            </div>
          ))}
          <div className={s.filmCenter}>
            {filmCenter ? (
              <img className={s.filmCenterImg} src={filmCenter} alt={`${brandName} featured`} />
            ) : (
              <div className={s.filmCenterPlaceholder} />
            )}
          </div>
          {filmSides.slice(2, 4).map((url, i) => (
            <div key={`r${i}`} className={s.filmSide}>
              <img className={s.filmSideImg} src={url} alt={`${brandName} ${i + 3}`} />
            </div>
          ))}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          4. ABOUT TEXT
      ════════════════════════════════════════════════════════ */}
      <section id="v3-about" className={`${s.aboutText} ${s.reveal}`}>
        <div className={s.aboutStatementWrap}>
          {(['WE', 'ARE', 'A', 'PHOTOGRAPHER'].map((w, i) => (
            <span key={i} className={`${s.aboutLine} ${i % 2 === 0 ? s.solid : s.outline}`}>
              {w + (i < 3 ? '\u00A0' : '')}
            </span>
          )))}
          <span className={`${s.aboutLineBrandName} ${s.solid}`}>
            {brandName.toUpperCase()}
          </span>
        </div>
        {bioLines.length > 0 && (
          <div className={s.bioBorderWrap}>
            {bioLines.map((line, i) => (
              <p key={i} className={i === 0 ? s.bioParagraphFirst : s.bioParagraphRest}>
                {line}
              </p>
            ))}
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════
          5. EXPANDABLE GALLERY
      ════════════════════════════════════════════════════════ */}
      {galleryImgs.length > 0 && (
        <section id="v3-works" className={`${s.galleryTrack} ${s.reveal}`}>
          {galleryImgs.map((url, i) => (
            <div
              key={i}
              className={`${s.galleryItem} ${
                hoveredIdx === i ? s.galleryItemActive
                : hoveredIdx !== null ? s.galleryItemDim
                : ''
              }`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setLightboxIdx(i)}
            >
              <img className={s.galleryImg} src={url} alt={`${brandName} ${i + 1}`} />
              <div className={s.galleryOverlay} />
              <span className={s.galleryNum}>{String(i + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </section>
      )}

      {lightboxIdx !== null && (
        <div className={s.lightboxOverlay} onClick={() => setLightboxIdx(null)}>
          <img
            className={s.lightboxImg}
            src={galleryImgs[lightboxIdx]}
            alt={`${brandName} ${lightboxIdx + 1}`}
            onClick={e => e.stopPropagation()}
          />
          <button className={s.lightboxClose} onClick={() => setLightboxIdx(null)}>×</button>
          {galleryImgs.length > 1 && (
            <>
              <button
                className={s.lightboxPrev}
                onClick={e => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + galleryImgs.length) % galleryImgs.length) }}
              >‹</button>
              <button
                className={s.lightboxNext}
                onClick={e => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % galleryImgs.length) }}
              >›</button>
            </>
          )}
          <span className={s.lightboxCounter}>{lightboxIdx + 1} / {galleryImgs.length}</span>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          6. STATS
      ════════════════════════════════════════════════════════ */}
      <section className={`${s.statsSection} ${s.reveal}`}>
        <div>
          {tagline && (
            <p className={s.statLine}>
              {tagline.trim().toUpperCase().split(/\s+/).map((w, i) => (
                <span key={i} className={i % 2 === 0 ? s.statSolid : s.statOutline}>
                  {w}{' '}
                </span>
              ))}
            </p>
          )}
          {contacts.length > 0 && (
            <div className={s.contactsStrip}>
              {contacts.slice(0, 3).map((c) => (
                <div key={c.type} className={s.contactRow}>
                  <span className={s.contactLabel}>{CONTACT_LABELS[c.type] ?? c.type}</span>
                  <span className={s.contactValue}>{c.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={s.statsPortrait}>
          {statsImg ? (
            <img className={s.statsPortraitImg} src={statsImg} alt={`${brandName} portrait`} />
          ) : (
            <div className={s.statsPortraitPlaceholder} />
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. CTA
      ════════════════════════════════════════════════════════ */}
      <section id="v3-contact" className={`${s.ctaSection} ${s.reveal}`}>
        <p className={s.ctaText}>
          LET&apos;S<br />WORK?
        </p>
        {contacts[0] ? (
          <button className={s.ctaBtn} onClick={() => {}}>
            GET CONNECTED
          </button>
        ) : (
          <span className={s.ctaBtn}>
            GET CONNECTED
          </span>
        )}
        <span className={s.ctaDeco}>×</span>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. FOOTER
      ════════════════════════════════════════════════════════ */}
      <footer className={s.footer}>
        <div className={s.footerNav}>
          <nav className={s.footerNavLinks}>
            {[['About', 'v3-about'], ['Works', 'v3-works'], ['Contact', 'v3-contact']].map(([label, id]) => (
              <button key={label} className={s.footerNavLink} onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
          </nav>
          <span className={s.footerCopyright}>© {brandName}</span>
        </div>
        <div className={s.footerBrandRow}>
          <p className={s.footerSolid}>{brandName}</p>
        </div>
        <div className={s.footerBar}>
          <span className={s.footerBarText}>
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </span>
          <span className={s.footerBarBrand}>PageMakers</span>
        </div>
      </footer>
    </div>
  )
}
