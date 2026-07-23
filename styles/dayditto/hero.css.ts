import { style, keyframes } from '@vanilla-extract/css'
import { colors } from './tokens'

export const slideUp = keyframes({
  from: { transform: 'translateY(60px)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
})

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

export const bounce = keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(8px)' },
})

export const section = style({
  minHeight: '100vh',
  backgroundColor: colors.black,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
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
  fontSize: 'clamp(52px, 8vw, 120px)',
  fontWeight: 700,
  color: colors.white,
  letterSpacing: '-0.03em',
  lineHeight: 1.05,
  opacity: 0,
  animation: `${slideUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
})

export const headlineOrange = style([headline, {
  color: colors.orange,
}])

export const sub = style({
  marginTop: '32px',
  fontSize: 'clamp(14px, 1.4vw, 18px)',
  color: colors.subText,
  letterSpacing: '0.02em',
  opacity: 0,
  animation: `${fadeIn} 0.6s ease 0.7s forwards`,
})

export const scrollIndicator = style({
  position: 'absolute',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  opacity: 0,
  animation: `${fadeIn} 0.6s ease 1s forwards`,
})

export const scrollDot = style({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: colors.orange,
  animation: `${bounce} 1.4s ease-in-out infinite`,
})

export const scrollLabel = style({
  fontSize: '11px',
  color: colors.subText,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
})
