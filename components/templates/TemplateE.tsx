/* eslint-disable @next/next/no-img-element */
import type { TemplateProps } from '@/lib/templates/types'

export default function TemplateE({ brandName, brandDescription, brandColors, imageUrls }: TemplateProps) {
  const primary = brandColors[0] ?? '#0F172A'
  const accent = brandColors[1] ?? '#0369A1'

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#fff' }}>
      {/* Magazine-style header */}
      <header style={{ padding: '24px 60px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', borderBottom: `2px solid ${primary}` }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {brandColors.map((c, i) => <span key={i} style={{ width: '12px', height: '12px', background: c, borderRadius: '2px' }} />)}
        </div>
        <span style={{ fontWeight: 900, fontSize: '22px', color: primary, textAlign: 'center' }}>{brandName}</span>
        <div />
      </header>

      {/* Large image feature */}
      {imageUrls[0] ? (
        <div style={{ position: 'relative', height: '60vh', overflow: 'hidden' }}>
          <img src={imageUrls[0]} alt={brandName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${primary}CC, transparent)` }} />
          <h1 style={{ position: 'absolute', bottom: '40px', left: '60px', color: '#fff', fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 900, margin: 0 }}>{brandName}</h1>
        </div>
      ) : (
        <div style={{ height: '60vh', background: primary, display: 'flex', alignItems: 'flex-end', padding: '40px 60px' }}>
          <h1 style={{ color: '#fff', fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 900, margin: 0 }}>{brandName}</h1>
        </div>
      )}

      {/* Content */}
      <section style={{ padding: '60px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px', alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase', color: accent, marginBottom: '16px' }}>Our Story</h2>
          <p style={{ fontSize: '20px', lineHeight: 1.8, color: '#334155' }}>{brandDescription}</p>
        </div>
        <aside>
          {brandColors.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ width: '40px', height: '40px', background: c, borderRadius: '4px', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', fontFamily: 'monospace', color: '#64748B' }}>{c.toUpperCase()}</span>
            </div>
          ))}
        </aside>
      </section>

      {/* More images */}
      {imageUrls.length > 1 && (
        <section style={{ padding: '0 60px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
          {imageUrls.slice(1).map((url, i) => (
            <img key={i} src={url} alt="" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '4px' }} />
          ))}
        </section>
      )}
    </div>
  )
}
