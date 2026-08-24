'use client'

import { useState, useTransition } from 'react'
import { sendInfoRequest, clearInfoRequest } from './actions'

interface Props {
  requestId: string
  currentMessage: string | null
  requestedAt: Date | null
  status: string
}

const INACTIVE_STATUSES = ['done', 'cancelled']

export default function AdminInfoRequester({ requestId, currentMessage, requestedAt, status }: Props) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [isPending, startTransition] = useTransition()

  if (INACTIVE_STATUSES.includes(status)) return null

  const btnBase: React.CSSProperties = {
    padding: '8px 16px', border: '1px solid', cursor: 'pointer',
    fontSize: '13px', fontWeight: 500, fontFamily: 'inherit', borderRadius: '2px',
  }

  if (currentMessage) {
    return (
      <div style={{ padding: '14px 20px', background: '#FFF7ED', border: '1px solid rgba(234,88,12,0.2)', borderRadius: '2px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(12,12,12,0.4)', margin: '0 0 6px', fontWeight: 600 }}>
              추가 자료 요청 중
              {requestedAt && (
                <span style={{ marginLeft: '8px', fontWeight: 400, letterSpacing: 0, textTransform: 'none' }}>
                  {new Date(requestedAt).toLocaleString('ko-KR')}
                </span>
              )}
            </p>
            <p style={{ fontSize: '14px', color: '#0C0C0C', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {currentMessage}
            </p>
          </div>
          <form
            action={async () => {
              startTransition(async () => { await clearInfoRequest(requestId) })
            }}
          >
            <button
              type="submit"
              disabled={isPending}
              style={{ ...btnBase, background: 'transparent', color: 'rgba(12,12,12,0.45)', borderColor: 'rgba(12,12,12,0.2)', whiteSpace: 'nowrap' }}
            >
              요청 취소
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{ ...btnBase, background: 'transparent', color: '#0C0C0C', borderColor: 'rgba(12,12,12,0.3)' }}
      >
        추가 자료 요청
      </button>
    )
  }

  return (
    <div style={{ border: '1px solid rgba(12,12,12,0.1)', borderRadius: '2px', padding: '16px', background: '#fff' }}>
      <p style={{ fontSize: '12px', color: 'rgba(12,12,12,0.45)', margin: '0 0 8px', fontWeight: 500 }}>
        유저에게 요청할 내용을 입력하세요
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="예: 로고 파일과 추가 사진 3장 부탁드립니다"
        rows={3}
        style={{
          width: '100%', padding: '10px 12px', border: '1px solid rgba(12,12,12,0.15)',
          fontSize: '14px', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box',
          borderRadius: '2px', outline: 'none',
        }}
      />
      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
        <button
          disabled={isPending || !text.trim()}
          onClick={() => {
            startTransition(async () => {
              await sendInfoRequest(requestId, text)
              setText('')
              setOpen(false)
            })
          }}
          style={{ ...btnBase, background: '#0C0C0C', color: '#fff', borderColor: '#0C0C0C', opacity: !text.trim() ? 0.4 : 1 }}
        >
          {isPending ? '전송 중...' : '전송'}
        </button>
        <button
          onClick={() => { setOpen(false); setText('') }}
          style={{ ...btnBase, background: 'transparent', color: 'rgba(12,12,12,0.5)', borderColor: 'rgba(12,12,12,0.15)' }}
        >
          취소
        </button>
      </div>
    </div>
  )
}
