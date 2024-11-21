import { FormulaError } from '../errors';

export interface RESTConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
  maxRetries?: number;
  auth?: {
    type: 'basic' | 'bearer' | 'oauth2' | 'apiKey';
    credentials?: {
      username?: string;
      password?: string;
      token?: string;
      clientId?: string;
      clientSecret?: string;
      apiKey?: string;
    };
  };
}

export class RESTClient {
  private headers: Record<string, string>;
  private timeout: number;
  private maxRetries: number;

  constructor(private config: RESTConfig) {
    this.headers = {
      'Content-Type': 'application/json',
      ...config.headers
    };
    this.timeout = config.timeout || 30000;
    this.maxRetries = config.maxRetries || 3;
    
    if (config.auth) {
      this.setupAuthentication();
    }
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const url = this.buildUrl(path, params);
    return this.request<T>('GET', url);
  }

  async post<T>(path: string, body?: any, params?: Record<string, string>): Promise<T> {
    const url = this.buildUrl(path, params);
    return this.request<T>('POST', url, body);
  }

  async put<T>(path: string, body?: any, params?: Record<string, string>): Promise<T> {
    const url = this.buildUrl(path, params);
    return this.request<T>('PUT', url, body);
  }

  async patch<T>(path: string, body?: any, params?: Record<string, string>): Promise<T> {
    const url = this.buildUrl(path, params);
    return this.request<T>('PATCH', url, body);
  }

  async delete<T>(path: string, params?: Record<string, string>): Promise<T> {
    const url = this.buildUrl(path, params);
    return this.request<T>('DELETE', url);
  }

  async upload(path: string, file: File | Blob, params?: Record<string, string>): Promise<any> {
    const url = this.buildUrl(path, params);
    const formData = new FormData();
    formData.append('file', file);

    return this.request('POST', url, formData, {
      'Content-Type': 'multipart/form-data'
    });
  }

  private async request<T>(
    method: string,
    url: string,
    body?: any,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    let attempt = 0;
    let lastError: Error | null = null;

    while (attempt < this.maxRetries) {
      try {
        const response = await this.executeRequest(method, url, body, customHeaders);
        return await this.parseResponse<T>(response);
      } catch (error) {
        lastError = error as Error;
        attempt++;
        if (attempt < this.maxRetries) {
          await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
        }
      }
    }

    throw new FormulaError('REST request failed after retries', lastError);
  }

  private async executeRequest(
    method: string,
    url: string,
    body?: any,
    customHeaders?: Record<string, string>
  ): Promise<Response> {
    const headers = { ...this.headers, ...customHeaders };
    
    const response = await fetch(url, {
      method,
      headers,
      body: body ? 
        (body instanceof FormData ? body : JSON.stringify(body)) : 
        undefined,
      signal: AbortSignal.timeout(this.timeout)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      return response.json();
    }
    
    if (contentType?.includes('text/xml') || contentType?.includes('application/xml')) {
      const text = await response.text();
      return this.parseXML(text) as T;
    }
    
    if (contentType?.includes('text/')) {
      return response.text() as Promise<T>;
    }
    
    return response.blob() as Promise<T>;
  }

  private parseXML(text: string): any {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
    return this.parseXMLNode(xmlDoc.documentElement);
  }

  private parseXMLNode(node: Element): any {
    if (!node.children.length) {
      return node.textContent;
    }

    const result: Record<string, any> = {};
    Array.from(node.children).forEach(child => {
      result[child.tagName] = this.parseXMLNode(child);
    });
    return result;
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(path, this.config.baseUrl);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    return url.toString();
  }

  private setupAuthentication(): void {
    const { auth } = this.config;
    if (!auth?.credentials) return;

    switch (auth.type) {
      case 'basic':
        if (auth.credentials.username && auth.credentials.password) {
          const token = btoa(`${auth.credentials.username}:${auth.credentials.password}`);
          this.headers['Authorization'] = `Basic ${token}`;
        }
        break;

      case 'bearer':
        if (auth.credentials.token) {
          this.headers['Authorization'] = `Bearer ${auth.credentials.token}`;
        }
        break;

      case 'apiKey':
        if (auth.credentials.apiKey) {
          this.headers['X-API-Key'] = auth.credentials.apiKey;
        }
        break;

      case 'oauth2':
        // OAuth2 implementation would go here
        // This would typically involve token management and refresh logic
        break;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}