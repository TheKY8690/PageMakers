import type { Metadata } from 'next'
import NavBar from './_components/NavBar'
import HeroSection from './_components/HeroSection'
import MarqueeSection from './_components/MarqueeSection'
import AboutSection from './_components/AboutSection'
import FeaturesSection from './_components/FeaturesSection'
import ShowcaseSection from './_components/ShowcaseSection'
import GallerySection from './_components/GallerySection'
import HowItWorksSection from './_components/HowItWorksSection'
import CtaSection from './_components/CtaSection'

export const metadata: Metadata = {
  title: 'DayDitto — 나의 하루를 다른 언어로 다시 쓰다',
  description: '일기 기반 영어 학습 서비스. Claude AI 번역 + Google TTS 원어민 발음.',
}

export default function SamplePage() {
  return (
    <div style={{ backgroundColor: '#0f0f0f', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <NavBar />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <FeaturesSection />
      <ShowcaseSection />
      <GallerySection />
      <HowItWorksSection />
      <CtaSection />
    </div>
  )
}
