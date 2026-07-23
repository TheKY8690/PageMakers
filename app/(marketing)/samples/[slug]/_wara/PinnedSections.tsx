'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as s from '@/styles/wara/pinned.css'

gsap.registerPlugin(ScrollTrigger)

function PhoneMock() {
  return (
    <div className={s.mockPhone}>
      <div className={s.phoneLineAccent} />
      <div className={s.phoneLine} style={{ width: '40%' }} />
      <div className={s.mockCard}>
        <div className={s.phoneLine} style={{ width: '70%', height: '10px' }} />
        <div className={s.phoneLine} style={{ width: '50%', height: '8px' }} />
      </div>
      <div className={s.mockCard}>
        <div className={s.phoneLine} style={{ width: '80%', height: '10px' }} />
        <div className={s.phoneLine} style={{ width: '45%', height: '8px' }} />
      </div>
      <div className={s.mockCard}>
        <div className={s.phoneLine} style={{ width: '60%', height: '10px' }} />
        <div className={s.phoneLine} style={{ width: '35%', height: '8px' }} />
      </div>
    </div>
  )
}

function InviteMock() {
  return (
    <div className={s.inviteCard}>
      <div className={s.inviteTitle}>이번 주말 한강 피크닉 🌸</div>
      <div className={s.inviteRow}>
        <div className={s.avatar} />
        <div className={s.avatar} />
        <div className={s.avatar} />
        <span className={s.inviteLabel}>+3명 참석 예정</span>
      </div>
      <div className={s.inviteRow}>
        <span className={s.inviteLabel}>📅 토요일 오후 2시  📍 뚝섬유원지</span>
      </div>
      <div className={s.inviteBtn}>링크로 초대하기</div>
    </div>
  )
}

function NotifMock() {
  const notifs = [
    '준호님이 모임에 참석합니다 ✓',
    '내일 모임 1시간 전입니다 🔔',
    '수진님이 댓글을 남겼습니다 💬',
  ]
  return (
    <div className={s.notifStack}>
      {notifs.map((text) => (
        <div key={text} className={s.notif}>
          <div className={s.notifDot} />
          <span className={s.notifText}>{text}</span>
        </div>
      ))}
    </div>
  )
}

const SECTIONS = [
  {
    tag: '일정 만들기',
    title: '모임의 시작은\n일정 하나',
    desc: '날짜, 장소, 인원을 한 번에 설정하세요. 복잡한 단체 카톡 없이 와라 하나로.',
    Visual: PhoneMock,
    bg: '#14121A',
  },
  {
    tag: '친구 초대',
    title: '링크 하나로\n모두를 초대',
    desc: '회원가입 없이도 링크 공유만으로 초대 완료. 누구나 쉽게 참석 의사를 밝힐 수 있어요.',
    Visual: InviteMock,
    bg: '#17142a',
  },
  {
    tag: '실시간 알림',
    title: '중요한 순간을\n놓치지 마세요',
    desc: '모임 변경, 참석 확인, 새 메시지를 실시간 푸시로. 앱 없이도 PWA로 바로 알림.',
    Visual: NotifMock,
    bg: '#141220',
  },
]

export default function PinnedSections() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section) => {
        if (!section) return

        const textWrap = section.querySelector('[data-text]')
        const visual = section.querySelector('[data-visual]')

        ScrollTrigger.create({
          trigger: section,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: '+=80%',
        })

        if (textWrap) {
          gsap.fromTo(
            textWrap,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 1,
              },
            }
          )
        }

        if (visual) {
          gsap.fromTo(
            visual,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1,
              },
            }
          )
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef}>
      {SECTIONS.map(({ tag, title, desc, Visual, bg }, i) => (
        <div
          key={tag}
          ref={(el) => { sectionRefs.current[i] = el }}
          className={s.section}
          style={{ backgroundColor: bg }}
        >
          <div data-text className={s.textWrap}>
            <span className={s.tag}>{tag}</span>
            <h2 className={s.title} style={{ whiteSpace: 'pre-line' }}>{title}</h2>
            <p className={s.desc}>{desc}</p>
          </div>
          <div data-visual className={s.visual}>
            <Visual />
          </div>
        </div>
      ))}
    </div>
  )
}
