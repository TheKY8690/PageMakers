import { style } from '@vanilla-extract/css'

const colors = {
  background: '#F8FAFC',
  primary: '#0F172A',
  accent: '#0369A1',
  accentHover: '#0284C7',
  muted: '#E8ECF1',
  border: '#E2E8F0',
  white: '#FFFFFF',
  subText: '#64748B',
}

// ─── Nav ───────────────────────────────────────────────────────────────────

export const nav = style({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  backgroundColor: colors.background,
  borderBottom: `1px solid ${colors.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 64px',
  height: '64px',
  '@media': {
    '(max-width: 768px)': {
      padding: '0 24px',
    },
  },
})

export const navLogo = style({
  fontSize: '16px',
  fontWeight: 800,
  color: colors.primary,
  letterSpacing: '-0.02em',
  textDecoration: 'none',
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
  color: colors.subText,
  textDecoration: 'none',
  letterSpacing: '0.02em',
  transition: 'color 0.15s ease',
  selectors: {
    '&:hover': {
      color: colors.primary,
    },
  },
})

export const navCta = style({
  backgroundColor: colors.primary,
  color: colors.white,
  textDecoration: 'none',
  padding: '9px 20px',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.01em',
  transition: 'background-color 0.15s ease',
  selectors: {
    '&:hover': {
      backgroundColor: colors.accent,
    },
  },
})

// ─── Hero ──────────────────────────────────────────────────────────────────

export const hero = style({
  minHeight: 'calc(100dvh - 64px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '80px 64px',
  borderBottom: `1px solid ${colors.border}`,
  '@media': {
    '(max-width: 768px)': {
      padding: '60px 24px',
    },
  },
})

export const heroEyebrow = style({
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: colors.accent,
  marginBottom: '24px',
})

export const heroTitle = style({
  fontSize: 'clamp(40px, 6vw, 80px)',
  fontWeight: 800,
  color: colors.primary,
  lineHeight: 1.1,
  letterSpacing: '-0.03em',
  maxWidth: '900px',
  marginBottom: '28px',
})

export const heroSub = style({
  fontSize: '18px',
  color: colors.subText,
  lineHeight: 1.7,
  maxWidth: '520px',
  marginBottom: '48px',
  '@media': {
    '(max-width: 768px)': {
      fontSize: '16px',
    },
  },
})

export const heroBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: colors.primary,
  color: colors.white,
  textDecoration: 'none',
  padding: '14px 28px',
  borderRadius: '6px',
  fontSize: '15px',
  fontWeight: 600,
  transition: 'background-color 0.15s ease',
  alignSelf: 'flex-start',
  selectors: {
    '&:hover': {
      backgroundColor: colors.accent,
    },
  },
})

// ─── Section common ────────────────────────────────────────────────────────

export const section = style({
  padding: '100px 64px',
  borderBottom: `1px solid ${colors.border}`,
  '@media': {
    '(max-width: 768px)': {
      padding: '64px 24px',
    },
  },
})

export const sectionDark = style([
  section,
  {
    backgroundColor: colors.primary,
    borderBottom: 'none',
  },
])

export const sectionLabel = style({
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: colors.subText,
  marginBottom: '16px',
})

export const sectionLabelLight = style([
  sectionLabel,
  {
    color: 'rgba(255,255,255,0.4)',
  },
])

export const sectionTitle = style({
  fontSize: 'clamp(28px, 4vw, 48px)',
  fontWeight: 700,
  color: colors.primary,
  letterSpacing: '-0.02em',
  lineHeight: 1.2,
  marginBottom: '64px',
  maxWidth: '600px',
})

export const sectionTitleLight = style([
  sectionTitle,
  {
    color: colors.white,
  },
])

// ─── Services grid ─────────────────────────────────────────────────────────

export const servicesGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1px',
  backgroundColor: colors.border,
  border: `1px solid ${colors.border}`,
  borderRadius: '8px',
  overflow: 'hidden',
  '@media': {
    '(max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const serviceCard = style({
  backgroundColor: colors.background,
  padding: '40px 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

export const serviceNum = style({
  fontSize: '12px',
  fontWeight: 600,
  color: colors.accent,
  letterSpacing: '0.08em',
})

export const serviceTitle = style({
  fontSize: '18px',
  fontWeight: 700,
  color: colors.primary,
  letterSpacing: '-0.01em',
})

export const serviceDesc = style({
  fontSize: '14px',
  color: colors.subText,
  lineHeight: 1.7,
})

// ─── How it works ──────────────────────────────────────────────────────────

export const stepsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '48px',
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '40px',
    },
  },
})

export const step = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  paddingTop: '28px',
  borderTop: `2px solid ${colors.primary}`,
})

export const stepNum = style({
  fontSize: '12px',
  fontWeight: 600,
  color: colors.accent,
  letterSpacing: '0.08em',
})

export const stepTitle = style({
  fontSize: '22px',
  fontWeight: 700,
  color: colors.primary,
  letterSpacing: '-0.02em',
})

export const stepDesc = style({
  fontSize: '14px',
  color: colors.subText,
  lineHeight: 1.7,
})

// ─── Samples ───────────────────────────────────────────────────────────────

export const samplesGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '24px',
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const sampleCard = style({
  border: `1px solid ${colors.border}`,
  borderRadius: '8px',
  padding: '40px',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  transition: 'border-color 0.15s ease, background-color 0.15s ease',
  selectors: {
    '&:hover': {
      borderColor: colors.primary,
      backgroundColor: colors.muted,
    },
  },
})

export const sampleTag = style({
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: colors.accent,
})

export const sampleName = style({
  fontSize: '24px',
  fontWeight: 700,
  color: colors.primary,
  letterSpacing: '-0.02em',
})

export const sampleDesc = style({
  fontSize: '14px',
  color: colors.subText,
  lineHeight: 1.6,
})

export const sampleArrow = style({
  fontSize: '18px',
  color: colors.primary,
  marginTop: 'auto',
  paddingTop: '24px',
})

// ─── CTA ───────────────────────────────────────────────────────────────────

export const ctaInner = style({
  maxWidth: '640px',
})

export const ctaTitle = style({
  fontSize: 'clamp(28px, 4vw, 52px)',
  fontWeight: 800,
  color: colors.white,
  letterSpacing: '-0.03em',
  lineHeight: 1.15,
  marginBottom: '40px',
})

export const ctaBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: colors.white,
  color: colors.primary,
  textDecoration: 'none',
  padding: '14px 28px',
  borderRadius: '6px',
  fontSize: '15px',
  fontWeight: 700,
  transition: 'background-color 0.15s ease, color 0.15s ease',
  selectors: {
    '&:hover': {
      backgroundColor: colors.accent,
      color: colors.white,
    },
  },
})

// ─── Footer ────────────────────────────────────────────────────────────────

export const footer = style({
  backgroundColor: colors.primary,
  padding: '32px 64px',
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
  color: 'rgba(255,255,255,0.4)',
})

export const footerLink = style({
  fontSize: '13px',
  color: 'rgba(255,255,255,0.4)',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  selectors: {
    '&:hover': {
      color: colors.white,
    },
  },
})
