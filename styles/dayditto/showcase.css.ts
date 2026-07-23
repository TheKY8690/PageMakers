import { style, keyframes } from '@vanilla-extract/css'
import { colors } from './tokens'

export const blink = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0 },
})

export const waveBar = keyframes({
  '0%, 100%': { transform: 'scaleY(0.4)' },
  '50%': { transform: 'scaleY(1)' },
})

export const section = style({
  backgroundColor: colors.black,
  padding: '140px 7vw',
})

export const header = style({
  textAlign: 'center',
  marginBottom: '80px',
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'opacity 0.7s ease, transform 0.7s ease',
})

export const headerVisible = style({
  opacity: 1,
  transform: 'translateY(0)',
})

export const sectionTag = style({
  fontSize: '12px',
  color: colors.orange,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 500,
  marginBottom: '16px',
})

export const sectionTitle = style({
  fontSize: 'clamp(28px, 3.5vw, 52px)',
  fontWeight: 700,
  color: colors.white,
  letterSpacing: '-0.025em',
  lineHeight: 1.1,
})

export const mockup = style({
  maxWidth: '860px',
  margin: '0 auto',
  border: `1px solid ${colors.border}`,
  borderRadius: '20px',
  overflow: 'hidden',
  opacity: 0,
  transform: 'translateY(40px)',
  transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
})

export const mockupVisible = style({
  opacity: 1,
  transform: 'translateY(0)',
})

export const mockupBar = style({
  backgroundColor: colors.darkGray,
  padding: '14px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  borderBottom: `1px solid ${colors.border}`,
})

export const mockupDot = style({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: colors.border,
})

export const mockupBody = style({
  backgroundColor: '#111111',
  padding: '40px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '32px',
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const panel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

export const panelLabel = style({
  fontSize: '11px',
  color: colors.subText,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: '4px',
})

export const panelText = style({
  fontSize: '15px',
  color: colors.white,
  lineHeight: 1.7,
})

export const cursor = style({
  display: 'inline-block',
  width: '2px',
  height: '1em',
  backgroundColor: colors.orange,
  verticalAlign: 'middle',
  marginLeft: '2px',
  animation: `${blink} 1s step-end infinite`,
})

export const audioWave = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '16px 0',
  gridColumn: '1 / -1',
  justifyContent: 'center',
  borderTop: `1px solid ${colors.border}`,
  marginTop: '8px',
})

export const bar = style({
  width: '3px',
  height: '24px',
  backgroundColor: colors.orange,
  borderRadius: '2px',
  transformOrigin: 'center',
})
