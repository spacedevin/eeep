import { XMLDataBindingState } from '../../spec/XMLDataBinding';

export function createXMLDataBinding(): XMLDataBindingState {
  return {
    bindings: new Map(),
    mapping: {
      types: new Map(),
      formats: new Map(),
      custom: new Map()
    },
    validation: {
      schema: {
        enabled: true,
        mode: 'strict'
      },
      types: {
        validateSource: true,
        validateTarget: true,
        coerce: true
      }
    },
    operations: {
      load: {
        validateFirst: true,
        clearExisting: false,
        errorHandling: 'throw'
      },
      save: {
        validateFirst: true,
        format: true,
        indent: true
      },
      refresh: {
        mode: 'full',
        cascade: true
      }
    },
    management: {
      namespaces: new Map()
    }
  };
}

export function addBinding(
  state: XMLDataBindingState,
  xpath: string,
  reference: string,
  options?: {
    direction?: 'oneWay' | 'twoWay';
    format?: string;
  }
): XMLDataBindingState {
  const newBindings = new Map(state.bindings);
  newBindings.set(reference, {
    type: 'cell',
    source: {
      xpath,
      type: 'string'
    },
    target: {
      reference,
      type: 'string',
      format: options?.format
    },
    direction: options?.direction || 'oneWay',
    update: 'auto'
  });

  return {
    ...state,
    bindings: newBindings
  };
}