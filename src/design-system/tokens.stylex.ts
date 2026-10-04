/**
 * Yohaku-aligned StyleX tokens for zaxh.org.
 * Color values resolve through CSS custom properties in theme.css so
 * data-theme light / dark / system keeps working without StyleX themes.
 */
import * as stylex from '@stylexjs/stylex'

export const colors = stylex.defineVars({
  paper: 'var(--color-paper)',
  surface: 'var(--color-neutral-2)',
  fill: 'var(--color-neutral-3)',
  strongFill: 'var(--color-neutral-4)',
  border: 'var(--color-border)',
  borderSolid: 'var(--color-neutral-5)',
  icon: 'var(--color-neutral-6)',
  secondary: 'var(--color-neutral-7)',
  bodyAlt: 'var(--color-neutral-8)',
  body: 'var(--color-neutral-9)',
  heading: 'var(--color-neutral-10)',
  accent: 'var(--color-accent)',
  accentSoft: 'var(--color-accent-soft)',
  info: 'var(--color-info)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  inkWash: 'var(--color-ink-wash)',
  separator: 'var(--color-separator)',
  separatorSoft: 'var(--color-separator-soft)',
  codePlate: 'var(--color-code-plate)',
  codeInk: 'var(--color-code-ink)',
  codeMuted: 'var(--color-code-muted)',
})

export const fonts = stylex.defineVars({
  sans: 'var(--font-sans)',
  serif: 'var(--font-serif)',
  mono: 'var(--font-mono)',
})

/** Type roles — size + line-height bundled (Yohaku role+px). */
export const typeScale = stylex.defineVars({
  caption10: '10px',
  caption10Lh: '1.4',
  label12: '12px',
  label12Lh: '1.5',
  copy13: '13px',
  copy13Lh: '1.54',
  copy14: '14px',
  copy14Lh: '1.57',
  copy15: '15px',
  copy15Lh: '1.6',
  copy16: '16px',
  copy16Lh: '1.625',
  title20: '20px',
  title20Lh: '1.4',
  title24: '24px',
  title24Lh: '1.33',
  title28: '28px',
  title28Lh: '1.29',
  display36: '36px',
  display36Lh: '1.22',
  display48: '48px',
  display48Lh: '1.17',
  iconSm: '14px',
  iconMd: '16px',
  iconLg: '18px',
})

export const motion = stylex.defineVars({
  ease: 'var(--ease)',
  easeSpring: 'var(--ease-spring)',
  easeOutCubic: 'var(--ease-out-cubic)',
})
