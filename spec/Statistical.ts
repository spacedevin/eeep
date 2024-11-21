export interface StatisticalState {
  descriptive: {
    mean?: number;
    median?: number;
    mode?: number[];
    standardDeviation?: number;
    variance?: number;
    skewness?: number;
    kurtosis?: number;
    range?: {
      min: number;
      max: number;
    };
  };
  
  distributions: {
    normal?: {
      mean: number;
      standardDeviation: number;
      values: number[];
    };
    t?: {
      degreesOfFreedom: number;
      values: number[];
    };
    chiSquare?: {
      degreesOfFreedom: number;
      values: number[];
    };
    f?: {
      degreesOfFreedom1: number;
      degreesOfFreedom2: number;
      values: number[];
    };
  };
  
  regression?: {
    type: 'linear' | 'multiple' | 'polynomial' | 'logistic';
    coefficients: number[];
    rSquared: number;
    standardError: number;
    predictions: number[];
  };
  
  correlation?: {
    type: 'pearson' | 'spearman' | 'kendall';
    coefficient: number;
    pValue: number;
    sampleSize: number;
  };
  
  timeSeries?: {
    data: number[];
    trend?: number[];
    seasonal?: number[];
    residual?: number[];
    forecast?: number[];
    confidence?: {
      upper: number[];
      lower: number[];
    };
  };
}