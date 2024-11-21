import { FormulaError } from '../errors';
import { OLAPConnection } from '../olap/connection';
import { OLAPQueryExecutor } from '../olap/query';
import { OLAPCache } from '../olap/cache';
import { OLAPSecurity } from '../olap/security';

export interface CubeConnection {
  connectionString: string;
  catalog: string;
  cube: string;
}

export async function cubeKpiMember(
  connection: CubeConnection,
  kpiName: string,
  kpiProperty: string,
  caption?: string
): Promise<string> {
  try {
    const conn = new OLAPConnection(connection);
    const executor = new OLAPQueryExecutor(conn);
    const query = {
      cube: connection.cube,
      dimensions: [],
      measures: [`[KPIs].[${kpiName}].[${kpiProperty}]`]
    };
    
    const result = await executor.executeQuery(query);
    return result.data[0][0];
  } catch (error) {
    throw new FormulaError('Error in CUBEKPIMEMBER function', error);
  }
}

export async function cubeMember(
  connection: CubeConnection,
  memberExpression: string,
  caption?: string
): Promise<string> {
  try {
    const conn = new OLAPConnection(connection);
    const executor = new OLAPQueryExecutor(conn);
    const query = {
      cube: connection.cube,
      dimensions: [memberExpression],
      measures: []
    };
    
    const result = await executor.executeQuery(query);
    return result.data[0][0];
  } catch (error) {
    throw new FormulaError('Error in CUBEMEMBER function', error);
  }
}

export async function cubeMemberProperty(
  connection: CubeConnection,
  memberExpression: string,
  propertyName: string
): Promise<any> {
  try {
    const conn = new OLAPConnection(connection);
    const executor = new OLAPQueryExecutor(conn);
    const query = {
      cube: connection.cube,
      dimensions: [`${memberExpression}.Properties('${propertyName}')`],
      measures: []
    };
    
    const result = await executor.executeQuery(query);
    return result.data[0][0];
  } catch (error) {
    throw new FormulaError('Error in CUBEMEMBERPROPERTY function', error);
  }
}

export async function cubeRankedMember(
  connection: CubeConnection,
  setExpression: string,
  rank: number,
  caption?: string
): Promise<string> {
  try {
    const conn = new OLAPConnection(connection);
    const executor = new OLAPQueryExecutor(conn);
    const query = {
      cube: connection.cube,
      dimensions: [`TopCount(${setExpression}, 1, Rank)`],
      measures: []
    };
    
    const result = await executor.executeQuery(query);
    return result.data[0][0];
  } catch (error) {
    throw new FormulaError('Error in CUBERANKEDMEMBER function', error);
  }
}

export async function cubeSet(
  connection: CubeConnection,
  setExpression: string,
  caption?: string,
  sortOrder?: string,
  sortBy?: string
): Promise<string> {
  try {
    const conn = new OLAPConnection(connection);
    const executor = new OLAPQueryExecutor(conn);
    
    let expression = setExpression;
    if (sortOrder && sortBy) {
      expression = `Order(${setExpression}, ${sortBy}, ${sortOrder})`;
    }
    
    const query = {
      cube: connection.cube,
      dimensions: [expression],
      measures: []
    };
    
    const result = await executor.executeQuery(query);
    return result.data[0][0];
  } catch (error) {
    throw new FormulaError('Error in CUBESET function', error);
  }
}

export async function cubeSetCount(
  connection: CubeConnection,
  setExpression: string
): Promise<number> {
  try {
    const conn = new OLAPConnection(connection);
    const executor = new OLAPQueryExecutor(conn);
    const query = {
      cube: connection.cube,
      dimensions: [],
      measures: [`Count(${setExpression})`]
    };
    
    const result = await executor.executeQuery(query);
    return result.data[0][0];
  } catch (error) {
    throw new FormulaError('Error in CUBESETCOUNT function', error);
  }
}

export async function cubeValue(
  connection: CubeConnection,
  memberExpression: string
): Promise<number> {
  try {
    const conn = new OLAPConnection(connection);
    const executor = new OLAPQueryExecutor(conn);
    const query = {
      cube: connection.cube,
      dimensions: [memberExpression],
      measures: ['[Measures].[Value]']
    };
    
    const result = await executor.executeQuery(query);
    return result.data[0][0];
  } catch (error) {
    throw new FormulaError('Error in CUBEVALUE function', error);
  }
}