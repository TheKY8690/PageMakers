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

  // 진행 상태 안내 카드 (시안 노출 전)
  if (status === 'waiting') {
    return (
      <div style={{ marginTop: '32px', padding: '24px', background: '#FAFAFA', border: '1px solid rgba(12,12,12,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#5B21B6', flexShrink: 0 }} />
          <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', color: '#5B21B6' }}>작업대기중</span>
        </div>
        <p style={{ margin: 0, fontSize: '14px', color: 'rgba(12,12,12,0.55)', lineHeight: 1.7 }}>
          요청을 검토하고 있습니다.<br />제작 준비가 되면 알림 드리겠습니다.
        </p>
      </div>
    )
  }

  if (status === 'in_progress') {
    return (
      <div style={{ marginTop: '32px', padding: '24px', background: '#FAFAFA', border: '1px solid rgba(12,12,12,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0C0C0C', flexShrink: 0 }} />
          <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', color: '#0C0C0C' }}>작업중</span>
        </div>
        <p style={{ margin: 0, fontSize: '14px', color: 'rgba(12,12,12,0.55)', lineHeight: 1.7 }}>
          현재 맞춤 시안을 제작하고 있습니다.<br />완성되면 선택 요청 드리겠습니다.
        </p>
      </div>
    )
  }

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
