import { ValidationState, ValidationCollection } from '../../spec/DataValidation';

export function createValidation(type: ValidationState['type']): ValidationState {
  return {
    type,
    allowBlank: true,
    showInputMessage: true,
    showErrorMessage: true,
    errorStyle: 'stop'
  };
}

export function setValidationRule(
  validation: ValidationState,
  operator: ValidationState['operator'],
  value1: any,
  value2?: any
): ValidationState {
  return {
    ...validation,
    operator,
    value1,
    value2
  };
}

export function createValidationCollection(): ValidationCollection {
  return {
    validations: new Map(),
    defaultErrorStyle: 'stop',
    defaultShowInputMessage: true,
    defaultShowErrorMessage: true,
    defaultAllowBlank: true
  };
}