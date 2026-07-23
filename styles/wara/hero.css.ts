import { style, keyframes } from '@vanilla-extract/css'
import { colors } from './tokens'

export const imgFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

export const section = style({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '0 7vw 80px',
  overflow: 'hidden',
})

export const bgImage = style({
  position: 'absolute',
  inset: 0,
  objectFit: 'cover',
  animation: `${imgFadeIn} 1.2s ease forwards`,
  zIndex: 0,
})

export const overlay = style({
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(
    to top,
    rgba(14,12,24,0.92) 0%,
    rgba(14,12,24,0.5) 50%,
    rgba(14,12,24,0.2) 100%
  )`,
  zIndex: 1,
})

export const content = style({
  position: 'relative',
  zIndex: 2,
})

export const headlineWrap = style({
  overflow: 'hidden',
})

export const headline = style({
  display: 'block',
  fontSize: 'clamp(56px, 11vw, 160px)',
  fontWeight: 700,
  fontStyle: 'italic',
  letterSpacing: '-0.04em',
  lineHeight: 0.92,
  background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.lavender} 60%, ${colors.purple} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  opacity: 0,
})

export const sub = style({
  marginTop: '28px',
  fontSize: 'clamp(14px, 1.2vw, 17px)',
  color: 'rgba(255,255,255,0.65)',
  letterSpacing: '0.02em',
})

export const scrollHint = style({
  position: 'absolute',
  bottom: '40px',
  right: '7vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  zIndex: 2,
  opacity: 0,
  animation: `${imgFadeIn} 0.5s ease 2.2s forwards`,
})

export const scrollLine = style({
  width: '1px',
  height: '48px',
  backgroundColor: 'rgba(255,255,255,0.4)',
})

export const scrollLabel = style({
  fontSize: '10px',
  color: 'rgba(255,255,255,0.5)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  writingMode: 'vertical-rl',
})
