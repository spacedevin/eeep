import { FormulaError } from '../errors';

export async function webquery(url: string, options?: {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}): Promise<any> {
  try {
    const response = await fetch(url, {
      method: options?.method || 'GET',
      headers: options?.headers,
      body: options?.body ? JSON.stringify(options.body) : undefined
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new FormulaError('Error in WEBQUERY function', error);
  }
}

export async function restcall(
  url: string,
  method: string,
  headers?: Record<string, string>,
  body?: any
): Promise<any> {
  try {
    const response = await fetch(url, {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new FormulaError('Error in RESTCALL function', error);
  }
}

export async function graphql(
  url: string,
  query: string,
  variables?: Record<string, any>,
  headers?: Record<string, string>
): Promise<any> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data;
  } catch (error) {
    throw new FormulaError('Error in GRAPHQL function', error);
  }
}

export async function odata(
  url: string,
  options?: {
    select?: string[];
    filter?: string;
    orderby?: string;
    top?: number;
    skip?: number;
    expand?: string[];
  }
): Promise<any> {
  try {
    let queryUrl = url;
    const params: string[] = [];

    if (options?.select) {
      params.push(`$select=${options.select.join(',')}`);
    }
    if (options?.filter) {
      params.push(`$filter=${encodeURIComponent(options.filter)}`);
    }
    if (options?.orderby) {
      params.push(`$orderby=${encodeURIComponent(options.orderby)}`);
    }
    if (options?.top) {
      params.push(`$top=${options.top}`);
    }
    if (options?.skip) {
      params.push(`$skip=${options.skip}`);
    }
    if (options?.expand) {
      params.push(`$expand=${options.expand.join(',')}`);
    }

    if (params.length > 0) {
      queryUrl += `?${params.join('&')}`;
    }

    const response = await fetch(queryUrl, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.value || data;
  } catch (error) {
    throw new FormulaError('Error in ODATA function', error);
  }
}

export async function soap(
  url: string,
  action: string,
  body: string,
  headers?: Record<string, string>
): Promise<any> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': action,
        ...headers
      },
      body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return parseSOAPResponse(text);
  } catch (error) {
    throw new FormulaError('Error in SOAP function', error);
  }
}

export async function rss(url: string): Promise<any[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    
    const items = Array.from(xml.querySelectorAll('item'));
    return items.map(item => ({
      title: item.querySelector('title')?.textContent || '',
      link: item.querySelector('link')?.textContent || '',
      description: item.querySelector('description')?.textContent || '',
      pubDate: item.querySelector('pubDate')?.textContent || ''
    }));
  } catch (error) {
    throw new FormulaError('Error in RSS function', error);
  }
}

export async function atom(url: string): Promise<any[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    
    const entries = Array.from(xml.querySelectorAll('entry'));
    return entries.map(entry => ({
      title: entry.querySelector('title')?.textContent || '',
      link: entry.querySelector('link')?.getAttribute('href') || '',
      summary: entry.querySelector('summary')?.textContent || '',
      updated: entry.querySelector('updated')?.textContent || ''
    }));
  } catch (error) {
    throw new FormulaError('Error in ATOM function', error);
  }
}

// Helper function to parse SOAP response
function parseSOAPResponse(xml: string): any {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  
  // Remove SOAP envelope and body
  const body = doc.querySelector('Body');
  if (!body) {
    throw new Error('Invalid SOAP response');
  }

  // Convert XML to JSON-like object
  return xmlToJson(body.firstElementChild);
}

// Helper function to convert XML to JSON
function xmlToJson(xml: Element | null): any {
  if (!xml) return null;

  const obj: any = {};

  // Handle attributes
  if (xml.attributes.length > 0) {
    obj['@attributes'] = {};
    for (const attr of Array.from(xml.attributes)) {
      obj['@attributes'][attr.nodeName] = attr.nodeValue;
    }
  }

  // Handle child nodes
  if (xml.hasChildNodes()) {
    for (const child of Array.from(xml.childNodes)) {
      if (child.nodeType === 1) { // ELEMENT_NODE
        const nodeName = child.nodeName;
        
        if (obj[nodeName]) {
          if (!Array.isArray(obj[nodeName])) {
            obj[nodeName] = [obj[nodeName]];
          }
          obj[nodeName].push(xmlToJson(child as Element));
        } else {
          obj[nodeName] = xmlToJson(child as Element);
        }
      } else if (child.nodeType === 3) { // TEXT_NODE
        const text = child.nodeValue?.trim();
        if (text) {
          return text;
        }
      }
    }
  }

  return obj;
}