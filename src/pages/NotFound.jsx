import { navigate } from '../hooks/useHashRoute'

export default function NotFound() {
  return (
    <section className="section section--page">
      <div className="container empty-state">
        <span className="empty-state__code">404</span>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a
          href="#/"
          className="btn btn--primary"
          onClick={(e) => { e.preventDefault(); navigate('/') }}
        >
          Back home
        </a>
      </div>
    </section>
  )
}
