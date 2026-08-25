import { globalStyle, keyframes, style } from '@vanilla-extract/css'
import { fonts } from './tokens'

// ── Wrapper ────────────────────────────────────────────────────────────────
export const wrapper = style({
  fontFamily: fonts.body,
  minHeight: '100vh',
  background: '#E8E8E8',
  color: '#0C0C0C',
})

// ── Ticker keyframe ───────────────────────────────────────────────────────
const tickerAnim = keyframes({
  from: { transform: 'translateX(0)' },
  to:   { transform: 'translateX(-50%)' },
})

export const ticker = style({
  display: 'flex',
  gap: '64px',
  whiteSpace: 'nowrap',
  alignItems: 'center',
  animation: `${tickerAnim} 26s linear infinite`,
  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
  },
})

// ── Reveal ────────────────────────────────────────────────────────────────
export const reveal = style({
  opacity: 0,
  transform: 'translateY(28px)',
  transition: 'opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)',
  '@media': {
    '(prefers-reduced-motion: reduce)': { opacity: 1, transform: 'none', transition: 'none' },
  },
})
globalStyle(`${reveal}.visible`, {
  opacity: 1,
  transform: 'translateY(0)',
})

// ── NAV ───────────────────────────────────────────────────────────────────
export const navHeader = style({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  padding: '14px 56px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'rgba(232,232,232,0.94)',
  backdropFilter: 'blur(12px)',
  borderBottom: '1px solid rgba(12,12,12,0.08)',
  '@media': {
    '(max-width: 768px)': { padding: '14px 24px' },
  },
})

export const navBrand = style({
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#0C0C0C',
})

export const navInner = style({
  display: 'flex',
  gap: '36px',
  alignItems: 'center',
})

export const navBtn = style({
  fontSize: '11px',
  letterSpacing: '0.1em',
  color: 'rgba(12,12,12,0.5)',
  fontWeight: 500,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  fontFamily: 'inherit',
})

export const navBtnNum = style({
  color: 'rgba(12,12,12,0.28)',
  marginRight: '5px',
  fontSize: '9px',
})

export const navAccent = style({
  fontSize: '10px',
  letterSpacing: '0.1em',
  fontWeight: 600,
  color: 'var(--v2-accent)',
})

// ── HERO ──────────────────────────────────────────────────────────────────
export const hero = style({
  position: 'relative',
  height: '100vh',
  minHeight: '600px',
  background: '#E8E8E8',
  overflow: 'hidden',
  '@media': {
    '(max-width: 768px)': { height: 'auto', minHeight: '100svh' },
  },
})

export const heroTitle = style({
  position: 'absolute',
  top: '48px',
  left: '56px',
  fontSize: 'clamp(60px, 10vw, 150px)',
  fontWeight: 900,
  letterSpacing: '-0.05em',
  lineHeight: 0.92,
  color: '#0C0C0C',
  margin: 0,
  zIndex: 2,
  '@media': {
    '(max-width: 768px)': { fontSize: 'clamp(40px, 12vw, 80px)', left: '24px' },
  },
})

export const heroTagline = style({
  position: 'absolute',
  bottom: '52px',
  left: '56px',
  borderLeft: '2px solid rgba(12,12,12,0.7)',
  paddingLeft: '16px',
  zIndex: 2,
  '@media': {
    '(max-width: 768px)': { left: '24px', bottom: '32px' },
  },
})

export const heroTaglineText = style({
  fontSize: '14px',
  fontWeight: 500,
  color: '#0C0C0C',
  margin: 0,
  lineHeight: 1.6,
  whiteSpace: 'pre-line',
})

export const heroTaglineSub = style({
  fontSize: '10px',
  color: 'rgba(12,12,12,0.4)',
  margin: '4px 0 0',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
})

export const heroScroll = style({
  position: 'absolute',
  bottom: '52px',
  left: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  zIndex: 2,
})

export const heroScrollText = style({
  fontSize: '8px',
  letterSpacing: '0.2em',
  writingMode: 'vertical-rl',
  color: 'rgba(12,12,12,0.35)',
  textTransform: 'uppercase',
})

export const heroScrollLine = style({
  width: '1px',
  height: '48px',
  background: 'rgba(12,12,12,0.2)',
})

export const heroPortrait = style({
  position: 'absolute',
  right: 0,
  top: '10%',
  width: '44%',
  height: '82%',
  overflow: 'hidden',
  zIndex: 1,
  '@media': {
    '(max-width: 768px)': { width: '55%' },
  },
})

export const heroPortraitImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  display: 'block',
})

export const heroPortraitPlaceholder = style({
  width: '100%',
  height: '100%',
  background: 'rgba(12,12,12,0.08)',
})

// ── GALLERY ───────────────────────────────────────────────────────────────
export const gallery = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '12px',
  padding: '80px 56px 100px',
  background: '#E8E8E8',
  alignItems: 'start',
  '@media': {
    '(max-width: 768px)': { gridTemplateColumns: '1fr 1fr', padding: '40px 24px' },
    '(max-width: 480px)': { gridTemplateColumns: '1fr' },
  },
})

export const galleryCell = style({
  overflow: 'hidden',
  position: 'relative',
})

export const galleryCellImg = style({
  width: '100%',
  display: 'block',
  objectFit: 'cover',
  aspectRatio: '3/4',
  transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
  selectors: {
    [`${galleryCell}:hover &`]: { transform: 'scale(1.04)' },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})

// ── KNOW ME ───────────────────────────────────────────────────────────────
export const knowWrap = style({
  position: 'relative',
  minHeight: '90vh',
  padding: '80px 56px 80px',
  background: '#E8E8E8',
  borderTop: '1px solid rgba(12,12,12,0.1)',
  overflow: 'hidden',
  '@media': {
    '(max-width: 768px)': { padding: '60px 24px 48vw' },
  },
})

export const knowHeading = style({
  fontSize: 'clamp(44px, 7vw, 110px)',
  fontWeight: 900,
  letterSpacing: '-0.05em',
  lineHeight: 0.92,
  color: '#0C0C0C',
  position: 'relative',
  zIndex: 2,
  maxWidth: '55%',
  margin: 0,
  '@media': {
    '(max-width: 768px)': { maxWidth: '100%', fontSize: 'clamp(36px, 10vw, 72px)' },
  },
})

export const knowPhoto = style({
  position: 'absolute',
  overflow: 'hidden',
  zIndex: 1,
})

export const knowPhotoImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
})

// ── BIO ───────────────────────────────────────────────────────────────────
export const bio = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  minHeight: '80vh',
  background: '#E8E8E8',
  borderTop: '1px solid rgba(12,12,12,0.1)',
  '@media': {
    '(max-width: 768px)': { gridTemplateColumns: '1fr' },
  },
})

export const bioLeft = style({
  padding: '64px 48px',
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid rgba(12,12,12,0.1)',
  '@media': {
    '(max-width: 768px)': { padding: '48px 24px', borderRight: 'none', borderBottom: '1px solid rgba(12,12,12,0.1)' },
  },
})

export const bioLabel = style({
  fontSize: '12px',
  color: 'rgba(12,12,12,0.4)',
  margin: 0,
  fontWeight: 500,
})

export const bioPortraitWrap = style({
  overflow: 'hidden',
  flex: 1,
  display: 'flex',
  alignItems: 'flex-end',
})

export const bioPortraitImg = style({
  width: '70%',
  height: 'auto',
  display: 'block',
  objectFit: 'initial',
})

export const bioPortraitPlaceholder = style({
  width: '70%',
  paddingBottom: '120%',
  background: 'rgba(12,12,12,0.08)',
})

export const bioRight = style({
  padding: '64px 56px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '@media': {
    '(max-width: 768px)': { padding: '40px 24px' },
  },
})

export const bioName = style({
  fontSize: 'clamp(48px, 7.5vw, 120px)',
  fontWeight: 900,
  letterSpacing: '-0.05em',
  lineHeight: 0.88,
  color: '#0C0C0C',
  margin: '0 0 40px',
  '@media': {
    '(max-width: 768px)': { fontSize: 'clamp(40px, 10vw, 80px)' },
  },
})

export const bioParagraph = style({
  fontWeight: 400,
  lineHeight: 1.85,
  letterSpacing: '-0.003em',
  color: 'rgba(12,12,12,0.65)',
  margin: '0 0 16px',
  maxWidth: '520px',
})

export const bioColorStrip = style({
  display: 'flex',
  gap: '6px',
  marginTop: '24px',
})

// ── SERVICES ──────────────────────────────────────────────────────────────
export const services = style({
  display: 'grid',
  gridTemplateColumns: '280px 1fr',
  minHeight: '60vh',
  background: '#E8E8E8',
  borderTop: '1px solid rgba(12,12,12,0.1)',
  '@media': {
    '(max-width: 768px)': { gridTemplateColumns: '1fr' },
  },
})

export const accordList = style({
  borderRight: '1px solid rgba(12,12,12,0.1)',
})

export const accordItem = style({
  padding: '28px 36px',
  borderBottom: '1px solid rgba(12,12,12,0.1)',
  cursor: 'pointer',
  transition: 'background 0.2s',
  ':hover': { background: 'rgba(12,12,12,0.04)' },
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})

export const accordItemActive = style({
  padding: '28px 36px',
  borderBottom: '1px solid rgba(12,12,12,0.1)',
  cursor: 'pointer',
  background: '#0C0C0C',
})

export const accordImg = style({
  overflow: 'hidden',
  padding: '56px',
  display: 'flex',
  alignItems: 'center',
  '@media': {
    '(max-width: 768px)': { padding: '32px 24px' },
  },
})

export const accordImgEl = style({
  width: '100%',
  maxHeight: '60vh',
  objectFit: 'cover',
  display: 'block',
  transition: 'opacity 0.35s ease',
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})

export const accordImgPlaceholder = style({
  width: '100%',
  height: '60vh',
  background: 'rgba(12,12,12,0.06)',
})

// ── TICKER ROW ────────────────────────────────────────────────────────────
export const tickerRow = style({
  display: 'flex',
  borderTop: '1px solid rgba(12,12,12,0.08)',
  borderBottom: '1px solid rgba(12,12,12,0.08)',
  background: '#E8E8E8',
  '@media': {
    '(max-width: 768px)': { flexDirection: 'column' },
  },
})

export const tickerWrap = style({
  flex: 2,
  overflow: 'hidden',
  padding: '28px 0',
  borderRight: '1px solid rgba(12,12,12,0.08)',
  '@media': {
    '(max-width: 768px)': { borderRight: 'none', borderBottom: '1px solid rgba(12,12,12,0.08)' },
  },
})

export const tickerText = style({
  fontSize: 'clamp(11px, 1.3vw, 14px)',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(12,12,12,0.28)',
  flexShrink: 0,
})

export const tickerSep = style({
  margin: '0 28px',
  color: 'rgba(12,12,12,0.1)',
})

export const swatchWrap = style({
  flex: 1,
  padding: '28px 48px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '12px',
  '@media': {
    '(max-width: 768px)': { padding: '24px', flexDirection: 'row' },
  },
})

export const swatchLabel = style({
  fontSize: '9px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(12,12,12,0.3)',
  margin: 0,
  fontWeight: 600,
})

export const swatchRow = style({ display: 'flex', gap: '8px' })

// ── CONTACT ───────────────────────────────────────────────────────────────
export const contactSection = style({
  padding: '80px 56px',
  background: '#E8E8E8',
  '@media': {
    '(max-width: 768px)': { padding: '60px 24px' },
  },
})

export const contactSectionLabel = style({
  fontSize: '9px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(12,12,12,0.3)',
  marginBottom: '32px',
})

export const contactGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '12px',
})

export const contactCard = style({
  border: '1px solid rgba(12,12,12,0.1)',
  padding: '24px 28px',
  background: '#E8E8E8',
  transition: 'border-color 0.25s',
  cursor: 'default',
  ':hover': { borderColor: 'var(--v2-accent)' },
})

export const contactCardType = style({
  fontSize: '9px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--v2-accent)',
  marginBottom: '10px',
  fontWeight: 600,
})

export const contactCardValue = style({
  fontSize: '16px',
  fontWeight: 500,
  color: '#0C0C0C',
  letterSpacing: '-0.01em',
  margin: 0,
})

// ── FOOTER ────────────────────────────────────────────────────────────────
export const footerInner = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
  padding: '36px 56px',
  '@media': {
    '(max-width: 768px)': { padding: '24px' },
  },
})

export const footerMeta = style({
  fontSize: '9px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.5)',
  margin: '0 0 8px',
  fontWeight: 600,
})

export const footerTagline = style({
  fontSize: 'clamp(20px, 2.4vw, 32px)',
  fontWeight: 900,
  letterSpacing: '-0.04em',
  color: '#FFFFFF',
  margin: 0,
  lineHeight: 1,
})

export const footerContacts = style({
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
  flexWrap: 'wrap',
})

export const footerContactItem = style({
  fontSize: '11px',
  letterSpacing: '0.06em',
  color: 'rgba(255,255,255,0.7)',
  fontWeight: 500,
})

export const footerCopyright = style({
  fontSize: '10px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
})
