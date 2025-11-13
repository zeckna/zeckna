const DEFAULT_SYNC_URL = 'http://localhost:4000';

export const SYNC_SERVICE_URL =
  (typeof process !== 'undefined' && process.env?.ZECKNA_SYNC_URL) ||
  DEFAULT_SYNC_URL;

