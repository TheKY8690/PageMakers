'use client'

import Image from 'next/image'
import * as s from '@/styles/wara/featureGrid.css'

const features = [
  {
    number: '01',
    title: '일정',
    desc: '날짜·장소·인원을 한 번에 설정. 반복 모임 템플릿으로 매번 새로 만들 필요 없어요.',
    src: 'https://picsum.photos/seed/wara-f1/800/1000',
  },
  {
    number: '02',
    title: '친구 초대',
    desc: '링크 하나로 초대장 전송. 회원가입 없이도 참석 의사를 표현할 수 있어요.',
    src: 'https://picsum.photos/seed/wara-f2/800/1000',
  },
  {
    number: '03',
    title: '알림',
    desc: '모임 하루 전, 한 시간 전 자동 알림. 놓치는 약속 없이 모두가 제때 모여요.',
    src: 'https://picsum.photos/seed/wara-f3/800/1000',
  },
]

export default function FeatureGrid() {
  return (
    <section className={s.section}>
      <div className={s.grid}>
        {features.map(({ number, title, desc, src }) => (
          <div key={title} className={s.card}>
            <Image
              src={src}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={s.cardImg}
            />
            <div className={s.cardOverlay} />
            <div className={s.cardBorder} />
            <div className={s.cardContent}>
              <span className={s.cardNumber}>{number}</span>
              <h3 className={s.cardTitle}>{title}</h3>
              <p className={s.cardDesc}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
