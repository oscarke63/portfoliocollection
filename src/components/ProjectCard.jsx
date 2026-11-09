import { navigate } from '../hooks/useHashRoute'
import { highlightParts } from '../utils/highlight'

function Highlight({ text, term }) {
  if (!term) return text
  return highlightParts(text, term).map((part, i) =>
    part.match ? <mark key={i} className="hl">{part.text}</mark> : <span key={i}>{part.text}</span>,
  )
}

export default function ProjectCard({ project, highlight = '' }) {
  const open = (e) => {
    e.preventDefault()
    navigate(`/projects/${project.id}`)
  }

  return (
    <article className="project-card">
      <a
        href={`#/projects/${project.id}`}
        onClick={open}
        className="project-card__link"
        aria-label={`View project: ${project.title}`}
      >
        <div
          className="project-card__cover"
          style={{ '--cover': project.cover }}
          aria-hidden="true"
        >
          <span className="project-card__cover-mark">{project.title.charAt(0)}</span>
          {project.featured && <span className="project-card__featured">Featured</span>}
        </div>
        <div className="project-card__body">
          <div className="project-card__top">
            <span className="project-card__category">{project.category}</span>
            <span className="project-card__year">{project.year}</span>
          </div>
          <h3 className="project-card__title">
            <Highlight text={project.title} term={highlight} />
          </h3>
          <p className="project-card__tagline">
            <Highlight text={project.tagline} term={highlight} />
          </p>
          <ul className="project-card__stack">
            {project.services.slice(0, 3).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <span className="project-card__cta">
            View project
            <span className="project-card__arrow" aria-hidden="true">→</span>
          </span>
        </div>
      </a>
    </article>
  )
}
