import { OLAPConnection } from './connection';
import { OLAPCache } from './cache';
import { OLAPSecurity } from './security';
import { OLAPConfig, MDXQuery, OLAPResult, OLAPError } from './types';
import { generateMDX, parseMDXResult } from './mdx';

export class OLAPQueryExecutor {
  private cache: OLAPCache;
  private security: OLAPSecurity;
  private lastQueryCached: boolean = false;

  constructor(
    private connection: OLAPConnection,
    cacheTTL: number = 300000 // 5 minutes default
  ) {
    this.cache = new OLAPCache(cacheTTL);
    this.security = new OLAPSecurity(connection.getConfig());
  }

  async executeQuery(query: MDXQuery): Promise<OLAPResult> {
    try {
      // Generate cache key
      const cacheKey = this.generateCacheKey(query);

      // Check cache first
      const cachedResult = this.cache.get(cacheKey);
      if (cachedResult) {
        this.lastQueryCached = true;
        return cachedResult;
      }

      this.lastQueryCached = false;

      // Generate and secure MDX
      let mdx = generateMDX(
        query.cube,
        query.dimensions,
        query.measures,
        query.filters,
        query.orderBy
      );

      // Apply security filters
      mdx = await this.security.applySecurityFilters(mdx);

      // Execute query
      const result = await this.connection.executeQuery(mdx);

      // Parse results
      const parsedResult = this.parseResult(result, query);

      // Cache results
      this.cache.set(cacheKey, parsedResult);

      return parsedResult;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  wasLastQueryCached(): boolean {
    return this.lastQueryCached;
  }

  private generateCacheKey(query: MDXQuery): string {
    return JSON.stringify({
      cube: query.cube,
      dimensions: query.dimensions,
      measures: query.measures,
      filters: query.filters,
      orderBy: query.orderBy,
      user: this.security.getCurrentUser()
    });
  }

  private parseResult(result: any, query: MDXQuery): OLAPResult {
    const parsed = parseMDXResult(result);

    return {
      data: parsed.data,
      metadata: {
        dimensions: query.dimensions,
        measures: query.measures,
        timestamp: Date.now()
      }
    };
  }

  private handleError(error: any): OLAPError {
    if (error instanceof Error) {
      return {
        name: 'OLAPError',
        message: error.message,
        code: 'OLAP_ERROR',
        stack: error.stack
      };
    }
    return {
      name: 'OLAPError',
      message: 'Unknown OLAP error',
      code: 'UNKNOWN_ERROR'
    };
  }

  clearCache(): void {
    this.cache.clear();
  }

  setSecurityContext(context: any): void {
    this.security.setContext(context);
  }
}