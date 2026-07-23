import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const section = style({
  padding: '140px 7vw',
  backgroundColor: colors.bg,
})

export const inner = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '80px',
  alignItems: 'center',
  '@media': {
    '(max-width: 900px)': {
      gridTemplateColumns: '1fr',
      gap: '48px',
    },
  },
})

export const imageWrap = style({
  position: 'relative',
  aspectRatio: '4 / 3',
  overflow: 'hidden',
  borderRadius: '4px',
  opacity: 0,
  transform: 'translateX(-40px)',
  transition: 'opacity 0.9s ease, transform 0.9s ease',
})

export const imageWrapVisible = style({
  opacity: 1,
  transform: 'translateX(0)',
})

export const image = style({
  objectFit: 'cover',
})

export const textWrap = style({
  opacity: 0,
  transform: 'translateX(40px)',
  transition: 'opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s',
})

export const textWrapVisible = style({
  opacity: 1,
  transform: 'translateX(0)',
})

export const eyebrow = style({
  fontSize: '11px',
  color: colors.lavender,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 500,
  marginBottom: '32px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  '::before': {
    content: '""',
    display: 'block',
    width: '28px',
    height: '1px',
    backgroundColor: colors.lavender,
    flexShrink: 0,
  },
})

export const headline = style({
  fontSize: 'clamp(32px, 4.5vw, 64px)',
  fontWeight: 700,
  color: colors.white,
  letterSpacing: '-0.04em',
  lineHeight: 1.05,
  marginBottom: '32px',
})

export const accentText = style({
  color: colors.lavender,
})

export const desc = style({
  fontSize: 'clamp(14px, 1.2vw, 17px)',
  color: colors.sub,
  lineHeight: 1.85,
  marginBottom: '40px',
})

export const link = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  color: colors.white,
  textDecoration: 'none',
  letterSpacing: '0.02em',
  fontWeight: 500,
  borderBottom: `1px solid ${colors.lavender}`,
  paddingBottom: '2px',
  transition: 'color 0.2s ease, border-color 0.2s ease',
  ':hover': {
    color: colors.lavender,
  },
})
