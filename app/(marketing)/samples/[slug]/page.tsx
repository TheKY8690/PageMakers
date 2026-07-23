import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import DayDittoPage from './_dayditto/DayDittoPage'
import WaraPage from './_wara/WaraPage'

type PageProps = { params: Promise<{ slug: string }> }

const pages: Record<string, React.ComponentType> = {
  dayditto: DayDittoPage,
  wara: WaraPage,
}

const meta: Record<string, Metadata> = {
  dayditto: {
    title: 'DayDitto — 나의 하루를 다른 언어로 다시 쓰다',
    description: '일기 기반 영어 학습 서비스. Claude AI 번역 + Google TTS 원어민 발음.',
  },
  wara: {
    title: '와라 — 요즘 모이는 방식',
    description: '준비의 부담을 만남의 설렘으로. 소셜 모임 플래닝 플랫폼.',
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return meta[slug] ?? {}
}

export default async function SamplePage({ params }: PageProps) {
  const { slug } = await params
  const Component = pages[slug]
  if (!Component) notFound()
  return <Component />
}
