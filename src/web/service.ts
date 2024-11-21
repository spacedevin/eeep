import { WebQueryState } from '../../spec/WebQueries';
import { FormulaError } from '../errors';

export async function callWebService(
  url: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: any;
    timeout?: number;
  }
): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      options?.timeout || 30000
    );

    const response = await fetch(url, {
      method: options?.method || 'GET',
      headers: options?.headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    throw new FormulaError('Error calling web service', error);
  }
}

export function filterXml(xml: string, xpath: string): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    
    const result = doc.evaluate(
      xpath,
      doc,
      null,
      XPathResult.STRING_TYPE,
      null
    );

    return result.stringValue;
  } catch (error) {
    throw new FormulaError('Error filtering XML', error);
  }
}

export function encodeUrl(text: string): string {
  try {
    return encodeURIComponent(text);
  } catch (error) {
    throw new FormulaError('Error encoding URL', error);
  }
}

export function htmlEncode(text: string): string {
  try {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  } catch (error) {
    throw new FormulaError('Error encoding HTML', error);
  }
}

export function htmlDecode(text: string): string {
  try {
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  } catch (error) {
    throw new FormulaError('Error decoding HTML', error);
  }
}
