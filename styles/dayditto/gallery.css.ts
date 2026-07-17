import { style } from '@vanilla-extract/css'
import { colors } from './tokens'

export const section = style({
  backgroundColor: colors.darkGray,
  padding: '140px 0',
  overflow: 'hidden',
})

export const header = style({
  padding: '0 7vw',
  marginBottom: '60px',
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

export const scrollHint = style({
  fontSize: '13px',
  color: colors.subText,
  marginTop: '12px',
})

export const track = style({
  display: 'flex',
  gap: '20px',
  paddingLeft: '7vw',
  paddingRight: '7vw',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  cursor: 'grab',
  ':active': {
    cursor: 'grabbing',
  },
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
})

export const item = style({
  flexShrink: 0,
  width: 'clamp(260px, 28vw, 400px)',
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  transition: 'transform 0.3s ease',
  ':hover': {
    transform: 'scale(1.03)',
  },
})

export const img = style({
  width: '100%',
  height: 'clamp(180px, 20vw, 280px)',
  objectFit: 'cover',
  display: 'block',
})

export const caption = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '16px',
  background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  selectors: {
    [`${item}:hover &`]: {
      opacity: 1,
    },
  },
})

export const captionText = style({
  fontSize: '13px',
  color: colors.white,
  fontWeight: 500,
})
