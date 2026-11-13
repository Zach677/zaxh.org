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
  page: 'var(--color-page)',
  cloth: 'var(--color-cloth)',
  foil: 'var(--color-foil)',
  band: 'var(--color-band)',
  bandInk: 'var(--color-band-ink)',
  gutter: 'var(--color-gutter)',
  info: 'var(--color-info)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  inkWash: 'var(--color-ink-wash)',
  separator: 'var(--color-separator)',
  separatorSoft: 'var(--color-separator-soft)',
})

export const fonts = stylex.defineVars({
  sans: 'var(--font-sans)',
  serif: 'var(--font-serif)',
  mono: 'var(--font-mono)',
})
