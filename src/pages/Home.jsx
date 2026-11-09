import { useContent } from '../store/content'
import HeroSection from '../components/HeroSection'
import ProjectsSection from '../components/ProjectsSection'
import CTABand from '../components/CTABand'

export default function Home({ query = {} }) {
  const { agency, projects } = useContent()

  return (
    <>
      <HeroSection agency={agency} />
      <ProjectsSection projects={projects} query={query} />
      <CTABand />
    </>
  )
}
