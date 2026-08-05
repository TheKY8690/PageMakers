import type { TemplateProps } from '@/lib/templates/types'

export default function TemplateA({ brandName, brandDescription, brandColors, imageUrls }: TemplateProps) {
  const primary = brandColors[0] ?? '#0F172A'
  const secondary = brandColors[1] ?? brandColors[0] ?? '#334155'

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#fff' }}>
      {/* Hero */}
      <section style={{ background: primary, color: '#fff', padding: '80px 60px', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '16px' }}>Brand Story</p>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>{brandName}</h1>
        {brandColors[1] && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
            {brandColors.map((c, i) => (
              <span key={i} style={{ width: '20px', height: '20px', borderRadius: '50%', background: c, border: '2px solid rgba(255,255,255,0.4)' }} />
            ))}
          </div>
        )}
      </section>

      {/* About */}
      <section style={{ padding: '80px 60px', maxWidth: '720px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: secondary, marginBottom: '20px' }}>About</h2>
        <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#444' }}>{brandDescription}</p>
      </section>

      {/* Images */}
      {imageUrls.length > 0 && (
        <section style={{ padding: '0 60px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {imageUrls.map((url, i) => (
            <img key={i} src={url} alt={`${brandName} image ${i + 1}`} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '8px' }} />
          ))}
        </section>
      )}

      {/* CTA */}
      <section style={{ background: secondary, color: '#fff', padding: '60px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px' }}>{brandName}와 함께하세요</h3>
        <button style={{ background: primary, color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 32px', fontSize: '16px', cursor: 'pointer' }}>문의하기</button>
      </section>
    </div>
  )
}
