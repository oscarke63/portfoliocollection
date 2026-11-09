import { navigate } from '../hooks/useHashRoute'
import { useContent } from '../store/content'
import ProjectList from '../components/ProjectList'
import Reveal from '../components/Reveal'

export default function Home({ query = {} }) {
  const { agency, projects } = useContent()
  const publishedCount = projects.filter((p) => p.published).length

  return (
    <>
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

      <section className="section section--projects" id="work">
        <div className="container">
          <div className="projects-head">
            <div>
              <span className="section-heading__eyebrow">Selected work</span>
              <h2 className="projects-head__title">Projects</h2>
            </div>
            <div className="projects-head__actions">
              <p className="projects-head__count">
                {publishedCount} {publishedCount === 1 ? 'project' : 'projects'}
              </p>
              <a
                href="#/add"
                className="btn btn--primary btn--sm"
                onClick={(e) => { e.preventDefault(); navigate('/add') }}
              >
                + Add project
              </a>
            </div>
          </div>

          <ProjectList projects={projects} query={query} />
        </div>
      </section>

      <section className="section">
        <div className="container cta-band">
          <div>
            <h2 className="cta-band__title">Have a project in mind?</h2>
            <p className="cta-band__text">
              We take on a handful of engagements at a time. Tell us what you're building.
            </p>
          </div>
          <a
            href="#/contact"
            className="btn btn--primary"
            onClick={(e) => { e.preventDefault(); navigate('/contact') }}
          >
            Start a conversation
          </a>
        </div>
      </section>
    </>
  )
}
