import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useHashRoute } from '../hooks/useHashRoute'
import ProjectList from './ProjectList'

const projects = [
  {
    id: 'lumen',
    title: 'Lumen Festival',
    client: 'Lumen Arts',
    tagline: 'A light festival identity',
    description: 'Generative brand system.',
    category: 'Brand Identity',
    year: 2024,
    services: ['Brand Identity'],
    cover: '#5b4bff',
    featured: true,
    published: true,
    links: { live: null, caseStudy: null },
    highlights: [],
  },
  {
    id: 'verdant',
    title: 'Verdant',
    client: 'Verdant Foods',
    tagline: 'Plant-based grocer',
    description: 'Headless commerce platform.',
    category: 'Digital Product',
    year: 2024,
    services: ['Digital Product'],
    cover: '#16a34a',
    featured: false,
    published: true,
    links: { live: null, caseStudy: null },
    highlights: [],
  },
  {
    id: 'draft',
    title: 'Secret Draft',
    client: 'Hidden',
    tagline: 'Not published',
    description: 'Should not appear.',
    category: 'Digital Product',
    year: 2024,
    services: [],
    cover: '#000000',
    featured: false,
    published: false,
    links: { live: null, caseStudy: null },
    highlights: [],
  },
]

// Harness that mirrors how App wires the router into ProjectList, so
// interactions that write to the URL (setQuery) re-render with new query.
function Harness() {
  const { query } = useHashRoute()
  return <ProjectList projects={projects} query={query} />
}

beforeEach(() => {
  window.location.hash = ''
})

describe('ProjectList', () => {
  it('renders only published projects', () => {
    render(<Harness />)
    expect(screen.getByText('Lumen Festival')).toBeInTheDocument()
    expect(screen.getByText('Verdant')).toBeInTheDocument()
    expect(screen.queryByText('Secret Draft')).not.toBeInTheDocument()
  })

  it('shows a live count of visible projects', () => {
    render(<Harness />)
    expect(screen.getByText(/2 projects/i)).toBeInTheDocument()
  })

  it('filters by category chip', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.click(screen.getByRole('tab', { name: 'Brand Identity' }))

    await waitFor(() => {
      expect(screen.queryByText('Verdant')).not.toBeInTheDocument()
    })
    expect(screen.getByText('Lumen Festival')).toBeInTheDocument()
  })

  it('filters by search term across fields', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const search = screen.getByRole('searchbox', { name: /search projects/i })
    await user.type(search, 'verdant')

    await waitFor(() => {
      expect(screen.queryByText('Lumen Festival')).not.toBeInTheDocument()
    })
    expect(screen.getByText('Verdant')).toBeInTheDocument()
  })

  it('shows an empty state when nothing matches', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const search = screen.getByRole('searchbox', { name: /search projects/i })
    await user.type(search, 'zzzznomatch')

    expect(await screen.findByText(/no projects match/i)).toBeInTheDocument()
  })

  it('highlights the matched term in results', () => {
    render(<ProjectList projects={projects} query={{ q: 'lumen' }} />)
    const marks = document.querySelectorAll('mark.hl')
    expect(marks.length).toBeGreaterThan(0)
    expect(within(marks[0]).getByText(/lumen/i)).toBeInTheDocument()
  })
})
