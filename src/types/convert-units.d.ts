declare module 'convert-units' {
  interface Converter {
    [category: string]: (value: number, fromUnit: string, toUnit: string) => number;
  }

  const convert: Converter & {
    (value: number): {
      from: (unit: string) => {
        to: (unit: string) => number;
      };
    };
  };

  export = convert;
}