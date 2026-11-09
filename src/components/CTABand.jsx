import { navigate } from '../hooks/useHashRoute'

export default function CTABand() {
  return (
    <section className="section">
      <div className="container cta-band">
        <div>
          <h2 className="cta-band__title">Have a project in mind?</h2>
          <p className="cta-band__text">
            We take on a handful of engagements at a time. Tell us what you're building.
          </p>
        </div>
        <a
          href="#/contact"
          className="btn btn--primary"
          onClick={(e) => { e.preventDefault(); navigate('/contact') }}
        >
          Start a conversation
        </a>
      </div>
    </section>
  )
}
