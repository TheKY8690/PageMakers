import type { TemplateProps } from '@/lib/templates/types'

export default function TemplateC({ brandName, brandDescription, brandColors, imageUrls }: TemplateProps) {
  const primary = brandColors[0] ?? '#0F172A'
  const bg = brandColors[2] ?? '#F8FAFC'

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: bg, color: '#0F172A' }}>
      {/* Centered Hero */}
      <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 40px' }}>
        <div style={{ width: '64px', height: '4px', background: primary, borderRadius: '2px', marginBottom: '32px' }} />
        <h1 style={{ fontSize: 'clamp(40px, 7vw, 96px)', fontWeight: 900, lineHeight: 1.05, marginBottom: '24px', letterSpacing: '-0.02em' }}>{brandName}</h1>
        <p style={{ fontSize: '20px', lineHeight: 1.7, color: '#64748B', maxWidth: '560px', marginBottom: '40px' }}>{brandDescription}</p>
        <div style={{ display: 'flex', gap: '12px' }}>
          {brandColors.map((c, i) => (
            <span key={i} style={{ width: '48px', height: '48px', borderRadius: '50%', background: c, boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }} />
          ))}
        </div>
      </section>

      {/* Masonry-style images */}
      {imageUrls.length > 0 && (
        <section style={{ padding: '0 40px 80px', columns: '3 240px', gap: '12px' }}>
          {imageUrls.map((url, i) => (
            <img key={i} src={url} alt="" style={{ width: '100%', borderRadius: '8px', marginBottom: '12px', display: 'block' }} />
          ))}
        </section>
      )}

      {/* Footer CTA */}
      <section style={{ borderTop: `4px solid ${primary}`, padding: '60px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '20px', color: '#64748B', marginBottom: '20px' }}>{brandName}에 대해 더 알고 싶으세요?</p>
        <span style={{ fontSize: '32px', fontWeight: 800, color: primary }}>{brandName}</span>
      </section>
    </div>
  )
}
