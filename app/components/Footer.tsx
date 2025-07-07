import { socialLinks } from '../data/social'
import { ThemeToggle } from './ThemeToggle'
import { Icon } from './Icon'

export const Footer = () => {
  return (
    <footer className="mt-4">
      <div className="max-w-3xl mx-auto px-6 py-4">
        <div className="flex flex-col items-start space-y-3">
          <p className="text-body-sm text-gray-500 dark:text-gray-400">
            © 2025 Zach
          </p>
          <div className="flex items-center justify-between w-full">
            <div className="flex space-x-6">
              {socialLinks.map((link) => {
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    title={link.name}
                  >
                    <Icon icon={link.icon} className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
