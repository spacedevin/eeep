import {
  cubeKpiMember,
  cubeMember,
  cubeMemberProperty,
  cubeRankedMember,
  cubeSet,
  cubeSetCount,
  cubeValue
} from '../../formulas/cube';
import { FormulaError } from '../../errors';

describe('OLAP Cube Functions', () => {
  const connection = {
    connectionString: 'test-connection',
    catalog: 'test-catalog',
    cube: 'test-cube'
  };

  describe('CUBEKPIMEMBER function', () => {
    test('retrieves KPI member property', async () => {
      const result = await cubeKpiMember(connection, 'Sales', 'Value');
      expect(result).toBeDefined();
    });

    test('handles invalid KPI', async () => {
      await expect(cubeKpiMember(connection, 'Invalid', 'Value'))
        .rejects.toThrow(FormulaError);
    });
  });

  describe('CUBEMEMBER function', () => {
    test('retrieves member', async () => {
      const result = await cubeMember(connection, '[Product].[Category].[Electronics]');
      expect(result).toBeDefined();
    });

    test('handles invalid member', async () => {
      await expect(cubeMember(connection, '[Invalid].[Member]'))
        .rejects.toThrow(FormulaError);
    });
  });

  describe('CUBEMEMBERPROPERTY function', () => {
    test('retrieves member property', async () => {
      const result = await cubeMemberProperty(
        connection,
        '[Product].[Category].[Electronics]',
        'Description'
      );
      expect(result).toBeDefined();
    });

    test('handles invalid property', async () => {
      await expect(cubeMemberProperty(
        connection,
        '[Product].[Category].[Electronics]',
        'Invalid'
      )).rejects.toThrow(FormulaError);
    });
  });

  describe('CUBERANKEDMEMBER function', () => {
    test('retrieves ranked member', async () => {
      const result = await cubeRankedMember(
        connection,
        '[Product].[Category].Members',
        1
      );
      expect(result).toBeDefined();
    });

    test('handles invalid rank', async () => {
      await expect(cubeRankedMember(
        connection,
        '[Product].[Category].Members',
        -1
      )).rejects.toThrow(FormulaError);
    });
  });

  describe('CUBESET function', () => {
    test('creates member set', async () => {
      const result = await cubeSet(
        connection,
        '[Product].[Category].Members',
        'Categories',
        'ASC',
        '[Measures].[Sales]'
      );
      expect(result).toBeDefined();
    });

    test('handles invalid set expression', async () => {
      await expect(cubeSet(
        connection,
        '[Invalid].Members'
      )).rejects.toThrow(FormulaError);
    });
  });

  describe('CUBESETCOUNT function', () => {
    test('counts set members', async () => {
      const result = await cubeSetCount(
        connection,
        '[Product].[Category].Members'
      );
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    test('handles empty set', async () => {
      const result = await cubeSetCount(
        connection,
        '[Empty].Members'
      );
      expect(result).toBe(0);
    });
  });

  describe('CUBEVALUE function', () => {
    test('retrieves cube value', async () => {
      const result = await cubeValue(
        connection,
        '[Product].[Category].[Electronics]'
      );
      expect(typeof result).toBe('number');
    });

    test('handles invalid member', async () => {
      await expect(cubeValue(
        connection,
        '[Invalid].[Member]'
      )).rejects.toThrow(FormulaError);
    });
  });
});