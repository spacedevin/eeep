import {
  createDatabaseConnection,
  addConnection,
  addQuery
} from './database';

import {
  createWebQuery,
  addHeader,
  addQueryParam
} from './webservices';

import {
  createFileSource,
  addFileSource,
  addTransformationMapping
} from './filesources';

export {
  // Database operations
  createDatabaseConnection,
  addConnection,
  addQuery,
  
  // Web service operations
  createWebQuery,
  addHeader,
  addQueryParam,
  
  // File source operations
  createFileSource,
  addFileSource,
  addTransformationMapping
};