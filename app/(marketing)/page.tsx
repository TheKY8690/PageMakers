import Link from 'next/link'
import * as s from '../../styles/landing/landing.css'

export default function LandingPage() {
  return (
    <>
      {/* Nav */}
      <nav className={s.nav}>
        <Link href="/" className={s.navLogo}>PageMakers</Link>
        <div className={s.navLinks}>
          <Link href="#services" className={s.navLink}>01 서비스</Link>
          <Link href="#process" className={s.navLink}>02 과정</Link>
          <Link href="#samples" className={s.navLink}>03 샘플</Link>
        </div>
        <Link href="/dashboard/portfolios/new" className={s.navCta}>요청하기</Link>
      </nav>

      {/* Hero */}
      <section className={s.hero}>
        <p className={s.heroEyebrow}>Portfolio Page Service</p>
        <h1 className={s.heroTitle}>브랜드를 담은<br />포트폴리오 페이지,<br />지금 바로.</h1>
        <p className={s.heroSub}>
          요청서 하나로, 전문가가 만드는 나만의 포트폴리오 페이지.
          브랜드 컬러부터 소개까지 — 직접 만들 필요 없습니다.
        </p>
        <Link href="/dashboard/portfolios/new" className={s.heroBtn}>
          지금 요청하기 →
        </Link>
      </section>

      {/* Services */}
      <section className={s.section} id="services">
        <p className={s.sectionLabel}>서비스</p>
        <h2 className={s.sectionTitle}>왜 PageMakers인가요</h2>
        <div className={s.servicesGrid}>
          <div className={s.serviceCard}>
            <span className={s.serviceNum}>01</span>
            <p className={s.serviceTitle}>맞춤 디자인</p>
            <p className={s.serviceDesc}>브랜드 컬러와 소개를 바탕으로 100% 맞춤 제작합니다. 같은 디자인은 없습니다.</p>
          </div>
          <div className={s.serviceCard}>
            <span className={s.serviceNum}>02</span>
            <p className={s.serviceTitle}>빠른 납기</p>
            <p className={s.serviceDesc}>요청 후 신속하게 제작·검토·배포까지 진행합니다. 기다림을 최소화합니다.</p>
          </div>
          <div className={s.serviceCard}>
            <span className={s.serviceNum}>03</span>
            <p className={s.serviceTitle}>반응형 지원</p>
            <p className={s.serviceDesc}>모바일, 태블릿, 데스크톱 모두 완벽하게 대응하는 페이지를 제공합니다.</p>
          </div>
          <div className={s.serviceCard}>
            <span className={s.serviceNum}>04</span>
            <p className={s.serviceTitle}>고유 URL</p>
            <p className={s.serviceDesc}>나만의 주소로 즉시 공유 가능합니다. 링크 하나로 포트폴리오를 전달하세요.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={s.section} id="process">
        <p className={s.sectionLabel}>과정</p>
        <h2 className={s.sectionTitle}>3단계로 완성됩니다</h2>
        <div className={s.stepsGrid}>
          <div className={s.step}>
            <span className={s.stepNum}>01</span>
            <p className={s.stepTitle}>요청서 작성</p>
            <p className={s.stepDesc}>브랜드 이름, 소개, 컬러, 참고 이미지를 입력하세요. 5분이면 충분합니다.</p>
          </div>
          <div className={s.step}>
            <span className={s.stepNum}>02</span>
            <p className={s.stepTitle}>전문가 제작</p>
            <p className={s.stepDesc}>전달받은 정보를 바탕으로 디자이너가 직접 포트폴리오 페이지를 제작합니다.</p>
          </div>
          <div className={s.step}>
            <span className={s.stepNum}>03</span>
            <p className={s.stepTitle}>페이지 배포</p>
            <p className={s.stepDesc}>완성된 페이지는 고유 URL로 즉시 공개됩니다. 링크 하나로 누구에게나 공유하세요.</p>
          </div>
        </div>
      </section>

      {/* Samples */}
      <section className={s.section} id="samples">
        <p className={s.sectionLabel}>샘플</p>
        <h2 className={s.sectionTitle}>이런 페이지를 만들어드립니다</h2>
        <div className={s.samplesGrid}>
          <Link href="/samples/dayditto" className={s.sampleCard}>
            <span className={s.sampleTag}>Sample 01</span>
            <p className={s.sampleName}>DayDitto</p>
            <p className={s.sampleDesc}>감성적인 라이프스타일 브랜드를 위한 따뜻한 톤의 포트폴리오 페이지</p>
            <span className={s.sampleArrow}>→</span>
          </Link>
          <Link href="/samples/wara" className={s.sampleCard}>
            <span className={s.sampleTag}>Sample 02</span>
            <p className={s.sampleName}>Wara</p>
            <p className={s.sampleDesc}>모던하고 세련된 다크 톤의 브랜드 포트폴리오 페이지</p>
            <span className={s.sampleArrow}>→</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className={s.sectionDark}>
        <div className={s.ctaInner}>
          <h2 className={s.ctaTitle}>지금 첫 번째<br />포트폴리오를<br />만들어보세요.</h2>
          <Link href="/dashboard/portfolios/new" className={s.ctaBtn}>
            시작하기 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={s.footer}>
        <span className={s.footerText}>© 2026 PageMakers. All rights reserved.</span>
        <Link href="/dashboard" className={s.footerLink}>대시보드</Link>
      </footer>
    </>
  )
}
