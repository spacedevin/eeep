import {
  executeQuery,
  testConnection
} from './database';

import {
  executeRequest,
  validateEndpoint
} from './webservices';

import {
  readFile,
  validateFile
} from './filesources';

export {
  // Database handlers
  executeQuery,
  testConnection,
  
  // Web service handlers
  executeRequest,
  validateEndpoint,
  
  // File source handlers
  readFile,
  validateFile
};