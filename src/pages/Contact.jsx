import { useEffect, useRef, useState } from 'react'
import { useContent } from '../store/content'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const initialForm = { name: '', email: '', company: '', budget: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'That email address looks invalid.'
  }
  if (!values.message.trim()) {
    errors.message = 'Please tell us about your project.'
  } else if (values.message.trim().length < 10) {
    errors.message = 'A little more detail, please (10+ characters).'
  }
  return errors
}

export default function Contact() {
  const { agency } = useContent()
  const [values, setValues] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const timerRef = useRef(null)

  // Clear any pending submission timer on unmount to avoid setting state
  // on an unmounted component.
  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')
    // Simulated submission. Swap for a real endpoint (fetch/POST) when ready.
    timerRef.current = window.setTimeout(() => {
      setStatus('sent')
      setValues(initialForm)
    }, 900)
  }

  return (
    <section className="section section--page">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's make something"
          description="Tell us about your project, timeline, and budget. We reply within a day."
        />

        <div className="contact-grid">
          <Reveal className="contact-info">
            <h3 className="contact-info__title">Reach the studio</h3>
            <a href={`mailto:${agency.email}`} className="contact-info__email">
              {agency.email}
            </a>
            <p className="contact-info__location">{agency.phone}</p>
            <p className="contact-info__location">{agency.location}</p>
            <ul className="contact-info__socials">
              {agency.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    <span className="contact-info__social-label">{s.label}</span>
                    <span className="contact-info__social-handle">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="contact-form-wrap">
            {status === 'sent' ? (
              <div className="form-success" role="status">
                <span className="form-success__icon" aria-hidden="true">✓</span>
                <h3>Message sent</h3>
                <p>Thanks for reaching out — we'll get back to you soon.</p>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => setStatus('idle')}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      className={errors.name ? 'has-error' : ''}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && <span className="field__error" id="name-error">{errors.name}</span>}
                  </div>

                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      className={errors.email ? 'has-error' : ''}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && <span className="field__error" id="email-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={values.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="budget">Budget</label>
                    <select id="budget" name="budget" value={values.budget} onChange={handleChange}>
                      <option value="">Select a range</option>
                      <option value="<10k">Under $10k</option>
                      <option value="10-25k">$10k – $25k</option>
                      <option value="25-50k">$25k – $50k</option>
                      <option value="50k+">$50k+</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="message">Project details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={handleChange}
                    className={errors.message ? 'has-error' : ''}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && <span className="field__error" id="message-error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn--primary btn--block" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
