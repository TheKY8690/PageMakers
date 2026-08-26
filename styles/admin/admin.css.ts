import { style } from '@vanilla-extract/css'

// ── Layout ────────────────────────────────────────────────────────────────────

export const signOutForm = style({ marginTop: 'auto' })

export const signOutBtn = style({
  width: '100%',
  padding: '10px 16px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '13px',
  color: 'rgba(12,12,12,0.4)',
  textAlign: 'left',
  fontFamily: 'inherit',
})

// ── Page scaffolding ──────────────────────────────────────────────────────────

export const pageWrapper = style({ padding: '32px', maxWidth: '760px' })
export const pageInner = style({ padding: '32px' })

export const pageHeader = style({ marginBottom: '32px' })

export const titleRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'wrap',
})

export const titleActions = style({ marginLeft: 'auto' })

export const backLink = style({
  color: 'rgba(12,12,12,0.45)',
  fontSize: '13px',
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '12px',
})

export const backLinkInline = style({
  color: 'rgba(12,12,12,0.45)',
  fontSize: '13px',
  textDecoration: 'none',
})

export const pageH1 = style({
  fontFamily: "'Archivo', system-ui, sans-serif",
  fontWeight: 800,
  fontSize: '20px',
  letterSpacing: '-0.03em',
  margin: 0,
})

export const pageH2 = style({
  fontFamily: "'Archivo', system-ui, sans-serif",
  fontWeight: 700,
  fontSize: '16px',
  letterSpacing: '-0.02em',
  marginBottom: '16px',
  marginTop: 0,
})

export const emptyNote = style({
  fontSize: '14px',
  color: 'rgba(12,12,12,0.45)',
})

export const selfNote = style({
  fontSize: '12px',
  color: 'rgba(12,12,12,0.4)',
})

// ── Info card / row ───────────────────────────────────────────────────────────

export const infoCard = style({
  border: '1px solid rgba(12,12,12,0.1)',
  backgroundColor: '#fff',
  marginBottom: '24px',
})

export const infoCardMb40 = style({
  border: '1px solid rgba(12,12,12,0.1)',
  backgroundColor: '#fff',
  marginBottom: '40px',
})

export const infoCardNoMb = style({
  border: '1px solid rgba(12,12,12,0.1)',
  backgroundColor: '#fff',
})

export const infoRow = style({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  gap: '16px',
  padding: '14px 20px',
  borderBottom: '1px solid rgba(12,12,12,0.06)',
  fontSize: '14px',
})

export const infoRowSm = style({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  gap: '16px',
  padding: '12px 20px',
  borderBottom: '1px solid rgba(12,12,12,0.06)',
  fontSize: '14px',
})

export const infoRowLabel = style({
  color: 'rgba(12,12,12,0.45)',
  fontWeight: 500,
  paddingTop: '1px',
})

export const infoRowLabelSm = style({
  color: 'rgba(12,12,12,0.45)',
  fontWeight: 500,
})

export const infoRowValue = style({
  color: '#0C0C0C',
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
})

export const infoRowValueBreak = style({
  color: '#0C0C0C',
  wordBreak: 'break-all',
})

// ── Color swatches ────────────────────────────────────────────────────────────

export const colorSwatchList = style({ display: 'flex', gap: '8px', flexWrap: 'wrap' })

export const colorSwatchItem = style({ display: 'flex', alignItems: 'center', gap: '6px' })

export const colorSwatchDot = style({
  width: '16px',
  height: '16px',
  borderRadius: '2px',
  border: '1px solid rgba(12,12,12,0.1)',
})

export const colorSwatchHex = style({ fontSize: '13px', fontFamily: 'monospace' })

// ── Contacts ──────────────────────────────────────────────────────────────────

export const contactsList = style({ display: 'flex', flexDirection: 'column', gap: '4px' })

export const contactsItem = style({ fontSize: '14px' })

export const contactType = style({
  color: 'rgba(12,12,12,0.45)',
  width: '90px',
  display: 'inline-block',
})

// ── Images ────────────────────────────────────────────────────────────────────

export const mainImageThumb = style({
  width: '120px',
  height: '120px',
  objectFit: 'cover',
  borderRadius: '2px',
  border: '1px solid rgba(12,12,12,0.1)',
  display: 'block',
})

export const imageThumbList = style({ display: 'flex', flexWrap: 'wrap', gap: '8px' })

export const imageThumb = style({
  width: '80px',
  height: '80px',
  objectFit: 'cover',
  borderRadius: '2px',
  border: '1px solid rgba(12,12,12,0.1)',
})

// ── Variant section ───────────────────────────────────────────────────────────

export const variantSectionMb = style({ marginBottom: '28px' })

export const variantSectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',
})

// ── Action panel ──────────────────────────────────────────────────────────────

export const actionPanel = style({ display: 'flex', gap: '8px', flexWrap: 'wrap' })

export const publishForm = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'flex-end',
  flexWrap: 'wrap',
})

export const publishLabel = style({
  display: 'block',
  fontSize: '12px',
  color: 'rgba(12,12,12,0.5)',
  marginBottom: '4px',
})

export const publishInput = style({
  padding: '8px 12px',
  border: '1px solid rgba(12,12,12,0.2)',
  fontSize: '14px',
  width: '160px',
  fontFamily: 'inherit',
})

export const statusNote = style({
  fontSize: '13px',
  color: 'rgba(12,12,12,0.45)',
  padding: '10px 0',
})

// ── Role management ───────────────────────────────────────────────────────────

export const roleMgmt = style({
  marginBottom: '32px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

// ── Buttons (large: 14px / 10px 20px) ────────────────────────────────────────

const _btnBase = {
  padding: '10px 20px',
  border: '1px solid',
  cursor: 'pointer' as const,
  fontSize: '14px',
  fontWeight: 500,
  fontFamily: 'inherit',
  borderRadius: '2px',
} as const

export const btnPrimary = style({ ..._btnBase, background: '#0C0C0C', color: '#fff', borderColor: '#0C0C0C' })
export const btnDanger  = style({ ..._btnBase, background: 'transparent', color: '#DC2626', borderColor: 'rgba(220,38,38,0.4)' })
export const btnSuccess = style({ ..._btnBase, background: '#065F46', color: '#fff', borderColor: '#065F46' })
export const btnReset   = style({ ..._btnBase, fontSize: '12px', padding: '6px 14px', color: 'rgba(12,12,12,0.55)', borderColor: 'rgba(12,12,12,0.2)', background: 'transparent' })

// ── Buttons (small: 13px / 8px 16px) ─────────────────────────────────────────

const _btnSmBase = {
  padding: '8px 16px',
  border: '1px solid',
  cursor: 'pointer' as const,
  fontSize: '13px',
  fontWeight: 500,
  fontFamily: 'inherit',
  borderRadius: '2px',
} as const

export const btnSmPrimary = style({ ..._btnSmBase, background: '#0C0C0C', color: '#fff', borderColor: '#0C0C0C' })
export const btnSmDanger  = style({ ..._btnSmBase, background: 'transparent', color: '#DC2626', borderColor: 'rgba(220,38,38,0.4)' })
export const btnSmGhost   = style({ ..._btnSmBase, background: 'transparent', color: 'rgba(12,12,12,0.5)', borderColor: 'rgba(12,12,12,0.15)' })
export const btnSmOutline = style({ ..._btnSmBase, background: 'transparent', color: '#0C0C0C', borderColor: 'rgba(12,12,12,0.3)' })
export const btnSmCancel  = style({ ..._btnSmBase, background: 'transparent', color: 'rgba(12,12,12,0.45)', borderColor: 'rgba(12,12,12,0.2)', whiteSpace: 'nowrap' })

// ── Status changer ────────────────────────────────────────────────────────────

export const statusChangerWrap = style({ display: 'flex', alignItems: 'center', gap: '8px' })

export const statusChangerLabel = style({
  fontSize: '11px',
  color: 'rgba(12,12,12,0.4)',
  letterSpacing: '0.04em',
})

export const statusSelect = style({
  padding: '5px 10px',
  border: '1px solid rgba(12,12,12,0.2)',
  fontSize: '13px',
  fontFamily: 'inherit',
  fontWeight: 500,
  color: '#0C0C0C',
  background: '#fff',
  cursor: 'pointer',
  outline: 'none',
})

export const statusSelectPending = style({
  padding: '5px 10px',
  border: '1px solid rgba(12,12,12,0.2)',
  fontSize: '13px',
  fontFamily: 'inherit',
  fontWeight: 500,
  color: '#0C0C0C',
  background: 'rgba(12,12,12,0.04)',
  cursor: 'wait',
  outline: 'none',
})

export const statusSaving = style({
  fontSize: '11px',
  color: 'rgba(12,12,12,0.4)',
})

// ── Info requester ────────────────────────────────────────────────────────────

export const infoRequesterPanel = style({
  padding: '14px 20px',
  background: '#FFF7ED',
  border: '1px solid rgba(234,88,12,0.2)',
  borderRadius: '2px',
  marginBottom: '16px',
})

export const infoRequesterPanelInner = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '12px',
})

export const infoRequesterMetaLabel = style({
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(12,12,12,0.4)',
  margin: '0 0 6px',
  fontWeight: 600,
})

export const infoRequesterTime = style({
  marginLeft: '8px',
  fontWeight: 400,
  letterSpacing: '0',
  textTransform: 'none',
})

export const infoRequesterMessage = style({
  fontSize: '14px',
  color: '#0C0C0C',
  margin: 0,
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
})

export const infoOpenPanel = style({
  border: '1px solid rgba(12,12,12,0.1)',
  borderRadius: '2px',
  padding: '16px',
  background: '#fff',
})

export const infoOpenNote = style({
  fontSize: '12px',
  color: 'rgba(12,12,12,0.45)',
  margin: '0 0 8px',
  fontWeight: 500,
})

export const infoTextarea = style({
  width: '100%',
  padding: '10px 12px',
  border: '1px solid rgba(12,12,12,0.15)',
  fontSize: '14px',
  fontFamily: 'inherit',
  resize: 'vertical',
  boxSizing: 'border-box',
  borderRadius: '2px',
  outline: 'none',
})

export const infoBtnRow = style({ display: 'flex', gap: '8px', marginTop: '10px' })

// ── Analytics ─────────────────────────────────────────────────────────────────

export const statGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  gap: '16px',
})

export const statCard = style({
  border: '1px solid rgba(12,12,12,0.1)',
  backgroundColor: '#fff',
  padding: '24px 20px',
})

export const statLabel = style({
  margin: '0 0 8px',
  fontSize: '12px',
  color: 'rgba(12,12,12,0.45)',
  fontWeight: 500,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
})

export const statValue = style({
  margin: '0 0 4px',
  fontSize: '36px',
  fontWeight: 800,
  fontFamily: "'Archivo', system-ui, sans-serif",
  letterSpacing: '-0.04em',
  color: '#0C0C0C',
  lineHeight: 1,
})

export const statDesc = style({
  margin: 0,
  fontSize: '12px',
  color: 'rgba(12,12,12,0.4)',
})

// ── Portfolios ────────────────────────────────────────────────────────────────

export const listCardMb = style({
  border: '1px solid rgba(12,12,12,0.1)',
  backgroundColor: '#fff',
  marginBottom: '40px',
})

export const listCard = style({
  border: '1px solid rgba(12,12,12,0.1)',
  backgroundColor: '#fff',
})

const _cellBase = {
  padding: '14px 16px',
  borderBottom: '1px solid rgba(12,12,12,0.06)',
  fontSize: '14px',
  color: '#0C0C0C',
  alignItems: 'center',
} as const

export const cellRow2 = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  ..._cellBase,
})

export const cellRow3 = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr auto',
  ..._cellBase,
})

export const cellName    = style({ fontWeight: 600 })
export const cellNameMed = style({ fontWeight: 500 })
export const cellDesc    = style({ color: 'rgba(12,12,12,0.45)', fontSize: '13px', marginLeft: '12px' })
export const cellMeta    = style({ color: 'rgba(12,12,12,0.45)', fontSize: '13px' })
