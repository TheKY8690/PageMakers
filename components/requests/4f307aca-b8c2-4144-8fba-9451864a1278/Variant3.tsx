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
    opacity: 0;
    transform: translateY(28px) scale(1.03);
    filter: blur(5px);
    transition: opacity 1s cubic-bezier(0.16,1,0.3,1),
                transform 1s cubic-bezier(0.16,1,0.3,1),
                filter 1s cubic-bezier(0.16,1,0.3,1);
  }
  .v3-reveal.visible { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }

  .v3-img-wrap { overflow: hidden; position: relative; }
  .v3-img-wrap img {
    display: block; width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.9s ease;
  }
  .v3-img-wrap:hover img { transform: scale(1.06) translateY(-4px); }
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
  .v3-masonry { columns: 2; column-gap: 4px; }
  .v3-masonry-3 { columns: 3; column-gap: 4px; }
  .v3-masonry-item { break-inside: avoid; margin-bottom: 4px; }
  .v3-masonry img, .v3-natural img { height: auto !important; object-fit: initial !important; }

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
    .v3-mid-editorial { grid-template-columns: 1fr !important; padding: 48px 20px !important; }
    .v3-masonry { columns: 1 !important; }
    .v3-masonry-3 { columns: 1 !important; }
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
  isPreview = false,
}: TemplateProps) {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)
  const accent = brandColors[0] ?? '#940000'   // #940000

  const descLines = brandDescription.split(/\r?\n/).filter(Boolean)
  const tagline = descLines[0] ?? ''
  const quote = descLines[1] ?? tagline         // 두 번째 줄 = 강조 인용구
  const finalLine = descLines[2] ?? ''

  useEffect(() => {
    if (isPreview) return
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
  }, [isPreview])

  return (
    <div
      ref={pageRef}
      {...(isPreview ? { 'data-v3-preview': '' } : {})}
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", minHeight: '100vh', background: '#0C0C0C', color: '#F5F5F5' }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {isPreview && (
        <style dangerouslySetInnerHTML={{ __html: `
          [data-v3-preview] .v3-hero-eyebrow,
          [data-v3-preview] .v3-hero-name,
          [data-v3-preview] .v3-hero-tagline { animation: none !important; opacity: 1 !important; transform: none !important; }
          [data-v3-preview] .v3-reveal { opacity: 1 !important; transform: none !important; filter: none !important; }
        `}} />
      )}

      {!isPreview && !preloaderDone && (
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

          {/* Middle: wordmark + tagline (두 파트로 분리) */}
          <div>
            <p
              className="v3-hero-eyebrow"
              style={{
                fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)', fontWeight: 600, margin: '0 0 24px',
              }}
            >
              {brandName}
            </p>
            <h1 style={{ margin: 0 }}>
              {/* 첫 단어 — 크게 */}
              <span className="v3-hero-name-line" style={{ display: 'block' }}>
                <span
                  className="v3-hero-name"
                  style={{
                    display: 'block',
                    fontSize: 'clamp(48px, 7.5vw, 96px)',
                    fontWeight: 900,
                    letterSpacing: '-0.05em',
                    lineHeight: 0.95,
                    color: '#FFFFFF',
                    animationDelay: '0.1s',
                  }}
                >
                  {tagline.split(' ')[0]}
                </span>
              </span>
              {/* 나머지 단어 — 작게 + accent 컬러 */}
              {tagline.split(' ').length > 1 && (
                <span className="v3-hero-name-line" style={{ display: 'block', marginTop: '8px' }}>
                  <span
                    className="v3-hero-name"
                    style={{
                      display: 'block',
                      fontSize: 'clamp(20px, 3vw, 36px)',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.3,
                      color: 'rgba(255,255,255,0.75)',
                      animationDelay: '0.2s',
                    }}
                  >
                    {tagline.split(' ').slice(1).join(' ')}
                  </span>
                </span>
              )}
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

      {/* ── 사진 페어 — 1fr 2fr (작은 왼쪽, 큰 오른쪽) ── */}
      {imageUrls.length > 0 && (
        <section style={{ background: '#111', padding: '0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4px', alignItems: 'start' }}>
            {imageUrls.slice(0, 2).map((url, i) => (
              <div key={i} className="v3-reveal v3-img-wrap v3-natural" style={{ transitionDelay: `${i * 0.1}s` }}>
                <img src={url} alt={`${brandName} 작품 ${i + 1}`} />
                <div className="v3-img-tint" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 크림슨 Editorial ── */}
      <section
        className="v3-reveal v3-mid-editorial"
        style={{
          background: accent,
          padding: '60px 52px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        <div>
          <p style={{ fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '20px' }}>
            Process
          </p>
          <p style={{ fontSize: 'clamp(24px, 3.2vw, 42px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.2, color: '#FFFFFF', margin: '0 0 20px' }}>
            한 장의 사진 안에<br />수백 개의<br />결정이 있습니다
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, margin: 0 }}>
            셔터를 누르기까지의 모든 순간 —<br />
            구도, 빛, 감정, 그리고 기다림.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {brandColors.map((c, i) => (
            <div key={i} style={{ height: '48px', background: c, opacity: 0.35 + i * 0.25 }} />
          ))}
        </div>
      </section>

      {/* ── 피처드 사진 1장 ── */}
      {imageUrls[2] && (
        <section className="v3-reveal" style={{ background: '#111', padding: '0 52px' }}>
          <div className="v3-img-wrap v3-natural" style={{ maxWidth: '50%', margin: '0 auto' }}>
            <img
              src={imageUrls[2]}
              alt={`${brandName} 작품 3`}
              style={{ objectPosition: 'center top' }}
            />
            <div className="v3-img-tint" />
          </div>
        </section>
      )}

      {/* ── 사진 하단 — 큰 왼쪽 + 오른쪽 세로 스택 ── */}
      {imageUrls.length > 3 && (
        <section style={{ background: '#111', padding: '4px 0 64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4px', alignItems: 'start' }}>
            {/* 왼쪽: imageUrls[3] 크게 */}
            <div className="v3-reveal v3-img-wrap v3-natural">
              <img src={imageUrls[3]} alt={`${brandName} 작품 4`} />
              <div className="v3-img-tint" />
            </div>
            {/* 오른쪽: imageUrls[4], [5] 세로 스택 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {imageUrls.slice(4, 6).map((url, i) => (
                <div key={i} className="v3-reveal v3-img-wrap v3-natural" style={{ transitionDelay: `${(i + 1) * 0.08}s` }}>
                  <img src={url} alt={`${brandName} 작품 ${i + 5}`} />
                  <div className="v3-img-tint" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Statement accent ── */}
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
            fontSize: 'clamp(28px, 4.5vw, 72px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.15,
            color: 'rgba(255,255,255,0.22)',
            margin: 0,
            userSelect: 'none',
          }}
        >
          카메라 뒤에서
          <br />
          나는 세상을
          <br />
          다시 배운다
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
