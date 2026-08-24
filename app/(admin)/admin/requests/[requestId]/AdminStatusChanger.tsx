'use client'

import { useTransition } from 'react'
import { changeStatus } from './actions'

const STATUS_OPTIONS = [
  { value: 'pending',            label: '요청중' },
  { value: 'waiting',            label: '작업대기중' },
  { value: 'in_progress',        label: '작업중' },
  { value: 'template_selection', label: '선택요망' },
  { value: 'done',               label: '제작완료' },
  { value: 'cancelled',          label: '취소' },
]

interface Props {
  requestId: string
  currentStatus: string
}

export default function AdminStatusChanger({ requestId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value
    if (next === currentStatus) return
    startTransition(() => changeStatus(requestId, next))
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '11px', color: 'rgba(12,12,12,0.4)', letterSpacing: '0.04em' }}>상태 변경</span>
      <select
        value={currentStatus}
        onChange={handleChange}
        disabled={isPending}
        style={{
          padding: '5px 10px',
          border: '1px solid rgba(12,12,12,0.2)',
          fontSize: '13px',
          fontFamily: 'inherit',
          fontWeight: 500,
          color: '#0C0C0C',
          background: isPending ? 'rgba(12,12,12,0.04)' : '#fff',
          cursor: isPending ? 'wait' : 'pointer',
          appearance: 'auto',
          outline: 'none',
        }}
      >
        {STATUS_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      {isPending && (
        <span style={{ fontSize: '11px', color: 'rgba(12,12,12,0.4)' }}>저장 중...</span>
      )}
    </div>
  )
}
