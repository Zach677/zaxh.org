import { Link } from 'react-router'
import { LiquidNav, LiquidButton } from './LiquidGlass'

export const Header = () => {
  return (
    <LiquidNav className="border-b border-white/10 dark:border-white/5">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-h4 text-gray-900 dark:text-white font-bold hover:scale-105 transition-transform duration-300"
          >
            Zach_
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link to="/posts">
              <LiquidButton variant="ghost" size="sm">
                Posts
              </LiquidButton>
            </Link>
            <Link to="/about">
              <LiquidButton variant="ghost" size="sm">
                About
              </LiquidButton>
            </Link>
          </div>
        </div>
      </div>
    </LiquidNav>
  )
}
