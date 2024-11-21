import { OLAPResult } from './types';

export class OLAPResultParser {
  parseAxisData(axis: any[]): string[] {
    return axis.map(member => this.parseMember(member));
  }

  parseCellData(cells: any[]): any[][] {
    const result: any[][] = [];
    let currentRow: any[] = [];

    for (const cell of cells) {
      currentRow.push(this.parseCell(cell));
      if (currentRow.length === this.getColumnCount()) {
        result.push(currentRow);
        currentRow = [];
      }
    }

    if (currentRow.length > 0) {
      result.push(currentRow);
    }

    return result;
  }

  private parseMember(member: any): string {
    // Parse member name and properties
    return member.caption || member.uniqueName;
  }

  private parseCell(cell: any): any {
    if (!cell) return null;

    // Handle different value types
    if (cell.value === undefined) return null;
    if (typeof cell.value === 'number') return cell.value;
    if (typeof cell.value === 'string') return cell.value;
    if (cell.formattedValue) return cell.formattedValue;

    return cell.value;
  }

  private getColumnCount(): number {
    // This should be set based on the query structure
    // For now, return a default value
    return 1;
  }

  formatResult(rawData: any): OLAPResult {
    const dimensions = this.parseAxisData(rawData.axes[0] || []);
    const measures = this.parseAxisData(rawData.axes[1] || []);
    const data = this.parseCellData(rawData.cells || []);

    return {
      data,
      metadata: {
        dimensions,
        measures,
        timestamp: Date.now()
      }
    };
  }

  validateResult(result: OLAPResult): boolean {
    if (!result.data || !Array.isArray(result.data)) return false;
    if (!result.metadata) return false;
    if (!Array.isArray(result.metadata.dimensions)) return false;
    if (!Array.isArray(result.metadata.measures)) return false;
    if (!result.metadata.timestamp) return false;

    // Validate data structure
    const rowCount = result.data.length;
    const colCount = result.data[0]?.length || 0;
    
    return result.data.every(row => row.length === colCount);
  }
}