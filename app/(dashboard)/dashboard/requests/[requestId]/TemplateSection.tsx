'use client'

import { useState } from 'react'
import TemplatePreview from '@/components/TemplatePreview'
import TemplatePicker from './preview/TemplatePicker'
import { requestVariants } from '@/lib/templates/index'

interface Props {
  requestId: string
  status: string
  selectedTemplateId: string | null
  brandName: string
  brandDescription: string
  brandColors: string[]
  imageUrls: string[]
  mainImageUrl?: string | null
  contacts?: { type: string; value: string }[]
  websiteType?: string
}

export default function TemplateSection({
  requestId,
  status,
  selectedTemplateId,
  brandName,
  brandDescription,
  brandColors,
  imageUrls,
  mainImageUrl,
  contacts,
  websiteType,
}: Props) {
  const [showPicker, setShowPicker] = useState(false)

  if (status !== 'template_selection') return null

  // 선택 완료 + 재선택 안 한 상태
  if (selectedTemplateId && !showPicker) {
    return (
      <div style={{ marginTop: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 700, fontSize: '16px', letterSpacing: '-0.03em', margin: 0, color: '#0C0C0C' }}>
            선택한 템플릿
          </h2>
          <button
            type="button"
            onClick={() => setShowPicker(true)}
            style={{
              padding: '6px 14px',
              border: '1px solid rgba(12,12,12,0.2)',
              background: 'transparent',
              color: '#0C0C0C',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              borderRadius: '2px',
              fontFamily: 'inherit',
            }}
          >
            다시 선택
          </button>
        </div>
        <TemplatePreview
          templateId={selectedTemplateId}
          brandName={brandName}
          brandDescription={brandDescription}
          brandColors={brandColors}
          imageUrls={imageUrls}
          mainImageUrl={mainImageUrl}
          contacts={contacts}
          websiteType={websiteType}
        />
      </div>
    )
  }

  // 미선택 or 재선택 상태
  return (
    <div style={{ marginTop: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h2 style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 700, fontSize: '18px', letterSpacing: '-0.03em', margin: 0, color: '#0C0C0C' }}>
          템플릿 선택
        </h2>
        {showPicker && selectedTemplateId && (
          <button
            type="button"
            onClick={() => setShowPicker(false)}
            style={{
              padding: '6px 14px',
              border: '1px solid rgba(12,12,12,0.2)',
              background: 'transparent',
              color: 'rgba(12,12,12,0.5)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              borderRadius: '2px',
              fontFamily: 'inherit',
            }}
          >
            취소
          </button>
        )}
      </div>
      <p style={{ fontSize: '14px', color: 'rgba(12,12,12,0.45)', marginBottom: '24px', marginTop: 0 }}>
        브랜드에 어울리는 스타일을 골라주세요
      </p>
      <TemplatePicker
        requestId={requestId}
        variants={requestVariants[requestId] ?? []}
        brandName={brandName}
        brandDescription={brandDescription}
        brandColors={brandColors}
        imageUrls={imageUrls}
        mainImageUrl={mainImageUrl}
        contacts={contacts}
        websiteType={websiteType}
      />
    </div>
  )
}
