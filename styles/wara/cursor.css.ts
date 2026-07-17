import { style } from '@vanilla-extract/css'

export const dot = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: '#ffffff',
  pointerEvents: 'none',
  zIndex: 9997,
  transform: 'translate(-50%, -50%)',
  transition: 'background-color 0.2s ease, transform 0.1s ease',
  willChange: 'transform',
})

export const ring = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.6)',
  pointerEvents: 'none',
  zIndex: 9996,
  transform: 'translate(-50%, -50%)',
  willChange: 'transform',
  transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease',
})

export const ringHover = style({
  width: '60px',
  height: '60px',
  borderColor: '#fb5959',
  mixBlendMode: 'difference',
})
