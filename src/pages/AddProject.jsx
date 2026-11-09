import { useState } from 'react'
import { navigate } from '../hooks/useHashRoute'
import { useContent } from '../store/content'
import ProjectEditor from './studio/ProjectEditor'
import SectionHeading from '../components/SectionHeading'

export default function AddProject() {
  const { addProject } = useContent()
  const [created, setCreated] = useState(null)

  const handleSave = (draft) => {
    // New projects added from the public form are published by default so
    // they appear on the landing page immediately.
    addProject({ ...draft, published: true })
    setCreated(draft.title)
    // Give the store a tick to commit, then jump to the project list.
    window.setTimeout(() => {
      navigate('/projects')
    }, 900)
  }

  return (
    <section className="section section--page">
      <div className="container add-page">
        <SectionHeading
          eyebrow="New project"
          title="Add a project"
          description="Fill in the details below. Your project will appear on the site as soon as you create it."
        />

        {created ? (
          <div className="form-success" role="status">
            <span className="form-success__icon" aria-hidden="true">✓</span>
            <h3>“{created}” added</h3>
            <p>Taking you to the project list…</p>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => navigate('/projects')}
            >
              View projects
            </button>
          </div>
        ) : (
          <ProjectEditor
            project={null}
            onSave={handleSave}
            onCancel={() => navigate('/')}
          />
        )}
      </div>
    </section>
  )
}
