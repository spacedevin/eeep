import { XMLDataBindingState } from '../../spec/XMLDataBinding';
import { CustomXMLPartState } from '../../spec/CustomXMLParts';
import { FormulaError } from '../errors';

export function validateXMLSchema(content: string, schema: string): boolean {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, 'text/xml');
    
    // Check for parsing errors
    const parseError = xmlDoc.getElementsByTagName('parsererror');
    if (parseError.length > 0) {
      throw new Error('XML parsing error');
    }

    // TODO: Add actual schema validation when available
    // For now, just validate basic XML structure
    return true;
  } catch (error) {
    throw new FormulaError('Error validating XML schema', error);
  }
}

export function validateXMLBinding(
  state: XMLDataBindingState,
  xpath: string,
  reference: string
): boolean {
  try {
    // Validate XPath syntax
    const parser = new DOMParser();
    const doc = parser.parseFromString('<test/>', 'text/xml');
    doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null);

    // Validate cell reference
    if (!/^[A-Z]+[0-9]+$/i.test(reference)) {
      throw new Error('Invalid cell reference');
    }

    return true;
  } catch (error) {
    throw new FormulaError('Error validating XML binding', error);
  }
}

export function validateCustomXMLPart(
  state: CustomXMLPartState,
  content: string
): boolean {
  try {
    // Validate XML structure
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, 'text/xml');
    
    const parseError = xmlDoc.getElementsByTagName('parsererror');
    if (parseError.length > 0) {
      throw new Error('XML parsing error');
    }

    // Validate against schema if provided
    if (state.schema?.validation.mode === 'strict') {
      // TODO: Add schema validation when available
    }

    return true;
  } catch (error) {
    throw new FormulaError('Error validating custom XML part', error);
  }
}

export function validateXMLNamespace(namespace: string): boolean {
  try {
    // Basic namespace validation
    if (!namespace) {
      throw new Error('Namespace cannot be empty');
    }

    // Check namespace format (simplified)
    const namespaceRegex = /^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\/[a-zA-Z0-9\-._~:\/?#\[\]@!$&'()*+,;=]*$/;
    if (!namespaceRegex.test(namespace)) {
      throw new Error('Invalid namespace format');
    }

    return true;
  } catch (error) {
    throw new FormulaError('Error validating XML namespace', error);
  }
}