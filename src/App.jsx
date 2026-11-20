import { useState } from 'react'
import './App.css'
import { initialProjects } from './projects'
import ProjectCard from './components/ProjectCard'
import ProjectForm from './components/ProjectForm'

function App() {
  
  const [projects, setProjects] = useState(initialProjects)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)

  
  function addProject(newProject) {
    const project = {
      id: Date.now(),
      ...newProject,
    }
    setProjects([project, ...projects])
    setShowForm(false)
  }

  
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="app">
      <header className="header">
        <h1>My Portfolio</h1>
        <p>A collection of my recent projects</p>
      </header>

      <div className="controls">
        <input
          type="text"
          className="search"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="add-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Project'}
        </button>
      </div>

      {showForm && <ProjectForm onAdd={addProject} />}

      <div className="project-list">
        {filteredProjects.length === 0 ? (
          <p className="empty">No projects found.</p>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  )
}

export default App
