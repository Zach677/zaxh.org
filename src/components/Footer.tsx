import * as stylex from '@stylexjs/stylex'
import { colors } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'
import { ThemeSwitcher } from './ThemeSwitcher'

const styles = stylex.create({
  footer: {
    marginTop: '4rem',
    paddingTop: '1.5rem',
    paddingBottom: '3rem',
    display: 'flex',
    alignItems: 'center',
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
})

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer {...stylex.props(styles.footer)}>
      <div>
        <span {...stylex.props(shared.regLabel, styles.label)}>
          © {year} Zach
        </span>
      </div>
      <div>
        <ThemeSwitcher />
      </div>
    </footer>
  )
}
