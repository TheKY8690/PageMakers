'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useTransition } from 'react'
import { createPortfolioRequest, getSignedUploadUrls } from './actions'
import * as s from '@/styles/dashboard/requestForm.css'

const CONTACT_TYPES = [
  { id: 'phone',     label: '전화번호' },
  { id: 'kakao',     label: '카카오톡' },
  { id: 'instagram', label: '인스타그램' },
  { id: 'naver',     label: '네이버 블로그' },
  { id: 'youtube',   label: '유튜브' },
  { id: 'facebook',  label: '페이스북' },
  { id: 'twitter',   label: 'X (트위터)' },
  { id: 'tiktok',    label: '틱톡' },
] as const

function getContactPlaceholder(type: string): string {
  const map: Record<string, string> = {
    phone: '010-0000-0000',
    kakao: '카카오톡 채널 URL 또는 ID',
    instagram: '@username',
    naver: '블로그 URL',
    youtube: '채널 URL',
    facebook: '페이지 URL',
    twitter: '@username',
    tiktok: '@username',
  }
  return map[type] ?? ''
}

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

async function supabaseUpload(signedUrl: string, file: File) {
  const res = await fetch(signedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  })
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`)
}

export default function RequestForm() {
  const [isPending, startTransition] = useTransition()
  const [mainImage, setMainImage] = useState<File | null>(null)
  const [additionalImages, setAdditionalImages] = useState<File[]>([])
  const [brandColors, setBrandColors] = useState<string[]>(['#000000'])
  const [contacts, setContacts] = useState<{ type: string; value: string }[]>([])
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

  function toggleContact(id: string) {
    setContacts((prev) =>
      prev.find((c) => c.type === id)
        ? prev.filter((c) => c.type !== id)
        : [...prev, { type: id, value: '' }]
    )
  }

  function updateContactValue(type: string, value: string) {
    setContacts((prev) => prev.map((c) => (c.type === type ? { ...c, value } : c)))
  }

  function onSubmit(values: FormValues) {
    if (brandColors.length === 0) {
      setColorError('대표 컬러를 최소 1개 선택하세요')
      return
    }
    setColorError(null)

    startTransition(async () => {
      // 1. 업로드할 파일 목록 구성
      const fileMeta = [
        ...(mainImage ? [{ name: mainImage.name, isMain: true, file: mainImage }] : []),
        ...additionalImages.map((f) => ({ name: f.name, isMain: false, file: f })),
      ]

      // 2. signed URL 발급
      const signed =
        fileMeta.length > 0
          ? await getSignedUploadUrls(fileMeta.map(({ name, isMain }) => ({ name, isMain })))
          : []

      // 3. 클라이언트에서 Supabase Storage 직접 업로드
      await Promise.all(signed.map(({ signedUrl }, i) => supabaseUpload(signedUrl, fileMeta[i].file)))

      // 4. path만 서버 액션에 전달
      const mainPath = signed.find((_, i) => fileMeta[i]?.isMain)?.path ?? null
      const additionalPaths = signed.filter((_, i) => !fileMeta[i]?.isMain).map((s) => s.path)

      const formData = new FormData()
      formData.set('brandName', values.brandName)
      formData.set('websiteType', values.websiteType)
      formData.set('brandDescription', values.brandDescription)
      if (values.additionalRequest) formData.set('additionalRequest', values.additionalRequest)
      brandColors.forEach((c) => formData.append('brandColors', c))
      formData.set('contacts', JSON.stringify(contacts))
      if (mainPath) formData.set('mainImagePath', mainPath)
      additionalPaths.forEach((p) => formData.append('imagePaths', p))

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

      {/* 이미지 업로드 */}
      <div className={s.imageRow}>
      {/* 메인 이미지 */}
      <div className={s.field}>
        <label className={s.label} htmlFor="mainImage">
          메인 이미지<span className={s.optionalMark}>선택</span>
        </label>
        {!mainImage ? (
          <label className={s.fileLabel} htmlFor="mainImage">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>이미지 선택</span>
            <span className={s.fileHint}>PNG, JPG, WEBP</span>
          </label>
        ) : (
          <div className={s.thumbnailGrid}>
            <div className={s.thumbnailItem}>
              <img
                src={URL.createObjectURL(mainImage)}
                alt={mainImage.name}
                className={s.thumbnailImg}
              />
              <button
                type="button"
                className={s.thumbnailRemove}
                onClick={() => setMainImage(null)}
                aria-label="메인 이미지 제거"
              >
                ×
              </button>
            </div>
          </div>
        )}
        <input
          id="mainImage"
          type="file"
          accept="image/*"
          className={s.fileInput}
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null
            setMainImage(file)
            e.target.value = ''
          }}
        />
      </div>

      {/* 추가 이미지 */}
      <div className={s.field}>
        <label className={s.label} htmlFor="additionalImages">
          추가 이미지<span className={s.optionalMark}>선택</span>
        </label>
        {additionalImages.length === 0 ? (
          <label className={s.fileLabel} htmlFor="additionalImages">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>이미지 선택</span>
            <span className={s.fileHint}>PNG, JPG, WEBP</span>
          </label>
        ) : (
          <div className={s.thumbnailGrid}>
            <label htmlFor="additionalImages" className={s.thumbnailAddBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              추가
            </label>
            {additionalImages.map((file, idx) => (
              <div key={idx} className={s.thumbnailItem}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className={s.thumbnailImg}
                />
                <button
                  type="button"
                  className={s.thumbnailRemove}
                  onClick={() => setAdditionalImages((prev) => prev.filter((_, i) => i !== idx))}
                  aria-label={`이미지 ${idx + 1} 제거`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          id="additionalImages"
          type="file"
          accept="image/*"
          multiple
          className={s.fileInput}
          onChange={(e) => {
            const files = Array.from(e.target.files ?? [])
            setAdditionalImages((prev) => [...prev, ...files])
            e.target.value = ''
          }}
        />
      </div>
      </div>

      {/* 연락처 */}
      <div className={s.field}>
        <span className={s.label}>
          연락처<span className={s.optionalMark}>선택</span>
        </span>
        <div className={s.contactChipGroup}>
          {CONTACT_TYPES.map((ct) => (
            <button
              type="button"
              key={ct.id}
              className={contacts.find((c) => c.type === ct.id) ? s.contactChipSelected : s.contactChip}
              onClick={() => toggleContact(ct.id)}
            >
              {ct.label}
            </button>
          ))}
        </div>
        {contacts.length > 0 && (
          <div className={s.contactInputList}>
            {contacts.map((ct) => (
              <div key={ct.type} className={s.contactInputRow}>
                <span className={s.contactTypeLabel}>
                  {CONTACT_TYPES.find((t) => t.id === ct.type)?.label}
                </span>
                <input
                  className={s.input}
                  style={{ flex: 1 }}
                  placeholder={getContactPlaceholder(ct.type)}
                  value={ct.value}
                  onChange={(e) => updateContactValue(ct.type, e.target.value)}
                />
                <button
                  type="button"
                  className={s.contactRemoveBtn}
                  onClick={() => toggleContact(ct.type)}
                  aria-label={`${CONTACT_TYPES.find((t) => t.id === ct.type)?.label} 제거`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
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
