'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as s from '../../styles/landing/landing.css'

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage() {
  useEffect(() => {
    // ── Scroll restoration ───────────────────────────────────
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    // ── Nav entrance ─────────────────────────────────────────
    gsap.from('[data-nav]', { y: -30, opacity: 0, duration: 0.5, ease: 'power2.out' })

    // ── Hero word slide-up ────────────────────────────────────
    const heroChars = gsap.utils.toArray<HTMLElement>('[data-hero-char]')
    gsap.set(heroChars, { y: '110%' })
    gsap.to(heroChars, {
      y: '0%',
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.08,
      delay: 0.15,
    })

    // ── Hero fade-in elements ────────────────────────────────
    const heroEls = gsap.utils.toArray<HTMLElement>('[data-hero-el]')
    gsap.set(heroEls, { opacity: 0, y: 40 })
    gsap.to(heroEls, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      delay: 0.35,
    })

    // ── Section title clip reveal ────────────────────────────
    const titleEls = gsap.utils.toArray<HTMLElement>('[data-reveal-title]')
    gsap.set(titleEls, { y: '105%' })
    ScrollTrigger.batch(titleEls, {
      onEnter: (els) =>
        gsap.to(els, { y: '0%', duration: 0.9, ease: 'power3.out', stagger: 0.06 }),
      start: 'top 88%',
      once: true,
    })

    // ── Scroll reveals ───────────────────────────────────────
    const revealEls = gsap.utils.toArray<HTMLElement>('[data-reveal]')
    gsap.set(revealEls, { opacity: 0, y: 40 })
    ScrollTrigger.batch(revealEls, {
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: 'power2.out',
        }),
      start: 'top 88%',
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      {/* Nav */}
      <nav className={s.nav} data-nav>
        <Link href="/" className={s.navLogo}>PageMakers</Link>
        <div className={s.navLinks}>
          <Link href="#services" className={s.navLink}>서비스</Link>
          <Link href="#process" className={s.navLink}>과정</Link>
          <Link href="#samples" className={s.navLink}>샘플</Link>
        </div>
        <Link href="/dashboard/portfolios/new" className={s.navCta}>요청하기</Link>
      </nav>

      {/* Hero */}
      <section className={s.hero}>
        {/* Geometric background */}
        <div className={s.heroDotGrid} aria-hidden="true" />
        <div className={s.heroGlow} aria-hidden="true" />
        <div className={s.heroNoise} aria-hidden="true" />
        <div className={s.heroRing1} aria-hidden="true" />
        <div className={s.heroRing2} aria-hidden="true" />

        <div className={s.heroContent}>
          <p className={s.heroEyebrow} data-hero-el>Portfolio Page Service</p>
          <h1 className={s.heroLogo}>
            <span className={s.heroLogoClip}>
              <span data-hero-char>Page</span>
            </span>
            {' '}
            <span className={s.heroLogoClip}>
              <span data-hero-char>Makers</span>
            </span>
          </h1>
          <p className={s.heroTagline} data-hero-el>브랜드를 담은 포트폴리오 페이지</p>
          <p className={s.heroSub} data-hero-el>
            요청서 하나로, 전문가가 만드는 나만의 포트폴리오 페이지.<br />
            브랜드 컬러부터 소개까지 — 직접 만들 필요 없습니다.
          </p>
          <Link href="/dashboard/portfolios/new" className={s.heroBtn} data-hero-el>
            지금 요청하기 →
          </Link>
        </div>

        <div className={s.scrollHint}>
          <span className={s.scrollLine} />
          <span className={s.scrollLabel}>scroll</span>
        </div>
      </section>

      {/* Services */}
      <section className={s.section} id="services">
        <div className={s.sectionInner}>
          <p className={s.sectionLabel} data-reveal>Services</p>
          <div>
            <h2 className={s.sectionTitle}>
              <span className={s.heroLogoClip}>
                <span data-reveal-title>왜 PageMakers인가요</span>
              </span>
            </h2>
            <div className={s.serviceList}>
              <div className={s.serviceItem} data-reveal>
                <span className={s.serviceNum}>01</span>
                <p className={s.serviceTitle}>맞춤 디자인</p>
                <p className={s.serviceDesc}>브랜드 컬러와 소개를 바탕으로 100% 맞춤 제작합니다. 같은 디자인은 없습니다.</p>
              </div>
              <div className={s.serviceItem} data-reveal>
                <span className={s.serviceNum}>02</span>
                <p className={s.serviceTitle}>빠른 납기</p>
                <p className={s.serviceDesc}>요청 후 신속하게 제작·검토·배포까지 진행합니다. 기다림을 최소화합니다.</p>
              </div>
              <div className={s.serviceItem} data-reveal>
                <span className={s.serviceNum}>03</span>
                <p className={s.serviceTitle}>반응형 지원</p>
                <p className={s.serviceDesc}>모바일, 태블릿, 데스크톱 모두 완벽하게 대응하는 페이지를 제공합니다.</p>
              </div>
              <div className={s.serviceItem} data-reveal>
                <span className={s.serviceNum}>04</span>
                <p className={s.serviceTitle}>고유 URL</p>
                <p className={s.serviceDesc}>나만의 주소로 즉시 공유 가능합니다. 링크 하나로 포트폴리오를 전달하세요.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={s.section} id="process">
        <div className={s.sectionInner}>
          <p className={s.sectionLabel} data-reveal>Process</p>
          <div>
            <h2 className={s.sectionTitle}>
              <span className={s.heroLogoClip}>
                <span data-reveal-title>3단계로 완성됩니다</span>
              </span>
            </h2>
            <div className={s.stepsGrid}>
              <div className={s.step} data-reveal>
                <span className={s.stepNum}>01</span>
                <p className={s.stepTitle}>요청서 작성</p>
                <p className={s.stepDesc}>브랜드 이름, 소개, 컬러, 참고 이미지를 입력하세요. 5분이면 충분합니다.</p>
              </div>
              <div className={s.step} data-reveal>
                <span className={s.stepNum}>02</span>
                <p className={s.stepTitle}>전문가 제작</p>
                <p className={s.stepDesc}>전달받은 정보를 바탕으로 디자이너가 직접 포트폴리오 페이지를 제작합니다.</p>
              </div>
              <div className={s.step} data-reveal>
                <span className={s.stepNum}>03</span>
                <p className={s.stepTitle}>페이지 배포</p>
                <p className={s.stepDesc}>완성된 페이지는 고유 URL로 즉시 공개됩니다. 링크 하나로 누구에게나 공유하세요.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Samples */}
      <section className={s.section} id="samples">
        <div className={s.sectionInner}>
          <p className={s.sectionLabel} data-reveal>Samples</p>
          <div>
            <h2 className={s.sectionTitle}>
              <span className={s.heroLogoClip} style={{ display: 'block' }}>
                <span data-reveal-title>이런 페이지를</span>
              </span>
              <span className={s.heroLogoClip} style={{ display: 'block' }}>
                <span data-reveal-title>만들어드립니다</span>
              </span>
            </h2>
            <div className={s.samplesGrid}>
              <Link href="/samples/dayditto" className={s.sampleCard} data-reveal>
                <span className={s.sampleTag}>Sample 01</span>
                <p className={s.sampleName}>DayDitto</p>
                <p className={s.sampleDesc}>감성적인 라이프스타일 브랜드를 위한 따뜻한 톤의 포트폴리오 페이지</p>
                <span className={s.sampleArrow}>→</span>
              </Link>
              <Link href="/samples/wara" className={s.sampleCard} data-reveal>
                <span className={s.sampleTag}>Sample 02</span>
                <p className={s.sampleName}>Wara</p>
                <p className={s.sampleDesc}>모던하고 세련된 다크 톤의 브랜드 포트폴리오 페이지</p>
                <span className={s.sampleArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.ctaSection}>
        <h2 className={s.ctaTitle} data-reveal>
          지금 첫 번째<br />포트폴리오를<br />만들어보세요.
        </h2>
        <Link href="/dashboard/portfolios/new" className={s.ctaBtn} data-reveal>
          시작하기 →
        </Link>
      </section>

      {/* Footer */}
      <footer className={s.footer}>
        <span className={s.footerText}>© 2026 PageMakers. All rights reserved.</span>
        <Link href="/dashboard" className={s.footerLink}>대시보드</Link>
      </footer>
    </>
  )
}
