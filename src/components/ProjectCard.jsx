
function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <span className="project-category">{project.category}</span>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </div>
  )
}

export default ProjectCard
