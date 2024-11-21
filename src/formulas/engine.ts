import { FormulaError } from '../errors';
import { HyperFormula } from 'hyperformula';

export class FormulaEngine {
  private hf: HyperFormula;
  private sheetId: number;
  private customFunctions: Map<string, (...args: any[]) => any>;
  private arrayCache: Map<string, any[][]>;

  constructor() {
    this.hf = HyperFormula.buildEmpty({
      licenseKey: 'gpl-v3',
      useArrayArithmetic: true,
      useColumnIndex: true
    });
    this.sheetId = 0; // Default sheet ID
    this.hf.addSheet('Sheet1');
    this.customFunctions = new Map();
    this.arrayCache = new Map();
  }

  evaluate(formula: string, context?: Record<string, any>): any {
    try {
      if (context) {
        this.updateContext(context);
      }

      // Check if formula is an array formula
      if (formula.startsWith('{') && formula.endsWith('}')) {
        return this.evaluateArrayFormula(formula.slice(1, -1));
      }

      // Replace custom functions in formula with their results
      let processedFormula = formula;
      for (const [name, fn] of this.customFunctions.entries()) {
        const regex = new RegExp(`${name}\\((.*?)\\)`, 'g');
        processedFormula = processedFormula.replace(regex, (match: string, args: string) => {
          const evaluatedArgs: any[] = args.split(',').map((arg: string) => this.evaluate(arg.trim()));
          return String(fn(...evaluatedArgs));
        });
      }

      const result = this.hf.calculateFormula(processedFormula, this.sheetId);
      
      // Handle array results
      if (Array.isArray(result)) {
        return this.processArrayResult(result);
      }

      return result;
    } catch (error) {
      throw new FormulaError('Error evaluating formula', error);
    }
  }

  batch(formulas: string[]): any[] {
    try {
      return formulas.map(formula => this.evaluate(formula));
    } catch (error) {
      throw new FormulaError('Error evaluating formulas in batch', error);
    }
  }

  registerFunction(name: string, fn: (...args: any[]) => any): void {
    try {
      // Store custom function in map
      this.customFunctions.set(name.toUpperCase(), fn);
    } catch (error) {
      throw new FormulaError('Error registering custom function', error);
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

    const col = match[1].split('').reduce((acc: number, char: string) => 
      acc * 26 + char.charCodeAt(0) - 64, 0) - 1;
    const row = parseInt(match[2]) - 1;

    return { row, col };
  }

  private evaluateArrayFormula(formula: string): any[][] {
    try {
      // Check cache first
      const cached = this.arrayCache.get(formula);
      if (cached) {
        return cached;
      }

      // Split formula into individual cell formulas
      const rows = formula.split(';').map(row => row.trim());
      const result = rows.map(row => 
        row.split(',').map(cell => 
          this.evaluate(cell.trim())
        )
      );

      // Cache the result
      this.arrayCache.set(formula, result);
      return result;
    } catch (error) {
      throw new FormulaError('Error evaluating array formula', error);
    }
  }

  private processArrayResult(result: any[]): any[][] {
    // Convert single dimension array to 2D array
    if (!Array.isArray(result[0])) {
      return [result];
    }
    return result;
  }

  clearCache(): void {
    try {
      this.hf.clearSheet(this.sheetId);
      this.customFunctions.clear();
      this.arrayCache.clear();
    } catch (error) {
      throw new FormulaError('Error clearing formula cache', error);
    }
  }

  reset(): void {
    try {
      this.hf.destroy();
      this.hf = HyperFormula.buildEmpty({
        licenseKey: 'gpl-v3',
        useArrayArithmetic: true,
        useColumnIndex: true
      });
      this.sheetId = 0;
      this.hf.addSheet('Sheet1');
      this.customFunctions.clear();
      this.arrayCache.clear();
    } catch (error) {
      throw new FormulaError('Error resetting formula engine', error);
    }
  }
}