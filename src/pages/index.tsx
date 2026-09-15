import * as stylex from '@stylexjs/stylex'
import { Link } from 'react-router'

import { ConstellationMap } from '@/components/constellation'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { type IconType, Icon } from '@/components/Icon'
import { colors, fonts, typeScale } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'
import { featuredProjects } from '../../data/projects'
import { NOW_STATUS } from '../../data/now-status'
import me from '../../data/me.json'

const styles = stylex.create({
  shell: {
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: '1.5rem',
    paddingBlock: '2rem',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '32rem',
  },
  mark: {
    fontFamily: fonts.logoLatin,
    fontStyle: 'italic',
    fontWeight: 500,
    fontSize: typeScale.copy16,
    lineHeight: typeScale.copy16Lh,
    color: colors.heading,
    margin: 0,
  },
  lede: {
    margin: '0.7rem 0 0',
    maxWidth: '24rem',
    fontSize: typeScale.copy15,
    lineHeight: typeScale.copy15Lh,
    color: colors.body,
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.45rem',
    marginTop: '0.85rem',
    fontFamily: fonts.mono,
    fontSize: typeScale.caption10,
    letterSpacing: '0.04em',
    color: colors.secondary,
  },
  social: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    marginTop: '0.95rem',
  },
  socialLink: {
    position: 'relative',
    color: {
      default: colors.secondary,
      ':hover': colors.heading,
    },
    display: 'inline-flex',
    transition: 'color 0.25s var(--ease), transform 0.25s var(--ease-spring)',
    transform: {
      default: null,
      ':hover': 'translateY(-2px) rotate(-4deg)',
    },
    borderRadius: '2px',
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.accent}`,
    },
    outlineOffset: {
      default: null,
      ':focus-visible': '3px',
    },
    '::after': {
      content: {
        default: null,
        '@media (pointer: coarse)': '""',
      },
      position: 'absolute',
      inset: '-10px',
      display: {
        default: 'none',
        '@media (pointer: coarse)': 'block',
      },
    },
  },
  plate: {
    width: '100%',
    height: '18rem',
    position: 'relative',
    marginTop: '1.35rem',
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    marginTop: '1.5rem',
    paddingTop: '1.1rem',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.separatorSoft,
  },
  pages: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.35rem 1.15rem',
  },
  pageLink: {
    fontFamily: fonts.mono,
    fontSize: typeScale.label12,
    letterSpacing: '0.04em',
    color: colors.body,
  },
})

export default function RootPage() {
  const featured = featuredProjects()

  return (
    <div {...stylex.props(styles.shell)}>
      <main {...stylex.props(styles.card)}>
        <h1 {...stylex.props(styles.mark)}>zaxh</h1>
        <p {...stylex.props(styles.lede)}>
          Writes code so the cat and dog can have a better life.
        </p>
        <p {...stylex.props(styles.status)}>
          <span className="cx-now-dot" aria-hidden="true" />
          <span>{NOW_STATUS}</span>
        </p>
        <div {...stylex.props(styles.social)}>
          {me.links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              aria-label={link.title}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={
                link.url.startsWith('http') ? 'noopener noreferrer' : undefined
              }
              {...stylex.props(styles.socialLink)}
            >
              <Icon icon={link.icon as unknown as IconType} size="17px" />
            </a>
          ))}
        </div>
        <div {...stylex.props(styles.plate)}>
          <ConstellationMap
            projects={featured}
            mode="featured"
            showArc={false}
            mobileFallback={false}
            showLegend={false}
          />
        </div>
        <div {...stylex.props(styles.bar)}>
          <nav {...stylex.props(styles.pages)} aria-label="Pages">
            <Link {...stylex.props(shared.inkLink, styles.pageLink)} to="/projects">
              projects
            </Link>
            <Link {...stylex.props(shared.inkLink, styles.pageLink)} to="/about">
              about
            </Link>
          </nav>
          <ThemeSwitcher />
        </div>
      </main>
    </div>
  )
}
