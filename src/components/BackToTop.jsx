import { useScrollProgress } from '../hooks/useScrollProgress'

export default function BackToTop() {
  const { pastThreshold } = useScrollProgress()

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      type="button"
      className={`back-to-top ${pastThreshold ? 'is-visible' : ''}`}
      onClick={scrollUp}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={pastThreshold ? 0 : -1}
    >
      ↑
    </button>
  )
}
