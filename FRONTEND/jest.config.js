const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/hooks/(.*)': '<rootDir>/app/hooks/$1',
    '^@/components/(.*)': '<rootDir>/app/components/$1',
    '^@/layouts/(.*)': '<rootDir>/app/layouts/$1',
    '^@/assets/(.*)': '<rootDir>/app/assets/$1',
    '^@/store/(.*)': '<rootDir>/app/store/$1',
    '^@/utils/(.*)': '<rootDir>/app/utils/$1',
    '^@/api/(.*)': '<rootDir>/app/api/$1',
    '^@/tests/(.*)': '<rootDir>/app/tests/$1',
    '^@/pages/(.*)': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
