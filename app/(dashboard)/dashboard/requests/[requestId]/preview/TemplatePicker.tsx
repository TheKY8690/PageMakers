'use client'

import { useState, useTransition } from 'react'
import type { ComponentType } from 'react'
import type { TemplateProps } from '@/lib/templates/types'
import { confirmTemplate } from '../actions'

interface Variant {
  id: string
  label: string
  description: string
  component: ComponentType<TemplateProps>
}

interface Props extends TemplateProps {
  requestId: string
  variants: Variant[]
}

export default function TemplatePicker({ requestId, variants, ...templateProps }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [previewing, setPreviewing] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSelect(id: string) {
    if (!isPending) setSelected(id)
  }

  function handleConfirm() {
    if (!selected) return
    startTransition(() => confirmTemplate(requestId, selected))
  }

  const previewVariant = previewing ? variants.find(v => v.id === previewing) : null

  // 준비 중 상태
  if (variants.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px', background: '#fff', border: '1px solid rgba(12,12,12,0.08)' }}>
        <p style={{ fontSize: '32px', marginBottom: '16px' }}>🛠️</p>
        <p style={{ fontSize: '18px', fontWeight: 600, color: '#0C0C0C', margin: '0 0 8px' }}>제작 준비 중입니다</p>
        <p style={{ fontSize: '14px', color: 'rgba(12,12,12,0.45)', margin: 0 }}>
          맞춤 디자인 시안을 제작하고 있습니다. 완성되면 안내 드리겠습니다.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Fullsize preview overlay */}
      {previewVariant && (() => {
        const { label, component: Template } = previewVariant
        return (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
            {/* Header bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: '#fff', borderBottom: '1px solid rgba(12,12,12,0.1)', flexShrink: 0 }}>
              <span style={{ fontWeight: 600, fontSize: '15px', color: '#0C0C0C' }}>{label}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setPreviewing(null)}
                  style={{ padding: '8px 16px', border: '1px solid rgba(12,12,12,0.2)', background: 'transparent', color: '#0C0C0C', fontSize: '14px', fontWeight: 500, cursor: 'pointer', borderRadius: '2px', fontFamily: 'inherit' }}
                >
                  닫기
                </button>
                <button
                  type="button"
                  onClick={() => { handleSelect(previewVariant.id); setPreviewing(null) }}
                  style={{ padding: '8px 16px', border: 'none', background: '#0C0C0C', color: '#fff', fontSize: '14px', fontWeight: 500, cursor: 'pointer', borderRadius: '2px', fontFamily: 'inherit' }}
                >
                  이 시안 선택하기
                </button>
              </div>
            </div>
            {/* Full-size scrollable template */}
            <div style={{ flex: 1, overflow: 'auto', background: '#fff' }}>
              <Template {...templateProps} />
            </div>
          </div>
        )
      })()}

      {/* Variant grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {variants.map((variant) => {
          const { id, label, description, component: Template } = variant
          const isSelected = selected === id

          return (
            <div
              key={id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: isSelected ? '2px solid #0C0C0C' : '2px solid rgba(12,12,12,0.1)',
                overflow: 'hidden',
                transition: 'border-color 0.15s ease',
              }}
            >
              {/* Scaled preview — click to open fullsize */}
              <button
                type="button"
                onClick={() => setPreviewing(id)}
                style={{ all: 'unset', cursor: 'zoom-in', display: 'block', height: '200px', overflow: 'hidden', position: 'relative', background: '#F8F8F8', pointerEvents: 'auto', userSelect: 'none' }}
                aria-label={`${label} 미리보기`}
              >
                <div style={{ transform: 'scale(0.3)', transformOrigin: 'top left', width: '333%', height: '333%', pointerEvents: 'none' }}>
                  <Template {...templateProps} isPreview />
                </div>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.15s', background: 'rgba(0,0,0,0.04)' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                >
                  <span style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '12px', fontWeight: 500, padding: '6px 12px', borderRadius: '2px' }}>크게 보기</span>
                </div>
              </button>

              {/* Label + select button */}
              <div style={{ padding: '14px 16px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#0C0C0C' }}>{label}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'rgba(12,12,12,0.45)' }}>{description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelect(id)}
                  disabled={isPending}
                  style={{
                    flexShrink: 0,
                    width: '24px', height: '24px', borderRadius: '50%',
                    border: isSelected ? 'none' : '2px solid rgba(12,12,12,0.2)',
                    background: isSelected ? '#0C0C0C' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.15s, border-color 0.15s',
                  }}
                  aria-label={`${label} 선택`}
                >
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Confirm button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!selected || isPending}
          style={{
            background: selected ? '#0C0C0C' : 'rgba(12,12,12,0.08)',
            color: selected ? '#fff' : 'rgba(12,12,12,0.3)',
            border: 'none',
            padding: '12px 28px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: selected && !isPending ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background 0.15s ease',
            fontFamily: 'inherit',
          }}
        >
          {isPending ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ animation: 'spin 0.8s linear infinite' }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              처리 중...
            </>
          ) : '이 시안으로 제작 요청하기'}
        </button>
      </div>
    </>
  )
}
