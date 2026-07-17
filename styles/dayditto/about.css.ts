import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const section = style({
  backgroundColor: colors.black,
  padding: '140px 7vw',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '80px',
  alignItems: 'center',
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
      padding: '80px 6vw',
      gap: '48px',
    },
  },
})

export const statsWrap = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
})

export const statItem = style({
  opacity: 0,
  transform: 'translateY(40px)',
  transition: 'opacity 0.7s ease, transform 0.7s ease',
})

export const statItemVisible = style({
  opacity: 1,
  transform: 'translateY(0)',
})

export const statNumber = style({
  fontSize: 'clamp(40px, 5vw, 72px)',
  fontWeight: 700,
  color: colors.white,
  letterSpacing: '-0.03em',
  lineHeight: 1,
})

export const statLabel = style({
  marginTop: '8px',
  fontSize: '14px',
  color: colors.subText,
  letterSpacing: '0.02em',
})

export const textWrap = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
})

export const sectionTag = style({
  fontSize: '12px',
  color: colors.orange,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 500,
})

export const bodyText = style({
  fontSize: 'clamp(16px, 1.4vw, 20px)',
  color: colors.subText,
  lineHeight: 1.8,
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
})

export const bodyTextVisible = style({
  opacity: 1,
  transform: 'translateY(0)',
})
