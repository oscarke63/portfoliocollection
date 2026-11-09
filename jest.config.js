export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
  moduleNameMapper: {
    // CSS imports resolve to an empty object in tests.
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Static asset imports resolve to a stub string.
    '\\.(png|jpg|jpeg|gif|svg|webp|avif)$': '<rootDir>/src/test/fileMock.js',
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx}'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/test/**',
    '!src/**/*.test.{js,jsx}',
  ],
}
