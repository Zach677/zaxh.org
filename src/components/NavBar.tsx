import { Link } from 'react-router'

import { Logo } from './Logo'

export const NavBar = () => {
  return (
    <nav className="nav">
      <Link className="wordmark" to="/">
        <Logo />
      </Link>
      <div className="links">
        <Link className="ink-link" to="/">
          index
        </Link>
        <Link className="ink-link" to="/page/about">
          about
        </Link>
        <Link className="ink-link" to="/page/friends">
          friends
        </Link>
      </div>
    </nav>
  )
}
