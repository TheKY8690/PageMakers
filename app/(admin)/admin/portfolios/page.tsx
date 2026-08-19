import { db } from '@/lib/db'
import { publishedPages } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import * as s from '@/styles/dashboard/dashboard.css'

const SAMPLES = [
  { slug: 'dayditto', label: 'DayDitto', desc: '일기 기반 영어 학습 서비스' },
  { slug: 'wara', label: '와라', desc: '소셜 모임 플래닝 플랫폼' },
]

export default async function AdminPortfoliosPage() {
  const completed = await db
    .select()
    .from(publishedPages)
    .orderBy(desc(publishedPages.createdAt))

  const cellStyle: React.CSSProperties = {
    padding: '14px 16px',
    borderBottom: '1px solid rgba(12,12,12,0.06)',
    fontSize: '14px',
    color: '#0C0C0C',
  }

  return (
    <>
      <div className={s.pageHeader}>
        <h1 className={s.pageTitle}>포트폴리오</h1>
      </div>
      <div style={{ padding: '32px' }}>

        {/* 샘플 */}
        <h2 style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em', marginBottom: '16px', marginTop: 0 }}>
          샘플 페이지
        </h2>
        <div style={{ border: '1px solid rgba(12,12,12,0.1)', backgroundColor: '#fff', marginBottom: '40px' }}>
          {SAMPLES.map((sample) => (
            <div key={sample.slug} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', ...cellStyle }}>
              <div>
                <span style={{ fontWeight: 600 }}>{sample.label}</span>
                <span style={{ color: 'rgba(12,12,12,0.45)', fontSize: '13px', marginLeft: '12px' }}>{sample.desc}</span>
              </div>
              <a
                href={`/samples/${sample.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className={s.detailLink}
              >
                보기 →
              </a>
            </div>
          ))}
        </div>

        {/* 제작완료 */}
        <h2 style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em', marginBottom: '16px', marginTop: 0 }}>
          제작완료 ({completed.length})
        </h2>
        {completed.length === 0 ? (
          <p style={{ fontSize: '14px', color: 'rgba(12,12,12,0.45)' }}>아직 완료된 포트폴리오가 없습니다</p>
        ) : (
          <div style={{ border: '1px solid rgba(12,12,12,0.1)', backgroundColor: '#fff' }}>
            {completed.map((page) => (
              <div key={page.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', alignItems: 'center', ...cellStyle }}>
                <span style={{ fontWeight: 500 }}>@{page.username}</span>
                <span style={{ color: 'rgba(12,12,12,0.45)', fontSize: '13px' }}>{page.slug} · {page.templateId}</span>
                <a
                  href={`/u/${page.username}/${page.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.detailLink}
                >
                  보기 →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
