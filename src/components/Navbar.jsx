import { useEffect, useState } from 'react'
import { navigate } from '../hooks/useHashRoute'
import { useTheme } from '../context/theme'
import { useContent } from '../store/content'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'Studio' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar({ currentPath }) {
  const { theme, toggleTheme } = useTheme()
  const { agency } = useContent()
  const [openOnPath, setOpenOnPath] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const open = openOnPath === currentPath

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenu = () => setOpenOnPath(open ? null : currentPath)

  const go = (to) => (e) => {
    e.preventDefault()
    navigate(to)
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#/" className="navbar__brand" onClick={go('/')}>
          <span className="navbar__mark">{agency.initials}</span>
          <span className="navbar__name">{agency.name}</span>
        </a>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.to}
              href={`#${link.to}`}
              onClick={go(link.to)}
              className={`navbar__link ${currentPath === link.to ? 'is-active' : ''}`}
              aria-current={currentPath === link.to ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <a
            href="#/studio"
            className="navbar__studio"
            onClick={go('/studio')}
            title="Open the content studio"
          >
            Studio
          </a>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button
            type="button"
            className="icon-btn navbar__burger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}
