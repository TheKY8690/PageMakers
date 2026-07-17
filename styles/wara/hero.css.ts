import { style, keyframes } from '@vanilla-extract/css'
import { colors } from './tokens'

export const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(30px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

export const section = style({
  minHeight: '100vh',
  backgroundColor: colors.black,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 7vw',
  overflow: 'hidden',
  position: 'relative',
})

export const headlineWrap = style({
  overflow: 'hidden',
})

export const headline = style({
  display: 'block',
  fontSize: 'clamp(72px, 14vw, 200px)',
  fontWeight: 700,
  fontStyle: 'italic',
  letterSpacing: '-0.04em',
  lineHeight: 0.92,
  background: `linear-gradient(135deg, ${colors.snow} 0%, ${colors.purpleLight} 50%, ${colors.purple} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  opacity: 0,
})

export const sub = style({
  marginTop: '40px',
  fontSize: 'clamp(14px, 1.3vw, 18px)',
  color: colors.sub,
  letterSpacing: '0.01em',
  opacity: 0,
  animation: `${fadeUp} 0.7s ease 1.2s forwards`,
})

export const scrollHint = style({
  position: 'absolute',
  bottom: '40px',
  left: '7vw',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  opacity: 0,
  animation: `${fadeUp} 0.5s ease 1.5s forwards`,
})

export const scrollLine = style({
  width: '40px',
  height: '1px',
  backgroundColor: colors.sub,
})

export const scrollLabel = style({
  fontSize: '11px',
  color: colors.sub,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
})
