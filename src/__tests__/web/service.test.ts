import {
  callWebService,
  filterXml,
  encodeUrl,
  htmlEncode,
  htmlDecode
} from '../../web/service';
import { FormulaError } from '../../errors';

describe('Web Service', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('Web Service Calls', () => {
    test('calls web service', async () => {
      const mockResponse = 'response data';
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockResponse)
      });

      const result = await callWebService('https://api.example.com');
      expect(result).toBe(mockResponse);
    });

    test('handles timeout', async () => {
      jest.useFakeTimers();
      const fetchPromise = callWebService('https://api.example.com', {
        timeout: 1000
      });
      
      jest.advanceTimersByTime(1001);
      await expect(fetchPromise).rejects.toThrow(FormulaError);
      
      jest.useRealTimers();
    });
  });

  describe('XML Functions', () => {
    test('filters XML with XPath', () => {
      const xml = `
        <root>
          <person>
            <name>John</name>
            <age>30</age>
          </person>
        </root>
      `;
      
      const result = filterXml(xml, '//name');
      expect(result).toBe('John');
    });

    test('throws error for invalid XML', () => {
      expect(() => filterXml('<invalid>', '//test'))
        .toThrow(FormulaError);
    });
  });

  describe('Encoding Functions', () => {
    test('encodes URL', () => {
      expect(encodeUrl('Hello World!')).toBe('Hello%20World!');
      expect(encodeUrl('test@example.com')).toBe('test%40example.com');
    });

    test('encodes HTML', () => {
      expect(htmlEncode('<div class="test">&'))
        .toBe('&lt;div class=&quot;test&quot;&gt;&amp;');
    });

    test('decodes HTML', () => {
      expect(htmlDecode('&lt;div class=&quot;test&quot;&gt;&amp;'))
        .toBe('<div class="test">&');
    });
  });
});
