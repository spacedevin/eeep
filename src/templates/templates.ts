import { TemplateState } from '../../spec/Templates';

export function createTemplate(type: 'workbook' | 'worksheet' | 'range' | 'style'): TemplateState {
  return {
    type,
    content: {
      static: {
        layout: null,
        styles: null,
        formulas: null,
        validation: null
      },
      dynamic: {
        placeholders: new Map(),
        bindings: new Map()
      }
    },
    elements: {
      variables: new Map(),
      loops: [],
      conditions: []
    },
    operations: {
      load: {
        source: '',
        validate: true,
        preserveExisting: false
      },
      apply: {
        target: '',
        clearExisting: true,
        validateData: true
      },
      save: {
        format: 'xltx',
        protect: false
      }
    }
  };
}

export function addTemplateVariable(
  state: TemplateState,
  name: string,
  type: string,
  options?: {
    default?: any;
    required?: boolean;
    validation?: (value: any) => boolean;
  }
): TemplateState {
  const newVariables = new Map(state.elements.variables);
  newVariables.set(name, {
    type,
    default: options?.default,
    required: options?.required ?? false,
    validation: options?.validation
  });

  return {
    ...state,
    elements: {
      ...state.elements,
      variables: newVariables
    }
  };
}