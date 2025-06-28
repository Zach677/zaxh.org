import { Link } from 'react-router'
import { useEffect, useState } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-50/90 dark:bg-gray-950/90 backdrop-blur-md transition-all duration-500 ease-out border-b ${
        isScrolled
          ? 'border-gray-200/50 dark:border-gray-800/50'
          : 'border-transparent'
      }`}
    >
      <div className="max-w-3xl mx-auto px-6 py-4">
        <nav className="flex items-center relative">
          <span className="text-h4 text-gray-900 dark:text-white">Zach_</span>
          <div className="flex space-x-6 absolute right-0">
            <Link
              to="/"
              className="text-body text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-body text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
            >
              About
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
