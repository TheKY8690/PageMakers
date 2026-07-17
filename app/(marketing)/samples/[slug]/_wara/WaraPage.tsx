'use client'

import { useState } from 'react'
import Preloader from './Preloader'
import CustomCursor from './CustomCursor'
import WaraNav from './WaraNav'
import HeroSection from './HeroSection'
import PinnedSections from './PinnedSections'
import FeatureCards from './FeatureCards'
import CtaSection from './CtaSection'

export default function WaraPage() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      style={{
        backgroundColor: '#14121A',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: '100vh',
      }}
    >
      <CustomCursor />
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <WaraNav />
      <HeroSection />
      <PinnedSections />
      <FeatureCards />
      <CtaSection />
    </div>
  )
}
