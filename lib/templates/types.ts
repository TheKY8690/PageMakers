export interface Contact {
  type: string
  value: string
}

export interface TemplateProps {
  brandName: string
  brandDescription: string
  brandColors: string[]
  imageUrls: string[]         // gallery signed URLs
  mainImageUrl?: string | null // hero signed URL
  contacts?: Contact[]
  websiteType?: string
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
