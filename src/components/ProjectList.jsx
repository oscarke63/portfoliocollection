import { useEffect, useMemo, useRef, useState } from 'react'
import { setQuery } from '../hooks/useHashRoute'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'

/**
 * Reusable project list with category filter + search.
 * Filter state is read from / written to the URL query so it survives
 * navigation and is shareable. Used by both the landing page and /projects.
 */
export default function ProjectList({ projects, query = {} }) {
  const active = query.category || 'All'
  const urlSearch = query.q || ''

  // Local input state so typing stays instant; the URL updates are debounced.
  const [input, setInput] = useState(urlSearch)
  const [syncedFrom, setSyncedFrom] = useState(urlSearch)
  const debounced = useDebouncedValue(input, 200)
  const searchRef = useRef(null)

  // If the URL value changes externally (back/forward, clear), reset the input.
  // Adjusting state during render is the React-recommended pattern here.
  if (urlSearch !== syncedFrom) {
    setSyncedFrom(urlSearch)
    setInput(urlSearch)
  }

  // Push the debounced value into the URL.
  useEffect(() => {
    if (debounced !== urlSearch) {
      setQuery({ q: debounced || null })
    }
  }, [debounced, urlSearch])

  // Keyboard shortcut: "/" or Ctrl/Cmd+K focuses the search box.
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
      if ((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault()
        searchRef.current?.focus()
        searchRef.current?.select()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const published = useMemo(() => projects.filter((p) => p.published), [projects])

  const categories = useMemo(
    () => ['All', ...new Set(published.map((p) => p.category))],
    [published],
  )

  const filtered = useMemo(() => {
    const q = urlSearch.trim().toLowerCase()
    return published.filter((p) => {
      const matchesCategory = active === 'All' || p.category === active
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.services.some((s) => s.toLowerCase().includes(q)) ||
        p.highlights.some((h) => h.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [published, active, urlSearch])

  const setCategory = (cat) => setQuery({ category: cat === 'All' ? null : cat })
  const clearAll = () => {
    setInput('')
    setQuery({ category: null, q: null })
  }

  const hasFilters = active !== 'All' || urlSearch.trim() !== ''
  const highlightTerm = urlSearch.trim()

  return (
    <div className="project-list">
      <div className="projects-toolbar">
        <div className="filter-chips" role="tablist" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              className={`chip ${active === cat ? 'is-active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="search-box">
          <span className="search-box__icon" aria-hidden="true">⌕</span>
          <input
            ref={searchRef}
            type="search"
            placeholder="Search projects…  ( / )"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Search projects"
          />
          {input && (
            <button
              type="button"
              className="search-box__clear"
              onClick={() => { setInput(''); setQuery({ q: null }) }}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="results-bar">
        <p className="results-count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          {active !== 'All' && <span className="results-count__tag"> in {active}</span>}
          {highlightTerm && <span className="results-count__tag"> matching “{highlightTerm}”</span>}
        </p>
        {hasFilters && (
          <button type="button" className="results-clear" onClick={clearAll}>
            Clear filters
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="project-grid">
          {filtered.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i, 6) * 60}>
              <ProjectCard project={project} highlight={highlightTerm} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-state__icon" aria-hidden="true">⌕</span>
          <p>
            No projects match
            {highlightTerm && <> “<strong>{highlightTerm}</strong>”</>}
            {active !== 'All' && <> in {active}</>}.
          </p>
          <p className="empty-state__hint">Try a different keyword or category.</p>
          <button type="button" className="btn btn--ghost" onClick={clearAll}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
