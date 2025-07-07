import { Link } from 'react-router'

export const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
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
          <div className="flex items-center space-x-6">
            <Link to="/posts" className="nav-link">
              Posts
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
