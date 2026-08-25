import { keyframes, style } from '@vanilla-extract/css'
import { fonts } from './tokens'

// ── Wrapper ────────────────────────────────────────────────────────────────
export const wrapper = style({
  fontFamily: fonts.body,
  background: '#0C0C0C',
  color: '#F5F5F5',
})

// ── Keyframes ─────────────────────────────────────────────────────────────
const tickerAnim = keyframes({
  from: { transform: 'translateX(0)' },
  to:   { transform: 'translateX(-50%)' },
})

const scrollHintAnim = keyframes({
  '0%, 100%': { opacity: 0.28, transform: 'translateY(0)' },
  '50%':      { opacity: 0.6,  transform: 'translateY(6px)' },
})

// ── Ticker ────────────────────────────────────────────────────────────────
export const ticker = style({
  display: 'flex',
  gap: '56px',
  whiteSpace: 'nowrap',
  alignItems: 'center',
  animation: `${tickerAnim} 28s linear infinite`,
  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
  },
})

// ── NAV ───────────────────────────────────────────────────────────────────
export const nav = style({
  position: 'sticky',
  top: 0,
  zIndex: 50,
  background: 'rgba(12,12,12,0.88)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderBottom: '1px solid rgba(245,245,245,0.05)',
})

export const navInner = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '18px 56px',
  '@media': {
    '(max-width: 768px)': { padding: '16px 24px' },
  },
})

export const navBrand = style({
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(245,245,245,0.5)',
})

export const navLinks = style({
  display: 'flex',
  gap: '32px',
  alignItems: 'center',
  '@media': {
    '(max-width: 768px)': { gap: '18px' },
  },
})

export const navLink = style({
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(245,245,245,0.36)',
  textDecoration: 'none',
  transition: 'color 0.25s',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  ':hover': { color: 'rgba(245,245,245,0.9)' },
})

export const navAccent = style({
  fontSize: '10px',
  letterSpacing: '0.1em',
  fontWeight: 600,
  color: 'var(--v1-accent)',
})

// ── HERO ──────────────────────────────────────────────────────────────────
export const hero = style({
  display: 'grid',
  gridTemplateColumns: '44fr 56fr',
  height: '100vh',
  minHeight: '600px',
  overflow: 'hidden',
  '@media': {
    '(max-width: 768px)': { gridTemplateColumns: '1fr', height: 'auto' },
  },
})

export const heroLeft = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '48px 56px',
  borderRight: '1px solid rgba(245,245,245,0.08)',
  background: '#0C0C0C',
  '@media': {
    '(max-width: 768px)': { minHeight: '60vh', padding: '36px 24px' },
  },
})

export const heroTopLabel = style({
  fontSize: '10px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(245,245,245,0.3)',
  fontWeight: 600,
  margin: 0,
})

export const heroBox = style({
  border: '1px solid rgba(245,245,245,0.18)',
  padding: '36px 40px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: '24px 0',
})

export const heroBoxCaption = style({
  fontSize: '10px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--v1-accent)',
  fontWeight: 700,
  margin: '0 0 14px',
})

export const heroH1 = style({
  fontSize: 'clamp(28px, 3.8vw, 60px)',
  fontWeight: 800,
  letterSpacing: '-0.045em',
  lineHeight: 0.92,
  color: '#F5F5F5',
  margin: 0,
  display: 'flex',
  flexWrap: 'wrap',
})

export const heroNameWrap = style({ marginBottom: '16px' })

export const heroTaglineText = style({
  fontSize: 'clamp(12px, 1.2vw, 15px)',
  fontWeight: 400,
  lineHeight: 1.65,
  color: 'rgba(245,245,245,0.55)',
  margin: 0,
  letterSpacing: '-0.003em',
})

export const heroMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
})

export const heroColorStrip = style({ display: 'flex', gap: '3px' })

export const scrollHint = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  animation: `${scrollHintAnim} 2.2s ease-in-out infinite`,
  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
  },
})

export const scrollHintLine = style({
  width: '1px',
  height: '32px',
  background: 'rgba(245,245,245,0.12)',
})

export const scrollHintText = style({
  fontSize: '8px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(245,245,245,0.2)',
  writingMode: 'vertical-rl',
})

export const heroRight = style({
  overflow: 'hidden',
  position: 'relative',
  background: '#111',
  '@media': {
    '(max-width: 768px)': { height: '70vw' },
  },
})

export const heroRightImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  filter: 'saturate(0.88)',
  display: 'block',
})

// ── INTRO GRID ────────────────────────────────────────────────────────────
export const introGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2px',
  height: '58vh',
  background: '#0C0C0C',
  '@media': {
    '(max-width: 768px)': { gridTemplateColumns: '1fr', height: 'auto' },
  },
})

export const introCell = style({
  overflow: 'hidden',
  position: 'relative',
  background: '#111',
  '@media': {
    '(max-width: 768px)': { height: '60vw' },
  },
})

export const introCellImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  filter: 'saturate(0.85)',
  transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.9s ease',
  selectors: {
    [`${introCell}:hover &`]: { transform: 'scale(1.05)', filter: 'saturate(1)' },
  },
})

// ── WORK ROWS ─────────────────────────────────────────────────────────────
export const workSection = style({
  padding: '80px 0 60px',
  background: '#0C0C0C',
})

export const workHeader = style({
  padding: '0 56px',
  marginBottom: '40px',
  display: 'flex',
  alignItems: 'baseline',
  gap: '20px',
  '@media': {
    '(max-width: 768px)': { padding: '0 24px' },
  },
})

export const workHeaderTitle = style({
  fontSize: 'clamp(28px, 3.6vw, 52px)',
  fontWeight: 800,
  letterSpacing: '-0.04em',
  color: '#F5F5F5',
})

export const workHeaderCount = style({
  fontSize: '10px',
  letterSpacing: '0.12em',
  color: 'rgba(245,245,245,0.2)',
})

export const workRow = style({
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'baseline',
  gap: 0,
  borderTop: '1px solid rgba(245,245,245,0.07)',
  padding: '28px 56px',
  cursor: 'default',
  transition: 'background 0.3s ease, padding-left 0.35s cubic-bezier(0.16,1,0.3,1)',
  ':last-child': { borderBottom: '1px solid rgba(245,245,245,0.07)' },
  ':hover': { background: 'rgba(245,245,245,0.02)', paddingLeft: '72px' },
  '@media': {
    '(max-width: 768px)': { padding: '22px 24px' },
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})

export const workNum = style({
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.14em',
  color: 'rgba(245,245,245,0.22)',
  width: '52px',
  flexShrink: 0,
})

export const workTitle = style({
  fontSize: 'clamp(20px, 2.4vw, 34px)',
  fontWeight: 700,
  letterSpacing: '-0.03em',
  color: '#F5F5F5',
  flex: 1,
  minWidth: 0,
  '@media': {
    '(max-width: 768px)': { fontSize: '18px' },
  },
})

export const workTags = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  padding: '0 32px',
  selectors: {
    [`${workRow}:hover &`]: { opacity: 0, transition: 'opacity 0.2s' },
  },
  '@media': {
    '(max-width: 768px)': { display: 'none' },
  },
})

export const workTag = style({
  fontSize: '9px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'rgba(245,245,245,0.28)',
})

export const workCount = style({
  fontSize: '10px',
  letterSpacing: '0.1em',
  color: 'rgba(245,245,245,0.18)',
  fontWeight: 500,
  minWidth: '36px',
  textAlign: 'right',
  selectors: {
    [`${workRow}:hover &`]: { opacity: 0, transition: 'opacity 0.2s' },
  },
})

export const workPreview = style({
  position: 'absolute',
  right: '56px',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '280px',
  height: '180px',
  overflow: 'hidden',
  pointerEvents: 'none',
  opacity: 0,
  transition: 'opacity 0.35s ease',
  zIndex: 3,
  border: '1px solid rgba(245,245,245,0.08)',
  selectors: {
    [`${workRow}:hover &`]: { opacity: 1 },
  },
  '@media': {
    '(max-width: 768px)': { width: '160px', height: '110px', right: '24px' },
  },
})

export const workPreviewImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
})

// ── SERVICES ──────────────────────────────────────────────────────────────
export const servicesSection = style({
  padding: '100px 56px',
  background: '#111',
  '@media': {
    '(max-width: 768px)': { padding: '80px 24px' },
  },
})

export const servicesHeader = style({ marginBottom: '64px' })

export const servicesHeaderLabel = style({
  fontSize: '9px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(245,245,245,0.28)',
  margin: '0 0 16px',
})

export const servicesHeaderTitle = style({
  fontSize: 'clamp(28px, 3.6vw, 52px)',
  fontWeight: 800,
  letterSpacing: '-0.04em',
  color: '#F5F5F5',
  margin: '0 0 16px',
})

export const servicesHeaderDesc = style({
  fontSize: '14px',
  color: 'rgba(245,245,245,0.38)',
  lineHeight: 1.7,
  margin: 0,
  maxWidth: '480px',
})

export const servicesHeaderAccent = style({ color: 'var(--v1-accent)' })

export const servicesGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1px',
  border: '1px solid rgba(245,245,245,0.07)',
  '@media': {
    '(max-width: 768px)': { gridTemplateColumns: '1fr 1fr' },
    '(max-width: 480px)': { gridTemplateColumns: '1fr' },
  },
})

export const serviceCard = style({
  padding: '36px 28px',
  borderRight: '1px solid rgba(245,245,245,0.07)',
  borderBottom: '1px solid rgba(245,245,245,0.07)',
  background: '#111',
  transition: 'background 0.3s',
  ':hover': { background: 'rgba(245,245,245,0.03)' },
  selectors: {
    '&:nth-child(4n)': { borderRight: 'none' },
  },
})

export const serviceCode = style({
  fontSize: '9px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--v1-accent)',
  margin: '0 0 16px',
  fontWeight: 700,
})

export const serviceTitle = style({
  fontSize: 'clamp(14px, 1.4vw, 17px)',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: '#F5F5F5',
  margin: '0 0 12px',
})

export const serviceDesc = style({
  fontSize: '12px',
  color: 'rgba(245,245,245,0.38)',
  lineHeight: 1.65,
  margin: 0,
})

// ── PHILOSOPHY ────────────────────────────────────────────────────────────
export const philosophy = style({
  padding: '120px 56px',
  background: '#F0EFE9',
  color: '#0C0C0C',
  '@media': {
    '(max-width: 768px)': { padding: '80px 24px' },
  },
})

export const philosophyLabel = style({
  fontSize: '9px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(12,12,12,0.28)',
  marginBottom: '44px',
})

export const philosophyBorder = style({
  borderLeft: '3px solid var(--v1-accent)',
  paddingLeft: '28px',
  marginBottom: '32px',
  maxWidth: '800px',
})

export const philosophyQuote = style({
  fontSize: 'clamp(26px, 3.4vw, 54px)',
  fontWeight: 700,
  letterSpacing: '-0.03em',
  lineHeight: 1.2,
  margin: 0,
  color: '#0C0C0C',
})

export const qword = style({
  display: 'inline',
  opacity: 0.1,
  willChange: 'opacity',
  '@media': {
    '(prefers-reduced-motion: reduce)': { opacity: 1 },
  },
})

export const quoteSub = style({
  fontSize: '15px',
  color: 'rgba(12,12,12,0.5)',
  lineHeight: 1.9,
  letterSpacing: '-0.003em',
  margin: 0,
  paddingLeft: '31px',
  whiteSpace: 'pre-line',
  maxWidth: '640px',
  opacity: 0,
  '@media': {
    '(prefers-reduced-motion: reduce)': { opacity: 1 },
  },
})

// ── ABOUT ─────────────────────────────────────────────────────────────────
export const aboutSection = style({
  padding: '100px 56px',
  background: '#0C0C0C',
  '@media': {
    '(max-width: 768px)': { padding: '80px 24px' },
  },
})

export const aboutSectionLabel = style({
  fontSize: '9px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(245,245,245,0.28)',
  margin: '0 0 16px',
})

export const aboutSectionTitle = style({
  fontSize: 'clamp(28px, 3.6vw, 52px)',
  fontWeight: 800,
  letterSpacing: '-0.04em',
  color: '#F5F5F5',
  margin: 0,
})

export const aboutGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '80px',
  marginTop: '64px',
  '@media': {
    '(max-width: 768px)': { gridTemplateColumns: '1fr', gap: '48px' },
  },
})

export const aboutImgWrap = style({
  overflow: 'hidden',
  marginBottom: '40px',
  lineHeight: 0,
})

export const aboutImg = style({
  width: '100%',
  maxWidth: '55%',
  height: 'auto',
  display: 'block',
  objectFit: 'initial',
  filter: 'saturate(0.88)',
  '@media': {
    '(max-width: 768px)': { maxWidth: '80%' },
  },
})

export const rosterLabel = style({
  fontSize: '9px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(245,245,245,0.28)',
  margin: '0 0 32px',
})

export const rosterDesc = style({
  fontSize: '13px',
  color: 'rgba(245,245,245,0.38)',
  lineHeight: 1.7,
  margin: '0 0 40px',
  maxWidth: '360px',
})

export const rosterEmpty = style({
  fontSize: '13px',
  color: 'rgba(245,245,245,0.2)',
  fontStyle: 'italic',
})

export const rosterItem = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '16px',
  borderBottom: '1px solid rgba(245,245,245,0.06)',
  padding: '18px 0',
  transition: 'padding-left 0.35s cubic-bezier(0.16,1,0.3,1)',
  cursor: 'default',
  ':hover': { paddingLeft: '12px' },
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})

export const rosterItemType = style({
  fontSize: '9px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--v1-accent)',
  width: '80px',
  flexShrink: 0,
  fontWeight: 700,
})

export const rosterItemValue = style({
  fontSize: 'clamp(14px, 1.8vw, 20px)',
  fontWeight: 300,
  color: '#F5F5F5',
  letterSpacing: '-0.01em',
})

// ── BIO PARAGRAPHS ────────────────────────────────────────────────────────
export const bioParagraphFirst = style({
  fontSize: 'clamp(18px, 2vw, 26px)',
  fontWeight: 600,
  letterSpacing: '-0.025em',
  lineHeight: 1.4,
  color: '#F5F5F5',
  margin: '0 0 18px',
})

export const bioParagraphRest = style({
  fontSize: '14px',
  fontWeight: 400,
  letterSpacing: '-0.003em',
  lineHeight: 1.85,
  color: 'rgba(245,245,245,0.5)',
  margin: '0 0 18px',
})

export const bioColorSwatches = style({
  display: 'flex',
  gap: '8px',
  marginTop: '12px',
})

// ── BOTTOM ROW (TICKER + CTA) ─────────────────────────────────────────────
export const bottomRow = style({
  display: 'flex',
  background: '#111',
  '@media': {
    '(max-width: 768px)': { flexDirection: 'column' },
  },
})

export const tickerWrap = style({
  flex: 2,
  padding: '40px 0',
  overflow: 'hidden',
  borderRight: '1px solid rgba(245,245,245,0.06)',
  '@media': {
    '(max-width: 768px)': { borderRight: 'none', borderBottom: '1px solid rgba(245,245,245,0.06)' },
  },
})

export const tickerText = style({
  fontSize: 'clamp(11px, 1.3vw, 14px)',
  fontWeight: 500,
  letterSpacing: '0.14em',
  color: 'rgba(245,245,245,0.28)',
  textTransform: 'uppercase',
  flexShrink: 0,
})

export const tickerSep = style({
  margin: '0 32px',
  color: 'rgba(245,245,245,0.08)',
})

export const ctaBlock = style({
  flex: 1,
  padding: '48px 44px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '@media': {
    '(max-width: 768px)': { padding: '40px 24px' },
  },
})

export const ctaLabel = style({
  fontSize: '9px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.5)',
  margin: '0 0 16px',
  opacity: 0,
})

export const ctaTitle = style({
  fontSize: 'clamp(24px, 3vw, 42px)',
  fontWeight: 800,
  letterSpacing: '-0.04em',
  color: '#FFF',
  margin: '0 0 12px',
  lineHeight: 1.05,
  opacity: 0,
})

export const ctaDesc = style({
  fontSize: '13px',
  color: 'rgba(255,255,255,0.65)',
  lineHeight: 1.6,
  margin: '0 0 28px',
  opacity: 0,
})

export const ctaContact = style({
  opacity: 0,
})

export const ctaContactValue = style({
  fontSize: '11px',
  letterSpacing: '0.08em',
  color: 'rgba(255,255,255,0.9)',
  fontWeight: 600,
})

// ── FOOTER ────────────────────────────────────────────────────────────────
export const footerEl = style({
  background: '#0C0C0C',
  borderTop: '1px solid rgba(245,245,245,0.05)',
  padding: '20px 56px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
  '@media': {
    '(max-width: 768px)': { padding: '20px 24px' },
  },
})

export const footerCopyright = style({
  fontSize: '11px',
  color: 'rgba(245,245,245,0.18)',
  letterSpacing: '0.05em',
})

export const footerSwatches = style({ display: 'flex', gap: '6px' })

// ── Text split utilities (GSAP targets) ───────────────────────────────────
export const charWrap = style({
  display: 'inline-block',
  overflow: 'hidden',
  verticalAlign: 'bottom',
})

export const char = style({
  display: 'inline-block',
  willChange: 'transform',
  '@media': {
    '(prefers-reduced-motion: reduce)': { transform: 'none', opacity: 1 },
  },
})

export const wordWrap = style({
  display: 'inline-block',
  overflow: 'hidden',
  verticalAlign: 'bottom',
})

export const word = style({
  display: 'inline-block',
  willChange: 'transform',
  '@media': {
    '(prefers-reduced-motion: reduce)': { transform: 'none', opacity: 1 },
  },
})
