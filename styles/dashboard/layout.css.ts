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
  padding: '24px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'row',
      alignItems: 'center',
      padding: '12px 16px',
      borderRight: 'none',
      borderBottom: `1px solid ${colors.border}`,
      gap: '16px',
    },
  },
})

export const logo = style({
  fontSize: '18px',
  fontWeight: 800,
  color: colors.primary,
  letterSpacing: '-0.02em',
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
  padding: '10px 12px',
  borderRadius: '8px',
  color: colors.subText,
  fontSize: '14px',
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'background-color 0.15s ease, color 0.15s ease',
  selectors: {
    '&:hover': {
      backgroundColor: colors.muted,
      color: colors.primary,
    },
  },
})

export const navLinkActive = style([
  navLink,
  {
    backgroundColor: 'rgba(3,105,161,0.08)',
    color: colors.accent,
    fontWeight: 500,
    selectors: {
      '&:hover': {
        backgroundColor: 'rgba(3,105,161,0.12)',
        color: colors.accent,
      },
    },
  },
])

export const main = style({
  backgroundColor: colors.background,
})
