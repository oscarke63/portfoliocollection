import { navigate } from '../hooks/useHashRoute'
import Reveal from './Reveal'

export default function HeroSection({ agency }) {
  return (
    <section className="hero-section hero-section--compact">
      <div className="hero-section__glow" aria-hidden="true" />
      <div className="container hero-section__inner">
        <Reveal>
          <span className="pill">
            <span className="pill__dot" /> {agency.availability}
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="hero-section__title">
            {agency.name}
            <span className="hero-section__title-accent">.</span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="hero-section__role">{agency.tagline}</p>
        </Reveal>
        <Reveal delay={200}>
          <p className="hero-section__bio">{agency.intro}</p>
        </Reveal>
        <Reveal delay={260}>
          <div className="hero-section__actions">
            <a
              href="#/contact"
              className="btn btn--primary"
              onClick={(e) => { e.preventDefault(); navigate('/contact') }}
            >
              Start a project
            </a>
            <a
              href="#/about"
              className="btn btn--ghost"
              onClick={(e) => { e.preventDefault(); navigate('/about') }}
            >
              About the studio
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
