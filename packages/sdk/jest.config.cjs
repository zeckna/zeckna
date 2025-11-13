const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        module: 'esnext',
        target: 'es2020',
        types: ['jest', 'node']
      }
    }],
    '^.+\\.(js|jsx)$': ['babel-jest', {
      configFile: path.join(__dirname, 'babel.config.cjs')
    }]
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@zeckna/core)'
  ],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
