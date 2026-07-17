import { style, keyframes } from '@vanilla-extract/css'
import { colors } from './tokens'

export const pulse = keyframes({
  '0%, 100%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.03)' },
})

export const section = style({
  backgroundColor: colors.orange,
  padding: '140px 7vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
})

export const title = style({
  fontSize: 'clamp(40px, 6vw, 96px)',
  fontWeight: 700,
  color: colors.white,
  letterSpacing: '-0.03em',
  lineHeight: 1.05,
  marginBottom: '40px',
  opacity: 0,
  transform: 'translateY(40px)',
  transition: 'opacity 0.7s ease, transform 0.7s ease',
})

export const titleVisible = style({
  opacity: 1,
  transform: 'translateY(0)',
})

export const sub = style({
  fontSize: '16px',
  color: 'rgba(255,255,255,0.75)',
  letterSpacing: '0.02em',
  marginBottom: '48px',
  opacity: 0,
  transition: 'opacity 0.7s ease 0.2s',
})

export const subVisible = style({
  opacity: 1,
})

export const btn = style({
  display: 'inline-block',
  padding: '18px 48px',
  backgroundColor: colors.white,
  color: colors.orange,
  fontWeight: 700,
  fontSize: '16px',
  borderRadius: '100px',
  textDecoration: 'none',
  letterSpacing: '-0.01em',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  opacity: 0,
  ':hover': {
    transform: 'scale(1.04)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  },
})

export const btnVisible = style({
  opacity: 1,
  transition: 'opacity 0.7s ease 0.35s, transform 0.2s ease, box-shadow 0.2s ease',
})

export const footer = style({
  marginTop: '80px',
  fontSize: '13px',
  color: 'rgba(255,255,255,0.5)',
  letterSpacing: '0.02em',
})
