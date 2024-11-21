import {
  validateXMLSchema,
  validateXMLBinding,
  validateCustomXMLPart,
  validateXMLNamespace
} from '../../xml/validation';
import { FormulaError } from '../../errors';

describe('XML Validation', () => {
  describe('Schema Validation', () => {
    test('validates valid XML', () => {
      const xml = `<?xml version="1.0"?>
        <root>
          <element>value</element>
        </root>`;
      expect(validateXMLSchema(xml, '')).toBe(true);
    });

    test('throws error for invalid XML', () => {
      const xml = `<?xml version="1.0"?>
        <root>
          <element>value
        </root>`;
      expect(() => validateXMLSchema(xml, '')).toThrow(FormulaError);
    });
  });

  describe('Binding Validation', () => {
    test('validates valid binding', () => {
      const state = { bindings: new Map() };
      expect(validateXMLBinding(state, '//element', 'A1')).toBe(true);
    });

    test('throws error for invalid XPath', () => {
      const state = { bindings: new Map() };
      expect(() => validateXMLBinding(state, '\\invalid', 'A1')).toThrow(FormulaError);
    });

    test('throws error for invalid cell reference', () => {
      const state = { bindings: new Map() };
      expect(() => validateXMLBinding(state, '//element', 'invalid')).toThrow(FormulaError);
    });
  });

  describe('Custom XML Part Validation', () => {
    test('validates valid XML part', () => {
      const state = {
        schema: {
          validation: { enabled: false }
        }
      };
      const xml = `<?xml version="1.0"?>
        <root>
          <element>value</element>
        </root>`;
      expect(validateCustomXMLPart(state, xml)).toBe(true);
    });

    test('throws error for invalid XML part', () => {
      const state = {
        schema: {
          validation: { enabled: false }
        }
      };
      const xml = `<?xml version="1.0"?>
        <root>
          <element>value
        </root>`;
      expect(() => validateCustomXMLPart(state, xml)).toThrow(FormulaError);
    });
  });

  describe('Namespace Validation', () => {
    test('validates valid namespace', () => {
      expect(validateXMLNamespace('http://example.com/ns')).toBe(true);
      expect(validateXMLNamespace('urn:example:ns')).toBe(true);
    });

    test('throws error for invalid namespace', () => {
      expect(() => validateXMLNamespace('')).toThrow(FormulaError);
      expect(() => validateXMLNamespace('invalid')).toThrow(FormulaError);
    });
  });
});