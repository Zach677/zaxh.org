import * as stylex from '@stylexjs/stylex'

import { Inventory } from '@/components/Inventory'
import { type IconType, Icon } from '@/components/Icon'
import me from '@/../data/me.json'
import { colors, fonts, typeScale } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'

const styles = stylex.create({
  main: {
    maxWidth: '42rem',
  },
  hello: {
    margin: '1.25rem 0 1.5rem',
  },
  accent: {
    color: colors.accent,
  },
  body: {
    maxWidth: '36rem',
    fontSize: typeScale.copy15,
    lineHeight: 1.9,
    color: colors.body,
  },
  p: {
    margin: '0 0 1.5rem',
  },
  pullquote: {
    margin: '2.5rem 0',
    padding: '0 0 0 1.5rem',
    borderLeftWidth: '2px',
    borderLeftStyle: 'solid',
    borderLeftColor: colors.accent,
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontSize: typeScale.title20,
    lineHeight: 1.55,
    color: colors.heading,
  },
  who: {
    display: 'block',
    marginTop: '0.6rem',
    fontFamily: fonts.mono,
    fontStyle: 'normal',
    fontSize: typeScale.caption10,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: colors.secondary,
  },
  section: {
    marginTop: '3.5rem',
  },
  sectionTitle: {
    marginBottom: '0.75rem',
  },
  contact: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem 1.5rem',
    marginTop: '0.75rem',
  },
  contactLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: typeScale.copy15,
    color: {
      default: colors.body,
      ':hover': colors.heading,
    },
    transition: 'color 0.25s var(--ease)',
  },
})

export default function AboutPage() {
  return (
    <main {...stylex.props(styles.main)}>
      <h1 {...stylex.props(shared.pageTitle, styles.hello)}>
        Hey, I&apos;m <span {...stylex.props(styles.accent)}>Zach</span>.
      </h1>

      <div {...stylex.props(styles.body)}>
        <p {...stylex.props(styles.p)}>
          A software engineer who writes code so my cat and dog can have a
          better life.
        </p>
        <p {...stylex.props(styles.p)}>
          I&apos;m passionate about building elegant and efficient software. I
          believe in clean code, simple design, and the power of open-source.
        </p>
        <blockquote {...stylex.props(styles.pullquote)}>
          &ldquo;Simplicity is the ultimate sophistication.&rdquo;
          <span {...stylex.props(styles.who)}>— Leonardo da Vinci</span>
        </blockquote>
        <p {...stylex.props(styles.p)}>
          I spend most of my time writing code, exploring new technologies, and
          shipping small tools.
        </p>
      </div>

      <section {...stylex.props(styles.section)}>
        <span {...stylex.props(shared.regLabel, styles.sectionTitle)}>
          Contact / social
        </span>
        <div {...stylex.props(styles.contact)}>
          {me.links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={
                link.url.startsWith('http') ? 'noopener noreferrer' : undefined
              }
              {...stylex.props(shared.inkLink, styles.contactLink)}
            >
              <Icon icon={link.icon as unknown as IconType} size="14px" />
              {link.title}
            </a>
          ))}
        </div>
      </section>

      <Inventory
        items={[
          { what: 'iPhone 16 Pro Max' },
          { what: 'iPhone 12', retired: true },
          { what: 'MacBook Pro 2023' },
          { what: 'Apple Watch Series 4' },
          { what: 'iPad Pro 11" (2022)' },
          { what: 'AirPods Pro 2', retired: true, note: 'lost… fuck!' },
          { what: 'EarPods' },
          { what: 'Nuphy Node 75' },
          { what: 'FL980' },
          { what: 'Kzzi K75' },
          { what: 'Redmi A27U Type-C 2026' },
        ]}
      />
    </main>
  )
}
