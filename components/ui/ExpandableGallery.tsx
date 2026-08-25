'use client'
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react'
import * as s from '@/styles/ui/expandableGallery.css'

interface Props {
  images: string[]
  altPrefix?: string
}

export default function ExpandableGallery({ images, altPrefix = 'image' }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  if (images.length === 0) return null

  return (
    <>
      <div className={s.galleryTrack}>
        {images.map((url, i) => (
          <div
            key={i}
            className={`${s.galleryItem} ${
              hoveredIdx === i ? s.galleryItemActive
              : hoveredIdx !== null ? s.galleryItemDim
              : ''
            }`}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => setLightboxIdx(i)}
          >
            <img className={s.galleryImg} src={url} alt={`${altPrefix} ${i + 1}`} />
            <div className={s.galleryOverlay} />
            <span className={s.galleryNum}>{String(i + 1).padStart(2, '0')}</span>
          </div>
        ))}
      </div>

      {lightboxIdx !== null && (
        <div className={s.lightboxOverlay} onClick={() => setLightboxIdx(null)}>
          <img
            className={s.lightboxImg}
            src={images[lightboxIdx]}
            alt={`${altPrefix} ${lightboxIdx + 1}`}
            onClick={e => e.stopPropagation()}
          />
          <button className={s.lightboxClose} onClick={() => setLightboxIdx(null)}>×</button>
          {images.length > 1 && (
            <>
              <button
                className={s.lightboxPrev}
                onClick={e => {
                  e.stopPropagation()
                  setLightboxIdx((lightboxIdx - 1 + images.length) % images.length)
                }}
              >‹</button>
              <button
                className={s.lightboxNext}
                onClick={e => {
                  e.stopPropagation()
                  setLightboxIdx((lightboxIdx + 1) % images.length)
                }}
              >›</button>
            </>
          )}
          <span className={s.lightboxCounter}>{lightboxIdx + 1} / {images.length}</span>
        </div>
      )}
    </>
  )
}
