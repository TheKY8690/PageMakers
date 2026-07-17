import { style, keyframes } from '@vanilla-extract/css'
import { colors } from './tokens'

export const marqueeAnim = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(-50%)' },
})

export const section = style({
  backgroundColor: colors.orange,
  padding: '20px 0',
  overflow: 'hidden',
})

export const track = style({
  display: 'flex',
  width: 'max-content',
  animation: `${marqueeAnim} 18s linear infinite`,
})

export const item = style({
  fontSize: 'clamp(14px, 1.2vw, 18px)',
  fontWeight: 500,
  color: colors.black,
  whiteSpace: 'nowrap',
  padding: '0 32px',
  letterSpacing: '0.02em',
})
