import { useState } from 'react'


function ProjectForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    
    if (title.trim() === '') {
      return
    }

    onAdd({ title, description, category })

    
    setTitle('')
    setDescription('')
    setCategory('')
  }

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h2>Add a Project</h2>

      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project title"
      />

      <label>Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Short description"
      />

      <label>Category</label>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="e.g. Web Design"
      />

      <button type="submit" className="submit-button">
        Add Project
      </button>
    </form>
  )
}

export default ProjectForm
