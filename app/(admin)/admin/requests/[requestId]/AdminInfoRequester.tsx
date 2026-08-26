'use client'

import { useState, useTransition } from 'react'
import { sendInfoRequest, clearInfoRequest } from './actions'
import * as a from '@/styles/admin/admin.css'

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

  if (currentMessage) {
    return (
      <div className={a.infoRequesterPanel}>
        <div className={a.infoRequesterPanelInner}>
          <div>
            <p className={a.infoRequesterMetaLabel}>
              추가 자료 요청 중
              {requestedAt && (
                <span className={a.infoRequesterTime}>
                  {new Date(requestedAt).toLocaleString('ko-KR')}
                </span>
              )}
            </p>
            <p className={a.infoRequesterMessage}>{currentMessage}</p>
          </div>
          <form action={async () => { startTransition(async () => { await clearInfoRequest(requestId) }) }}>
            <button type="submit" disabled={isPending} className={a.btnSmCancel}>
              요청 취소
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className={a.btnSmOutline}>
        추가 자료 요청
      </button>
    )
  }

  return (
    <div className={a.infoOpenPanel}>
      <p className={a.infoOpenNote}>유저에게 요청할 내용을 입력하세요</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="예: 로고 파일과 추가 사진 3장 부탁드립니다"
        rows={3}
        className={a.infoTextarea}
      />
      <div className={a.infoBtnRow}>
        <button
          disabled={isPending || !text.trim()}
          onClick={() => {
            startTransition(async () => {
              await sendInfoRequest(requestId, text)
              setText('')
              setOpen(false)
            })
          }}
          className={a.btnSmPrimary}
          style={{ opacity: !text.trim() ? 0.4 : 1 }}
        >
          {isPending ? '전송 중...' : '전송'}
        </button>
        <button
          onClick={() => { setOpen(false); setText('') }}
          className={a.btnSmGhost}
        >
          취소
        </button>
      </div>
    </div>
  )
}
