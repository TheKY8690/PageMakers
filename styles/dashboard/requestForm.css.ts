import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const page = style({
  backgroundColor: colors.background,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '40px 16px',
})

export const card = style({
  backgroundColor: colors.white,
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
  padding: '40px',
  width: '100%',
  maxWidth: '560px',
  '@media': {
    '(max-width: 480px)': {
      padding: '24px 20px',
      borderRadius: '8px',
    },
  },
})

export const heading = style({
  fontSize: '22px',
  fontWeight: 700,
  color: colors.primary,
  marginBottom: '28px',
  lineHeight: 1.3,
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
})

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
})

export const label = style({
  fontSize: '14px',
  fontWeight: 500,
  color: colors.foreground,
})

export const input = style({
  border: `1px solid ${colors.border}`,
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '15px',
  color: colors.foreground,
  backgroundColor: colors.white,
  outline: 'none',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  selectors: {
    '&:focus-visible': {
      borderColor: colors.accent,
      boxShadow: `0 0 0 3px rgba(3,105,161,0.15)`,
    },
    '&::placeholder': {
      color: colors.disabled,
    },
  },
})

export const textarea = style([
  input,
  {
    minHeight: '120px',
    resize: 'vertical',
    lineHeight: 1.6,
  },
])

export const colorList = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
})

export const colorItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: colors.muted,
  borderRadius: '8px',
  padding: '6px 8px',
})

export const colorPicker = style({
  width: '44px',
  height: '44px',
  borderRadius: '8px',
  border: `1px solid ${colors.border}`,
  padding: '2px',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${colors.accent}`,
      outlineOffset: '2px',
    },
  },
})

export const colorHex = style({
  fontSize: '13px',
  color: colors.subText,
  fontFamily: 'monospace',
  letterSpacing: '0.03em',
})

export const colorRemoveBtn = style({
  width: '18px',
  height: '18px',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: 'transparent',
  color: colors.subText,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  fontSize: '14px',
  lineHeight: 1,
  transition: 'background-color 0.15s ease, color 0.15s ease',
  selectors: {
    '&:hover': {
      backgroundColor: colors.errorBg,
      color: colors.error,
    },
  },
})

export const colorAddBtn = style({
  width: '44px',
  height: '44px',
  border: `1.5px dashed ${colors.border}`,
  borderRadius: '8px',
  backgroundColor: 'transparent',
  color: colors.subText,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  transition: 'border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease',
  selectors: {
    '&:hover': {
      borderColor: colors.accent,
      backgroundColor: 'rgba(3,105,161,0.04)',
      color: colors.accent,
    },
  },
})

export const fileLabel = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  border: `1.5px dashed ${colors.border}`,
  borderRadius: '8px',
  padding: '32px 16px',
  cursor: 'pointer',
  color: colors.subText,
  fontSize: '14px',
  transition: 'border-color 0.15s ease, background-color 0.15s ease',
  selectors: {
    '&:hover': {
      borderColor: colors.accent,
      backgroundColor: 'rgba(3,105,161,0.04)',
    },
  },
})

export const fileHint = style({
  fontSize: '12px',
  color: colors.disabled,
})

export const fileInput = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
})

export const errorText = style({
  fontSize: '12px',
  color: colors.error,
  lineHeight: 1.4,
})

export const submitBtn = style({
  backgroundColor: colors.accent,
  color: colors.white,
  border: 'none',
  borderRadius: '8px',
  padding: '12px 20px',
  fontSize: '15px',
  fontWeight: 600,
  width: '100%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'background-color 0.15s ease',
  marginTop: '8px',
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: colors.accentHover,
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
})
