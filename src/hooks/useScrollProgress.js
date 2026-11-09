import { useEffect, useState } from 'react'

/**
 * Tracks vertical scroll progress (0–1) and whether the page has scrolled
 * past a threshold. Used for the reading-progress bar and back-to-top button.
 */
export function useScrollProgress(threshold = 400) {
  const [progress, setProgress] = useState(0)
  const [pastThreshold, setPastThreshold] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
      setPastThreshold(scrollTop > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [threshold])

  return { progress, pastThreshold }
}
