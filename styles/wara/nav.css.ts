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
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  transition: 'border-bottom 0.3s ease',
})

export const navScrolled = style({
  borderBottom: `1px solid ${colors.border}`,
})

export const logo = style({
  fontSize: '20px',
  fontWeight: 700,
  color: colors.white,
  letterSpacing: '-0.03em',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
})

export const logoDot = style({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: colors.purple,
  display: 'inline-block',
})

export const navRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
})

export const navLink = style({
  fontSize: '13px',
  color: colors.sub,
  textDecoration: 'none',
  letterSpacing: '0.02em',
  transition: 'color 0.2s ease',
  selectors: {
    '&:hover': {
      color: colors.white,
    },
  },
})
