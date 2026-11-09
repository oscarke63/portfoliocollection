import { navigate } from '../hooks/useHashRoute'
import { useContent } from '../store/content'
import Reveal from '../components/Reveal'
import ReadingProgress from '../components/ReadingProgress'

export default function ProjectDetail({ id }) {
  const { projects } = useContent()
  const published = projects.filter((p) => p.published)
  const index = published.findIndex((p) => p.id === id)
  const project = index >= 0 ? published[index] : null

  if (!project) {
    return (
      <section className="section section--page">
        <div className="container empty-state">
          <h1>Project not found</h1>
          <p>This project doesn't exist or isn't published yet.</p>
          <a
            href="#/projects"
            className="btn btn--primary"
            onClick={(e) => { e.preventDefault(); navigate('/projects') }}
          >
            Back to work
          </a>
        </div>
      </section>
    )
  }

  const prev = index > 0 ? published[index - 1] : null
  const next = index < published.length - 1 ? published[index + 1] : null

  // Related: same category first, then fill with other published work.
  const sameCategory = published.filter(
    (p) => p.id !== project.id && p.category === project.category,
  )
  const others = published.filter(
    (p) => p.id !== project.id && p.category !== project.category,
  )
  const related = [...sameCategory, ...others].slice(0, 3)

  return (
    <>
      <ReadingProgress />
      <article className="section section--page">
        <div className="container detail">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="#/projects" onClick={(e) => { e.preventDefault(); navigate('/projects') }}>
              Work
            </a>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <span className="breadcrumb__current">{project.category}</span>
          </nav>

          <Reveal>
            <div
              className="detail__cover"
              style={{ '--cover': project.cover }}
              aria-hidden="true"
            >
              <span className="detail__cover-mark">{project.title.charAt(0)}</span>
            </div>
          </Reveal>

          <Reveal>
            <header className="detail__header">
              <span className="project-card__category">{project.category}</span>
              <h1 className="detail__title">{project.title}</h1>
              <p className="detail__tagline">{project.tagline}</p>
              <div className="detail__meta">
                <div>
                  <span className="detail__meta-label">Client</span>
                  <span className="detail__meta-value">{project.client || '—'}</span>
                </div>
                <div>
                  <span className="detail__meta-label">Year</span>
                  <span className="detail__meta-value">{project.year}</span>
                </div>
                <div>
                  <span className="detail__meta-label">Services</span>
                  <span className="detail__meta-value">{project.services.join(' · ') || '—'}</span>
                </div>
              </div>
              <div className="detail__actions">
                {project.links.live && (
                  <a href={project.links.live} target="_blank" rel="noreferrer" className="btn btn--primary">
                    View live ↗
                  </a>
                )}
                {project.links.caseStudy && (
                  <a href={project.links.caseStudy} target="_blank" rel="noreferrer" className="btn btn--ghost">
                    Read case study ↗
                  </a>
                )}
              </div>
            </header>
          </Reveal>

          <Reveal delay={80}>
            <section className="detail__section">
              <h2>Overview</h2>
              <p className="detail__body">{project.description}</p>
            </section>
          </Reveal>

          {project.highlights.length > 0 && (
            <Reveal delay={120}>
              <section className="detail__section">
                <h2>Highlights</h2>
                <ul className="detail__highlights">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          {project.services.length > 0 && (
            <Reveal delay={160}>
              <section className="detail__section">
                <h2>Services</h2>
                <ul className="detail__stack">
                  {project.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          {(prev || next) && (
            <nav className="project-nav" aria-label="Project navigation">
              {prev ? (
                <a
                  href={`#/projects/${prev.id}`}
                  className="project-nav__link project-nav__link--prev"
                  onClick={(e) => { e.preventDefault(); navigate(`/projects/${prev.id}`) }}
                >
                  <span className="project-nav__label">← Previous</span>
                  <span className="project-nav__title">{prev.title}</span>
                </a>
              ) : (
                <span />
              )}
              {next ? (
                <a
                  href={`#/projects/${next.id}`}
                  className="project-nav__link project-nav__link--next"
                  onClick={(e) => { e.preventDefault(); navigate(`/projects/${next.id}`) }}
                >
                  <span className="project-nav__label">Next →</span>
                  <span className="project-nav__title">{next.title}</span>
                </a>
              ) : (
                <span />
              )}
            </nav>
          )}

          {related.length > 0 && (
            <section className="detail__section">
              <h2>More work</h2>
              <div className="related-grid">
                {related.map((p) => (
                  <a
                    key={p.id}
                    href={`#/projects/${p.id}`}
                    className="related-card"
                    onClick={(e) => { e.preventDefault(); navigate(`/projects/${p.id}`) }}
                  >
                    <span
                      className="related-card__cover"
                      style={{ '--cover': p.cover }}
                      aria-hidden="true"
                    />
                    <span className="related-card__body">
                      <span className="related-card__title">{p.title}</span>
                      <span className="related-card__tagline">{p.tagline}</span>
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  )
}
