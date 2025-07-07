import { Link } from 'react-router'

export const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
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
            <Link
              to="/posts"
              className="px-4 py-2 text-body-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Posts
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 text-body-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
