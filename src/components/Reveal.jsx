import { useReveal } from '../hooks/useReveal'

export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
