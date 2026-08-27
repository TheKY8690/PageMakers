'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { TemplateProps } from '@/lib/templates/types'
import PagePreloader from './PagePreloader'
import * as s from '@/styles/requests/4f307aca/v1.css'

gsap.registerPlugin(ScrollTrigger)

const VARIANT_ID = '4f307aca-v1'

const CONTACT_LABELS: Record<string, string> = {
  phone: '전화', kakao: '카카오', instagram: 'Instagram',
  naver: '네이버', youtube: 'YouTube', facebook: 'Facebook',
  twitter: 'X', tiktok: 'TikTok',
}

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

const QUOTE_FALLBACK = '빛이 머문 자리에 이야기가 남는다'
const QUOTE_SUB_FALLBACK = '카메라는 기억보다 정직하고, 눈보다 솔직합니다.\n그 순간의 온도를 오래 간직하는 일.'

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
    const chars = heroNameRef.current?.querySelectorAll<HTMLElement>(`.${s.char}`)
    if (chars?.length) {
      tl.fromTo(chars, { y: '115%' }, { y: '0%', duration: 1.3, stagger: 0.028 }, 0.1)
    }
    const words = heroTagRef.current?.querySelectorAll<HTMLElement>(`.${s.word}`)
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

      const workRows = gsap.utils.toArray<HTMLElement>('[data-v1-work-row]', containerRef.current!)
      if (workRows.length) {
        gsap.fromTo(workRows, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, stagger: 0.07, duration: 0.75, ease: 'power2.out',
          scrollTrigger: { trigger: workRows[0], start: 'top 85%', scroller },
        })
      }

      const services = gsap.utils.toArray<HTMLElement>('[data-v1-service]', containerRef.current!)
      if (services.length) {
        gsap.fromTo(services, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, stagger: 0.055, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: services[0], start: 'top 88%', scroller },
        })
      }

      const aboutEl = containerRef.current!.querySelector(`.${s.aboutSection}`)
      if (aboutEl) {
        gsap.fromTo(aboutEl.querySelectorAll<HTMLElement>('[data-v1-about-item]'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.75, ease: 'power2.out',
            scrollTrigger: { trigger: aboutEl, start: 'top 80%', scroller } }
        )
      }

      const quoteEl = containerRef.current!.querySelector(`.${s.philosophy}`)
      if (quoteEl) {
        gsap.to(quoteEl.querySelectorAll<HTMLElement>(`.${s.qword}`), {
          opacity: 1, stagger: 0.09, ease: 'none',
          scrollTrigger: { trigger: quoteEl, start: 'top 72%', end: 'center 28%', scrub: 1.8, scroller },
        })
        const sub = quoteEl.querySelector(`.${s.quoteSub}`)
        if (sub) {
          gsap.fromTo(sub, { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: quoteEl, start: 'center 60%', scroller } }
          )
        }
      }

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
      className={s.wrapper}
      style={{ '--v1-accent': accent } as React.CSSProperties}
    >
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
        className={s.nav}
        style={{ opacity: isPreview ? 1 : 0 }}
      >
        <div className={s.navInner}>
          <span className={s.navBrand}>{brandName}</span>
          <nav className={s.navLinks}>
            {['WORK', 'ABOUT', 'CONTACT'].map((label) => (
              <a
                key={label}
                href={`#v1-${label.toLowerCase()}`}
                className={s.navLink}
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
              <span className={s.navAccent}>{instagramContact.value}</span>
            )}
          </nav>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════
          2. HERO
      ════════════════════════════════════════════════════════ */}
      <section className={s.hero}>
        <div className={s.heroLeft}>
          <p className={s.heroTopLabel}>{websiteType ?? 'Portfolio'}</p>

          <div className={s.heroBox}>
            <p className={s.heroBoxCaption}>{brandName}</p>

            <div ref={heroNameRef} aria-label={brandName} className={s.heroNameWrap}>
              <h1 className={s.heroH1}>
                {brandName.split('').map((char, i) => (
                  <span key={i} className={s.charWrap}>
                    <span className={s.char}>{char === ' ' ? '\u00A0' : char}</span>
                  </span>
                ))}
              </h1>
            </div>

            <div ref={heroTagRef}>
              <p className={s.heroTaglineText}>
                {tagline.split(' ').map((word, i, arr) => (
                  <span key={i} className={s.wordWrap}>
                    <span className={s.word}>{word}{i < arr.length - 1 ? '\u00A0' : ''}</span>
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div ref={heroMetaRef} className={s.heroMeta} style={{ opacity: 0 }}>
            <div className={s.heroColorStrip}>
              {brandColors.map((c, i) => (
                <div key={i} style={{ height: '2px', width: '28px', background: c }} />
              ))}
            </div>
            <div className={s.scrollHint}>
              <div className={s.scrollHintLine} />
              <span className={s.scrollHintText}>Scroll</span>
            </div>
          </div>
        </div>

        <div className={s.heroRight}>
          {heroImg ? (
            <img className={s.heroRightImg} src={heroImg} alt={`${brandName} hero`} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, #111 60%, ${accent}18)` }} />
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. INTRO GRID
      ════════════════════════════════════════════════════════ */}
      {gridImgs.length > 0 && (
        <div className={s.introGrid}>
          {gridImgs.map((url, i) => (
            <div key={i} className={s.introCell}>
              <img className={s.introCellImg} src={url} alt={`${brandName} ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          4. WORK ROWS
      ════════════════════════════════════════════════════════ */}
      {workImgs.length > 0 && (
        <section id="v1-work" className={s.workSection}>
          <div className={s.workHeader}>
            <span className={s.workHeaderTitle}>WORK</span>
            <span className={s.workHeaderCount}>{workImgs.length} projects</span>
          </div>

          {workImgs.map((url, i) => {
            const titleIdx = i % WORK_TITLES.length
            const tagsIdx  = i % WORK_TAGS.length
            return (
              <div key={i} data-v1-work-row className={s.workRow}>
                <span className={s.workNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.workTitle}>{WORK_TITLES[titleIdx]}</span>
                <div className={s.workTags}>
                  {WORK_TAGS[tagsIdx].map((tag) => (
                    <span key={tag} className={s.workTag}>{tag}</span>
                  ))}
                </div>
                <span className={s.workCount}>{i + 1}/{workImgs.length}</span>
                <div className={s.workPreview}>
                  <img className={s.workPreviewImg} src={url} alt={WORK_TITLES[titleIdx]} loading="lazy" />
                </div>
              </div>
            )
          })}
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          5. SERVICES
      ════════════════════════════════════════════════════════ */}
      <section className={s.servicesSection}>
        <div className={s.servicesHeader}>
          <p className={s.servicesHeaderLabel}>Services</p>
          <h2 className={s.servicesHeaderTitle}>SERVICES</h2>
          <p className={s.servicesHeaderDesc}>
            {bioLines[0] ?? `${brandName}의 모든 순간을 특별하게 담습니다. — `}
            <span className={s.servicesHeaderAccent}>문의하기</span>
          </p>
        </div>
        <div className={s.servicesGrid}>
          {SERVICES.map((svc) => (
            <div key={svc.code} data-v1-service className={s.serviceCard}>
              <p className={s.serviceCode}>{svc.code} / SERVICE</p>
              <p className={s.serviceTitle}>{svc.title}</p>
              <p className={s.serviceDesc}>{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. PHILOSOPHY
      ════════════════════════════════════════════════════════ */}
      <section className={s.philosophy}>
        <p className={s.philosophyLabel}>Philosophy</p>
        <div className={s.philosophyBorder}>
          <p className={s.philosophyQuote}>
            {quoteText.split(' ').map((word, i, arr) => (
              <span key={i} className={s.qword}>{word}{i < arr.length - 1 ? ' ' : ''}</span>
            ))}
          </p>
        </div>
        <p className={s.quoteSub}>{quoteSub}</p>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. ABOUT
      ════════════════════════════════════════════════════════ */}
      <section id="v1-about" className={s.aboutSection}>
        <p className={s.aboutSectionLabel}>About</p>
        <h2 className={s.aboutSectionTitle}>ABOUT</h2>

        <div className={s.aboutGrid}>
          <div>
            {aboutImg && (
              <div data-v1-about-item className={s.aboutImgWrap}>
                <img className={s.aboutImg} src={aboutImg} alt={`${brandName} about`} loading="lazy" />
              </div>
            )}
            <div>
              {(bioLines.length > 0 ? bioLines : [tagline]).map((line, li) => (
                <p
                  key={li}
                  data-v1-about-item
                  className={li === 0 ? s.bioParagraphFirst : s.bioParagraphRest}
                >
                  {line}
                </p>
              ))}
              <div data-v1-about-item className={s.bioColorSwatches}>
                {brandColors.map((c, i) => (
                  <div key={i} style={{ width: '24px', height: '24px', background: c, border: '1px solid rgba(245,245,245,0.08)' }} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className={s.rosterLabel}>ROSTER</p>
            <p className={s.rosterDesc}>
              {bioLines[1] ?? '함께하는 모든 순간이 작품이 됩니다. 촬영 의뢰 및 협업 문의는 아래 채널을 통해 연락 주세요.'}
            </p>
            {contacts.length > 0 ? (
              contacts.map((c) => (
                <div key={c.type} data-v1-about-item className={s.rosterItem}>
                  <span className={s.rosterItemType}>{CONTACT_LABELS[c.type] ?? c.type}</span>
                  <span className={s.rosterItemValue}>{c.value}</span>
                </div>
              ))
            ) : (
              <p className={s.rosterEmpty}>연락처를 추가해주세요</p>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. TICKER + CTA
      ════════════════════════════════════════════════════════ */}
      <div id="v1-contact" className={s.bottomRow}>
        <div className={s.tickerWrap}>
          <div className={s.ticker}>
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className={s.tickerText}>
                {tagline}
                <span className={s.tickerSep}>—</span>
              </span>
            ))}
          </div>
        </div>

        <div
          data-v1-cta
          className={s.ctaBlock}
          style={{ background: accent }}
        >
          <p data-v1-cta-item className={s.ctaLabel}>CONTACT CTA</p>
          <h3 data-v1-cta-item className={s.ctaTitle}>LET&apos;S TALK</h3>
          <p data-v1-cta-item className={s.ctaDesc}>
            지금 바로 시작할 준비가 됐나요?<br />
            촬영 의뢰 · 협업 · 문의
          </p>
          {contacts[0] && (
            <div data-v1-cta-item className={s.ctaContact}>
              <span className={s.ctaContactValue}>{contacts[0].value}</span>
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          9. FOOTER
      ════════════════════════════════════════════════════════ */}
      <footer className={s.footerEl}>
        <span className={s.footerCopyright}>© {brandName}</span>
        <div className={s.footerSwatches}>
          {brandColors.map((c, i) => (
            <span key={i} style={{ width: '8px', height: '8px', background: c, border: '1px solid rgba(245,245,245,0.06)', display: 'inline-block' }} />
          ))}
        </div>
      </footer>
    </div>
  )
}
