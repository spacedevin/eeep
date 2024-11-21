export const DEFAULT_SETTINGS = {
  file: {
    bufferSize: 8192,
    maxFileSize: 100 * 1024 * 1024, // 100MB
    encoding: 'utf8' as BufferEncoding,
    delimiter: ',',
    hasHeader: true
  },
  database: {
    timeout: 30000,
    poolSize: 10,
    retryAttempts: 3,
    retryDelay: 1000
  },
  webservice: {
    timeout: 30000,
    maxRetries: 3,
    retryDelay: 1000,
    cacheSize: 100,
    cacheDuration: 300000 // 5 minutes
  }
};