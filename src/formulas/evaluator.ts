import { FormulaError } from '../errors';
import { HyperFormula } from 'hyperformula';

export class FormulaEvaluator {
  private hf: HyperFormula;
  private sheetId: number;
  private context: Map<string, any>;
  private cache: Map<string, any>;

  constructor() {
    this.hf = HyperFormula.buildEmpty({
      licenseKey: 'gpl-v3',
      useArrayArithmetic: true,
      useColumnIndex: true
    });
    this.sheetId = 0; // Default sheet ID
    this.hf.addSheet('Sheet1');
    this.context = new Map();
    this.cache = new Map();
  }

  evaluate(formula: string, context?: Record<string, any>): any {
    try {
      if (context) {
        this.updateContext(context);
      }

      return this.hf.calculateFormula(formula, this.sheetId);
    } catch (error) {
      throw new FormulaError('Error evaluating formula', error);
    }
  }

  private updateContext(context: Record<string, any>): void {
    try {
      Object.entries(context).forEach(([cell, value]) => {
        const { row, col } = this.parseCellReference(cell);
        this.hf.setCellContents({
          sheet: this.sheetId,
          row,
          col
        }, value);
      });
    } catch (error) {
      throw new FormulaError('Error updating formula context', error);
    }
  }

  private parseCellReference(cell: string): { row: number; col: number } {
    const match = cell.match(/^([A-Z]+)(\d+)$/);
    if (!match) {
      throw new FormulaError(`Invalid cell reference: ${cell}`);
    }

    const col = match[1].split('').reduce((acc, char) => 
      acc * 26 + char.charCodeAt(0) - 64, 0) - 1;
    const row = parseInt(match[2]) - 1;

    return { row, col };
  }

  reset(): void {
    this.context.clear();
    this.cache.clear();
    this.hf.destroy();
    this.hf = HyperFormula.buildEmpty({
      licenseKey: 'gpl-v3',
      useArrayArithmetic: true,
      useColumnIndex: true
    });
    this.sheetId = 0;
    this.hf.addSheet('Sheet1');
  }
}