import {
  validateXMLSchema,
  generateXMLSchema,
  validateXMLNamespace,
  resolveXMLNamespace
} from '../../xml/schema';
import { createXMLDataBinding } from '../../xml/xmldatabinding';
import { FormulaError } from '../../errors';

describe('XML Schema Management', () => {
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

  describe('Schema Generation', () => {
    test('generates schema for simple XML', () => {
      const xml = `<?xml version="1.0"?>
        <root>
          <element attr="value">text</element>
        </root>`;
      
      const schema = generateXMLSchema(xml);
      expect(schema).toContain('xs:schema');
      expect(schema).toContain('element name="root"');
      expect(schema).toContain('element name="element"');
      expect(schema).toContain('attribute name="attr"');
    });

    test('handles nested elements', () => {
      const xml = `<?xml version="1.0"?>
        <root>
          <parent>
            <child>value</child>
          </parent>
        </root>`;
      
      const schema = generateXMLSchema(xml);
      expect(schema).toContain('element name="parent"');
      expect(schema).toContain('element name="child"');
    });
  });

  describe('Namespace Management', () => {
    test('validates valid namespace', () => {
      expect(validateXMLNamespace('http://example.com/ns')).toBe(true);
      expect(validateXMLNamespace('urn:example:ns')).toBe(true);
    });

    test('throws error for invalid namespace', () => {
      expect(() => validateXMLNamespace('')).toThrow(FormulaError);
      expect(() => validateXMLNamespace('invalid')).toThrow(FormulaError);
    });

    test('resolves XML namespace', () => {
      const state = createXMLDataBinding();
      state.management.namespaces.set('ns', {
        prefix: 'ns',
        uri: 'http://example.com/ns'
      });

      const uri = resolveXMLNamespace(state, 'ns');
      expect(uri).toBe('http://example.com/ns');
    });

    test('returns undefined for unknown namespace', () => {
      const state = createXMLDataBinding();
      const uri = resolveXMLNamespace(state, 'unknown');
      expect(uri).toBeUndefined();
    });
  });
});
