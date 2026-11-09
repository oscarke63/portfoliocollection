import { useEffect, useRef, useState } from 'react'

/**
 * Reveals an element when it scrolls into view. Returns a ref and a boolean.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, ...options },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return [ref, visible]
}
