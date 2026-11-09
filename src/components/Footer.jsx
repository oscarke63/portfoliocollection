import { navigate } from '../hooks/useHashRoute'
import { useContent } from '../store/content'

export default function Footer() {
  const { agency } = useContent()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__name">{agency.name}</span>
          <p className="footer__tag">{agency.tagline}</p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <a href="#/" onClick={(e) => { e.preventDefault(); navigate('/') }}>Home</a>
          <a href="#/projects" onClick={(e) => { e.preventDefault(); navigate('/projects') }}>Work</a>
          <a href="#/about" onClick={(e) => { e.preventDefault(); navigate('/about') }}>Studio</a>
          <a href="#/resources" onClick={(e) => { e.preventDefault(); navigate('/resources') }}>Resources</a>
          <a href="#/contact" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>Contact</a>
          <a href="#/studio" onClick={(e) => { e.preventDefault(); navigate('/studio') }}>Studio Admin</a>
        </nav>

        <ul className="footer__socials">
          {agency.socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer__base">
        <span>© {year} {agency.name}. All rights reserved.</span>
        <span>{agency.location}</span>
      </div>
    </footer>
  )
}
