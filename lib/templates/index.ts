import type { ComponentType } from 'react'
import type { TemplateProps, TemplateId } from './types'
import TemplateA from '@/components/templates/TemplateA'
import TemplateB from '@/components/templates/TemplateB'
import TemplateC from '@/components/templates/TemplateC'
import Variant1 from '@/components/requests/4f307aca-b8c2-4144-8fba-9451864a1278/Variant1'
import Variant2 from '@/components/requests/4f307aca-b8c2-4144-8fba-9451864a1278/Variant2'
import Variant3 from '@/components/requests/4f307aca-b8c2-4144-8fba-9451864a1278/Variant3'

// ─── 개발자 참고용 베이스 템플릿 (내부용) ─────────────────────────────────
export const templateRegistry: Record<TemplateId, {
  label: string
  description: string
  component: ComponentType<TemplateProps>
}> = {
  'template-a': {
    label: '다크 에디토리얼',
    description: '강렬한 타이포그래피 · 고대비 레이아웃',
    component: TemplateA,
  },
  'template-b': {
    label: '클린 미니멀',
    description: '여백 중심 · 이미지 전면 배치',
    component: TemplateB,
  },
  'template-c': {
    label: '필름 에디토리얼',
    description: '아날로그 감성 · 흑백 믹스',
    component: TemplateC,
  },
}

export const TEMPLATE_IDS = Object.keys(templateRegistry) as TemplateId[]

// ─── 요청별 커스텀 variant 레지스트리 ─────────────────────────────────────

export const requestVariants: Record<string, Array<{
  id: string
  label: string
  description: string
  component: ComponentType<TemplateProps>
}>> = {
  '4f307aca-b8c2-4144-8fba-9451864a1278': [
    {
      id: '4f307aca-v1',
      label: '다크 시네마틱',
      description: '강렬한 대비 · 영화적 연출',
      component: Variant1,
    },
    {
      id: '4f307aca-v2',
      label: '화이트 스튜디오',
      description: '여백 중심 · 사진집 감성',
      component: Variant2,
    },
    {
      id: '4f307aca-v3',
      label: '컬러 볼드',
      description: '진홍 컬러 dominant · 스플릿 레이아웃',
      component: Variant3,
    },
  ],
}

// 발행 페이지에서 variant ID로 컴포넌트 조회
export function findVariantComponent(variantId: string): ComponentType<TemplateProps> | null {
  for (const variants of Object.values(requestVariants)) {
    const found = variants.find(v => v.id === variantId)
    if (found) return found.component
  }
  // fallback: 기존 templateRegistry (이전 데이터 호환)
  const entry = templateRegistry[variantId as TemplateId]
  return entry?.component ?? null
}
