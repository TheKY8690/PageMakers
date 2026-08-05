import type { ComponentType } from 'react'
import type { TemplateProps, TemplateId } from './types'
import TemplateA from '@/components/templates/TemplateA'
import TemplateB from '@/components/templates/TemplateB'
import TemplateC from '@/components/templates/TemplateC'
import TemplateD from '@/components/templates/TemplateD'
import TemplateE from '@/components/templates/TemplateE'

export const templateRegistry: Record<TemplateId, {
  label: string
  description: string
  component: ComponentType<TemplateProps>
}> = {
  'template-a': {
    label: '스타일 A',
    description: '풀컬러 히어로 + 텍스트 섹션',
    component: TemplateA,
  },
  'template-b': {
    label: '스타일 B',
    description: '좌우 분할 레이아웃 + 네비게이션',
    component: TemplateB,
  },
  'template-c': {
    label: '스타일 C',
    description: '센터 정렬 미니멀 + 매거진 갤러리',
    component: TemplateC,
  },
  'template-d': {
    label: '스타일 D',
    description: '다크 모드 + 색상 쇼케이스',
    component: TemplateD,
  },
  'template-e': {
    label: '스타일 E',
    description: '매거진 스타일 + 이미지 히어로',
    component: TemplateE,
  },
}

export const TEMPLATE_IDS = Object.keys(templateRegistry) as TemplateId[]
