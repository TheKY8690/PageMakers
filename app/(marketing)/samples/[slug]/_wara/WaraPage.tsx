'use client'

import { useState } from 'react'
import Preloader from './Preloader'
import CustomCursor from './CustomCursor'
import WaraNav from './WaraNav'
import HeroSection from './HeroSection'
import FeatureGrid from './FeatureGrid'
import AboutStrip from './AboutStrip'
import FeatureCards from './FeatureCards'
import CtaSection from './CtaSection'

export default function WaraPage() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      style={{
        backgroundColor: '#0e0c18',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: '100vh',
      }}
    >
      <CustomCursor />
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <WaraNav />
      <HeroSection />
      <FeatureGrid />
      <AboutStrip />
      <FeatureCards />
      <CtaSection />
    </div>
  )
}
