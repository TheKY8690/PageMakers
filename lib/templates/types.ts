export interface Contact {
  type: string
  value: string
}

export interface TemplateProps {
  brandName: string
  brandDescription: string
  brandColors: string[]
  imageUrls: string[]          // gallery signed URLs (풀 해상도, 라이트박스용)
  thumbImageUrls?: string[]    // gallery display용 리사이즈 URL (width:900)
  mainImageUrl?: string | null // hero signed URL
  contacts?: Contact[]
  websiteType?: string
  isPreview?: boolean         // 카드 축소 미리보기 모드 — 애니메이션 비활성화
}

export type TemplateId =
  | 'template-a'
  | 'template-b'
  | 'template-c'

// 요청별 커스텀 variant
export interface RequestVariant {
  id: string       // 예: '4f307aca-v1'
  label: string    // 유저에게 보여줄 이름
  description: string
}
