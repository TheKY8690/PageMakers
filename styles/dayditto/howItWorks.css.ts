import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const section = style({
  backgroundColor: colors.black,
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

export const steps = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
})

export const step = style({
  display: 'grid',
  gridTemplateColumns: '80px 1fr',
  gap: '40px',
  alignItems: 'flex-start',
  padding: '48px 0',
  borderTop: `1px solid ${colors.border}`,
  opacity: 0,
  transform: 'translateY(40px)',
  transition: 'opacity 0.7s ease, transform 0.7s ease',
})

export const stepVisible = style({
  opacity: 1,
  transform: 'translateY(0)',
})

export const stepNumber = style({
  fontSize: 'clamp(40px, 4vw, 64px)',
  fontWeight: 700,
  color: colors.orange,
  letterSpacing: '-0.04em',
  lineHeight: 1,
})

export const stepContent = style({
  paddingTop: '8px',
})

export const stepTitle = style({
  fontSize: 'clamp(20px, 2vw, 28px)',
  fontWeight: 600,
  color: colors.white,
  letterSpacing: '-0.02em',
  marginBottom: '12px',
})

export const stepDesc = style({
  fontSize: '15px',
  color: colors.subText,
  lineHeight: 1.7,
})
