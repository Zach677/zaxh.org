import { Link } from 'react-router'
import { useEffect, useState } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'border-b border-gray-200/30 dark:border-gray-800/30' : ''
      }`}
    >
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
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              About
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
