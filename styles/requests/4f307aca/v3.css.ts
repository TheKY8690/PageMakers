import { globalStyle, style } from '@vanilla-extract/css'
import { fonts } from './tokens'

// ── Wrapper ────────────────────────────────────────────────────────────────
export const wrapper = style({
  fontFamily: fonts.body,
  minHeight: '100vh',
  background: '#F5F3EE',
  color: '#0C0C0C',
})

// ── Reveal ────────────────────────────────────────────────────────────────
export const reveal = style({
  opacity: 0,
  transform: 'translateY(24px)',
  transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      opacity: 1,
      transform: 'none',
      transition: 'none',
    },
  },
})
globalStyle(`${reveal}.visible`, {
  opacity: 1,
  transform: 'translateY(0)',
})

// ── NAV ───────────────────────────────────────────────────────────────────
export const nav = style({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  padding: '20px 48px',
  background: 'rgba(245,243,238,0.96)',
  backdropFilter: 'blur(8px)',
  borderBottom: '1px solid rgba(12,12,12,0.08)',
  '@media': {
    '(max-width: 768px)': { padding: '16px 24px' },
  },
})

export const navBrand = style({
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#0C0C0C',
  flexShrink: 0,
})

export const navLine = style({
  flex: 1,
  height: '1px',
  background: 'rgba(12,12,12,0.2)',
  margin: '0 32px',
  '@media': {
    '(max-width: 768px)': { display: 'none' },
  },
})

export const navLinks = style({
  display: 'flex',
  gap: '40px',
  '@media': {
    '(max-width: 768px)': { gap: '20px' },
  },
})

export const navLink = style({
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#0C0C0C',
  fontWeight: 600,
  cursor: 'pointer',
  textDecoration: 'none',
  background: 'none',
  border: 'none',
  padding: 0,
  fontFamily: 'inherit',
  transition: 'opacity 0.2s',
  ':hover': { opacity: 0.45 },
})

// ── HERO ──────────────────────────────────────────────────────────────────
export const hero = style({
  padding: '64px 48px 56px',
  background: '#F5F3EE',
  overflow: 'hidden',
  '@media': {
    '(max-width: 768px)': { padding: '48px 24px 40px' },
  },
})

export const heroLine = style({
  fontSize: 'clamp(56px, 11vw, 168px)',
  fontWeight: 900,
  letterSpacing: '-0.045em',
  lineHeight: 0.88,
  textTransform: 'uppercase',
  display: 'block',
  margin: 0,
  '@media': {
    '(max-width: 768px)': { fontSize: 'clamp(40px, 14vw, 90px)' },
  },
})

export const heroLineTagline = style({
  fontSize: 'clamp(48px, 9.5vw, 144px)',
  fontWeight: 900,
  letterSpacing: '-0.045em',
  lineHeight: 0.88,
  textTransform: 'uppercase',
  display: 'block',
  margin: 0,
  '@media': {
    '(max-width: 768px)': { fontSize: 'clamp(36px, 12vw, 80px)' },
  },
})

export const solid = style({ color: '#0C0C0C' })
export const outline = style({
  WebkitTextStroke: '2.5px #0C0C0C',
  color: 'transparent',
})

export const heroMeta = style({
  marginTop: '40px',
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  '@media': {
    '(max-width: 768px)': { marginTop: '24px' },
  },
})

export const colorDots = style({ display: 'flex', gap: '4px' })

// ── FILMSTRIP ─────────────────────────────────────────────────────────────
export const filmstrip = style({
  display: 'flex',
  alignItems: 'stretch',
  gap: '6px',
  padding: 0,
  background: '#F5F3EE',
  overflow: 'hidden',
  '@media': {
    '(max-width: 768px)': { overflowX: 'auto' },
  },
})

export const filmSide = style({
  flex: '0 0 13%',
  overflow: 'hidden',
  background: '#ddd',
  '@media': {
    '(max-width: 768px)': { flex: '0 0 15.5%' },
  },
})

export const filmSideImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  filter: 'grayscale(100%)',
  aspectRatio: '3/4',
  transition: 'filter 0.8s ease',
  selectors: {
    [`${filmSide}:hover &`]: { filter: 'grayscale(30%)' },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})

export const filmCenter = style({
  flex: '0 0 48%',
  overflow: 'hidden',
  background: '#ccc',
  '@media': {
    '(max-width: 768px)': { flex: '0 0 31%' },
  },
})

export const filmCenterImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  aspectRatio: '4/5',
})

export const filmCenterPlaceholder = style({
  width: '100%',
  aspectRatio: '4/5',
  background: 'rgba(12,12,12,0.08)',
})

// ── ABOUT TEXT ────────────────────────────────────────────────────────────
export const aboutText = style({
  padding: '80px 48px',
  background: '#F5F3EE',
  borderTop: '1px solid rgba(12,12,12,0.1)',
  '@media': {
    '(max-width: 768px)': { padding: '56px 24px' },
  },
})

export const aboutLine = style({
  fontSize: 'clamp(28px, 5vw, 72px)',
  fontWeight: 900,
  letterSpacing: '-0.04em',
  lineHeight: 1,
  textTransform: 'uppercase',
  margin: '0 0 4px',
  display: 'block',
  '@media': {
    '(max-width: 768px)': { fontSize: 'clamp(22px, 7vw, 48px)' },
  },
})

export const aboutLineBrandName = style({
  fontSize: 'clamp(22px, 3.8vw, 56px)',
  fontWeight: 900,
  letterSpacing: '-0.04em',
  lineHeight: 1,
  textTransform: 'uppercase',
  margin: '0 0 4px',
  display: 'block',
  '@media': {
    '(max-width: 768px)': { fontSize: 'clamp(18px, 6vw, 40px)' },
  },
})

export const aboutStatementWrap = style({
  marginBottom: '48px',
  '@media': {
    '(max-width: 768px)': { marginBottom: '28px' },
  },
})

export const bioBorderWrap = style({
  maxWidth: '640px',
  borderLeft: '3px solid var(--v3-accent)',
  paddingLeft: '28px',
  '@media': {
    '(max-width: 768px)': { paddingLeft: '16px' },
  },
})

export const bioParagraphFirst = style({
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: 1.75,
  color: '#0C0C0C',
  margin: '0 0 14px',
  letterSpacing: '-0.003em',
})

export const bioParagraphRest = style({
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: 1.75,
  color: 'rgba(12,12,12,0.55)',
  margin: '0 0 14px',
  letterSpacing: '-0.003em',
})


// ── STATS ─────────────────────────────────────────────────────────────────
export const statsSection = style({
  position: 'relative',
  background: '#0C0C0C',
  overflow: 'hidden',
  minHeight: '60vh',
  padding: '64px 48px',
  display: 'grid',
  gridTemplateColumns: '1fr 38%',
  alignItems: 'center',
  gap: '48px',
  '@media': {
    '(max-width: 768px)': { gridTemplateColumns: '1fr', padding: '48px 24px' },
  },
})

export const statLine = style({
  fontSize: 'clamp(36px, 7vw, 112px)',
  fontWeight: 900,
  letterSpacing: '-0.04em',
  textTransform: 'uppercase',
  lineHeight: 0.88,
  margin: '0 0 24px',
  display: 'flex',
  alignItems: 'baseline',
  gap: '0.14em',
  flexWrap: 'wrap',
  '@media': {
    '(max-width: 768px)': { fontSize: 'clamp(28px, 9vw, 60px)' },
  },
})

export const statSolid   = style({ color: '#F5F3EE' })
export const statOutline = style({ WebkitTextStroke: '2px rgba(245,243,238,0.35)', color: 'transparent' })

export const statsPortrait = style({
  overflow: 'hidden',
  alignSelf: 'stretch',
  minHeight: '400px',
  '@media': {
    '(max-width: 768px)': { minHeight: '72vw' },
  },
})

export const statsPortraitImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  filter: 'grayscale(20%)',
})

export const statsPortraitPlaceholder = style({
  width: '100%',
  height: '100%',
  minHeight: '400px',
  background: 'rgba(245,243,238,0.06)',
})

export const contactsStrip = style({
  marginTop: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

export const contactRow   = style({ display: 'flex', gap: '16px', alignItems: 'baseline' })

export const contactLabel = style({
  fontSize: '9px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(245,243,238,0.35)',
  fontWeight: 700,
  width: '70px',
  flexShrink: 0,
})

export const contactValue = style({
  fontSize: '16px',
  fontWeight: 500,
  color: '#F5F3EE',
  letterSpacing: '-0.01em',
})

// ── CTA ───────────────────────────────────────────────────────────────────
export const ctaSection = style({
  padding: '100px 48px',
  background: '#F5F3EE',
  textAlign: 'center',
  borderTop: '1px solid rgba(12,12,12,0.08)',
  position: 'relative',
  '@media': {
    '(max-width: 768px)': { padding: '64px 24px' },
  },
})

export const ctaText = style({
  fontSize: 'clamp(44px, 9vw, 148px)',
  fontWeight: 900,
  WebkitTextStroke: '2.5px #0C0C0C',
  color: 'transparent',
  textTransform: 'uppercase',
  lineHeight: 0.88,
  margin: '0 0 52px',
  letterSpacing: '-0.04em',
  '@media': {
    '(max-width: 768px)': { fontSize: 'clamp(32px, 11vw, 72px)' },
  },
})

export const ctaBtn = style({
  display: 'inline-block',
  padding: '18px 44px',
  background: '#0C0C0C',
  color: '#F5F3EE',
  fontSize: '11px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontWeight: 700,
  fontFamily: 'inherit',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background 0.2s, color 0.2s',
  ':hover': { background: 'var(--v3-accent)' },
})

export const ctaDeco = style({
  position: 'absolute',
  top: '40px',
  right: '56px',
  fontSize: '48px',
  fontWeight: 300,
  color: 'rgba(12,12,12,0.15)',
  pointerEvents: 'none',
  '@media': {
    '(max-width: 768px)': { display: 'none' },
  },
})

// ── FOOTER ────────────────────────────────────────────────────────────────
export const footer = style({ background: '#0C0C0C', color: '#F5F3EE' })

export const footerNav = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 48px',
  borderBottom: '1px solid rgba(245,243,238,0.1)',
  '@media': {
    '(max-width: 768px)': { padding: '20px 24px', gap: '12px', flexWrap: 'wrap' },
  },
})

export const footerNavLinks = style({
  display: 'flex',
  gap: '40px',
  '@media': {
    '(max-width: 768px)': { gap: '20px' },
  },
})

export const footerNavLink = style({
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(245,243,238,0.5)',
  fontWeight: 600,
  cursor: 'pointer',
  textDecoration: 'none',
  background: 'none',
  border: 'none',
  padding: 0,
  fontFamily: 'inherit',
  transition: 'color 0.2s',
  ':hover': { color: '#F5F3EE' },
})

export const footerCopyright = style({
  fontSize: '10px',
  letterSpacing: '0.1em',
  color: 'var(--v3-accent)',
  fontWeight: 600,
})

export const footerBrandRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  padding: '40px 48px 24px',
  overflow: 'hidden',
  gap: '16px',
  '@media': {
    '(max-width: 768px)': { padding: '32px 24px 20px', flexDirection: 'column' },
  },
})

export const footerSolid = style({
  fontSize: 'clamp(56px, 12vw, 190px)',
  fontWeight: 900,
  color: '#F5F3EE',
  letterSpacing: '-0.05em',
  lineHeight: 0.85,
  textTransform: 'uppercase',
  margin: 0,
  '@media': {
    '(max-width: 768px)': { fontSize: 'clamp(40px, 13vw, 80px)' },
  },
})

export const footerBar = style({
  padding: '18px 48px',
  borderTop: '1px solid rgba(245,243,238,0.07)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media': {
    '(max-width: 768px)': { padding: '16px 24px' },
  },
})

export const footerBarText = style({
  fontSize: '10px',
  color: 'rgba(245,243,238,0.2)',
  letterSpacing: '0.06em',
})

export const footerBarBrand = style({
  fontSize: '10px',
  color: 'var(--v3-accent)',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
})
