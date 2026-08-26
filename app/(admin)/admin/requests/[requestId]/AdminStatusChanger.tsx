'use client'

import { useTransition } from 'react'
import { changeStatus } from './actions'
import * as a from '@/styles/admin/admin.css'

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
    <div className={a.statusChangerWrap}>
      <span className={a.statusChangerLabel}>상태 변경</span>
      <select
        value={currentStatus}
        onChange={handleChange}
        disabled={isPending}
        className={isPending ? a.statusSelectPending : a.statusSelect}
      >
        {STATUS_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      {isPending && <span className={a.statusSaving}>저장 중...</span>}
    </div>
  )
}
