import { useRef, useState } from 'react'
import { navigate } from '../../hooks/useHashRoute'
import { useContent } from '../../store/content'
import ProjectEditor from './ProjectEditor'
import AgencyEditor from './AgencyEditor'

export default function Studio() {
  const {
    agency,
    projects,
    updateAgency,
    addProject,
    updateProject,
    deleteProject,
    duplicateProject,
    reorderProject,
    togglePublished,
    toggleFeatured,
    importContent,
    resetContent,
    exportContent,
  } = useContent()

  const [tab, setTab] = useState('projects')
  const [editing, setEditing] = useState(null) // null | 'new' | project object
  const [notice, setNotice] = useState('')
  const fileRef = useRef(null)

  const flash = (msg) => {
    setNotice(msg)
    window.setTimeout(() => setNotice(''), 2500)
  }

  const handleSave = (draft) => {
    if (editing === 'new') {
      addProject(draft)
      flash('Project created.')
    } else {
      updateProject(editing.id, draft)
      flash('Project updated.')
    }
    setEditing(null)
  }

  const handleDelete = (project) => {
    if (window.confirm(`Delete "${project.title}"? This can't be undone.`)) {
      deleteProject(project.id)
      flash('Project deleted.')
    }
  }

  const handleExport = () => {
    const blob = new Blob([exportContent()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `northlight-content-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    flash('Content exported.')
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        importContent(reader.result)
        flash('Content imported.')
      } catch (err) {
        flash(`Import failed: ${err.message}`)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleReset = () => {
    if (window.confirm('Reset all content to the original seed data? This overwrites your edits.')) {
      resetContent()
      flash('Content reset to defaults.')
    }
  }

  const publishedCount = projects.filter((p) => p.published).length

  return (
    <div className="studio">
      <header className="studio__topbar">
        <div className="studio__brand">
          <span className="navbar__mark">{agency.initials}</span>
          <div>
            <span className="studio__brand-name">{agency.name}</span>
            <span className="studio__brand-sub">Content Studio</span>
          </div>
        </div>
        <div className="studio__topbar-actions">
          <a
            href="#/"
            className="btn btn--ghost btn--sm"
            onClick={(e) => { e.preventDefault(); navigate('/') }}
          >
            View site ↗
          </a>
        </div>
      </header>

      <div className="studio__body">
        <nav className="studio__tabs" aria-label="Studio sections">
          <button
            type="button"
            className={`studio__tab ${tab === 'projects' ? 'is-active' : ''}`}
            onClick={() => { setTab('projects'); setEditing(null) }}
          >
            Projects <span className="studio__tab-count">{projects.length}</span>
          </button>
          <button
            type="button"
            className={`studio__tab ${tab === 'agency' ? 'is-active' : ''}`}
            onClick={() => { setTab('agency'); setEditing(null) }}
          >
            Agency
          </button>
          <button
            type="button"
            className={`studio__tab ${tab === 'data' ? 'is-active' : ''}`}
            onClick={() => { setTab('data'); setEditing(null) }}
          >
            Data
          </button>
        </nav>

        <div className="studio__content">
          {notice && <div className="studio__notice" role="status">{notice}</div>}

          {tab === 'projects' && (
            editing ? (
              <ProjectEditor
                project={editing === 'new' ? null : editing}
                onSave={handleSave}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <div className="studio__panel">
                <div className="studio__panel-head">
                  <div>
                    <h2 className="editor__title">Projects</h2>
                    <p className="studio__panel-sub">
                      {publishedCount} published · {projects.length - publishedCount} draft
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={() => setEditing('new')}
                  >
                    + New project
                  </button>
                </div>

                {projects.length === 0 ? (
                  <div className="empty-state">
                    <p>No projects yet. Create your first one.</p>
                    <button type="button" className="btn btn--primary" onClick={() => setEditing('new')}>
                      + New project
                    </button>
                  </div>
                ) : (
                  <ul className="admin-list">
                    {projects.map((project, index) => (
                      <li key={project.id} className="admin-row">
                        <span
                          className="admin-row__cover"
                          style={{ '--cover': project.cover }}
                          aria-hidden="true"
                        />
                        <div className="admin-row__main">
                          <div className="admin-row__title-line">
                            <span className="admin-row__title">{project.title}</span>
                            {project.featured && <span className="badge badge--accent">Featured</span>}
                            <span className={`badge ${project.published ? 'badge--live' : 'badge--draft'}`}>
                              {project.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <span className="admin-row__meta">
                            {project.category} · {project.year} · {project.client || 'No client'}
                          </span>
                        </div>
                        <div className="admin-row__actions">
                          <button
                            type="button"
                            className="mini-btn"
                            onClick={() => reorderProject(project.id, 'up')}
                            disabled={index === 0}
                            aria-label="Move up"
                            title="Move up"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            className="mini-btn"
                            onClick={() => reorderProject(project.id, 'down')}
                            disabled={index === projects.length - 1}
                            aria-label="Move down"
                            title="Move down"
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            className="mini-btn"
                            onClick={() => togglePublished(project.id)}
                            title={project.published ? 'Unpublish' : 'Publish'}
                          >
                            {project.published ? 'Unpublish' : 'Publish'}
                          </button>
                          <button
                            type="button"
                            className="mini-btn"
                            onClick={() => toggleFeatured(project.id)}
                            title={project.featured ? 'Unfeature' : 'Feature'}
                          >
                            {project.featured ? 'Unfeature' : 'Feature'}
                          </button>
                          <button
                            type="button"
                            className="mini-btn"
                            onClick={() => duplicateProject(project.id)}
                            title="Duplicate"
                          >
                            Duplicate
                          </button>
                          <button
                            type="button"
                            className="mini-btn mini-btn--primary"
                            onClick={() => setEditing(project)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="mini-btn mini-btn--danger"
                            onClick={() => handleDelete(project)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          )}

          {tab === 'agency' && (
            <AgencyEditor agency={agency} onSave={(draft) => { updateAgency(draft); flash('Agency settings saved.') }} />
          )}

          {tab === 'data' && (
            <div className="studio__panel">
              <div className="studio__panel-head">
                <div>
                  <h2 className="editor__title">Data</h2>
                  <p className="studio__panel-sub">
                    Back up, restore, or reset your content. Everything is stored in this browser.
                  </p>
                </div>
              </div>

              <div className="data-actions">
                <div className="data-card">
                  <h3>Export</h3>
                  <p>Download all content as a JSON file for backup or migration.</p>
                  <button type="button" className="btn btn--ghost btn--sm" onClick={handleExport}>
                    Download JSON
                  </button>
                </div>

                <div className="data-card">
                  <h3>Import</h3>
                  <p>Restore content from a previously exported JSON file.</p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="application/json"
                    onChange={handleImport}
                    hidden
                  />
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => fileRef.current?.click()}
                  >
                    Choose file
                  </button>
                </div>

                <div className="data-card data-card--danger">
                  <h3>Reset</h3>
                  <p>Restore the original seed content. This overwrites all edits.</p>
                  <button type="button" className="btn btn--danger btn--sm" onClick={handleReset}>
                    Reset to defaults
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
