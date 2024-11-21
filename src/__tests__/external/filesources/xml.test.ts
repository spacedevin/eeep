import { parseXmlFile } from '../../../external/filesources/xml';
import { createFileSource, addFileSource } from '../../../external';
import { TransformationError } from '../../../external/errors';

describe('XML File Parser', () => {
  test('parses valid XML', () => {
    let state = createFileSource('xml');
    state = addFileSource(state, 'test', 'data.xml', 'xml');

    const content = `
      <?xml version="1.0"?>
      <root>
        <person>
          <name>John</name>
          <age>30</age>
        </person>
        <person>
          <name>Jane</name>
          <age>25</age>
        </person>
      </root>
    `;

    const result = parseXmlFile(state, 'test', content);
    expect(result.root.person).toHaveLength(2);
    expect(result.root.person[0].name).toBe('John');
  });

  test('parses XML with attributes', () => {
    let state = createFileSource('xml');
    state = addFileSource(state, 'test', 'data.xml', 'xml');

    const content = `
      <?xml version="1.0"?>
      <root>
        <person id="1" type="employee">
          <name>John</name>
        </person>
      </root>
    `;

    const result = parseXmlFile(state, 'test', content);
    expect(result.root.person['@_id']).toBe('1');
    expect(result.root.person['@_type']).toBe('employee');
  });

  test('throws error for invalid XML', () => {
    let state = createFileSource('xml');
    state = addFileSource(state, 'test', 'data.xml', 'xml');

    const content = '<root><unclosed>';
    expect(() => parseXmlFile(state, 'test', content)).toThrow();
  });

  test('throws error for invalid source', () => {
    const state = createFileSource('xml');
    expect(() => parseXmlFile(state, 'invalid', '')).toThrow(TransformationError);
  });
});