import { DatabaseState } from '../../spec/Database';

export function createDatabaseConnection(type: 'sqlserver' | 'oracle' | 'mysql' | 'postgresql' | 'sqlite'): DatabaseState {
  return {
    connections: new Map(),
    queries: new Map(),
    operations: {
      import: {
        mode: 'bulk',
        mapping: new Map(),
        validation: {
          enabled: true,
          rules: []
        }
      },
      export: {
        format: 'excel',
        options: {
          includeHeaders: true
        }
      }
    },
    error: {
      retry: {
        enabled: true,
        maxAttempts: 3,
        delay: 1000
      },
      logging: {
        enabled: true,
        level: 'error'
      }
    }
  };
}

export function addConnection(
  state: DatabaseState,
  id: string,
  connectionString: string,
  type: 'sqlserver' | 'oracle' | 'mysql' | 'postgresql' | 'sqlite'
): DatabaseState {
  const newConnections = new Map(state.connections);
  newConnections.set(id, {
    id,
    type,
    settings: {
      connectionString,
      timeout: 30000,
      pooling: true
    },
    auth: {
      type: 'sql',
      credentials: {}
    },
    status: 'disconnected'
  });

  return {
    ...state,
    connections: newConnections
  };
}

export function addQuery(
  state: DatabaseState,
  id: string,
  text: string,
  type: 'sql' | 'stored_procedure'
): DatabaseState {
  const newQueries = new Map(state.queries);
  newQueries.set(id, {
    type,
    text,
    parameters: [],
    options: {
      timeout: 30000,
      commandType: type,
      transaction: false
    }
  });

  return {
    ...state,
    queries: newQueries
  };
}