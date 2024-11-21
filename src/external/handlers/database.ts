import { DatabaseState } from '../../../spec/Database';
import { ConnectionError, QueryError } from '../errors';
import { validateConnectionString } from '../validation';
import { handleError } from './base';

export async function executeQuery(state: DatabaseState, queryId: string, params?: any[]): Promise<any[]> {
  const query = state.queries.get(queryId);
  if (!query) {
    throw new QueryError(`Query ${queryId} not found`);
  }

  try {
    // Placeholder for actual database query execution
    return [];
  } catch (error: unknown) {
    throw handleError(error, QueryError, 'Failed to execute query');
  }
}

export async function testConnection(state: DatabaseState, connectionId: string): Promise<boolean> {
  const connection = state.connections.get(connectionId);
  if (!connection) {
    throw new ConnectionError(`Connection ${connectionId} not found`);
  }

  try {
    validateConnectionString(connection.settings.connectionString);
    return true;
  } catch (error: unknown) {
    throw handleError(error, ConnectionError, 'Failed to test connection');
  }
}