import { FormulaError } from '../errors';
import { MDXQuery, OLAPResult } from './types';

export function generateMDX(
  cube: string,
  dimensions: string[],
  measures: string[],
  filters?: Record<string, any>,
  orderBy?: string
): string {
  try {
    let mdx = `SELECT `;

    // Add dimensions to columns
    if (dimensions.length > 0) {
      mdx += `{${dimensions.join(', ')}} ON COLUMNS, `;
    }

    // Add measures to rows
    if (measures.length > 0) {
      mdx += `{${measures.join(', ')}} ON ROWS `;
    }

    mdx += `FROM [${cube}]`;

    // Add filters if present
    if (filters && Object.keys(filters).length > 0) {
      const whereClause = Object.entries(filters)
        .map(([key, value]) => `[${key}].[${value}]`)
        .join(' * ');
      mdx += ` WHERE (${whereClause})`;
    }

    // Add ordering if present
    if (orderBy) {
      mdx += ` ORDER BY ${orderBy}`;
    }

    return mdx;
  } catch (error) {
    throw new FormulaError('Error generating MDX query', error);
  }
}

export function parseMDXResult(result: any): OLAPResult {
  try {
    // Parse axes
    const axes = result.axes.map((axis: any) => 
      axis.positions.map((pos: any) => 
        pos.members.map((m: any) => m.caption || m.uniqueName)
      )
    );

    // Parse cells
    const cells = result.cells.map((cell: any) => ({
      value: cell.value,
      formattedValue: cell.formattedValue
    }));

    // Create result grid
    const [columns, rows] = axes;
    const grid: any[][] = [];

    for (let i = 0; i < rows.length; i++) {
      const row: any[] = [];
      for (let j = 0; j < columns.length; j++) {
        const cellIndex = i * columns.length + j;
        row.push(cells[cellIndex].value);
      }
      grid.push(row);
    }

    return {
      data: grid,
      metadata: {
        dimensions: columns.map((c: any) => c[0]),
        measures: rows.map((r: any) => r[0]),
        timestamp: Date.now()
      }
    };
  } catch (error) {
    throw new FormulaError('Error parsing MDX result', error);
  }
}