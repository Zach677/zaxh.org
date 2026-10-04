import * as stylex from '@stylexjs/stylex'
import { colors, typeScale } from '../design-system/tokens.stylex'

export interface InventoryItem {
  what: string
  retired?: boolean
  note?: string
}

const styles = stylex.create({
  section: {
    marginTop: '3rem',
  },
  title: {
    margin: 0,
    fontSize: typeScale.copy15,
    lineHeight: typeScale.copy15Lh,
    fontWeight: 500,
    color: colors.heading,
  },
  grid: {
    listStyle: 'none',
    margin: '0.75rem 0 0',
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(13rem, 1fr))',
    gap: '0.35rem 2rem',
    fontSize: typeScale.copy15,
    lineHeight: typeScale.copy15Lh,
  },
  what: {
    color: colors.body,
  },
  retired: {
    textDecoration: 'line-through',
    color: colors.secondary,
  },
  note: {
    marginLeft: '0.6rem',
    fontStyle: 'italic',
    fontSize: typeScale.copy13,
    color: colors.secondary,
  },
})

export function Inventory({ items }: { items: InventoryItem[] }) {
  return (
    <section {...stylex.props(styles.section)} aria-labelledby="devices">
      <h3 id="devices" {...stylex.props(styles.title)}>
        Devices
      </h3>
      {/* role="list": Safari drops list semantics when list-style is none. */}
      <ul {...stylex.props(styles.grid)} role="list">
        {items.map((item) => (
          <li key={item.what}>
            <span
              {...stylex.props(styles.what, item.retired && styles.retired)}
            >
              {item.what}
            </span>
            {item.note ? (
              <span {...stylex.props(styles.note)}>{item.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
