'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTransition } from 'react'
import { createPortfolioRequest } from './actions'

const schema = z.object({
  brandName: z.string().min(1, '브랜드명을 입력하세요'),
  brandDescription: z.string().min(1, '브랜드 설명을 입력하세요'),
  brandColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, '올바른 색상을 선택하세요'),
})

type FormValues = z.infer<typeof schema>

export default function RequestForm() {
  const [isPending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { brandColor: '#000000' },
  })

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const formData = new FormData()
      formData.set('brandName', values.brandName)
      formData.set('brandDescription', values.brandDescription)
      formData.set('brandColor', values.brandColor)

      const fileInput = document.querySelector<HTMLInputElement>('input[name="images"]')
      if (fileInput?.files) {
        for (const file of Array.from(fileInput.files)) {
          formData.append('images', file)
        }
      }

      await createPortfolioRequest(formData)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>브랜드명</label>
        <input {...register('brandName')} placeholder="브랜드명" />
        {errors.brandName && <p>{errors.brandName.message}</p>}
      </div>

      <div>
        <label>브랜드 설명</label>
        <textarea {...register('brandDescription')} placeholder="브랜드를 설명해 주세요" />
        {errors.brandDescription && <p>{errors.brandDescription.message}</p>}
      </div>

      <div>
        <label>브랜드 컬러</label>
        <input type="color" {...register('brandColor')} />
        {errors.brandColor && <p>{errors.brandColor.message}</p>}
      </div>

      <div>
        <label>이미지 업로드</label>
        <input type="file" name="images" accept="image/*" multiple />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? '제출 중...' : '요청하기'}
      </button>
    </form>
  )
}
