import { renderHook, act } from '@testing-library/react'
import { ContentProvider } from './ContentContext'
import { useContent } from './content'

const wrapper = ({ children }) => <ContentProvider>{children}</ContentProvider>

function renderStore() {
  return renderHook(() => useContent(), { wrapper })
}

beforeEach(() => {
  window.localStorage.clear()
})

describe('ContentProvider', () => {
  it('boots from seed content when storage is empty', () => {
    const { result } = renderStore()
    expect(result.current.agency.name).toBe('Northlight Studio')
    expect(result.current.projects.length).toBeGreaterThan(0)
  })

  it('adds a project at the top of the list', () => {
    const { result } = renderStore()
    const before = result.current.projects.length

    act(() => {
      result.current.addProject({ title: 'New Thing', category: 'Digital Product' })
    })

    expect(result.current.projects.length).toBe(before + 1)
    expect(result.current.projects[0].title).toBe('New Thing')
    expect(result.current.projects[0].id).toBe('new-thing')
  })

  it('generates a unique id when titles collide', () => {
    const { result } = renderStore()

    act(() => {
      result.current.addProject({ title: 'Duplicate' })
    })
    act(() => {
      result.current.addProject({ title: 'Duplicate' })
    })

    const ids = result.current.projects
      .filter((p) => p.title === 'Duplicate')
      .map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('updates an existing project', () => {
    const { result } = renderStore()
    const id = result.current.projects[0].id

    act(() => {
      result.current.updateProject(id, { title: 'Renamed' })
    })

    expect(result.current.projects.find((p) => p.id === id).title).toBe('Renamed')
  })

  it('deletes a project', () => {
    const { result } = renderStore()
    const id = result.current.projects[0].id
    const before = result.current.projects.length

    act(() => {
      result.current.deleteProject(id)
    })

    expect(result.current.projects.length).toBe(before - 1)
    expect(result.current.projects.find((p) => p.id === id)).toBeUndefined()
  })

  it('toggles published state', () => {
    const { result } = renderStore()
    const project = result.current.projects[0]
    const initial = project.published

    act(() => {
      result.current.togglePublished(project.id)
    })

    expect(result.current.projects[0].published).toBe(!initial)
  })

  it('updates agency settings', () => {
    const { result } = renderStore()

    act(() => {
      result.current.updateAgency({ name: 'Renamed Studio' })
    })

    expect(result.current.agency.name).toBe('Renamed Studio')
  })

  it('persists content to localStorage', () => {
    const { result } = renderStore()

    act(() => {
      result.current.addProject({ title: 'Persisted Project' })
    })

    const raw = window.localStorage.getItem('northlight-content-v1')
    expect(raw).toBeTruthy()
    expect(JSON.parse(raw).projects[0].title).toBe('Persisted Project')
  })

  it('exports content as parseable JSON', () => {
    const { result } = renderStore()
    const json = result.current.exportContent()
    const parsed = JSON.parse(json)
    expect(parsed.agency).toBeDefined()
    expect(Array.isArray(parsed.projects)).toBe(true)
  })

  it('throws on invalid import payload', () => {
    const { result } = renderStore()
    expect(() => result.current.importContent('{"nope":true}')).toThrow()
  })
})
