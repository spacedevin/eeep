import { WebQueryState } from '../../spec/WebQueries';
import { FormulaError } from '../errors';

export async function executeWebQuery(
  state: WebQueryState,
  url: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    params?: Record<string, string>;
    body?: any;
  }
): Promise<any> {
  try {
    const query = state.queries.get(url);
    if (!query) {
      throw new Error(`Query for URL ${url} not found`);
    }

    // Build request URL with parameters
    const urlObj = new URL(url);
    const params = { ...query.params, ...options?.params };
    Object.entries(params).forEach(([key, value]) => 
      urlObj.searchParams.append(key, value)
    );

    // Build request options
    const requestOptions: RequestInit = {
      method: options?.method || query.method,
      headers: {
        ...query.headers,
        ...options?.headers
      }
    };

    if (options?.body) {
      requestOptions.body = JSON.stringify(options.body);
      requestOptions.headers = {
        ...requestOptions.headers,
        'Content-Type': 'application/json'
      };
    }

    // Apply retry settings
    const response = await fetchWithRetry(
      urlObj.toString(),
      requestOptions,
      state.settings.retry
    );

    return await response.json();
  } catch (error) {
    throw new FormulaError('Error executing web query', error);
  }
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retrySettings: {
    count: number;
    delay: number;
    backoff: 'linear' | 'exponential';
  }
): Promise<Response> {
  let attempt = 0;
  let delay = retrySettings.delay;

  while (attempt < retrySettings.count) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      attempt++;
      if (attempt === retrySettings.count) {
        throw error;
      }

      // Calculate next delay
      await new Promise(resolve => setTimeout(resolve, delay));
      delay = retrySettings.backoff === 'exponential' ?
        delay * 2 : delay + retrySettings.delay;
    }
  }

  throw new Error('Max retry attempts reached');
}
