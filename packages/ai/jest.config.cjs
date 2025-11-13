const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { isolatedModules: true }]
  },
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: []
};

module.exports = config;
