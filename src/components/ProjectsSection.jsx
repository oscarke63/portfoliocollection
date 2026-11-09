import { navigate } from '../hooks/useHashRoute'
import ProjectList from './ProjectList'

export default function ProjectsSection({ projects, query }) {
  const publishedCount = projects.filter((p) => p.published).length

  return (
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
  )
}
