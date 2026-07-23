import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const section = style({
  padding: '0',
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const card = style({
  position: 'relative',
  height: '70vh',
  minHeight: '480px',
  overflow: 'hidden',
  cursor: 'pointer',
  '@media': {
    '(max-width: 768px)': {
      height: '60vw',
      minHeight: '300px',
    },
  },
})

export const cardImg = style({
  position: 'absolute',
  inset: 0,
  objectFit: 'cover',
  transition: 'transform 0.7s ease',
  selectors: {
    [`${card}:hover &`]: {
      transform: 'scale(1.06)',
    },
  },
})

export const cardOverlay = style({
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(
    to top,
    rgba(14,12,24,0.88) 0%,
    rgba(14,12,24,0.3) 55%,
    rgba(14,12,24,0.08) 100%
  )`,
  transition: 'background 0.5s ease',
  selectors: {
    [`${card}:hover &`]: {
      background: `linear-gradient(
        to top,
        rgba(14,12,24,0.95) 0%,
        rgba(14,12,24,0.5) 55%,
        rgba(14,12,24,0.15) 100%
      )`,
    },
  },
})

export const cardContent = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '40px 36px',
})

export const cardNumber = style({
  fontSize: '11px',
  color: colors.lavender,
  letterSpacing: '0.12em',
  fontWeight: 500,
  marginBottom: '12px',
  display: 'block',
})

export const cardTitle = style({
  fontSize: 'clamp(24px, 2.8vw, 36px)',
  fontWeight: 700,
  color: colors.white,
  letterSpacing: '-0.03em',
  lineHeight: 1.1,
  marginBottom: '0',
  transition: 'margin-bottom 0.4s ease',
  selectors: {
    [`${card}:hover &`]: {
      marginBottom: '12px',
    },
  },
})

export const cardDesc = style({
  fontSize: '14px',
  color: 'rgba(255,255,255,0.65)',
  lineHeight: 1.65,
  maxHeight: '0',
  overflow: 'hidden',
  opacity: 0,
  transform: 'translateY(8px)',
  transition: 'max-height 0.4s ease, opacity 0.4s ease, transform 0.4s ease',
  selectors: {
    [`${card}:hover &`]: {
      maxHeight: '80px',
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
})

export const cardBorder = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  width: '1px',
  backgroundColor: 'rgba(255,255,255,0.08)',
  selectors: {
    [`:last-child > &`]: {
      display: 'none',
    },
  },
})
