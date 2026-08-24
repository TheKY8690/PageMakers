'use client'

import { templateRegistry } from '@/lib/templates/index'
import type { TemplateId } from '@/lib/templates/types'

interface Props {
  templateId: string
  brandName: string
  brandDescription: string
  brandColors: string[]
  imageUrls: string[]
  mainImageUrl?: string | null
  contacts?: { type: string; value: string }[]
  websiteType?: string
}

export default function TemplatePreview({ templateId, brandName, brandDescription, brandColors, imageUrls, mainImageUrl, contacts, websiteType }: Props) {
  const entry = templateRegistry[templateId as TemplateId]
  if (!entry) return null

  const { label, description, component: Template } = entry

  return (
    <div style={{ maxWidth: '360px' }}>
      <div style={{ border: '2px solid rgba(12,12,12,0.12)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '220px', overflow: 'hidden', position: 'relative', background: '#F8FAFC', pointerEvents: 'none', userSelect: 'none' }}>
          <div style={{ transform: 'scale(0.3)', transformOrigin: 'top left', width: '333%', height: '333%' }}>
            <Template
              brandName={brandName}
              brandDescription={brandDescription}
              brandColors={brandColors}
              imageUrls={imageUrls}
              mainImageUrl={mainImageUrl}
              contacts={contacts}
              websiteType={websiteType}
            />
          </div>
        </div>
        <div style={{ padding: '12px 16px', background: '#fff', borderTop: '1px solid rgba(12,12,12,0.08)' }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#0C0C0C' }}>{label}</p>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'rgba(12,12,12,0.45)' }}>{description}</p>
        </div>
      </div>
    </div>
  )
}
