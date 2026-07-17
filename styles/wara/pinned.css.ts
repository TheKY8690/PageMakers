import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const section = style({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 7vw',
  gap: '80px',
  overflow: 'hidden',
  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '40px',
      padding: '80px 6vw',
    },
  },
})

export const textWrap = style({
  flex: 1,
  maxWidth: '480px',
})

export const tag = style({
  fontSize: '11px',
  color: colors.purple,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 500,
  marginBottom: '24px',
  display: 'block',
})

export const title = style({
  fontSize: 'clamp(28px, 3.5vw, 52px)',
  fontWeight: 700,
  color: colors.white,
  letterSpacing: '-0.025em',
  lineHeight: 1.1,
  marginBottom: '20px',
})

export const desc = style({
  fontSize: 'clamp(15px, 1.3vw, 18px)',
  color: colors.sub,
  lineHeight: 1.75,
})

export const visual = style({
  flex: 1,
  maxWidth: '460px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const mockPhone = style({
  width: '240px',
  height: '480px',
  borderRadius: '32px',
  border: `1px solid ${colors.border}`,
  backgroundColor: '#1e1a2e',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  gap: '12px',
})

export const phoneLine = style({
  height: '12px',
  borderRadius: '6px',
  backgroundColor: 'rgba(255,255,255,0.08)',
})

export const phoneLineAccent = style([phoneLine, {
  backgroundColor: 'rgba(155, 125, 255, 0.3)',
  width: '60%',
}])

export const mockCard = style({
  width: '100%',
  padding: '16px',
  borderRadius: '16px',
  border: `1px solid ${colors.border}`,
  backgroundColor: 'rgba(155, 125, 255, 0.06)',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

export const notifStack = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  maxWidth: '360px',
})

export const notif = style({
  padding: '14px 18px',
  borderRadius: '14px',
  border: `1px solid ${colors.border}`,
  backgroundColor: '#1e1a2e',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

export const notifDot = style({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: colors.purple,
  flexShrink: 0,
})

export const notifText = style({
  fontSize: '13px',
  color: colors.white,
  lineHeight: 1.4,
})

export const inviteCard = style({
  width: '100%',
  maxWidth: '360px',
  padding: '28px',
  borderRadius: '20px',
  border: `1px solid rgba(155, 125, 255, 0.3)`,
  backgroundColor: '#1e1a2e',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

export const inviteTitle = style({
  fontSize: '18px',
  fontWeight: 600,
  color: colors.white,
})

export const inviteRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

export const avatar = style({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: 'rgba(155, 125, 255, 0.2)',
  border: `1px solid ${colors.border}`,
})

export const inviteLabel = style({
  fontSize: '13px',
  color: colors.sub,
})

export const inviteBtn = style({
  marginTop: '4px',
  padding: '12px',
  borderRadius: '12px',
  backgroundColor: colors.purple,
  color: colors.white,
  fontSize: '14px',
  fontWeight: 600,
  textAlign: 'center',
})
