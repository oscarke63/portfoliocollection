import '@testing-library/jest-dom'

// jsdom doesn't implement matchMedia, which the theme provider uses.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// jsdom doesn't implement scrollTo, used by the router and back-to-top.
window.scrollTo = () => {}
