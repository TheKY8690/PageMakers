import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const pageHeader = style({
  padding: '24px 32px',
  borderBottom: `1px solid ${colors.border}`,
})

export const pageTitle = style({
  fontSize: '22px',
  fontWeight: 800,
  fontFamily: "'Archivo', system-ui, sans-serif",
  color: colors.primary,
  letterSpacing: '-0.03em',
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
  fontSize: '11px',
  fontWeight: 500,
  borderRadius: '2px',
  padding: '3px 8px',
  border: '1px solid',
  letterSpacing: '0.02em',
})

export const badgePending = style([
  badge,
  {
    color: '#92500E',
    backgroundColor: 'rgba(254,243,199,0.6)',
    borderColor: 'rgba(180,120,0,0.25)',
  },
])

export const badgeInProgress = style([
  badge,
  {
    color: colors.primary,
    backgroundColor: colors.muted,
    borderColor: colors.border,
  },
])

export const badgeDone = style([
  badge,
  {
    color: '#065F46',
    backgroundColor: 'rgba(209,250,229,0.5)',
    borderColor: 'rgba(0,100,50,0.2)',
  },
])

export const badgeCancelled = style([
  badge,
  {
    color: '#991B1B',
    backgroundColor: 'rgba(254,226,226,0.6)',
    borderColor: 'rgba(220,38,38,0.2)',
  },
])

export const badgeTemplateSelection = style([
  badge,
  {
    color: '#1E40AF',
    backgroundColor: 'rgba(219,234,254,0.6)',
    borderColor: 'rgba(59,130,246,0.2)',
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
  backgroundColor: colors.primary,
  color: colors.white,
  textDecoration: 'none',
  padding: '10px 20px',
  borderRadius: '2px',
  fontSize: '14px',
  fontWeight: 600,
  transition: 'opacity 0.15s ease',
  selectors: {
    '&:hover': {
      opacity: 0.85,
    },
  },
})

export const detailLink = style({
  color: colors.subText,
  textDecoration: 'none',
  fontSize: '13px',
  fontWeight: 500,
  transition: 'color 0.15s ease',
  selectors: {
    '&:hover': {
      color: colors.primary,
      textDecoration: 'underline',
    },
  },
})
