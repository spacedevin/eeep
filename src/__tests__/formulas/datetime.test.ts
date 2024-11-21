import {
  date,
  day,
  month,
  year,
  today,
  now,
  dateDif,
  dateValue,
  days,
  edate,
  eomonth,
  hour,
  minute,
  second,
  time,
  timeValue
} from '../../formulas/datetime';
import { FormulaError } from '../../errors';

describe('Date/Time Functions', () => {
  describe('Basic Date Functions', () => {
    test('DATE function', () => {
      const result = date(2023, 1, 15);
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(0); // 0-based months
      expect(result.getDate()).toBe(15);
    });

    test('DAY function', () => {
      const testDate = new Date(2023, 0, 15);
      expect(day(testDate)).toBe(15);
    });

    test('MONTH function', () => {
      const testDate = new Date(2023, 0, 15);
      expect(month(testDate)).toBe(1); // 1-based months
    });

    test('YEAR function', () => {
      const testDate = new Date(2023, 0, 15);
      expect(year(testDate)).toBe(2023);
    });

    test('TODAY function', () => {
      const result = today();
      expect(result).toBeInstanceOf(Date);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
    });

    test('NOW function', () => {
      const result = now();
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });
  });

  describe('Date Calculations', () => {
    test('DATEDIF function', () => {
      const start = new Date(2023, 0, 1);
      const end = new Date(2023, 1, 1);
      expect(dateDif(start, end, 'D')).toBe(31);
    });

    test('DATEVALUE function', () => {
      const result = dateValue('2023-01-15');
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
    });

    test('DAYS function', () => {
      const start = new Date(2023, 0, 1);
      const end = new Date(2023, 0, 31);
      expect(days(end, start)).toBe(30);
    });

    test('EDATE function', () => {
      const start = new Date(2023, 0, 15);
      const result = edate(start, 1);
      expect(result.getMonth()).toBe(1);
    });

    test('EOMONTH function', () => {
      const start = new Date(2023, 0, 15);
      const result = eomonth(start, 0);
      expect(result.getDate()).toBe(31);
    });
  });

  describe('Time Functions', () => {
    test('HOUR function', () => {
      const testDate = new Date(2023, 0, 15, 14, 30, 45);
      expect(hour(testDate)).toBe(14);
    });

    test('MINUTE function', () => {
      const testDate = new Date(2023, 0, 15, 14, 30, 45);
      expect(minute(testDate)).toBe(30);
    });

    test('SECOND function', () => {
      const testDate = new Date(2023, 0, 15, 14, 30, 45);
      expect(second(testDate)).toBe(45);
    });

    test('TIME function', () => {
      const result = time(14, 30, 45);
      expect(hour(result)).toBe(14);
      expect(minute(result)).toBe(30);
      expect(second(result)).toBe(45);
    });

    test('TIMEVALUE function', () => {
      const result = timeValue('14:30:45');
      expect(hour(result)).toBe(14);
      expect(minute(result)).toBe(30);
      expect(second(result)).toBe(45);
    });
  });

  describe('Error Handling', () => {
    test('handles invalid dates', () => {
      expect(() => date(2023, 13, 1)).toThrow(FormulaError);
      expect(() => date(2023, 1, 32)).toThrow(FormulaError);
    });

    test('handles invalid date strings', () => {
      expect(() => dateValue('invalid')).toThrow(FormulaError);
    });

    test('handles invalid time strings', () => {
      expect(() => timeValue('invalid')).toThrow(FormulaError);
    });
  });
});