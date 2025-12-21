import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Icon } from './Icon'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      // Show when scrolled 10% or more
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight)

      const isVisible = scrollPercentage > 0.1 && scrollTop > 200

      setVisible(isVisible)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={clsx('back-to-top', visible && 'visible')}
      aria-label="Back to top"
    >
      <span className="sr-only">Back to top</span>
      <Icon icon="arrow-up" className="w-5 h-5" />
    </button>
  )
}
