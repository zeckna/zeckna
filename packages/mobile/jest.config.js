module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': require.resolve('babel-jest'),
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!((\\.pnpm/[^/]+/node_modules/)?(react-native|@react-native|@react-navigation|@react-native-async-storage|react-native-gesture-handler|react-native-reanimated|react-native-safe-area-context|@react-native-community|@react-native-firebase[^/]*|@react-native/js-polyfills)/))'
  ],
};
