import {
  webservice,
  encodeUrl,
  filterXml,
  htmlEncode,
  htmlDecode,
  jsonEncode,
  jsonDecode,
  xmlEncode,
  xmlDecode
} from '../../formulas/web';
import { FormulaError } from '../../errors';

describe('Web Functions', () => {
  describe('WEBSERVICE function', () => {
    test('fetches data from URL', async () => {
      const mockResponse = 'test data';
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockResponse)
      });

      const result = await webservice('https://api.example.com');
      expect(result).toBe(mockResponse);
    });

    test('handles HTTP errors', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404
      });

      await expect(webservice('https://api.example.com')).rejects.toThrow(FormulaError);
    });
  });

  describe('ENCODEURL function', () => {
    test('encodes URL components', () => {
      expect(encodeUrl('Hello World!')).toBe('Hello%20World!');
      expect(encodeUrl('test@example.com')).toBe('test%40example.com');
    });
  });

  describe('FILTERXML function', () => {
    const xml = `
      <root>
        <person>
          <name>John</name>
          <age>30</age>
        </person>
      </root>
    `;

    test('extracts value using XPath', () => {
      expect(filterXml(xml, '//name')).toBe('John');
      expect(filterXml(xml, '//age')).toBe('30');
    });

    test('handles invalid XML', () => {
      expect(() => filterXml('<invalid>', '//test')).toThrow(FormulaError);
    });
  });

  describe('HTML Functions', () => {
    test('HTMLENCODE function', () => {
      expect(htmlEncode('<div class="test">&')).toBe('&lt;div class=&quot;test&quot;&gt;&amp;');
    });

    test('HTMLDECODE function', () => {
      expect(htmlDecode('&lt;div class=&quot;test&quot;&gt;&amp;')).toBe('<div class="test">&');
    });
  });

  describe('JSON Functions', () => {
    test('JSONENCODE function', () => {
      const obj = { name: 'John', age: 30 };
      expect(jsonEncode(obj)).toBe('{"name":"John","age":30}');
    });

    test('JSONDECODE function', () => {
      const json = '{"name":"John","age":30}';
      expect(jsonDecode(json)).toEqual({ name: 'John', age: 30 });
    });

    test('handles invalid JSON', () => {
      expect(() => jsonDecode('invalid')).toThrow(FormulaError);
    });
  });

  describe('XML Functions', () => {
    test('XMLENCODE function', () => {
      expect(xmlEncode('<test attr="value">&')).toBe('&lt;test attr=&quot;value&quot;&gt;&amp;');
    });

    test('XMLDECODE function', () => {
      expect(xmlDecode('&lt;test attr=&quot;value&quot;&gt;&amp;')).toBe('<test attr="value">&');
    });
  });

  describe('Error Handling', () => {
    test('handles network errors', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
      await expect(webservice('https://api.example.com')).rejects.toThrow(FormulaError);
    });

    test('handles encoding errors', () => {
      expect(() => encodeUrl(undefined as any)).toThrow(FormulaError);
    });

    test('handles XML parsing errors', () => {
      expect(() => filterXml('invalid', '//test')).toThrow(FormulaError);
    });
  });
});