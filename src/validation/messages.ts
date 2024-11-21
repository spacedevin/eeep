import { ValidationState } from '../../spec/DataValidation';

export function setInputMessage(
  validation: ValidationState,
  title: string,
  message: string
): ValidationState {
  return {
    ...validation,
    inputTitle: title,
    inputMessage: message,
    showInputMessage: true
  };
}

export function setErrorMessage(
  validation: ValidationState,
  title: string,
  message: string,
  style: 'stop' | 'warning' | 'information' = 'stop'
): ValidationState {
  return {
    ...validation,
    errorTitle: title,
    error: message,
    errorStyle: style,
    showErrorMessage: true
  };
}

export function formatMessage(
  message: string,
  params: Record<string, any> = {}
): string {
  return message.replace(/\{(\w+)\}/g, (_, key) => 
    params[key]?.toString() ?? ''
  );
}

export function localizeMessage(
  message: string,
  locale: string = 'en'
): string {
  // TODO: Implement message localization
  // For now, return original message
  return message;
}
