'use client'

import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  async function signInWithKakao() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        scopes: 'profile_nickname profile_image',
      },
    })
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0C0C0C',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: '360px',
          padding: '48px 40px',
          background:
            'linear-gradient(145deg, rgba(240,239,233,0.06) 0%, rgba(240,239,233,0.02) 100%)',
          border: '1px solid rgba(240,239,233,0.12)',
          borderTop: '1px solid rgba(240,239,233,0.25)',
          borderLeft: '1px solid rgba(240,239,233,0.18)',
          boxShadow:
            '0 32px 80px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(240,239,233,0.08)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p
          style={{
            color: 'rgba(240,239,233,0.35)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: '0 0 24px',
          }}
        >
          PAGEMAKERS
        </p>
        <h1
          style={{
            color: '#F0EFE9',
            fontFamily: "'Archivo', system-ui, sans-serif",
            fontWeight: 800,
            fontSize: '28px',
            letterSpacing: '-0.04em',
            margin: '0 0 8px',
            lineHeight: 1.1,
          }}
        >
          로그인
        </h1>
        <p
          style={{
            color: 'rgba(240,239,233,0.45)',
            fontSize: '13px',
            margin: '0 0 36px',
            lineHeight: 1.5,
          }}
        >
          카카오 계정으로 계속하기
        </p>
        <button
          onClick={signInWithKakao}
          style={{
            padding: '15px 20px',
            background: '#FEE500',
            border: 'none',
            color: '#000000',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 16px rgba(254,229,0,0.2)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 1C4.582 1 1 3.895 1 7.5c0 2.29 1.388 4.302 3.488 5.512L3.604 16.2a.3.3 0 0 0 .44.336L8.2 13.96c.264.026.532.04.8.04 4.418 0 8-2.895 8-6.5S13.418 1 9 1z"
              fill="#000000"
            />
          </svg>
          카카오로 로그인
        </button>
      </div>
    </main>
  )
}
