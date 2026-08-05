/* eslint-disable @next/next/no-img-element */
import type { TemplateProps } from '@/lib/templates/types'

export default function TemplateD({ brandName, brandDescription, brandColors, imageUrls }: TemplateProps) {
  const accent = brandColors[1] ?? brandColors[0] ?? '#0369A1'

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#0F172A', color: '#F8FAFC' }}>
      {/* Dark Hero */}
      <section style={{ padding: '100px 60px', borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
        <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: '20px' }}>— Welcome</p>
        <h1 style={{ fontSize: 'clamp(48px, 7vw, 100px)', fontWeight: 900, lineHeight: 1.05, marginBottom: '32px', letterSpacing: '-0.02em' }}>{brandName}</h1>
        <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', maxWidth: '640px' }}>{brandDescription}</p>
      </section>

      {/* Colors showcase */}
      <section style={{ padding: '60px', display: 'flex', gap: '16px', borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
        {brandColors.map((c, i) => (
          <div key={i} style={{ flex: 1, height: '80px', background: c, borderRadius: '8px' }} />
        ))}
      </section>

      {/* Image grid */}
      {imageUrls.length > 0 && (
        <section style={{ padding: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {imageUrls.map((url, i) => (
            <img key={i} src={url} alt="" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '8px', filter: 'brightness(0.85)' }} />
          ))}
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '80px 60px', textAlign: 'center', borderTop: `1px solid rgba(255,255,255,0.08)` }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '24px' }}>{brandName}</h2>
        <button style={{ background: accent, color: '#fff', border: 'none', borderRadius: '8px', padding: '16px 40px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>시작하기</button>
      </section>
    </div>
  )
}
