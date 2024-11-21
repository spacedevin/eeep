import * as formulas from '../../formulas';

describe('Formula Exports', () => {
  test('exports math functions', () => {
    expect(formulas.sum).toBeDefined();
    expect(formulas.product).toBeDefined();
    expect(formulas.sqrt).toBeDefined();
  });

  test('exports statistical functions', () => {
    expect(formulas.average).toBeDefined();
    expect(formulas.median).toBeDefined();
    expect(formulas.stdev).toBeDefined();
  });

  test('exports logical functions', () => {
    expect(formulas.and).toBeDefined();
    expect(formulas.or).toBeDefined();
    expect(formulas.not).toBeDefined();
  });

  test('exports text functions', () => {
    expect(formulas.concatenate).toBeDefined();
    expect(formulas.left).toBeDefined();
    expect(formulas.right).toBeDefined();
  });

  test('exports date/time functions', () => {
    expect(formulas.date).toBeDefined();
    expect(formulas.today).toBeDefined();
    expect(formulas.now).toBeDefined();
  });

  test('exports lookup functions', () => {
    expect(formulas.vlookup).toBeDefined();
    expect(formulas.hlookup).toBeDefined();
    expect(formulas.match).toBeDefined();
  });

  test('exports database functions', () => {
    expect(formulas.dAverage).toBeDefined();
    expect(formulas.dCount).toBeDefined();
    expect(formulas.dSum).toBeDefined();
  });

  test('exports engineering functions', () => {
    expect(formulas.bin2dec).toBeDefined();
    expect(formulas.hex2bin).toBeDefined();
    expect(formulas.imabs).toBeDefined();
  });

  test('exports web functions', () => {
    expect(formulas.webservice).toBeDefined();
    expect(formulas.encodeUrl).toBeDefined();
    expect(formulas.filterXml).toBeDefined();
  });

  test('exports financial functions', () => {
    expect(formulas.fv).toBeDefined();
    expect(formulas.pv).toBeDefined();
    expect(formulas.irr).toBeDefined();
  });

  test('exports matrix functions', () => {
    expect(formulas.mdeterm).toBeDefined();
    expect(formulas.minverse).toBeDefined();
    expect(formulas.mmult).toBeDefined();
  });

  test('exports trigonometry functions', () => {
    expect(formulas.sin).toBeDefined();
    expect(formulas.cos).toBeDefined();
    expect(formulas.tan).toBeDefined();
  });

  test('exports formula engine', () => {
    expect(formulas.FormulaEngine).toBeDefined();
  });
});