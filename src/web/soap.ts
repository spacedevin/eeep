import { FormulaError } from '../errors';

export interface SOAPConfig {
  wsdl: string;
  action: string;
  headers?: Record<string, string>;
  timeout?: number;
  maxRetries?: number;
}

export class SOAPClient {
  private headers: Record<string, string>;
  private timeout: number;
  private maxRetries: number;

  constructor(private config: SOAPConfig) {
    this.headers = {
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': config.action,
      ...config.headers
    };
    this.timeout = config.timeout || 30000;
    this.maxRetries = config.maxRetries || 3;
  }

  async call(method: string, params: any): Promise<any> {
    let attempt = 0;
    let lastError: Error | null = null;

    while (attempt < this.maxRetries) {
      try {
        const response = await this.executeRequest(method, params);
        return this.parseResponse(response);
      } catch (error) {
        lastError = error as Error;
        attempt++;
        if (attempt < this.maxRetries) {
          await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
        }
      }
    }

    throw new FormulaError('SOAP request failed after retries', lastError);
  }

  private async executeRequest(method: string, params: any): Promise<Response> {
    const body = this.buildSOAPEnvelope(method, params);
    
    const response = await fetch(this.config.wsdl, {
      method: 'POST',
      headers: this.headers,
      body,
      signal: AbortSignal.timeout(this.timeout)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  }

  private buildSOAPEnvelope(method: string, params: any): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope 
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Header/>
  <soap:Body>
    <${method}>
      ${this.serializeParams(params)}
    </${method}>
  </soap:Body>
</soap:Envelope>`;
  }

  private serializeParams(params: any): string {
    if (typeof params !== 'object') {
      return String(params);
    }

    return Object.entries(params)
      .map(([key, value]) => `<${key}>${this.serializeValue(value)}</${key}>`)
      .join('');
  }

  private serializeValue(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'object') {
      return this.serializeParams(value);
    }
    return String(value);
  }

  private async parseResponse(response: Response): Promise<any> {
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');

    // Check for SOAP fault
    const fault = xmlDoc.querySelector('Fault');
    if (fault) {
      throw new Error(
        fault.querySelector('faultstring')?.textContent || 
        'Unknown SOAP fault'
      );
    }

    // Extract response body
    const body = xmlDoc.querySelector('Body');
    if (!body) {
      throw new Error('Invalid SOAP response: missing Body element');
    }

    return this.parseXMLNode(body.firstElementChild);
  }

  private parseXMLNode(node: Element | null): any {
    if (!node) return null;

    // Handle leaf nodes
    if (!node.children.length) {
      return node.textContent;
    }

    // Handle arrays
    const isArray = Array.from(node.children)
      .every(child => child.tagName === node.firstElementChild?.tagName);

    if (isArray) {
      return Array.from(node.children)
        .map(child => this.parseXMLNode(child));
    }

    // Handle objects
    const result: Record<string, any> = {};
    Array.from(node.children).forEach(child => {
      result[child.tagName] = this.parseXMLNode(child);
    });
    return result;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}