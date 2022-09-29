const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: '.' })

const customJestConfig = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  moduleDirectories: ['node_modules', '<rootDir>', "<rootDir>/app"],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testRegex: '(/__tests__/.*|(\\.|/)test)\\.[jt]sx?$',
  roots: ['<rootDir>'],
  transform:{'^.+\\.tsx?$': 'ts-jest'},
  moduleNameMapper: {
    '@hooks/(.*)': '<rootDir>/app/hooks/$1',
    '@components/(.*)': '<rootDir>/app/components/$1',
    '@layouts/(.*)': '<rootDir>/app/layout/$1',
    '@assets/(.*)': '<rootDir>/app/assets/$1',
    '@store/(.*)': '<rootDir>/app/store/$1',
    '@utils/(.*)': '<rootDir>/app/utils/$1',
    '@api/(.*)': '<rootDir>/app/api/$1',
    '@pages/(.*)': '<rootDir>/pages/$1',
  }
}

module.exports = createJestConfig(customJestConfig)