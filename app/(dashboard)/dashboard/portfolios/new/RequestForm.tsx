'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useTransition } from 'react'
import { createPortfolioRequest } from './actions'
import * as s from '@/styles/dashboard/requestForm.css'

const schema = z.object({
  brandName: z.string().min(1, '브랜드명을 입력하세요'),
  brandDescription: z.string().min(1, '브랜드 설명을 입력하세요'),
})

type FormValues = z.infer<typeof schema>

export default function RequestForm() {
  const [isPending, startTransition] = useTransition()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [brandColors, setBrandColors] = useState<string[]>(['#000000'])
  const [colorError, setColorError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  function addColor() {
    if (brandColors.length < 3) {
      setBrandColors([...brandColors, '#000000'])
    }
  }

  function removeColor(index: number) {
    if (brandColors.length > 1) {
      setBrandColors(brandColors.filter((_, i) => i !== index))
    }
  }

  function updateColor(index: number, value: string) {
    setBrandColors(brandColors.map((c, i) => (i === index ? value : c)))
  }

  function onSubmit(values: FormValues) {
    if (brandColors.length === 0) {
      setColorError('브랜드 컬러를 최소 1개 선택하세요')
      return
    }
    setColorError(null)

    startTransition(async () => {
      const formData = new FormData()
      formData.set('brandName', values.brandName)
      formData.set('brandDescription', values.brandDescription)
      brandColors.forEach((c) => formData.append('brandColors', c))
      selectedFiles.forEach((file) => formData.append('images', file))
      await createPortfolioRequest(formData)
    })
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.field}>
        <label className={s.label} htmlFor="brandName">브랜드명</label>
        <input
          id="brandName"
          className={s.input}
          {...register('brandName')}
          placeholder="브랜드명"
        />
        {errors.brandName && <p className={s.errorText}>{errors.brandName.message}</p>}
      </div>

      <div className={s.field}>
        <label className={s.label} htmlFor="brandDescription">브랜드 설명</label>
        <textarea
          id="brandDescription"
          className={s.textarea}
          {...register('brandDescription')}
          placeholder="브랜드를 설명해 주세요"
        />
        {errors.brandDescription && <p className={s.errorText}>{errors.brandDescription.message}</p>}
      </div>

      <div className={s.field}>
        <span className={s.label}>브랜드 컬러</span>
        <div className={s.colorList}>
          {brandColors.map((color, index) => (
            <div key={index} className={s.colorItem}>
              <input
                id={`brandColor-${index}`}
                type="color"
                className={s.colorPicker}
                value={color}
                onChange={(e) => updateColor(index, e.target.value)}
                aria-label={`브랜드 컬러 ${index + 1}`}
              />
              <span className={s.colorHex}>{color.toUpperCase()}</span>
              {brandColors.length > 1 && (
                <button
                  type="button"
                  className={s.colorRemoveBtn}
                  onClick={() => removeColor(index)}
                  aria-label={`컬러 ${index + 1} 삭제`}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {brandColors.length < 3 && (
            <button
              type="button"
              className={s.colorAddBtn}
              onClick={addColor}
              aria-label="컬러 추가"
            >
              +
            </button>
          )}
        </div>
        {colorError && <p className={s.errorText}>{colorError}</p>}
      </div>

      <div className={s.field}>
        <label className={s.label} htmlFor="images">이미지 업로드</label>
        <label className={s.fileLabel} htmlFor="images">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>{selectedFiles.length > 0 ? `${selectedFiles.length}개 선택됨` : '이미지 선택'}</span>
          <span className={s.fileHint}>PNG, JPG, WEBP (여러 장 선택 가능)</span>
        </label>
        <input
          id="images"
          type="file"
          accept="image/*"
          multiple
          className={s.fileInput}
          onChange={(e) => setSelectedFiles(Array.from(e.target.files ?? []))}
        />
      </div>

      <button type="submit" className={s.submitBtn} disabled={isPending}>
        {isPending ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ animation: 'spin 0.8s linear infinite' }}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            제출 중...
          </>
        ) : '요청하기'}
      </button>
    </form>
  )
}
