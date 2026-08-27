'use client'
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react'
import * as s from '@/styles/ui/elasticGallery.css'

interface Props {
  images: string[]
  thumbImages?: string[]
  altPrefix?: string
  title?: string
  category?: string
}

export default function ElasticGallery({ images, thumbImages, altPrefix = 'image', title, category }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  if (images.length === 0) return null

  const hasText = !!(title || category)

  return (
    <div className={s.track}>
      {images.map((url, i) => {
        const thumb = thumbImages?.[i] ?? url
        const isActive = hoveredIdx === i
        const isDim = hoveredIdx !== null && !isActive
        return (
          <div
            key={i}
            className={`${s.item} ${isActive ? s.itemActive : isDim ? s.itemDim : ''}`}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <img
              className={s.imgThumb}
              src={thumb}
              alt={`${altPrefix} ${i + 1}`}
              loading={i < 3 ? 'eager' : 'lazy'}
            />
            <img
              className={s.imgFull}
              src={url}
              alt={`${altPrefix} ${i + 1}`}
              loading={i < 3 ? 'eager' : 'lazy'}
            />
            <div className={s.overlay} />
            {hasText && (
              <div className={s.textWrap}>
                {category && <span className={s.categoryBadge}>{category}</span>}
                {title && <p className={s.title}>{title}</p>}
                <span className={s.viewProject}>VIEW PROJECT ↗</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
