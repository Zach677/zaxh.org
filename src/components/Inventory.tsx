import clsx from 'clsx'

export interface InventoryItem {
  what: string
  retired?: boolean
  note?: string
}

export function Inventory({ items }: { items: InventoryItem[] }) {
  return (
    <section className="inventory">
      <span className="reg-label">Device inventory</span>
      <div className="inventory-grid">
        {items.map((item) => (
          <div className="inv-item" key={item.what}>
            <span className={clsx('what', item.retired && 'retired')}>
              {item.what}
            </span>
            {item.note ? <span className="note">{item.note}</span> : null}
            <span className="dot" />
          </div>
        ))}
      </div>
    </section>
  )
}
