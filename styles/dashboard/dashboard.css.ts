import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const pageHeader = style({
  padding: '24px 32px',
  borderBottom: `1px solid ${colors.border}`,
})

export const pageTitle = style({
  fontSize: '20px',
  fontWeight: 700,
  color: colors.primary,
  margin: 0,
})

export const tableWrapper = style({
  padding: '24px 32px',
  overflowX: 'auto',
})

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
})

export const th = style({
  fontSize: '12px',
  color: colors.subText,
  textAlign: 'left',
  padding: '0 16px 12px',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  borderBottom: `1px solid ${colors.border}`,
})

export const td = style({
  padding: '14px 16px',
  borderBottom: `1px solid ${colors.border}`,
  fontSize: '14px',
  color: colors.foreground,
})

export const row = style({
  transition: 'background-color 0.15s ease',
  selectors: {
    '&:hover': {
      backgroundColor: colors.muted,
    },
  },
})

export const badge = style({
  display: 'inline-block',
  fontSize: '12px',
  fontWeight: 500,
  borderRadius: '20px',
  padding: '2px 10px',
})

export const badgePending = style([
  badge,
  {
    color: '#92400E',
    backgroundColor: '#FEF3C7',
  },
])

export const badgeInProgress = style([
  badge,
  {
    color: '#1E40AF',
    backgroundColor: '#DBEAFE',
  },
])

export const badgeDone = style([
  badge,
  {
    color: '#065F46',
    backgroundColor: '#D1FAE5',
  },
])

export const emptyState = style({
  textAlign: 'center',
  padding: '80px 20px',
  color: colors.subText,
})

export const emptyStateTitle = style({
  fontSize: '16px',
  fontWeight: 600,
  color: colors.primary,
  marginBottom: '8px',
})

export const emptyStateText = style({
  fontSize: '14px',
  color: colors.subText,
  marginBottom: '24px',
})

export const ctaLink = style({
  display: 'inline-block',
  backgroundColor: colors.accent,
  color: colors.white,
  textDecoration: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 600,
  transition: 'background-color 0.15s ease',
  selectors: {
    '&:hover': {
      backgroundColor: colors.accentHover,
    },
  },
})

export const detailLink = style({
  color: colors.accent,
  textDecoration: 'none',
  fontSize: '13px',
  fontWeight: 500,
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})
