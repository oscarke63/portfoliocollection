import { useScrollProgress } from '../hooks/useScrollProgress'

export default function ReadingProgress() {
  const { progress } = useScrollProgress(0)
  return (
    <div className="reading-progress" aria-hidden="true">
      <div
        className="reading-progress__bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
