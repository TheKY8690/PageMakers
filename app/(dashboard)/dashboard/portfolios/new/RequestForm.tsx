'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useTransition } from 'react'
import { createPortfolioRequest } from './actions'
import * as s from '@/styles/dashboard/requestForm.css'

const WEBSITE_TYPES = [
  '회사·업체 홈페이지',
  '서비스 소개',
  '제품·상품 소개',
  '개인 포트폴리오',
  '매장·공간 소개',
  '프로젝트·행사 소개',
  '기타',
] as const

const schema = z.object({
  brandName: z.string().min(1, '브랜드명 또는 이름을 입력하세요'),
  websiteType: z.string().min(1, '홈페이지 유형을 선택하세요'),
  brandDescription: z.string().min(1, '브랜드 또는 본인 소개를 입력하세요'),
  additionalRequest: z.string().optional(),
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
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const selectedType = watch('websiteType')

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
      setColorError('대표 컬러를 최소 1개 선택하세요')
      return
    }
    setColorError(null)

    startTransition(async () => {
      const formData = new FormData()
      formData.set('brandName', values.brandName)
      formData.set('websiteType', values.websiteType)
      formData.set('brandDescription', values.brandDescription)
      if (values.additionalRequest) {
        formData.set('additionalRequest', values.additionalRequest)
      }
      brandColors.forEach((c) => formData.append('brandColors', c))
      selectedFiles.forEach((file) => formData.append('images', file))
      await createPortfolioRequest(formData)
    })
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      {/* 브랜드명 또는 이름 */}
      <div className={s.field}>
        <label className={s.label} htmlFor="brandName">
          브랜드명 또는 이름<span className={s.requiredMark}>필수</span>
        </label>
        <input
          id="brandName"
          className={s.input}
          {...register('brandName')}
          placeholder="브랜드명 또는 이름"
        />
        {errors.brandName && <p className={s.errorText}>{errors.brandName.message}</p>}
      </div>

      {/* 홈페이지 유형 */}
      <div className={s.field}>
        <span className={s.label}>
          홈페이지 유형<span className={s.requiredMark}>필수</span>
        </span>
        <Controller
          name="websiteType"
          control={control}
          render={({ field }) => (
            <div className={s.radioGroup}>
              {WEBSITE_TYPES.map((type) => (
                <label
                  key={type}
                  className={selectedType === type ? s.radioLabelChecked : s.radioLabel}
                >
                  <input
                    type="radio"
                    className={s.radioInput}
                    value={type}
                    checked={field.value === type}
                    onChange={() => field.onChange(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          )}
        />
        {errors.websiteType && <p className={s.errorText}>{errors.websiteType.message}</p>}
      </div>

      {/* 브랜드 또는 본인 소개 */}
      <div className={s.field}>
        <label className={s.label} htmlFor="brandDescription">
          브랜드 또는 본인 소개<span className={s.requiredMark}>필수</span>
        </label>
        <textarea
          id="brandDescription"
          className={s.textarea}
          {...register('brandDescription')}
          placeholder="상세하게 작성해주세요"
        />
        {errors.brandDescription && <p className={s.errorText}>{errors.brandDescription.message}</p>}
      </div>

      {/* 대표 컬러 */}
      <div className={s.field}>
        <span className={s.label}>
          대표 컬러 (최대 3개)<span className={s.requiredMark}>필수</span>
        </span>
        <div className={s.colorList}>
          {brandColors.map((color, index) => (
            <div key={index} className={s.colorItem}>
              <input
                id={`brandColor-${index}`}
                type="color"
                className={s.colorPicker}
                value={color}
                onChange={(e) => updateColor(index, e.target.value)}
                aria-label={`대표 컬러 ${index + 1}`}
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

      {/* 로고/이미지 */}
      <div className={s.field}>
        <label className={s.label} htmlFor="images">
          로고 이미지 혹은 사용할 이미지<span className={s.optionalMark}>선택</span>
        </label>
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

      {/* 추가 요청사항 */}
      <div className={s.field}>
        <label className={s.label} htmlFor="additionalRequest">
          추가 요청사항<span className={s.optionalMark}>선택</span>
        </label>
        <textarea
          id="additionalRequest"
          className={s.textarea}
          {...register('additionalRequest')}
          placeholder="추가로 전달하고 싶은 내용을 자유롭게 작성해주세요"
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
