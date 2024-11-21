export const ERROR_CODES = {
  unknown: 'ERR000',
  validation: {
    INVALID_INPUT: 'VAL001',
    INVALID_FORMAT: 'VAL002',
    INVALID_TYPE: 'VAL003'
  },
  transformation: {
    PARSE_ERROR: 'TRF001',
    CONVERSION_ERROR: 'TRF002'
  },
  connection: {
    CONNECTION_FAILED: 'CON001',
    TIMEOUT: 'CON002'
  },
  query: {
    EXECUTION_FAILED: 'QRY001',
    INVALID_QUERY: 'QRY002'
  }
};