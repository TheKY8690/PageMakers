import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const shell = style({
  display: 'grid',
  gridTemplateColumns: '240px 1fr',
  minHeight: '100dvh',
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 1fr',
    },
  },
})

export const sidebar = style({
  backgroundColor: colors.white,
  borderRight: `1px solid ${colors.border}`,
  padding: '28px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'row',
      alignItems: 'center',
      padding: '14px 20px',
      borderRight: 'none',
      borderBottom: `1px solid ${colors.border}`,
      gap: '16px',
    },
  },
})

export const logo = style({
  fontSize: '16px',
  fontWeight: 800,
  fontFamily: "'Archivo', system-ui, sans-serif",
  color: colors.primary,
  letterSpacing: '-0.04em',
  textDecoration: 'none',
  cursor: 'pointer',
})

export const nav = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'row',
      gap: '4px',
    },
  },
})

export const navLink = style({
  padding: '10px 16px',
  borderLeft: '3px solid transparent',
  color: colors.subText,
  fontSize: '14px',
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'color 0.15s ease, border-color 0.15s ease',
  selectors: {
    '&:hover': {
      color: colors.primary,
    },
  },
})

export const navLinkActive = style([
  navLink,
  {
    borderLeft: `3px solid ${colors.primary}`,
    color: colors.primary,
    fontWeight: 600,
  },
])

export const main = style({
  backgroundColor: colors.background,
})
