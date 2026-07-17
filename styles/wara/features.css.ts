import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const section = style({
  backgroundColor: '#1a1728',
  padding: '140px 7vw',
})

export const header = style({
  marginBottom: '80px',
})

export const tag = style({
  fontSize: '11px',
  color: colors.purple,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 500,
  marginBottom: '16px',
  display: 'block',
})

export const title = style({
  fontSize: 'clamp(28px, 3.5vw, 52px)',
  fontWeight: 700,
  color: colors.white,
  letterSpacing: '-0.025em',
  lineHeight: 1.1,
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px',
  '@media': {
    '(max-width: 960px)': {
      gridTemplateColumns: '1fr 1fr',
    },
    '(max-width: 560px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const card = style({
  padding: '36px 28px',
  borderRadius: '16px',
  border: `1px solid ${colors.border}`,
  backgroundColor: colors.black,
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'border-color 0.3s ease, transform 0.3s ease',
  ':hover': {
    borderColor: 'rgba(155, 125, 255, 0.4)',
    transform: 'translateY(-4px)',
  },
})

export const icon = style({
  fontSize: '24px',
  marginBottom: '20px',
  display: 'block',
})

export const cardTitle = style({
  fontSize: '18px',
  fontWeight: 600,
  color: colors.white,
  marginBottom: '10px',
  letterSpacing: '-0.01em',
})

export const cardDesc = style({
  fontSize: '14px',
  color: colors.sub,
  lineHeight: 1.65,
})
