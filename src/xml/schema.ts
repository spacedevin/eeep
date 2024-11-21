import { XMLDataBindingState } from '../../spec/XMLDataBinding';
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

export function generateXMLSchema(content: string): string {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, 'text/xml');
    
    // Generate basic schema structure
    let schema = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
`;

    // Add element definitions
    const elements = Array.from(xmlDoc.getElementsByTagName('*'));
    const processedElements = new Set<string>();

    elements.forEach(element => {
      if (!processedElements.has(element.tagName)) {
        schema += generateElementDefinition(element);
        processedElements.add(element.tagName);
      }
    });

    schema += '</xs:schema>';
    return schema;
  } catch (error) {
    throw new FormulaError('Error generating XML schema', error);
  }
}

function generateElementDefinition(element: Element): string {
  let definition = `  <xs:element name="${element.tagName}">\n`;
  definition += '    <xs:complexType>\n';

  // Add attributes
  if (element.attributes.length > 0) {
    Array.from(element.attributes).forEach(attr => {
      definition += `      <xs:attribute name="${attr.name}" type="xs:string"/>\n`;
    });
  }

  // Add child elements
  const childElements = new Set<string>();
  Array.from(element.children).forEach(child => {
    childElements.add(child.tagName);
  });

  if (childElements.size > 0) {
    definition += '      <xs:sequence>\n';
    Array.from(childElements).forEach(childName => {
      definition += `        <xs:element ref="${childName}" minOccurs="0" maxOccurs="unbounded"/>\n`;
    });
    definition += '      </xs:sequence>\n';
  }

  definition += '    </xs:complexType>\n';
  definition += '  </xs:element>\n';
  return definition;
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

export function resolveXMLNamespace(
  state: XMLDataBindingState,
  prefix: string
): string | undefined {
  try {
    if ('management' in state) {
      return state.management.namespaces.get(prefix)?.uri;
    }
    return undefined;
  } catch (error) {
    throw new FormulaError('Error resolving XML namespace', error);
  }
}