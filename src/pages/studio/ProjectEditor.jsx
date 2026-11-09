import { useState } from 'react'

const emptyDraft = {
  title: '',
  client: '',
  tagline: '',
  description: '',
  category: 'Brand Identity',
  year: new Date().getFullYear(),
  services: [],
  cover: '#5b4bff',
  featured: false,
  published: false,
  links: { live: '', caseStudy: '' },
  highlights: [],
}

const COVER_SWATCHES = [
  '#5b4bff', '#16a34a', '#0ea5e9', '#a855f7',
  '#f43f5e', '#f59e0b', '#14b8a6', '#64748b',
]

const SERVICE_OPTIONS = [
  'Brand Identity',
  'Digital Product',
  'Web Design & Build',
  'Strategy & Research',
  'Motion',
]

export default function ProjectEditor({ project, onSave, onCancel }) {
  const [draft, setDraft] = useState(() => ({
    ...emptyDraft,
    ...project,
    links: { ...emptyDraft.links, ...(project?.links || {}) },
    services: project?.services || [],
    highlights: project?.highlights || [],
  }))
  const [highlightInput, setHighlightInput] = useState('')
  const [error, setError] = useState('')

  const set = (key, value) => setDraft((d) => ({ ...d, [key]: value }))
  const setLink = (key, value) =>
    setDraft((d) => ({ ...d, links: { ...d.links, [key]: value } }))

  const toggleService = (service) => {
    setDraft((d) => ({
      ...d,
      services: d.services.includes(service)
        ? d.services.filter((s) => s !== service)
        : [...d.services, service],
    }))
  }

  const addHighlight = () => {
    const value = highlightInput.trim()
    if (!value) return
    setDraft((d) => ({ ...d, highlights: [...d.highlights, value] }))
    setHighlightInput('')
  }

  const removeHighlight = (index) => {
    setDraft((d) => ({ ...d, highlights: d.highlights.filter((_, i) => i !== index) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!draft.title.trim()) {
      setError('A project title is required.')
      return
    }
    setError('')
    onSave({
      ...draft,
      year: Number(draft.year) || new Date().getFullYear(),
      links: {
        live: draft.links.live?.trim() || null,
        caseStudy: draft.links.caseStudy?.trim() || null,
      },
    })
  }

  return (
    <form className="editor" onSubmit={handleSubmit}>
      <div className="editor__head">
        <h2 className="editor__title">{project ? 'Edit project' : 'New project'}</h2>
        <div className="editor__head-actions">
          <button type="button" className="btn btn--ghost btn--sm" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary btn--sm">
            {project ? 'Save changes' : 'Create project'}
          </button>
        </div>
      </div>

      {error && <p className="editor__error">{error}</p>}

      <div className="editor__grid">
        <div className="field">
          <label htmlFor="p-title">Title *</label>
          <input
            id="p-title"
            value={draft.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="Project name"
          />
        </div>

        <div className="field">
          <label htmlFor="p-client">Client</label>
          <input
            id="p-client"
            value={draft.client}
            onChange={(e) => set('client', e.target.value)}
            placeholder="Client name"
          />
        </div>

        <div className="field">
          <label htmlFor="p-category">Category</label>
          <input
            id="p-category"
            value={draft.category}
            onChange={(e) => set('category', e.target.value)}
            placeholder="e.g. Brand Identity"
          />
        </div>

        <div className="field">
          <label htmlFor="p-year">Year</label>
          <input
            id="p-year"
            type="number"
            value={draft.year}
            onChange={(e) => set('year', e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="p-tagline">Tagline</label>
        <input
          id="p-tagline"
          value={draft.tagline}
          onChange={(e) => set('tagline', e.target.value)}
          placeholder="One-line summary shown on cards"
        />
      </div>

      <div className="field">
        <label htmlFor="p-description">Description</label>
        <textarea
          id="p-description"
          rows={4}
          value={draft.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Full project overview for the case study page"
        />
      </div>

      <div className="field">
        <label>Services</label>
        <div className="chip-select">
          {SERVICE_OPTIONS.map((service) => (
            <button
              key={service}
              type="button"
              className={`chip chip--sm ${draft.services.includes(service) ? 'is-active' : ''}`}
              onClick={() => toggleService(service)}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Cover color</label>
        <div className="swatches">
          {COVER_SWATCHES.map((color) => (
            <button
              key={color}
              type="button"
              className={`swatch ${draft.cover === color ? 'is-active' : ''}`}
              style={{ '--swatch': color }}
              onClick={() => set('cover', color)}
              aria-label={`Cover color ${color}`}
            />
          ))}
          <input
            type="color"
            className="swatch swatch--picker"
            value={draft.cover}
            onChange={(e) => set('cover', e.target.value)}
            aria-label="Custom cover color"
          />
        </div>
      </div>

      <div className="editor__grid">
        <div className="field">
          <label htmlFor="p-live">Live URL</label>
          <input
            id="p-live"
            value={draft.links.live || ''}
            onChange={(e) => setLink('live', e.target.value)}
            placeholder="https://…"
          />
        </div>
        <div className="field">
          <label htmlFor="p-case">Case study URL</label>
          <input
            id="p-case"
            value={draft.links.caseStudy || ''}
            onChange={(e) => setLink('caseStudy', e.target.value)}
            placeholder="https://…"
          />
        </div>
      </div>

      <div className="field">
        <label>Highlights</label>
        <div className="highlight-add">
          <input
            value={highlightInput}
            onChange={(e) => setHighlightInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addHighlight()
              }
            }}
            placeholder="Add a result or highlight, press Enter"
          />
          <button type="button" className="btn btn--ghost btn--sm" onClick={addHighlight}>
            Add
          </button>
        </div>
        {draft.highlights.length > 0 && (
          <ul className="highlight-list">
            {draft.highlights.map((h, i) => (
              <li key={`${h}-${i}`}>
                <span>{h}</span>
                <button
                  type="button"
                  className="highlight-list__remove"
                  onClick={() => removeHighlight(i)}
                  aria-label="Remove highlight"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="editor__toggles">
        <label className="toggle">
          <input
            type="checkbox"
            checked={draft.published}
            onChange={(e) => set('published', e.target.checked)}
          />
          <span>Published (visible on the public site)</span>
        </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={draft.featured}
            onChange={(e) => set('featured', e.target.checked)}
          />
          <span>Featured (shown on the homepage)</span>
        </label>
      </div>
    </form>
  )
}
