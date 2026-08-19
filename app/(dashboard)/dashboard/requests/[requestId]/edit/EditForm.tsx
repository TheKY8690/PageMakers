'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useTransition } from 'react'
import { getSignedUploadUrls, updateRequest } from '../actions'
import * as s from '@/styles/dashboard/requestForm.css'

const WEBSITE_TYPES = [
  '회사·업체 홈페이지', '서비스 소개', '제품·상품 소개', '프로필',
  '매장·공간 소개', '프로젝트·행사 소개', '기타',
] as const

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
    phone: '010-0000-0000', kakao: '카카오톡 채널 URL 또는 ID',
    instagram: '@username', naver: '블로그 URL', youtube: '채널 URL',
    facebook: '페이지 URL', twitter: '@username', tiktok: '@username',
  }
  return map[type] ?? ''
}

async function supabaseUpload(signedUrl: string, file: File) {
  const res = await fetch(signedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  })
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`)
}

const schema = z.object({
  brandName: z.string().min(1, '브랜드명 또는 이름을 입력하세요'),
  websiteType: z.string().min(1, '홈페이지 유형을 선택하세요'),
  brandDescription: z.string().min(1, '브랜드 또는 본인 소개를 입력하세요'),
  additionalRequest: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Props {
  requestId: string
  initial: {
    brandName: string
    websiteType: string
    brandDescription: string
    additionalRequest: string | null
    brandColors: string[]
    contacts: { type: string; value: string }[]
    mainImageUrl: string | null
    imageUrls: string[]
  }
}

export default function EditForm({ requestId, initial }: Props) {
  const [isPending, startTransition] = useTransition()
  const [brandColors, setBrandColors] = useState<string[]>(initial.brandColors.length ? initial.brandColors : ['#000000'])
  const [colorError, setColorError] = useState<string | null>(null)
  const [contacts, setContacts] = useState<{ type: string; value: string }[]>(initial.contacts)

  // 이미지: 기존 path + 새 File 분리
  const [keepMainPath, setKeepMainPath] = useState<string | null>(initial.mainImageUrl)
  const [newMainImage, setNewMainImage] = useState<File | null>(null)
  const [keepAdditionalPaths, setKeepAdditionalPaths] = useState<string[]>(initial.imageUrls)
  const [newAdditionalImages, setNewAdditionalImages] = useState<File[]>([])

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      brandName: initial.brandName,
      websiteType: initial.websiteType,
      brandDescription: initial.brandDescription,
      additionalRequest: initial.additionalRequest ?? '',
    },
  })

  const selectedType = watch('websiteType')

  function addColor() { if (brandColors.length < 3) setBrandColors([...brandColors, '#000000']) }
  function removeColor(i: number) { if (brandColors.length > 1) setBrandColors(brandColors.filter((_, idx) => idx !== i)) }
  function updateColor(i: number, v: string) { setBrandColors(brandColors.map((c, idx) => idx === i ? v : c)) }

  function toggleContact(id: string) {
    setContacts(prev =>
      prev.find(c => c.type === id) ? prev.filter(c => c.type !== id) : [...prev, { type: id, value: '' }]
    )
  }
  function updateContactValue(type: string, value: string) {
    setContacts(prev => prev.map(c => c.type === type ? { ...c, value } : c))
  }

  function onSubmit(values: FormValues) {
    if (brandColors.length === 0) { setColorError('대표 컬러를 최소 1개 선택하세요'); return }
    setColorError(null)

    startTransition(async () => {
      // 새 파일 업로드
      const fileMeta = [
        ...(newMainImage ? [{ name: newMainImage.name, isMain: true, file: newMainImage }] : []),
        ...newAdditionalImages.map(f => ({ name: f.name, isMain: false, file: f })),
      ]

      const signed = fileMeta.length > 0
        ? await getSignedUploadUrls(fileMeta.map(({ name, isMain }) => ({ name, isMain })))
        : []

      await Promise.all(signed.map(({ signedUrl }, i) => supabaseUpload(signedUrl, fileMeta[i].file)))

      const newMainPath = signed.find((_, i) => fileMeta[i]?.isMain)?.path ?? null
      const newAdditionalPaths = signed.filter((_, i) => !fileMeta[i]?.isMain).map(s => s.path)

      const finalMainPath = newMainPath ?? keepMainPath
      const finalAdditionalPaths = [...keepAdditionalPaths, ...newAdditionalPaths]

      const formData = new FormData()
      formData.set('brandName', values.brandName)
      formData.set('websiteType', values.websiteType)
      formData.set('brandDescription', values.brandDescription)
      if (values.additionalRequest) formData.set('additionalRequest', values.additionalRequest)
      brandColors.forEach(c => formData.append('brandColors', c))
      formData.set('contacts', JSON.stringify(contacts))
      if (finalMainPath) formData.set('mainImagePath', finalMainPath)
      finalAdditionalPaths.forEach(p => formData.append('imagePaths', p))

      await updateRequest(requestId, formData)
    })
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      {/* 브랜드명 */}
      <div className={s.field}>
        <label className={s.label} htmlFor="brandName">브랜드명 또는 이름<span className={s.requiredMark}>필수</span></label>
        <input id="brandName" className={s.input} {...register('brandName')} />
        {errors.brandName && <p className={s.errorText}>{errors.brandName.message}</p>}
      </div>

      {/* 홈페이지 유형 */}
      <div className={s.field}>
        <span className={s.label}>홈페이지 유형<span className={s.requiredMark}>필수</span></span>
        <Controller name="websiteType" control={control} render={({ field }) => (
          <div className={s.radioGroup}>
            {WEBSITE_TYPES.map(type => (
              <label key={type} className={selectedType === type ? s.radioLabelChecked : s.radioLabel}>
                <input type="radio" className={s.radioInput} value={type} checked={field.value === type} onChange={() => field.onChange(type)} />
                {type}
              </label>
            ))}
          </div>
        )} />
        {errors.websiteType && <p className={s.errorText}>{errors.websiteType.message}</p>}
      </div>

      {/* 소개 */}
      <div className={s.field}>
        <label className={s.label} htmlFor="brandDescription">브랜드 또는 본인 소개<span className={s.requiredMark}>필수</span></label>
        <textarea id="brandDescription" className={s.textarea} placeholder={`좌우명:\n소개글:\n어필하고 싶은 이력:`} {...register('brandDescription')} />
        {errors.brandDescription && <p className={s.errorText}>{errors.brandDescription.message}</p>}
      </div>

      {/* 대표 컬러 */}
      <div className={s.field}>
        <span className={s.label}>대표 컬러 (최대 3개)<span className={s.requiredMark}>필수</span></span>
        <div className={s.colorList}>
          {brandColors.map((color, i) => (
            <div key={i} className={s.colorItem}>
              <input type="color" className={s.colorPicker} value={color} onChange={e => updateColor(i, e.target.value)} aria-label={`컬러 ${i + 1}`} />
              <span className={s.colorHex}>{color.toUpperCase()}</span>
              {brandColors.length > 1 && (
                <button type="button" className={s.colorRemoveBtn} onClick={() => removeColor(i)}>×</button>
              )}
            </div>
          ))}
          {brandColors.length < 3 && (
            <button type="button" className={s.colorAddBtn} onClick={addColor}>+</button>
          )}
        </div>
        {colorError && <p className={s.errorText}>{colorError}</p>}
      </div>

      {/* 이미지 */}
      <div className={s.imageRow}>
        {/* 메인 이미지 */}
        <div className={s.field}>
          <span className={s.label}>메인 이미지<span className={s.optionalMark}>선택</span></span>
          {keepMainPath || newMainImage ? (
            <div className={s.thumbnailGrid}>
              <div className={s.thumbnailItem}>
                {newMainImage ? (
                  <img src={URL.createObjectURL(newMainImage)} alt="새 메인 이미지" className={s.thumbnailImg} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'rgba(12,12,12,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'rgba(12,12,12,0.45)' }}>
                    현재 이미지
                  </div>
                )}
                <button type="button" className={s.thumbnailRemove} onClick={() => { setKeepMainPath(null); setNewMainImage(null) }}>×</button>
              </div>
            </div>
          ) : (
            <label className={s.fileLabel} htmlFor="editMainImage">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>이미지 선택</span>
              <span className={s.fileHint}>PNG, JPG, WEBP</span>
            </label>
          )}
          <input id="editMainImage" type="file" accept="image/*" className={s.fileInput}
            onChange={e => { const f = e.target.files?.[0] ?? null; if (f) { setKeepMainPath(null); setNewMainImage(f) }; e.target.value = '' }} />
        </div>

        {/* 추가 이미지 */}
        <div className={s.field}>
          <span className={s.label}>추가 이미지<span className={s.optionalMark}>선택</span></span>
          {keepAdditionalPaths.length === 0 && newAdditionalImages.length === 0 ? (
            <label className={s.fileLabel} htmlFor="editAdditionalImages">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>이미지 선택</span>
              <span className={s.fileHint}>PNG, JPG, WEBP</span>
            </label>
          ) : (
            <div className={s.thumbnailGrid}>
              <label htmlFor="editAdditionalImages" className={s.thumbnailAddBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                추가
              </label>
              {keepAdditionalPaths.map((_, i) => (
                <div key={`keep-${i}`} className={s.thumbnailItem}>
                  <div style={{ width: '100%', height: '100%', background: 'rgba(12,12,12,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'rgba(12,12,12,0.45)', borderRadius: '2px', border: '1px solid rgba(12,12,12,0.1)' }}>
                    이미지 {i + 1}
                  </div>
                  <button type="button" className={s.thumbnailRemove} onClick={() => setKeepAdditionalPaths(prev => prev.filter((_, idx) => idx !== i))}>×</button>
                </div>
              ))}
              {newAdditionalImages.map((file, i) => (
                <div key={`new-${i}`} className={s.thumbnailItem}>
                  <img src={URL.createObjectURL(file)} alt={file.name} className={s.thumbnailImg} />
                  <button type="button" className={s.thumbnailRemove} onClick={() => setNewAdditionalImages(prev => prev.filter((_, idx) => idx !== i))}>×</button>
                </div>
              ))}
            </div>
          )}
          <input id="editAdditionalImages" type="file" accept="image/*" multiple className={s.fileInput}
            onChange={e => { const files = Array.from(e.target.files ?? []); setNewAdditionalImages(prev => [...prev, ...files]); e.target.value = '' }} />
        </div>
      </div>

      {/* 연락처 */}
      <div className={s.field}>
        <span className={s.label}>연락처<span className={s.optionalMark}>선택</span></span>
        <div className={s.contactChipGroup}>
          {CONTACT_TYPES.map(ct => (
            <button type="button" key={ct.id}
              className={contacts.find(c => c.type === ct.id) ? s.contactChipSelected : s.contactChip}
              onClick={() => toggleContact(ct.id)}
            >
              {ct.label}
            </button>
          ))}
        </div>
        {contacts.length > 0 && (
          <div className={s.contactInputList}>
            {contacts.map(ct => (
              <div key={ct.type} className={s.contactInputRow}>
                <span className={s.contactTypeLabel}>{CONTACT_TYPES.find(t => t.id === ct.type)?.label}</span>
                <input className={s.input} style={{ flex: 1 }} placeholder={getContactPlaceholder(ct.type)}
                  value={ct.value} onChange={e => updateContactValue(ct.type, e.target.value)} />
                <button type="button" className={s.contactRemoveBtn} onClick={() => toggleContact(ct.type)}>×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 추가 요청사항 */}
      <div className={s.field}>
        <label className={s.label} htmlFor="additionalRequest">추가 요청사항<span className={s.optionalMark}>선택</span></label>
        <textarea id="additionalRequest" className={s.textarea} {...register('additionalRequest')} />
      </div>

      <button type="submit" className={s.submitBtn} disabled={isPending}>
        {isPending ? '저장 중...' : '수정 완료'}
      </button>
    </form>
  )
}
