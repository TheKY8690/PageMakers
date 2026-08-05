/* eslint-disable @next/next/no-img-element */
import type { TemplateProps } from '@/lib/templates/types'

export default function TemplateB({ brandName, brandDescription, brandColors, imageUrls }: TemplateProps) {
  const primary = brandColors[0] ?? '#0F172A'
  const accent = brandColors[1] ?? '#0369A1'

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Nav */}
      <nav style={{ padding: '20px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', background: '#fff' }}>
        <span style={{ fontWeight: 800, fontSize: '20px', color: primary }}>{brandName}</span>
        <button style={{ background: accent, color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 20px', fontSize: '14px', cursor: 'pointer' }}>Contact</button>
      </nav>

      {/* Split Hero */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '70vh' }}>
        <div style={{ padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 800, color: primary, lineHeight: 1.15, marginBottom: '24px' }}>{brandName}</h1>
          <p style={{ fontSize: '18px', lineHeight: 1.7, color: '#64748B', marginBottom: '32px' }}>{brandDescription}</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {brandColors.map((c, i) => (
              <span key={i} style={{ width: '32px', height: '8px', borderRadius: '4px', background: c }} />
            ))}
          </div>
        </div>
        <div style={{ background: primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {imageUrls[0]
            ? <img src={imageUrls[0]} alt={brandName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '80px', fontWeight: 900 }}>{brandName[0]}</span>
          }
        </div>
      </section>

      {/* Gallery */}
      {imageUrls.length > 1 && (
        <section style={{ padding: '80px 60px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: primary, marginBottom: '32px' }}>Gallery</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {imageUrls.slice(1).map((url, i) => (
              <img key={i} src={url} alt="" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '6px' }} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
