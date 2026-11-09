import { useContent } from '../store/content'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

export default function About() {
  const { agency } = useContent()

  return (
    <section className="section section--page">
      <div className="container">
        <SectionHeading eyebrow="The studio" title={`About ${agency.name}`} />

        <div className="about-grid">
          <Reveal className="about-intro">
            <p className="about-intro__lead">{agency.tagline}</p>
            <p className="about-intro__text">{agency.about}</p>
            <div className="about-facts">
              <div>
                <span className="about-facts__label">Founded</span>
                <span className="about-facts__value">{agency.founded}</span>
              </div>
              <div>
                <span className="about-facts__label">Based in</span>
                <span className="about-facts__value">{agency.location}</span>
              </div>
              <div>
                <span className="about-facts__label">Availability</span>
                <span className="about-facts__value">{agency.availability}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="about-skills">
            <h3 className="about-skills__title">What we do</h3>
            {agency.services.map((service) => (
              <div key={service.title} className="about-skills__group">
                <span className="about-skills__group-name">{service.title}</span>
                <p className="about-skills__desc">{service.description}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="timeline-section">
          <h2 className="timeline-section__title">The team</h2>
          <div className="team-grid">
            {agency.team.map((member, i) => (
              <Reveal key={member.name} delay={i * 70} className="team-card">
                <div className="team-card__avatar" aria-hidden="true">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <span className="team-card__name">{member.name}</span>
                <span className="team-card__role">{member.role}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
