import { db } from '@/lib/db'
import { publishedPages } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import * as s from '@/styles/dashboard/dashboard.css'
import * as a from '@/styles/admin/admin.css'

const SAMPLES = [
  { slug: 'dayditto', label: 'DayDitto', desc: '일기 기반 영어 학습 서비스' },
  { slug: 'wara', label: '와라', desc: '소셜 모임 플래닝 플랫폼' },
]

export default async function AdminPortfoliosPage() {
  const completed = await db
    .select()
    .from(publishedPages)
    .orderBy(desc(publishedPages.createdAt))

  return (
    <>
      <div className={s.pageHeader}>
        <h1 className={s.pageTitle}>포트폴리오</h1>
      </div>
      <div className={a.pageInner}>

        {/* 샘플 */}
        <h2 className={a.pageH2}>샘플 페이지</h2>
        <div className={a.listCardMb}>
          {SAMPLES.map((sample) => (
            <div key={sample.slug} className={a.cellRow2}>
              <div>
                <span className={a.cellName}>{sample.label}</span>
                <span className={a.cellDesc}>{sample.desc}</span>
              </div>
              <a href={`/samples/${sample.slug}`} target="_blank" rel="noopener noreferrer" className={s.detailLink}>
                보기 →
              </a>
            </div>
          ))}
        </div>

        {/* 제작완료 */}
        <h2 className={a.pageH2}>제작완료 ({completed.length})</h2>
        {completed.length === 0 ? (
          <p className={a.emptyNote}>아직 완료된 포트폴리오가 없습니다</p>
        ) : (
          <div className={a.listCard}>
            {completed.map((page) => (
              <div key={page.id} className={a.cellRow3}>
                <span className={a.cellNameMed}>@{page.username}</span>
                <span className={a.cellMeta}>{page.slug} · {page.templateId}</span>
                <a href={`/u/${page.username}/${page.slug}`} target="_blank" rel="noopener noreferrer" className={s.detailLink}>
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
