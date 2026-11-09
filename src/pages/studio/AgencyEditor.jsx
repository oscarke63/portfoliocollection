import { useState } from 'react'

export default function AgencyEditor({ agency, onSave }) {
  const [draft, setDraft] = useState(agency)
  const [saved, setSaved] = useState(false)

  const set = (key, value) => {
    setDraft((d) => ({ ...d, [key]: value }))
    setSaved(false)
  }

  const setStat = (index, key, value) => {
    setDraft((d) => {
      const stats = d.stats.map((s, i) => (i === index ? { ...s, [key]: value } : s))
      return { ...d, stats }
    })
    setSaved(false)
  }

  const setService = (index, key, value) => {
    setDraft((d) => {
      const services = d.services.map((s, i) => (i === index ? { ...s, [key]: value } : s))
      return { ...d, services }
    })
    setSaved(false)
  }

  const setTeam = (index, key, value) => {
    setDraft((d) => {
      const team = d.team.map((m, i) => (i === index ? { ...m, [key]: value } : m))
      return { ...d, team }
    })
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(draft)
    setSaved(true)
  }

  return (
    <form className="editor" onSubmit={handleSubmit}>
      <div className="editor__head">
        <h2 className="editor__title">Agency settings</h2>
        <div className="editor__head-actions">
          {saved && <span className="editor__saved">Saved ✓</span>}
          <button type="submit" className="btn btn--primary btn--sm">Save settings</button>
        </div>
      </div>

      <div className="editor__grid">
        <div className="field">
          <label htmlFor="a-name">Agency name</label>
          <input id="a-name" value={draft.name} onChange={(e) => set('name', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="a-initials">Logo initials</label>
          <input id="a-initials" value={draft.initials} onChange={(e) => set('initials', e.target.value)} maxLength={3} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="a-tagline">Tagline</label>
        <input id="a-tagline" value={draft.tagline} onChange={(e) => set('tagline', e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="a-intro">Intro (hero)</label>
        <textarea id="a-intro" rows={3} value={draft.intro} onChange={(e) => set('intro', e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="a-about">About (studio page)</label>
        <textarea id="a-about" rows={4} value={draft.about} onChange={(e) => set('about', e.target.value)} />
      </div>

      <div className="editor__grid">
        <div className="field">
          <label htmlFor="a-email">Email</label>
          <input id="a-email" value={draft.email} onChange={(e) => set('email', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="a-phone">Phone</label>
          <input id="a-phone" value={draft.phone} onChange={(e) => set('phone', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="a-location">Location</label>
          <input id="a-location" value={draft.location} onChange={(e) => set('location', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="a-availability">Availability</label>
          <input id="a-availability" value={draft.availability} onChange={(e) => set('availability', e.target.value)} />
        </div>
      </div>

      <div className="field">
        <label>Stats</label>
        <div className="repeat-grid">
          {draft.stats.map((stat, i) => (
            <div key={i} className="repeat-row">
              <input
                value={stat.value}
                onChange={(e) => setStat(i, 'value', e.target.value)}
                placeholder="Value"
                aria-label={`Stat ${i + 1} value`}
              />
              <input
                value={stat.label}
                onChange={(e) => setStat(i, 'label', e.target.value)}
                placeholder="Label"
                aria-label={`Stat ${i + 1} label`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Services</label>
        <div className="repeat-grid">
          {draft.services.map((service, i) => (
            <div key={i} className="repeat-row repeat-row--stacked">
              <input
                value={service.title}
                onChange={(e) => setService(i, 'title', e.target.value)}
                placeholder="Service title"
                aria-label={`Service ${i + 1} title`}
              />
              <input
                value={service.description}
                onChange={(e) => setService(i, 'description', e.target.value)}
                placeholder="Description"
                aria-label={`Service ${i + 1} description`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Team</label>
        <div className="repeat-grid">
          {draft.team.map((member, i) => (
            <div key={i} className="repeat-row">
              <input
                value={member.name}
                onChange={(e) => setTeam(i, 'name', e.target.value)}
                placeholder="Name"
                aria-label={`Team member ${i + 1} name`}
              />
              <input
                value={member.role}
                onChange={(e) => setTeam(i, 'role', e.target.value)}
                placeholder="Role"
                aria-label={`Team member ${i + 1} role`}
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  )
}
