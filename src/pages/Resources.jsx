import { useContent } from '../store/content'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

export default function Resources() {
  const { agency } = useContent()
  const toolGroups = agency.toolGroups || []
  const resources = agency.resources || []

  return (
    <section className="section section--page">
      <div className="container">
        <SectionHeading
          eyebrow="Tools & Resources"
          title="What we use, what we share"
          description="The tools behind our work, and free resources we've built to help teams do better work."
        />

        {toolGroups.length > 0 && (
          <div className="tool-groups">
            {toolGroups.map((group, gi) => (
              <Reveal key={group.group} delay={gi * 70} className="tool-group">
                <h3 className="tool-group__title">{group.group}</h3>
                <ul className="tool-list">
                  {group.tools.map((tool) => (
                    <li key={tool.name} className="tool-item">
                      <span className="tool-item__name">{tool.name}</span>
                      <span className="tool-item__desc">{tool.description}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        )}

        {resources.length > 0 && (
          <div className="resources-section">
            <h2 className="resources-section__title">Free resources</h2>
            <div className="resource-grid">
              {resources.map((res, i) => (
                <Reveal key={res.title} delay={i * 60} className="resource-card">
                  <span className="resource-card__type">{res.type}</span>
                  <h3 className="resource-card__title">{res.title}</h3>
                  <p className="resource-card__desc">{res.description}</p>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="resource-card__link"
                  >
                    Get it <span aria-hidden="true">↗</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
