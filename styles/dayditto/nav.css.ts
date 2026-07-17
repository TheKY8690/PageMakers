import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const nav = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 5vw',
  height: '64px',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  transition: 'border-bottom 0.3s ease',
})

export const navScrolled = style({
  borderBottom: `1px solid ${colors.border}`,
})

export const logo = style({
  fontSize: '18px',
  fontWeight: 700,
  color: colors.white,
  letterSpacing: '-0.02em',
  textDecoration: 'none',
})

export const logoAccent = style({
  color: colors.orange,
})

export const navRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
})

export const navLink = style({
  fontSize: '13px',
  color: colors.subText,
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  letterSpacing: '0.02em',
  selectors: {
    '&:hover': {
      color: colors.white,
    },
  },
})

export const clock = style({
  fontSize: '12px',
  color: colors.subText,
  letterSpacing: '0.05em',
  fontVariantNumeric: 'tabular-nums',
})
