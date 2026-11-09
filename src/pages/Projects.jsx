import { useContent } from '../store/content'
import ProjectList from '../components/ProjectList'
import SectionHeading from '../components/SectionHeading'

export default function Projects({ query = {} }) {
  const { projects } = useContent()

  return (
    <section className="section section--page">
      <div className="container">
        <SectionHeading
          eyebrow="Portfolio"
          title="Our work"
          description="Filter by discipline or search by name, client, and service."
        />
        <ProjectList projects={projects} query={query} />
      </div>
    </section>
  )
}
