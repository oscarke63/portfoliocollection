import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from './BackToTop'

export default function Layout({ currentPath, children }) {
  return (
    <div className="app-shell">
      <Navbar currentPath={currentPath} />
      <main className="app-main" id="main">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
