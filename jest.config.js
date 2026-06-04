module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.ts', '**/__tests__/**/*.tsx', '**/*.test.ts', '**/*.test.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/*.stories.tsx',
    '!app/**/*.test.{ts,tsx}',
  ],
  testTimeout: 10000,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  projects: [
    {
      displayName: 'unit',
      // Fixed 2026-06-02: globs need a <rootDir>/ prefix to match absolute paths,
      // and projects don't inherit the root preset/transform/moduleNameMapper.
      testMatch: ['<rootDir>/app/**/*.test.ts'],
      testEnvironment: 'node',
      preset: 'ts-jest',
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
    },
    {
      // Audit/integration suite added 2026-06-01. Lives under tests/ (not app/),
      // so it needs its own project — the projects above only scan app/**.
      // Only matches *.test.ts here; Playwright specs use the *.spec.ts extension
      // and are run by playwright.config.ts, never by Jest.
      displayName: 'audit',
      testMatch: ['<rootDir>/tests/**/*.test.ts'],
      testEnvironment: 'node',
      // Sets dummy env vars BEFORE any module import (modules like OpenRouterGateway
      // read env at load time). setupFiles runs earlier than setupFilesAfterEnv.
      setupFiles: ['<rootDir>/tests/setup.audit.js'],
      // Jest projects do NOT inherit the root preset/transform/moduleNameMapper,
      // so declare them here explicitly (ts-jest + the @/ path alias).
      preset: 'ts-jest',
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
    },
    {
      displayName: 'component',
      // Fixed 2026-06-02: <rootDir>/ prefix + explicit ts-jest/preset/mapper.
      testMatch: ['<rootDir>/app/**/*.test.tsx', '!<rootDir>/app/api/**/*.test.tsx'],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
      preset: 'ts-jest',
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
    },
  ],
};
