import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const section = style({
  padding: '120px 7vw',
  backgroundColor: colors.bgCard,
})

export const header = style({
  marginBottom: '64px',
})

export const eyebrow = style({
  fontSize: '11px',
  color: colors.lavender,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 500,
  marginBottom: '16px',
  display: 'block',
})

export const title = style({
  fontSize: 'clamp(28px, 3.5vw, 48px)',
  fontWeight: 700,
  color: colors.white,
  letterSpacing: '-0.03em',
  lineHeight: 1.1,
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '24px',
  '@media': {
    '(max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const card = style({
  overflow: 'hidden',
  borderRadius: '4px',
  opacity: 0,
  transform: 'translateY(32px)',
  transition: 'opacity 0.7s ease, transform 0.7s ease',
})

export const cardVisible = style({
  opacity: 1,
  transform: 'translateY(0)',
})

export const cardImgWrap = style({
  position: 'relative',
  aspectRatio: '16 / 10',
  overflow: 'hidden',
})

export const cardImg = style({
  objectFit: 'cover',
  transition: 'transform 0.6s ease',
  selectors: {
    [`${card}:hover &`]: {
      transform: 'scale(1.04)',
    },
  },
})

export const cardBody = style({
  padding: '24px 0 0',
})

export const tag = style({
  fontSize: '11px',
  color: colors.lavender,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 500,
  marginBottom: '10px',
  display: 'block',
})

export const cardTitle = style({
  fontSize: 'clamp(17px, 1.8vw, 22px)',
  fontWeight: 700,
  color: colors.white,
  letterSpacing: '-0.02em',
  lineHeight: 1.25,
  marginBottom: '10px',
})

export const cardDesc = style({
  fontSize: '14px',
  color: colors.sub,
  lineHeight: 1.65,
})
