import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const section = style({
  backgroundColor: colors.blackDeep,
  padding: '180px 7vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
})

export const glow = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  height: '600px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(155,125,255,0.12) 0%, transparent 70%)',
  pointerEvents: 'none',
})

export const title = style({
  fontSize: 'clamp(48px, 8vw, 120px)',
  fontWeight: 700,
  fontStyle: 'italic',
  color: colors.white,
  letterSpacing: '-0.04em',
  lineHeight: 0.95,
  marginBottom: '48px',
  position: 'relative',
  opacity: 0,
})

export const sub = style({
  fontSize: '16px',
  color: colors.sub,
  marginBottom: '48px',
  letterSpacing: '0.01em',
  opacity: 0,
})

export const btn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  padding: '18px 48px',
  borderRadius: '100px',
  border: `1px solid rgba(155, 125, 255, 0.5)`,
  backgroundColor: 'transparent',
  color: colors.white,
  fontSize: '16px',
  fontWeight: 500,
  textDecoration: 'none',
  letterSpacing: '-0.01em',
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  position: 'relative',
  opacity: 0,
  ':hover': {
    backgroundColor: 'rgba(155, 125, 255, 0.15)',
    borderColor: colors.purple,
  },
})

export const footer = style({
  marginTop: '120px',
  fontSize: '12px',
  color: 'rgba(255,255,255,0.3)',
  letterSpacing: '0.03em',
  position: 'relative',
})
