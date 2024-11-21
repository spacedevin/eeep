export interface DataTypeState {
  type: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'accounting' | 'fraction' | 'special';
  format: string;
  validation?: {
    type: string;
    params: any[];
    errorMessage?: string;
  };
  conversion?: {
    targetType: string;
    preserveFormat?: boolean;
    errorHandling?: 'throw' | 'default' | 'preserve';
  };
  locale?: string;
  customFormat?: {
    positive?: string;
    negative?: string;
    zero?: string;
    text?: string;
  };
}

export interface NumberTypeState extends DataTypeState {
  type: 'number';
  format: string;
  precision?: number;
  useScientific?: boolean;
  roundingMode?: 'up' | 'down' | 'ceiling' | 'floor' | 'halfUp' | 'halfDown' | 'halfEven';
}

export interface DateTypeState extends DataTypeState {
  type: 'date';
  format: string;
  calendar?: 'gregorian' | 'lunar';
  timeZone?: string;
}

export interface CurrencyTypeState extends DataTypeState {
  type: 'currency';
  format: string;
  symbol: string;
  symbolPosition: 'before' | 'after';
  decimalPlaces: number;
  useAccountingFormat?: boolean;
}

export interface FractionTypeState extends DataTypeState {
  type: 'fraction';
  format: string;
  maxDenominator?: number;
  mixedNumbers?: boolean;
}

export interface SpecialTypeState extends DataTypeState {
  type: 'special';
  format: string;
  mask?: string;
  placeholder?: string;
  literals?: string[];
}