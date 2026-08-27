import { style } from '@vanilla-extract/css'

export const track = style({
  display: 'flex',
  height: '70vh',
  overflow: 'hidden',
  background: '#0C0C0C',
  gap: '8px',
  padding: '8px',
  '@media': {
    '(max-width: 768px)': { height: 'auto', flexDirection: 'column', padding: '6px', gap: '6px' },
  },
})

export const item = style({
  flex: 1,
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '16px',
  cursor: 'pointer',
  background: '#0C0C0C',
  transition: 'flex 0.6s cubic-bezier(0.16,1,0.3,1)',
  '@media': {
    '(max-width: 768px)': { flex: 'none', height: '60vw', borderRadius: '12px', transition: 'none' },
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})

export const itemActive = style({ flex: 4 })
export const itemDim    = style({ flex: 0.3 })

// 비활성 썸네일: 자연 비율, 상단 표시. 활성 시 fade-out
export const imgThumb = style({
  width: '100%',
  height: 'auto',
  display: 'block',
  position: 'relative',
  zIndex: 1,
  opacity: 1,
  transition: 'opacity 0.4s',
  selectors: {
    [`${itemActive} &`]: { opacity: 0 },
  },
  '@media': {
    '(max-width: 768px)': { display: 'none' },
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})

// 활성 풀이미지: cover, 기본 hidden. 활성 시 fade-in (크기 변화 없음 → 줌 없음)
export const imgFull = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  display: 'block',
  opacity: 0,
  transition: 'opacity 0.4s',
  selectors: {
    [`${itemActive} &`]: { opacity: 1 },
  },
  '@media': {
    '(max-width: 768px)': { opacity: 1 },
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})

export const overlay = style({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)',
  opacity: 0,
  transition: 'opacity 0.4s',
  selectors: {
    [`${itemActive} &`]: { opacity: 1 },
  },
  '@media': {
    '(max-width: 768px)': { opacity: 1 },
  },
})

export const textWrap = style({
  position: 'absolute',
  bottom: '24px',
  left: '20px',
  right: '20px',
  opacity: 0,
  transition: 'opacity 0.35s ease',
  pointerEvents: 'none',
  selectors: {
    [`${itemActive} &`]: { opacity: 1, pointerEvents: 'auto' },
  },
  '@media': {
    '(max-width: 768px)': { opacity: 1, pointerEvents: 'auto' },
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})

export const categoryBadge = style({
  display: 'inline-block',
  border: '1px solid rgba(255,255,255,0.5)',
  borderRadius: '999px',
  padding: '4px 12px',
  fontSize: '10px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#fff',
  marginBottom: '10px',
})

export const title = style({
  fontSize: 'clamp(18px, 2.5vw, 42px)',
  fontWeight: 900,
  color: '#fff',
  lineHeight: 1.05,
  marginBottom: '10px',
  textTransform: 'uppercase',
  letterSpacing: '-0.02em',
})

export const viewProject = style({
  fontSize: '12px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.8)',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})

// ── LIGHTBOX ────────────────────────────────────────────────────────────────
export const lightboxOverlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  background: 'rgba(0,0,0,0.95)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const lightboxImg = style({
  maxWidth: '90vw',
  maxHeight: '90vh',
  objectFit: 'contain',
  display: 'block',
})

export const lightboxClose = style({
  position: 'absolute',
  top: '24px',
  right: '32px',
  background: 'none',
  border: 'none',
  color: '#fff',
  fontSize: '32px',
  cursor: 'pointer',
  lineHeight: 1,
  fontFamily: 'inherit',
  ':hover': { opacity: 0.6 },
})

export const lightboxPrev = style({
  position: 'absolute',
  left: '24px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  color: '#fff',
  fontSize: '40px',
  cursor: 'pointer',
  lineHeight: 1,
  fontFamily: 'inherit',
  ':hover': { opacity: 0.6 },
  '@media': { '(max-width: 768px)': { left: '8px' } },
})

export const lightboxNext = style({
  position: 'absolute',
  right: '24px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  color: '#fff',
  fontSize: '40px',
  cursor: 'pointer',
  lineHeight: 1,
  fontFamily: 'inherit',
  ':hover': { opacity: 0.6 },
  '@media': { '(max-width: 768px)': { right: '8px' } },
})

export const lightboxCounter = style({
  position: 'absolute',
  bottom: '24px',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '11px',
  letterSpacing: '0.14em',
  color: 'rgba(255,255,255,0.4)',
  fontWeight: 600,
  whiteSpace: 'nowrap',
})
