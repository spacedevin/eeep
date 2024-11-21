import { FormulaError } from '../errors';

export async function webservice(url: string, options?: RequestInit): Promise<string> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    throw new FormulaError('Error in WEBSERVICE function', error);
  }
}

export function encodeUrl(text: string): string {
  try {
    return encodeURIComponent(text);
  } catch (error) {
    throw new FormulaError('Error in ENCODEURL function', error);
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
    throw new FormulaError('Error in FILTERXML function', error);
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
    throw new FormulaError('Error in HTMLENCODE function', error);
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
    throw new FormulaError('Error in HTMLDECODE function', error);
  }
}

export function jsonEncode(value: any): string {
  try {
    return JSON.stringify(value);
  } catch (error) {
    throw new FormulaError('Error in JSONENCODE function', error);
  }
}

export function jsonDecode(text: string): any {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new FormulaError('Error in JSONDECODE function', error);
  }
}

export function xmlEncode(text: string): string {
  try {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  } catch (error) {
    throw new FormulaError('Error in XMLENCODE function', error);
  }
}

export function xmlDecode(text: string): string {
  try {
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");
  } catch (error) {
    throw new FormulaError('Error in XMLDECODE function', error);
  }
}