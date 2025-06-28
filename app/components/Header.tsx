import { Link } from 'react-router'

export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Zach's Blog
          </Link>
          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              首页
            </Link>
            <Link
              to="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              关于
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
