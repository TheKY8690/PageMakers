import { style } from '@vanilla-extract/css'

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 9999,
  backgroundColor: '#0a0810',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.5s ease',
  pointerEvents: 'none',
})

export const mask = style({
  position: 'fixed',
  inset: 0,
  zIndex: 9998,
  backgroundColor: '#0a0810',
})

export const logo = style({
  position: 'relative',
  zIndex: 10000,
  fontSize: '22px',
  fontWeight: 700,
  color: '#ffffff',
  letterSpacing: '-0.02em',
  opacity: 0,
  transition: 'opacity 0.3s ease',
})
