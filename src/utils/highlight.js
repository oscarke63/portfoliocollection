/**
 * Splits `text` into parts around case-insensitive matches of `term` so the
 * caller can wrap matches in a <mark>. Returns an array of { text, match }.
 */
export function highlightParts(text, term) {
  if (!term || !text) return [{ text, match: false }]
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'ig')
  return text
    .split(regex)
    .filter((part) => part !== '')
    .map((part) => ({ text: part, match: part.toLowerCase() === term.toLowerCase() }))
}
