import NavBar from './NavBar'
import HeroSection from './HeroSection'
import MarqueeSection from './MarqueeSection'
import AboutSection from './AboutSection'
import FeaturesSection from './FeaturesSection'
import ShowcaseSection from './ShowcaseSection'
import GallerySection from './GallerySection'
import HowItWorksSection from './HowItWorksSection'
import CtaSection from './CtaSection'

export default function DayDittoPage() {
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
