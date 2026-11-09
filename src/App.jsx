import { useHashRoute } from './hooks/useHashRoute'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Resources from './pages/Resources'
import AddProject from './pages/AddProject'
import NotFound from './pages/NotFound'
import Studio from './pages/studio/Studio'

function renderRoute(path, query) {
  if (path === '/') return <Home query={query} />
  if (path === '/projects') return <Projects query={query} />
  if (path.startsWith('/projects/')) {
    const id = path.slice('/projects/'.length)
    return <ProjectDetail id={id} />
  }
  if (path === '/about') return <About />
  if (path === '/resources') return <Resources />
  if (path === '/contact') return <Contact />
  if (path === '/add') return <AddProject />
  return <NotFound />
}

export default function App() {
  const { path, query } = useHashRoute()

  // The studio is a full-screen tool, so it renders without the public chrome.
  if (path === '/studio') {
    return <Studio />
  }

  return (
    <Layout currentPath={path}>
      {renderRoute(path, query)}
    </Layout>
  )
}
