'use client'

import { useState, useTransition } from 'react'
import { templateRegistry, TEMPLATE_IDS } from '@/lib/templates/index'
import { selectTemplate } from './actions'
import type { TemplateId } from '@/lib/templates/types'
import type { TemplateProps } from '@/lib/templates/types'

interface Props extends TemplateProps {
  requestId: string
}

export default function TemplatePicker({ requestId, ...templateProps }: Props) {
  const [selected, setSelected] = useState<TemplateId | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSelect(id: TemplateId) {
    if (!isPending) setSelected(id)
  }

  function handleConfirm() {
    if (!selected) return
    startTransition(() => selectTemplate(requestId, selected))
  }

  return (
    <div>
      {/* Template grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {TEMPLATE_IDS.map((id) => {
          const { label, description, component: Template } = templateRegistry[id]
          const isSelected = selected === id

          return (
            <button
              key={id}
              type="button"
              onClick={() => handleSelect(id)}
              style={{
                all: 'unset',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                border: isSelected ? '2px solid #0369A1' : '2px solid #E2E8F0',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                boxShadow: isSelected ? '0 0 0 4px rgba(3,105,161,0.15)' : '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              {/* Scaled preview */}
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative', background: '#F8FAFC', pointerEvents: 'none', userSelect: 'none' }}>
                <div style={{ transform: 'scale(0.3)', transformOrigin: 'top left', width: '333%', height: '333%' }}>
                  <Template {...templateProps} />
                </div>
              </div>

              {/* Label */}
              <div style={{ padding: '14px 16px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#0F172A' }}>{label}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748B' }}>{description}</p>
                </div>
                {isSelected && (
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#0369A1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                )}
              </div>
            </button>
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
            background: selected ? '#0369A1' : '#E2E8F0',
            color: selected ? '#fff' : '#94A3B8',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 28px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: selected && !isPending ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background 0.15s ease',
          }}
        >
          {isPending ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ animation: 'spin 0.8s linear infinite' }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              제작 중...
            </>
          ) : '이 템플릿으로 제작하기'}
        </button>
      </div>
    </div>
  )
}
