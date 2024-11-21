import { StructuredReferenceState } from '../../spec/StructuredReferences';

export function createStructuredReference(table: string): StructuredReferenceState {
  return {
    reference: {
      table
    },
    syntax: {
      format: 'modern',
      validation: {
        validateNames: true,
        caseSensitive: false,
        allowSpaces: true
      },
      parsing: {
        delimiter: ',',
        escapeChar: '\'',
        specialItems: new Set(['@', '#All', '#Data', '#Headers', '#Totals', '#This Row'])
      }
    },
    resolution: {
      mode: 'dynamic',
      cache: {
        enabled: true,
        duration: 60000
      },
      context: {
        currentRow: undefined,
        currentColumn: undefined,
        scope: undefined
      }
    },
    tracking: {
      dependencies: new Map(),
      updates: {
        onTableChange: true,
        onColumnRename: true,
        onStructureChange: true
      },
      validation: {
        checkReferences: true,
        checkCircular: true,
        checkScope: true
      }
    }
  };
}

export function addColumnReference(
  state: StructuredReferenceState,
  column: string,
  operator?: 'sum' | 'average' | 'count' | 'custom'
): StructuredReferenceState {
  return {
    ...state,
    reference: {
      ...state.reference,
      column,
      operator
    }
  };
}