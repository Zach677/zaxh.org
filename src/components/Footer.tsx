import { type IconType, Icon } from '@/components/Icon'
import me from '@/../data/me.json'
import { ThemeSwitcher } from './ThemeSwitcher'

function SocialLinks() {
  return (
    <div className="social">
      {me.links.map((link) => (
        <a
          key={link.title}
          href={link.url}
          aria-label={link.title}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon={link.icon as unknown as IconType} size="16px" />
        </a>
      ))}
    </div>
  )
}

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="col">
        <span className="reg-label">© {year} Zach</span>
        <div className="mt-3">
          <SocialLinks />
        </div>
      </div>
      <div className="col">
        <ThemeSwitcher />
      </div>
    </footer>
  )
}
