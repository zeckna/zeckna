import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-encrypted-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
}));

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn().mockResolvedValue(null),
  resetGenericPassword: jest.fn()
}));

jest.mock('react-native-qrcode-svg', () => jest.fn(() => null));
