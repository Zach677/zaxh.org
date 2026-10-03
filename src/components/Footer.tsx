import * as stylex from '@stylexjs/stylex'
import { colors } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'
import { SocialLinks } from './SocialLinks'
import { ThemeSwitcher } from './ThemeSwitcher'

const styles = stylex.create({
  footer: {
    marginTop: '4rem',
    paddingTop: '1.5rem',
    paddingBottom: '3rem',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '1rem',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.separatorSoft,
    flexWrap: 'wrap',
  },
  label: {
    display: 'block',
    lineHeight: 1.9,
  },
  social: {
    marginTop: '0.75rem',
  },
})

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer {...stylex.props(styles.footer)}>
      <div>
        <span {...stylex.props(shared.regLabel, styles.label)}>
          © {year} Zach
        </span>
        <SocialLinks style={styles.social} />
      </div>
      <div>
        <ThemeSwitcher />
      </div>
    </footer>
  )
}
