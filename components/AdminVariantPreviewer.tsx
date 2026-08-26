'use client'

import { useState } from 'react'
import { requestVariants } from '@/lib/templates/index'
import type { TemplateProps } from '@/lib/templates/types'

interface Props extends TemplateProps {
  requestId: string
  selectedTemplateId?: string | null
}

export default function AdminVariantPreviewer({
  requestId,
  selectedTemplateId,
  ...templateProps
}: Props) {
  const [previewing, setPreviewing] = useState<string | null>(null)
  const variants = requestVariants[requestId] ?? []

  if (variants.length === 0) return null

  const previewVariant = previewing ? variants.find((v) => v.id === previewing) : null

  return (
    <>
      {/* ── Fullscreen overlay ── */}
      {previewVariant && (() => {
        const { label, component: Template } = previewVariant
        return (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', flexDirection: 'column', background: '#fff' }}>
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 20px',
              borderBottom: '1px solid rgba(12,12,12,0.1)',
              flexShrink: 0,
              background: '#fff',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 600, fontSize: '15px', color: '#0C0C0C' }}>{label}</span>
                {selectedTemplateId === previewVariant.id && (
                  <span style={{
                    fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em',
                    background: '#0C0C0C', color: '#fff',
                    padding: '2px 8px', borderRadius: '2px',
                  }}>
                    유저 선택
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setPreviewing(null)}
                style={{
                  padding: '8px 16px', border: '1px solid rgba(12,12,12,0.2)',
                  background: 'transparent', color: '#0C0C0C',
                  fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                닫기
              </button>
            </div>
            {/* Scrollable template */}
            <div style={{ flex: 1, overflow: 'auto' }}>
              <Template {...templateProps} />
            </div>
          </div>
        )
      })()}

      {/* ── Variant grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '16px',
      }}>
        {variants.map(({ id, label, description, component: Template }) => {
          const isSelected = selectedTemplateId === id
          return (
            <div
              key={id}
              style={{
                display: 'flex', flexDirection: 'column',
                border: isSelected ? '2px solid #0C0C0C' : '1px solid rgba(12,12,12,0.12)',
                overflow: 'hidden',
              }}
            >
              {/* Scaled preview */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setPreviewing(id)}
                onKeyDown={(e) => e.key === 'Enter' && setPreviewing(id)}
                style={{
                  cursor: 'zoom-in',
                  display: 'block', height: '190px',
                  overflow: 'hidden', position: 'relative',
                  background: '#F8F8F8',
                  userSelect: 'none',
                }}
                aria-label={`${label} 크게 보기`}
              >
                <div style={{
                  transform: 'scale(0.3)',
                  transformOrigin: 'top left',
                  width: '333%', height: '333%',
                  pointerEvents: 'none',
                }}>
                  <Template {...templateProps} isPreview />
                </div>
                {/* Hover overlay */}
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: 0, transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0' }}
                >
                  <span style={{
                    background: 'rgba(0,0,0,0.65)', color: '#fff',
                    fontSize: '12px', fontWeight: 500, padding: '6px 12px',
                  }}>
                    크게 보기
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div style={{
                padding: '12px 14px', background: '#fff',
                borderTop: '1px solid rgba(12,12,12,0.08)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '13px', color: '#0C0C0C' }}>{label}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'rgba(12,12,12,0.45)' }}>{description}</p>
                </div>
                {isSelected && (
                  <span style={{
                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em',
                    color: '#0C0C0C', border: '1px solid rgba(12,12,12,0.3)',
                    padding: '3px 8px', flexShrink: 0,
                  }}>
                    선택됨
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
