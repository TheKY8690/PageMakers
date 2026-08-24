'use client'

import { useRef, useState, useTransition } from 'react'
import { getAdditionalUploadUrls, submitAdditionalInfo } from './actions'

interface Props {
  requestId: string
  message: string
  requestedAt: Date | null
}

export default function AdditionalInfoForm({ requestId, message, requestedAt }: Props) {
  const [text, setText] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [isPending, startTransition] = useTransition()
  const [done, setDone] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (done) return null

  const handleSubmit = () => {
    startTransition(async () => {
      // 이미지 업로드
      let uploadedPaths: string[] = []
      if (files.length > 0) {
        const urls = await getAdditionalUploadUrls(
          requestId,
          files.map((f) => ({ name: f.name }))
        )
        await Promise.all(
          urls.map(({ signedUrl }, i) =>
            fetch(signedUrl, { method: 'PUT', body: files[i], headers: { 'Content-Type': files[i].type } })
          )
        )
        uploadedPaths = urls.map(({ path }) => path)
      }

      await submitAdditionalInfo(requestId, text, uploadedPaths)
      setDone(true)
    })
  }

  return (
    <div style={{
      border: '1px solid rgba(234,88,12,0.3)',
      background: '#FFF7ED',
      borderRadius: '2px',
      padding: '20px 24px',
      marginBottom: '24px',
    }}>
      {/* 헤더 */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{
          fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'rgba(234,88,12,0.8)', margin: '0 0 8px', fontWeight: 700,
        }}>
          📌 제작팀 메시지
          {requestedAt && (
            <span style={{ marginLeft: '8px', fontWeight: 400, letterSpacing: 0, textTransform: 'none', color: 'rgba(12,12,12,0.35)' }}>
              {new Date(requestedAt).toLocaleString('ko-KR')}
            </span>
          )}
        </p>
        <p style={{ fontSize: '15px', color: '#0C0C0C', margin: 0, lineHeight: 1.7, whiteSpace: 'pre-wrap', fontWeight: 500 }}>
          {message}
        </p>
      </div>

      {/* 구분선 */}
      <div style={{ borderTop: '1px solid rgba(234,88,12,0.15)', marginBottom: '16px' }} />

      {/* 텍스트 입력 */}
      <div style={{ marginBottom: '12px' }}>
        <label style={{ fontSize: '12px', color: 'rgba(12,12,12,0.5)', display: 'block', marginBottom: '6px', fontWeight: 500 }}>
          추가 내용 (선택)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="추가로 전달할 내용을 입력하세요"
          rows={3}
          style={{
            width: '100%', padding: '10px 12px',
            border: '1px solid rgba(12,12,12,0.15)', borderRadius: '2px',
            fontSize: '14px', fontFamily: 'inherit', resize: 'vertical',
            boxSizing: 'border-box', outline: 'none', background: '#fff',
          }}
        />
      </div>

      {/* 이미지 업로드 */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '12px', color: 'rgba(12,12,12,0.5)', display: 'block', marginBottom: '6px', fontWeight: 500 }}>
          추가 이미지 (선택)
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => {
            const selected = Array.from(e.target.files ?? [])
            setFiles((prev) => [...prev, ...selected])
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: '8px 14px', border: '1px dashed rgba(12,12,12,0.2)', borderRadius: '2px',
            background: '#fff', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
            color: 'rgba(12,12,12,0.5)',
          }}
        >
          + 이미지 추가
        </button>

        {files.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
            {files.map((f, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img
                  src={URL.createObjectURL(f)}
                  alt={f.name}
                  style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(12,12,12,0.1)', display: 'block' }}
                />
                <button
                  type="button"
                  onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                  style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: '#0C0C0C', color: '#fff', border: 'none',
                    fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 제출 버튼 */}
      <button
        type="button"
        disabled={isPending || (!text.trim() && files.length === 0)}
        onClick={handleSubmit}
        style={{
          padding: '10px 24px', border: '1px solid #0C0C0C', borderRadius: '2px',
          background: '#0C0C0C', color: '#fff', fontSize: '14px', fontWeight: 500,
          fontFamily: 'inherit', cursor: 'pointer',
          opacity: isPending || (!text.trim() && files.length === 0) ? 0.4 : 1,
        }}
      >
        {isPending ? '전송 중...' : '제출하기'}
      </button>
    </div>
  )
}
