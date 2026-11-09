import { highlightParts } from './highlight'

describe('highlightParts', () => {
  it('returns the whole string as a non-match when no term is given', () => {
    expect(highlightParts('Lumen Festival', '')).toEqual([
      { text: 'Lumen Festival', match: false },
    ])
  })

  it('splits text around a case-insensitive match', () => {
    const parts = highlightParts('Lumen Festival', 'lumen')
    expect(parts).toEqual([
      { text: 'Lumen', match: true },
      { text: ' Festival', match: false },
    ])
  })

  it('marks every occurrence of the term', () => {
    const parts = highlightParts('a-b-a', 'a')
    const matches = parts.filter((p) => p.match).map((p) => p.text)
    expect(matches).toEqual(['a', 'a'])
  })

  it('treats regex special characters literally', () => {
    const parts = highlightParts('price: $5 (usd)', '$5')
    expect(parts.some((p) => p.match && p.text === '$5')).toBe(true)
  })

  it('returns a single non-match part when the term is absent', () => {
    expect(highlightParts('Verdant', 'zzz')).toEqual([
      { text: 'Verdant', match: false },
    ])
  })
})
