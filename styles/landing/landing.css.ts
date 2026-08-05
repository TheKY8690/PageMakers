import { style, keyframes } from '@vanilla-extract/css'

// ─── Keyframes ─────────────────────────────────────────────────────────────

const spinCw = keyframes({
  from: { transform: 'translate(-50%, -50%) rotate(0deg)' },
  to: { transform: 'translate(-50%, -50%) rotate(360deg)' },
})

const spinCcw = keyframes({
  from: { transform: 'translate(-50%, -50%) rotate(0deg)' },
  to: { transform: 'translate(-50%, -50%) rotate(-360deg)' },
})


const c = {
  bg: '#0C0C0C',
  text: '#F0EFE9',
  textMuted: 'rgba(240,239,233,0.4)',
  border: 'rgba(240,239,233,0.1)',
  borderHover: 'rgba(240,239,233,0.6)',
}

const heading = "'Archivo', system-ui, sans-serif"

// ─── Nav ───────────────────────────────────────────────────────────────────

export const nav = style({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  backgroundColor: c.bg,
  borderBottom: `1px solid ${c.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 80px',
  height: '64px',
  '@media': {
    '(max-width: 768px)': {
      padding: '0 24px',
    },
  },
})

export const navLogo = style({
  fontSize: '15px',
  fontWeight: 800,
  color: c.text,
  letterSpacing: '-0.02em',
  textDecoration: 'none',
  fontFamily: heading,
  cursor: 'pointer',
})

export const navLinks = style({
  display: 'flex',
  alignItems: 'center',
  gap: '40px',
  '@media': {
    '(max-width: 768px)': {
      display: 'none',
    },
  },
})

export const navLink = style({
  fontSize: '13px',
  color: c.textMuted,
  textDecoration: 'none',
  letterSpacing: '0.02em',
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  selectors: {
    '&:hover': {
      color: c.text,
    },
  },
})

export const navCta = style({
  backgroundColor: c.text,
  color: '#0C0C0C',
  textDecoration: 'none',
  padding: '8px 18px',
  borderRadius: '4px',
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.01em',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(240,239,233,0.8)',
    },
  },
})

// ─── Hero ──────────────────────────────────────────────────────────────────

export const hero = style({
  minHeight: 'calc(100dvh - 64px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '10px 80px 140px',
  backgroundColor: c.bg,
  position: 'relative',
  '@media': {
    '(max-width: 768px)': {
      padding: '10px 24px 100px',
    },
  },
})

export const heroEyebrow = style({
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: c.textMuted,
  marginBottom: '40px',
})

export const heroLogo = style({
  fontSize: 'clamp(64px, 10vw, 160px)',
  fontWeight: 800,
  color: c.text,
  lineHeight: 1.0,
  letterSpacing: '-0.05em',
  fontFamily: heading,
  marginBottom: '24px',
  maxWidth: '1200px',
})

export const heroTagline = style({
  fontSize: 'clamp(20px, 3vw, 38px)',
  fontWeight: 500,
  color: c.textMuted,
  letterSpacing: '-0.02em',
  lineHeight: 1.2,
  marginBottom: '40px',
  fontFamily: heading,
})

export const heroSub = style({
  fontSize: '16px',
  color: c.textMuted,
  lineHeight: 1.8,
  maxWidth: '480px',
  marginBottom: '56px',
  wordBreak: 'keep-all',
  '@media': {
    '(max-width: 768px)': {
      fontSize: '15px',
    },
  },
})

export const heroBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  backgroundColor: c.text,
  color: '#0C0C0C',
  textDecoration: 'none',
  padding: '14px 28px',
  borderRadius: '4px',
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '0.01em',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, gap 0.3s ease',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(240,239,233,0.8)',
      gap: '16px',
    },
  },
})

export const scrollHint = style({
  position: 'absolute',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
})

export const scrollLine = style({
  width: '1px',
  height: '40px',
  backgroundColor: c.textMuted,
})

export const scrollLabel = style({
  fontSize: '10px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: c.textMuted,
  writingMode: 'vertical-rl',
})

// ─── Hero geometric BG ─────────────────────────────────────────────────────

export const heroDotGrid = style({
  position: 'absolute',
  inset: 0,
  backgroundImage: 'radial-gradient(circle, rgba(240,239,233,0.1) 1px, transparent 1px)',
  backgroundSize: '48px 48px',
  pointerEvents: 'none',
  zIndex: 0,
  maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
  WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
})

export const heroGlow = style({
  position: 'absolute',
  inset: 0,
  background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(240,239,233,0.05), transparent)',
  pointerEvents: 'none',
  zIndex: 0,
})

export const heroNoise = style({
  position: 'absolute',
  inset: 0,
  opacity: 0.035,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  backgroundSize: '200px 200px',
  pointerEvents: 'none',
  zIndex: 0,
  '@media': {
    '(prefers-reduced-motion: reduce)': { opacity: 0 },
  },
})

export const heroRing1 = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '520px',
  height: '520px',
  borderRadius: '50%',
  border: '1px solid rgba(240,239,233,0.07)',
  pointerEvents: 'none',
  zIndex: 0,
  animation: `${spinCw} 35s linear infinite`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
    '(max-width: 768px)': {
      width: '320px',
      height: '320px',
    },
  },
})

export const heroRing2 = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '820px',
  height: '820px',
  borderRadius: '50%',
  border: '1px solid rgba(240,239,233,0.04)',
  pointerEvents: 'none',
  zIndex: 0,
  animation: `${spinCcw} 55s linear infinite`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
    '(max-width: 768px)': {
      width: '500px',
      height: '500px',
    },
  },
})

export const heroContent = style({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const heroLogoClip = style({
  overflow: 'hidden',
  display: 'inline-block',
  lineHeight: 1.05,
  verticalAlign: 'bottom',
})

// ─── Section common ────────────────────────────────────────────────────────

export const section = style({
  backgroundColor: c.bg,
  padding: '120px 80px',
  borderTop: `1px solid ${c.border}`,
  '@media': {
    '(max-width: 768px)': {
      padding: '80px 24px',
    },
  },
})

export const sectionInner = style({
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
  gap: '80px',
  '@media': {
    '(max-width: 900px)': {
      gridTemplateColumns: '1fr',
      gap: '40px',
    },
  },
})

export const sectionLabel = style({
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: c.textMuted,
  paddingTop: '6px',
  position: 'sticky',
  top: '88px',
  alignSelf: 'start',
})

export const sectionTitle = style({
  fontSize: 'clamp(36px, 5vw, 72px)',
  fontWeight: 700,
  color: c.text,
  letterSpacing: '-0.03em',
  lineHeight: 1.1,
  fontFamily: heading,
  marginBottom: '64px',
})

// ─── Services list ─────────────────────────────────────────────────────────

export const serviceList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

export const serviceItem = style({
  display: 'grid',
  gridTemplateColumns: '48px 1fr 1fr',
  gap: '32px',
  alignItems: 'start',
  padding: '28px 24px',
  borderRadius: '6px',
  backgroundColor: 'rgba(240,239,233,0.04)',
  border: `1px solid ${c.border}`,
  cursor: 'default',
  transition: 'background-color 0.25s ease, border-color 0.25s ease',
  selectors: {
    '&:hover': {
      backgroundColor: '#F0EFE9',
      borderColor: '#F0EFE9',
    },
  },
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: '36px 1fr',
      gap: '16px',
      padding: '20px 16px',
    },
  },
})

export const serviceNum = style({
  fontSize: '12px',
  fontWeight: 600,
  color: c.textMuted,
  letterSpacing: '0.06em',
  paddingTop: '4px',
  transition: 'color 0.25s ease',
  selectors: {
    [`${serviceItem}:hover &`]: {
      color: 'rgba(12,12,12,0.4)',
    },
  },
})

export const serviceTitle = style({
  fontSize: '20px',
  fontWeight: 600,
  color: c.text,
  letterSpacing: '-0.02em',
  fontFamily: heading,
  transition: 'color 0.25s ease',
  selectors: {
    [`${serviceItem}:hover &`]: {
      color: '#0C0C0C',
    },
  },
  '@media': {
    '(max-width: 640px)': {
      fontSize: '17px',
    },
  },
})

export const serviceDesc = style({
  fontSize: '14px',
  color: c.textMuted,
  lineHeight: 1.7,
  transition: 'color 0.25s ease',
  selectors: {
    [`${serviceItem}:hover &`]: {
      color: 'rgba(12,12,12,0.55)',
    },
    '&[style*="gridColumn"]': {
      gridColumn: '2',
      marginTop: '-8px',
    },
  },
  '@media': {
    '(max-width: 640px)': {
      gridColumn: '2',
      marginTop: '-8px',
    },
  },
})

// ─── Process ───────────────────────────────────────────────────────────────

export const stepsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1px',
  backgroundColor: c.border,
  border: `1px solid ${c.border}`,
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const step = style({
  backgroundColor: 'rgba(240,239,233,0.04)',
  padding: '48px 40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  transition: 'background-color 0.25s ease',
  selectors: {
    '&:hover': {
      backgroundColor: '#F0EFE9',
    },
  },
})

export const stepNum = style({
  fontSize: 'clamp(48px, 6vw, 80px)',
  fontWeight: 800,
  color: 'rgba(240,239,233,0.15)',
  letterSpacing: '-0.04em',
  lineHeight: 1,
  fontFamily: heading,
  transition: 'color 0.25s ease',
  selectors: {
    [`${step}:hover &`]: {
      color: 'rgba(12,12,12,0.12)',
    },
  },
})

export const stepTitle = style({
  fontSize: '20px',
  fontWeight: 600,
  color: c.text,
  letterSpacing: '-0.02em',
  fontFamily: heading,
  transition: 'color 0.25s ease',
  selectors: {
    [`${step}:hover &`]: {
      color: '#0C0C0C',
    },
  },
})

export const stepDesc = style({
  fontSize: '14px',
  color: c.textMuted,
  lineHeight: 1.7,
  transition: 'color 0.25s ease',
  selectors: {
    [`${step}:hover &`]: {
      color: 'rgba(12,12,12,0.5)',
    },
  },
})

// ─── Samples ───────────────────────────────────────────────────────────────

export const samplesGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1px',
  backgroundColor: c.border,
  border: `1px solid ${c.border}`,
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const sampleCard = style({
  backgroundColor: 'rgba(240,239,233,0.04)',
  border: `1px solid ${c.border}`,
  padding: '56px 48px',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.25s ease, border-color 0.25s ease',
  selectors: {
    '&:hover': {
      backgroundColor: '#F0EFE9',
      borderColor: '#F0EFE9',
    },
  },
})

export const sampleTag = style({
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: c.textMuted,
  transition: 'color 0.25s ease',
  selectors: {
    [`${sampleCard}:hover &`]: {
      color: 'rgba(12,12,12,0.4)',
    },
  },
})

export const sampleName = style({
  fontSize: 'clamp(28px, 4vw, 52px)',
  fontWeight: 700,
  color: c.text,
  letterSpacing: '-0.03em',
  fontFamily: heading,
  lineHeight: 1.1,
  transition: 'color 0.25s ease',
  selectors: {
    [`${sampleCard}:hover &`]: {
      color: '#0C0C0C',
    },
  },
})

export const sampleDesc = style({
  fontSize: '14px',
  color: c.textMuted,
  lineHeight: 1.6,
  maxWidth: '320px',
  transition: 'color 0.25s ease',
  selectors: {
    [`${sampleCard}:hover &`]: {
      color: 'rgba(12,12,12,0.5)',
    },
  },
})

export const sampleArrow = style({
  fontSize: '20px',
  color: c.textMuted,
  marginTop: 'auto',
  paddingTop: '32px',
  display: 'inline-block',
  transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), color 0.25s ease',
  selectors: {
    [`${sampleCard}:hover &`]: {
      transform: 'translateX(8px)',
      color: '#0C0C0C',
    },
  },
})

// ─── CTA ───────────────────────────────────────────────────────────────────

export const ctaSection = style({
  backgroundColor: c.bg,
  padding: '120px 80px 160px',
  borderTop: `1px solid ${c.border}`,
  '@media': {
    '(max-width: 768px)': {
      padding: '80px 24px 120px',
    },
  },
})

export const ctaTitle = style({
  fontSize: 'clamp(44px, 7vw, 100px)',
  fontWeight: 800,
  color: c.text,
  letterSpacing: '-0.04em',
  lineHeight: 1.05,
  marginBottom: '56px',
  fontFamily: heading,
  maxWidth: '900px',
})

export const ctaBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  backgroundColor: c.text,
  color: '#0C0C0C',
  textDecoration: 'none',
  padding: '14px 28px',
  borderRadius: '4px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, gap 0.3s ease',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(240,239,233,0.8)',
      gap: '16px',
    },
  },
})

// ─── Footer ────────────────────────────────────────────────────────────────

export const footer = style({
  backgroundColor: c.bg,
  borderTop: `1px solid ${c.border}`,
  padding: '28px 80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@media': {
    '(max-width: 768px)': {
      padding: '24px',
      flexDirection: 'column',
      gap: '12px',
      alignItems: 'flex-start',
    },
  },
})

export const footerText = style({
  fontSize: '13px',
  color: c.textMuted,
})

export const footerLink = style({
  fontSize: '13px',
  color: c.textMuted,
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  selectors: {
    '&:hover': {
      color: c.text,
    },
  },
})
