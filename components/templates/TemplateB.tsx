'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react'
import type { TemplateProps } from '@/lib/templates/types'

const CSS = `
  @keyframes tbFadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes tbFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .tb-hero-brand  { animation: tbFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
  .tb-hero-type   { animation: tbFadeIn 0.8s ease 0.5s both; }
  .tb-hero-scroll { animation: tbFadeIn 1s ease 0.8s both; }
  .tb-reveal {
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .tb-reveal.visible { opacity: 1; transform: translateY(0); }
  .tb-img-wrap {
    overflow: hidden; position: relative; cursor: pointer;
  }
  .tb-img-wrap img {
    display: block; width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .tb-img-wrap:hover img { transform: scale(1.04); }
  .tb-img-num {
    position: absolute; bottom: 16px; right: 16px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
    color: rgba(255,255,255,0.9); opacity: 0;
    transition: opacity 0.3s ease;
  }
  .tb-img-wrap:hover .tb-img-num { opacity: 1; }
  .tb-img-overlay {
    position: absolute; inset: 0; opacity: 0;
    transition: opacity 0.4s ease;
  }
  .tb-img-wrap:hover .tb-img-overlay { opacity: 0.18; }
  .tb-contact-row {
    border-bottom: 1px solid rgba(12,12,12,0.08);
    transition: background 0.2s ease;
  }
  .tb-contact-row:hover { background: rgba(12,12,12,0.02); }
  @media (prefers-reduced-motion: reduce) {
    .tb-hero-brand,.tb-hero-type,.tb-hero-scroll,.tb-reveal {
      animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important;
    }
    .tb-img-wrap img { transition: none !important; }
  }
  @media (max-width: 768px) {
    .tb-nav { padding: 16px 20px !important; }
    .tb-gallery-pair { grid-template-columns: 1fr !important; }
    .tb-about-wrap { padding: 60px 20px !important; }
    .tb-contact-wrap { padding: 60px 20px !important; }
    .tb-footer { padding: 24px 20px !important; }
  }
`

const CONTACT_LABELS: Record<string, string> = {
  phone: '전화번호', kakao: '카카오톡', instagram: '인스타그램',
  naver: '네이버', youtube: 'YouTube', facebook: 'Facebook',
  twitter: 'X (트위터)', tiktok: '틱톡',
}

export default function TemplateB({
  brandName, brandDescription, brandColors, imageUrls,
  mainImageUrl, contacts = [], websiteType,
}: TemplateProps) {
  const primary = brandColors[0] ?? '#111'
  const descLines = brandDescription.split(/\r?\n/).filter(Boolean)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = pageRef.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('.tb-reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { rootMargin: '-80px' }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  // 갤러리 페어링: [단독 큰 이미지, 2열 쌍, 단독, 2열 쌍 …] 교차
  const galleryItems: Array<{ type: 'single'; url: string; idx: number } | { type: 'pair'; urls: [string, string]; idxs: [number, number] }> = []
  let i = 0
  let pairTurn = false
  while (i < imageUrls.length) {
    if (!pairTurn && i < imageUrls.length) {
      galleryItems.push({ type: 'single', url: imageUrls[i], idx: i })
      i++
    } else if (pairTurn && i + 1 < imageUrls.length) {
      galleryItems.push({ type: 'pair', urls: [imageUrls[i], imageUrls[i + 1]], idxs: [i, i + 1] })
      i += 2
    } else {
      // 남은 1장 단독 처리
      galleryItems.push({ type: 'single', url: imageUrls[i], idx: i })
      i++
    }
    pairTurn = !pairTurn
  }

  return (
    <div ref={pageRef} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", minHeight: '100vh', background: '#fff', color: '#0C0C0C' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Hero — fullscreen image (nav inside) */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#111' }}>
        {/* Nav — absolute inside hero so it doesn't break overlay scroll */}
        <header className="tb-nav" style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
          padding: '20px 40px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontWeight: 800, fontSize: '13px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
            {brandName}
          </span>
          <span style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
            {websiteType ?? 'Portfolio'}
          </span>
        </header>
        {mainImageUrl
          ? <img src={mainImageUrl} alt={`${brandName} 대표 이미지`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          : <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, #111 0%, ${primary} 100%)` }} />
        }
        {/* bottom labels */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h1 className="tb-hero-brand" style={{
            fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#fff', margin: 0, lineHeight: 1,
            textShadow: '0 2px 24px rgba(0,0,0,0.4)',
          }}>
            {brandName}
          </h1>
          <span className="tb-hero-type" style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>
            {websiteType ?? 'Portfolio'}
          </span>
        </div>
        {/* scroll hint */}
        <div className="tb-hero-scroll" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.45 }}>
          <div style={{ width: '1px', height: '48px', background: '#fff' }} />
        </div>
      </section>

      {/* About */}
      <section className="tb-reveal tb-about-wrap" style={{ padding: '120px 80px', maxWidth: '900px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(12,12,12,0.35)', marginBottom: '40px', fontWeight: 500 }}>
          About
        </p>
        {descLines.map((line, idx) => (
          <p key={idx} style={{
            fontSize: idx === 0 ? 'clamp(22px, 3.2vw, 38px)' : '17px',
            fontWeight: idx === 0 ? 600 : 400,
            lineHeight: idx === 0 ? 1.35 : 1.8,
            letterSpacing: idx === 0 ? '-0.02em' : '-0.005em',
            color: idx === 0 ? '#0C0C0C' : 'rgba(12,12,12,0.55)',
            margin: '0 0 16px',
          }}>
            {line}
          </p>
        ))}
      </section>

      {/* Gallery */}
      {imageUrls.length > 0 && (
        <section style={{ padding: '0 0 120px' }}>
          <div style={{ padding: '0 80px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '32px', height: '1px', background: primary }} />
            <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(12,12,12,0.35)', margin: 0 }}>Gallery</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {galleryItems.map((item, gIdx) => {
              if (item.type === 'single') {
                return (
                  <div key={gIdx} className="tb-reveal tb-img-wrap" style={{ height: 'clamp(320px, 55vw, 640px)', transitionDelay: `${gIdx * 0.05}s` }}>
                    <img src={item.url} alt={`${brandName} 포트폴리오 ${item.idx + 1}`} />
                    <div className="tb-img-overlay" style={{ background: primary }} />
                    <span className="tb-img-num">{String(item.idx + 1).padStart(2, '0')}</span>
                  </div>
                )
              }
              return (
                <div key={gIdx} className="tb-gallery-pair" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '3px' }}>
                  {item.urls.map((url, pIdx) => (
                    <div key={pIdx} className="tb-reveal tb-img-wrap" style={{ height: 'clamp(240px, 38vw, 480px)', transitionDelay: `${(gIdx * 2 + pIdx) * 0.05}s` }}>
                      <img src={url} alt={`${brandName} 포트폴리오 ${item.idxs[pIdx] + 1}`} />
                      <div className="tb-img-overlay" style={{ background: primary }} />
                      <span className="tb-img-num">{String(item.idxs[pIdx] + 1).padStart(2, '0')}</span>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Contact */}
      {contacts.length > 0 && (
        <section className="tb-contact-wrap" style={{ padding: '80px 80px 120px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(12,12,12,0.35)', marginBottom: '48px' }}>Contact</p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {contacts.map((c, idx) => (
              <div key={c.type} className="tb-contact-row tb-reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', transitionDelay: `${idx * 0.06}s` }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(12,12,12,0.4)', fontWeight: 500, width: '120px' }}>
                  {CONTACT_LABELS[c.type] ?? c.type}
                </span>
                <span style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 300, color: '#0C0C0C', letterSpacing: '-0.01em' }}>
                  {c.value}
                </span>
                <span style={{ fontSize: '11px', color: primary, fontWeight: 700, letterSpacing: '0.08em' }}>→</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="tb-footer" style={{ padding: '28px 80px', borderTop: '1px solid rgba(12,12,12,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontSize: '12px', color: 'rgba(12,12,12,0.3)', letterSpacing: '0.06em' }}>© {brandName}</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {brandColors.map((c, ci) => (
            <span key={ci} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c, border: '1px solid rgba(12,12,12,0.1)' }} />
          ))}
        </div>
      </footer>
    </div>
  )
}
