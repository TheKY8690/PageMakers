import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const section = style({
  backgroundColor: colors.darkGray,
  padding: '140px 7vw',
})

export const header = style({
  marginBottom: '80px',
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'opacity 0.7s ease, transform 0.7s ease',
})

export const headerVisible = style({
  opacity: 1,
  transform: 'translateY(0)',
})

export const sectionTag = style({
  fontSize: '12px',
  color: colors.orange,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 500,
  marginBottom: '16px',
})

export const sectionTitle = style({
  fontSize: 'clamp(28px, 3.5vw, 52px)',
  fontWeight: 700,
  color: colors.white,
  letterSpacing: '-0.025em',
  lineHeight: 1.1,
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const card = style({
  backgroundColor: colors.black,
  border: `1px solid ${colors.border}`,
  borderRadius: '16px',
  padding: '40px',
  opacity: 0,
  transform: 'translateY(40px)',
  transition: 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, transform 0.3s ease',
  ':hover': {
    borderColor: colors.orange,
    transform: 'scale(1.02)',
  },
})

export const cardVisible = style({
  opacity: 1,
  transform: 'translateY(0)',
  ':hover': {
    transform: 'scale(1.02)',
  },
})

export const cardIcon = style({
  fontSize: '28px',
  marginBottom: '24px',
  display: 'block',
})

export const cardTitle = style({
  fontSize: '20px',
  fontWeight: 600,
  color: colors.white,
  marginBottom: '12px',
  letterSpacing: '-0.01em',
})

export const cardDesc = style({
  fontSize: '15px',
  color: colors.subText,
  lineHeight: 1.7,
})
