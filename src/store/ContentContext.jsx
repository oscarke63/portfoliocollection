import { useCallback, useEffect, useMemo, useState } from 'react'
import { seedContent } from './seed'
import { ContentContext, slugify } from './content'

const STORAGE_KEY = 'northlight-content-v1'

function loadContent() {
  if (typeof window === 'undefined') return seedContent
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedContent
    const parsed = JSON.parse(raw)
    // Basic shape guard so a corrupt payload can't crash the app.
    if (!parsed || !parsed.agency || !Array.isArray(parsed.projects)) {
      return seedContent
    }
    return parsed
  } catch {
    return seedContent
  }
}

function uniqueId(base, projects, ignoreId) {
  const root = slugify(base) || 'project'
  let id = root
  let n = 2
  while (projects.some((p) => p.id === id && p.id !== ignoreId)) {
    id = `${root}-${n++}`
  }
  return id
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(loadContent)

  // Persist on every change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    } catch {
      /* storage full or unavailable — keep working in memory */
    }
  }, [content])

  const updateAgency = useCallback((patch) => {
    setContent((c) => ({ ...c, agency: { ...c.agency, ...patch } }))
  }, [])

  const addProject = useCallback((draft) => {
    setContent((c) => {
      const id = uniqueId(draft.title || 'untitled', c.projects)
      const project = normalizeProject({ ...draft, id })
      return { ...c, projects: [project, ...c.projects] }
    })
  }, [])

  const updateProject = useCallback((id, patch) => {
    setContent((c) => ({
      ...c,
      projects: c.projects.map((p) =>
        p.id === id ? normalizeProject({ ...p, ...patch, id: p.id }) : p,
      ),
    }))
  }, [])

  const deleteProject = useCallback((id) => {
    setContent((c) => ({ ...c, projects: c.projects.filter((p) => p.id !== id) }))
  }, [])

  const duplicateProject = useCallback((id) => {
    setContent((c) => {
      const source = c.projects.find((p) => p.id === id)
      if (!source) return c
      const copy = normalizeProject({
        ...source,
        id: uniqueId(`${source.title}-copy`, c.projects),
        title: `${source.title} (copy)`,
        published: false,
      })
      const index = c.projects.findIndex((p) => p.id === id)
      const next = [...c.projects]
      next.splice(index + 1, 0, copy)
      return { ...c, projects: next }
    })
  }, [])

  const reorderProject = useCallback((id, direction) => {
    setContent((c) => {
      const index = c.projects.findIndex((p) => p.id === id)
      if (index === -1) return c
      const target = direction === 'up' ? index - 1 : index + 1
      if (target < 0 || target >= c.projects.length) return c
      const next = [...c.projects]
      ;[next[index], next[target]] = [next[target], next[index]]
      return { ...c, projects: next }
    })
  }, [])

  const togglePublished = useCallback((id) => {
    setContent((c) => ({
      ...c,
      projects: c.projects.map((p) =>
        p.id === id ? { ...p, published: !p.published } : p,
      ),
    }))
  }, [])

  const toggleFeatured = useCallback((id) => {
    setContent((c) => ({
      ...c,
      projects: c.projects.map((p) =>
        p.id === id ? { ...p, featured: !p.featured } : p,
      ),
    }))
  }, [])

  const importContent = useCallback((json) => {
    const parsed = typeof json === 'string' ? JSON.parse(json) : json
    if (!parsed || !parsed.agency || !Array.isArray(parsed.projects)) {
      throw new Error('Invalid content file: expected { agency, projects }.')
    }
    setContent({
      agency: { ...seedContent.agency, ...parsed.agency },
      projects: parsed.projects.map(normalizeProject),
    })
  }, [])

  const resetContent = useCallback(() => {
    setContent(seedContent)
  }, [])

  const exportContent = useCallback(() => {
    return JSON.stringify(content, null, 2)
  }, [content])

  const value = useMemo(
    () => ({
      agency: content.agency,
      projects: content.projects,
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
    }),
    [
      content,
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
    ],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

/** Fills in any missing fields so the UI never has to guard against undefined. */
function normalizeProject(p) {
  return {
    id: p.id,
    title: p.title?.trim() || 'Untitled project',
    client: p.client?.trim() || '',
    tagline: p.tagline?.trim() || '',
    description: p.description?.trim() || '',
    category: p.category?.trim() || 'Uncategorized',
    year: Number(p.year) || new Date().getFullYear(),
    services: Array.isArray(p.services) ? p.services.filter(Boolean) : [],
    cover: p.cover || '#5b4bff',
    featured: Boolean(p.featured),
    published: p.published !== false,
    links: {
      live: p.links?.live || null,
      caseStudy: p.links?.caseStudy || null,
    },
    highlights: Array.isArray(p.highlights) ? p.highlights.filter(Boolean) : [],
  }
}
