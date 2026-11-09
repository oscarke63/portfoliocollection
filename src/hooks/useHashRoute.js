import { useEffect, useState } from 'react'

/**
 * Minimal hash-based router. Keeps the SPA dependency-free while still
 * supporting deep links, back/forward, query params, and scroll restoration.
 *
 * A hash looks like: #/projects?category=Brand%20Identity&q=lumen
 */
export function useHashRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash))

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parse(window.location.hash))
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}

function parse(hash) {
  const raw = hash.replace(/^#/, '')
  const [pathPart, queryPart = ''] = raw.split('?')
  const path = normalizePath(pathPart)
  const query = Object.fromEntries(new URLSearchParams(queryPart))
  return { path, query }
}

function normalizePath(raw) {
  if (!raw || raw === '/') return '/'
  return raw.startsWith('/') ? raw : `/${raw}`
}

export function navigate(to) {
  const target = to.startsWith('/') ? to : `/${to}`
  if (window.location.hash === `#${target}`) return
  window.location.hash = target
}

/**
 * Updates the query string of the current route without adding a history
 * entry (replace) so filter changes don't pollute the back button.
 */
export function setQuery(updates) {
  const raw = window.location.hash.replace(/^#/, '')
  const [pathPart, queryPart = ''] = raw.split('?')
  const params = new URLSearchParams(queryPart)
  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
  })
  const qs = params.toString()
  const next = `#${normalizePath(pathPart)}${qs ? `?${qs}` : ''}`
  if (window.location.hash !== next) {
    window.history.replaceState(null, '', next)
    // Manually notify listeners since replaceState doesn't fire hashchange.
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }
}
