import { LocalizationState } from '../../spec/Localization';

export function createLocalization(language: string, country?: string): LocalizationState {
  return {
    culture: {
      language,
      country,
      calendar: 'gregorian',
      firstDayOfWeek: 0
    },
    numberFormat: {
      decimalSeparator: '.',
      groupSeparator: ',',
      currencySymbol: '$',
      percentSymbol: '%',
      negativePattern: '-#',
      decimalDigits: 2,
      groupSizes: [3]
    },
    dateFormat: {
      shortDate: 'MM/dd/yyyy',
      longDate: 'dddd, MMMM dd, yyyy',
      shortTime: 'HH:mm',
      longTime: 'HH:mm:ss',
      monthNames: [],
      monthNamesShort: [],
      dayNames: [],
      dayNamesShort: [],
      amDesignator: 'AM',
      pmDesignator: 'PM',
      dateSeparator: '/',
      timeSeparator: ':'
    },
    customFormats: new Map(),
    resources: new Map()
  };
}

export function addCustomFormat(state: LocalizationState, key: string, format: string, culture?: string): LocalizationState {
  return {
    ...state,
    customFormats: new Map(state.customFormats).set(key, {
      format,
      culture
    })
  };
}