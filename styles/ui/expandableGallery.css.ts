import { style } from '@vanilla-extract/css'

export const galleryTrack = style({
  display: 'flex',
  height: '70vh',
  overflow: 'hidden',
  background: '#0C0C0C',
  '@media': {
    '(max-width: 768px)': { height: 'auto', flexDirection: 'column' },
  },
})

export const galleryItem = style({
  flex: 1,
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'flex 0.6s cubic-bezier(0.16,1,0.3,1)',
  '@media': {
    '(max-width: 768px)': { flex: 'none', height: '60vw' },
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})

export const galleryItemActive = style({ flex: 2.5 })
export const galleryItemDim    = style({ flex: 0.35 })

export const galleryImg = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
  selectors: {
    [`${galleryItemActive} &`]: { transform: 'scale(1.05)' },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})

export const galleryOverlay = style({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)',
  transition: 'opacity 0.4s',
  selectors: {
    [`${galleryItemDim} &`]: { opacity: 0.5 },
  },
})

export const galleryNum = style({
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  fontSize: 'clamp(40px, 5vw, 80px)',
  fontWeight: 900,
  WebkitTextStroke: '1px rgba(255,255,255,0.25)',
  color: 'transparent',
  letterSpacing: '-0.05em',
  lineHeight: 1,
  pointerEvents: 'none',
  transition: 'opacity 0.4s',
  selectors: {
    [`${galleryItemActive} &`]: { opacity: 1 },
    [`${galleryItemDim} &`]: { opacity: 0 },
  },
})

// ── LIGHTBOX ───────────────────────────────────────────────────────────────
export const lightboxOverlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  background: 'rgba(0,0,0,0.95)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const lightboxImg = style({
  maxWidth: '90vw',
  maxHeight: '90vh',
  objectFit: 'contain',
  display: 'block',
})

export const lightboxClose = style({
  position: 'absolute',
  top: '24px',
  right: '32px',
  background: 'none',
  border: 'none',
  color: '#fff',
  fontSize: '32px',
  cursor: 'pointer',
  lineHeight: 1,
  fontFamily: 'inherit',
  ':hover': { opacity: 0.6 },
})

export const lightboxPrev = style({
  position: 'absolute',
  left: '24px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  color: '#fff',
  fontSize: '40px',
  cursor: 'pointer',
  lineHeight: 1,
  fontFamily: 'inherit',
  ':hover': { opacity: 0.6 },
  '@media': { '(max-width: 768px)': { left: '8px' } },
})

export const lightboxNext = style({
  position: 'absolute',
  right: '24px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  color: '#fff',
  fontSize: '40px',
  cursor: 'pointer',
  lineHeight: 1,
  fontFamily: 'inherit',
  ':hover': { opacity: 0.6 },
  '@media': { '(max-width: 768px)': { right: '8px' } },
})

export const lightboxCounter = style({
  position: 'absolute',
  bottom: '24px',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '11px',
  letterSpacing: '0.14em',
  color: 'rgba(255,255,255,0.4)',
  fontWeight: 600,
  whiteSpace: 'nowrap',
})
