'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import * as s from '@/styles/wara/features.css'

const stories = [
  {
    tag: '생일 파티',
    title: '소중한 사람의 생일을\n완벽하게 준비했어요',
    desc: '장소 예약부터 참석 확인까지 와라 하나로 해결. 바쁜 친구들도 링크 하나로 바로 응답했어요.',
    src: 'https://picsum.photos/seed/wara-s1/800/500',
  },
  {
    tag: '스터디 모임',
    title: '매주 반복되는 스터디를\n더 간편하게',
    desc: '반복 모임 템플릿으로 매주 알림 자동 발송. 참석 여부가 한눈에 보여서 준비가 훨씬 쉬워졌어요.',
    src: 'https://picsum.photos/seed/wara-s2/800/500',
  },
  {
    tag: '친구 모임',
    title: '오랜만에 만나는 친구들\n모두가 제때 왔어요',
    desc: '자동 리마인더 덕분에 "나 깜빡했어"는 이제 옛말. 모임 전날 알림 한 번으로 다들 나타났어요.',
    src: 'https://picsum.photos/seed/wara-s3/800/500',
  },
]

function StoryCard({
  story,
  index,
}: {
  story: (typeof stories)[0]
  index: number
}) {
  const { ref, isVisible } = useScrollReveal(0.2)

  return (
    <div
      ref={ref}
      className={`${s.card}${isVisible ? ` ${s.cardVisible}` : ''}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className={s.cardImgWrap}>
        <Image
          src={story.src}
          alt={story.title}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          className={s.cardImg}
        />
      </div>
      <div className={s.cardBody}>
        <span className={s.tag}>{story.tag}</span>
        <h3 className={s.cardTitle}>{story.title.replace('\\n', '\n')}</h3>
        <p className={s.cardDesc}>{story.desc}</p>
      </div>
    </div>
  )
}

export default function FeatureCards() {
  return (
    <section id="features" className={s.section}>
      <div className={s.header}>
        <span className={s.eyebrow}>모임 이야기</span>
        <h2 className={s.title}>와라와 함께한<br />실제 모임들</h2>
      </div>
      <div className={s.grid}>
        {stories.map((story, i) => (
          <StoryCard key={story.tag} story={story} index={i} />
        ))}
      </div>
    </section>
  )
}
