import {
  transformXMLContent,
  mapXMLData,
  generateXMLSchema,
  applyXMLTransformation
} from '../../xml/transform';
import { FormulaError } from '../../errors';

describe('XML Transformation', () => {
  describe('Content Transformation', () => {
    test('transforms XML content', () => {
      const xml = `<?xml version="1.0"?>
        <root>
          <element>value</element>
        </root>`;
      const stylesheet = '';
      
      const result = transformXMLContent(xml, stylesheet);
      expect(result).toBeDefined();
    });
  });

  describe('Data Mapping', () => {
    test('maps XML data to targets', () => {
      const state = { bindings: new Map() };
      const xml = `<?xml version="1.0"?>
        <root>
          <name>John</name>
          <age>30</age>
        </root>`;
      const mapping = new Map([
        ['//name', 'userName'],
        ['//age', 'userAge']
      ]);
      
      const result = mapXMLData(state, xml, mapping);
      expect(result.userName).toBe('John');
      expect(result.userAge).toBe('30');
    });

    test('handles missing elements', () => {
      const state = { bindings: new Map() };
      const xml = `<?xml version="1.0"?>
        <root>
          <name>John</name>
        </root>`;
      const mapping = new Map([
        ['//name', 'userName'],
        ['//age', 'userAge']
      ]);
      
      const result = mapXMLData(state, xml, mapping);
      expect(result.userName).toBe('John');
      expect(result.userAge).toBeUndefined();
    });
  });

  describe('Schema Generation', () => {
    test('generates XML schema', () => {
      const state = {
        schema: {
          generation: { enabled: true }
        }
      };
      const xml = `<?xml version="1.0"?>
        <root>
          <element>value</element>
        </root>`;
      
      const schema = generateXMLSchema(state, xml);
      expect(schema).toContain('<?xml version="1.0"');
      expect(schema).toContain('xs:schema');
    });
  });

  describe('Transformation Application', () => {
    test('applies XML transformation', () => {
      const state = {
        operations: {
          transform: {
            stylesheets: new Map([
              ['transform1', 'stylesheet content']
            ])
          }
        }
      };
      const xml = `<?xml version="1.0"?>
        <root>
          <element>value</element>
        </root>`;
      
      const result = applyXMLTransformation(state, xml, 'transform1');
      expect(result).toBeDefined();
    });

    test('throws error for invalid transform', () => {
      const state = {
        operations: {
          transform: {
            stylesheets: new Map()
          }
        }
      };
      const xml = `<?xml version="1.0"?>
        <root>
          <element>value</element>
        </root>`;
      
      expect(() => applyXMLTransformation(state, xml, 'invalid'))
        .toThrow(FormulaError);
    });
  });
});