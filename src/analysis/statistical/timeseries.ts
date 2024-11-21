import { StatisticalState } from '../../../spec/Statistical';

export function movingAverage(data: number[], window: number): number[] {
  if (window < 1 || window > data.length) {
    throw new Error('Invalid window size');
  }

  const result = [];
  for (let i = 0; i <= data.length - window; i++) {
    const sum = data.slice(i, i + window).reduce((a, b) => a + b, 0);
    result.push(sum / window);
  }
  return result;
}

export function exponentialSmoothing(
  data: number[],
  alpha: number,
  beta?: number,
  gamma?: number,
  period?: number
): number[] {
  if (alpha < 0 || alpha > 1) {
    throw new Error('Alpha must be between 0 and 1');
  }

  if (beta !== undefined && (beta < 0 || beta > 1)) {
    throw new Error('Beta must be between 0 and 1');
  }

  if (gamma !== undefined && (gamma < 0 || gamma > 1)) {
    throw new Error('Gamma must be between 0 and 1');
  }

  // Simple exponential smoothing
  if (beta === undefined) {
    const result = [data[0]];
    for (let i = 1; i < data.length; i++) {
      result[i] = alpha * data[i] + (1 - alpha) * result[i - 1];
    }
    return result;
  }

  // Double exponential smoothing (Holt's method)
  if (gamma === undefined || period === undefined) {
    const level = [data[0]];
    const trend = [data[1] - data[0]];
    const result = [data[0]];

    for (let i = 1; i < data.length; i++) {
      level[i] = alpha * data[i] + (1 - alpha) * (level[i - 1] + trend[i - 1]);
      trend[i] = beta * (level[i] - level[i - 1]) + (1 - beta) * trend[i - 1];
      result[i] = level[i] + trend[i];
    }
    return result;
  }

  // Triple exponential smoothing (Holt-Winters' method)
  const level = [data[0]];
  const trend = [data[1] - data[0]];
  const seasonal = Array(period).fill(0);
  const result = [data[0]];

  // Initialize seasonal indices
  for (let i = 0; i < period; i++) {
    let sum = 0;
    let count = 0;
    for (let j = i; j < data.length; j += period) {
      sum += data[j];
      count++;
    }
    seasonal[i] = sum / count;
  }

  for (let i = 1; i < data.length; i++) {
    const s = i % period;
    level[i] = alpha * (data[i] / seasonal[s]) + (1 - alpha) * (level[i - 1] + trend[i - 1]);
    trend[i] = beta * (level[i] - level[i - 1]) + (1 - beta) * trend[i - 1];
    seasonal[s] = gamma * (data[i] / level[i]) + (1 - gamma) * seasonal[s];
    result[i] = (level[i] + trend[i]) * seasonal[s];
  }

  return result;
}

export function detectSeasonality(data: number[], maxPeriod: number = 52): number | null {
  if (data.length < maxPeriod * 2) {
    return null;
  }

  let bestPeriod = null;
  let minVariance = Infinity;

  // Try different periods
  for (let period = 2; period <= maxPeriod; period++) {
    const seasonal = Array(period).fill(0);
    const counts = Array(period).fill(0);

    // Calculate average for each season
    for (let i = 0; i < data.length; i++) {
      const idx = i % period;
      seasonal[idx] += data[i];
      counts[idx]++;
    }

    for (let i = 0; i < period; i++) {
      seasonal[i] /= counts[i];
    }

    // Calculate variance of deseasonalized data
    let variance = 0;
    for (let i = 0; i < data.length; i++) {
      const deseasonalized = data[i] / seasonal[i % period];
      variance += Math.pow(deseasonalized - 1, 2);
    }
    variance /= data.length;

    if (variance < minVariance) {
      minVariance = variance;
      bestPeriod = period;
    }
  }

  return bestPeriod;
}

export function analyzeTrend(data: number[]): {
  trend: number[];
  slope: number;
  intercept: number;
} {
  const x = Array.from({ length: data.length }, (_, i) => i);
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  
  for (let i = 0; i < data.length; i++) {
    sumX += x[i];
    sumY += data[i];
    sumXY += x[i] * data[i];
    sumX2 += x[i] * x[i];
  }
  
  const n = data.length;
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  const trend = x.map(xi => slope * xi + intercept);
  
  return { trend, slope, intercept };
}

export class ARIMAModel {
  private p: number; // AR order
  private d: number; // Difference order
  private q: number; // MA order
  private coefficients: number[] = [];

  constructor(p: number, d: number, q: number) {
    this.p = p;
    this.d = d;
    this.q = q;
  }

  fit(data: number[]): void {
    // Difference the data
    let diffData = this.difference(data, this.d);

    // Estimate AR coefficients
    const arCoeffs = this.estimateAR(diffData);

    // Estimate MA coefficients
    const residuals = this.getResiduals(diffData, arCoeffs);
    const maCoeffs = this.estimateMA(residuals);

    this.coefficients = [...arCoeffs, ...maCoeffs];
  }

  forecast(steps: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < steps; i++) {
      result.push(this.forecastOne(result));
    }
    return result;
  }

  private difference(data: number[], order: number): number[] {
    let result = [...data];
    for (let i = 0; i < order; i++) {
      const temp = [];
      for (let j = 1; j < result.length; j++) {
        temp.push(result[j] - result[j - 1]);
      }
      result = temp;
    }
    return result;
  }

  private estimateAR(data: number[]): number[] {
    // Yule-Walker equations could be used here
    // This is a simplified implementation
    const coeffs = [];
    for (let i = 0; i < this.p; i++) {
      coeffs.push(0.1); // Placeholder coefficients
    }
    return coeffs;
  }

  private estimateMA(residuals: number[]): number[] {
    // Maximum likelihood estimation could be used here
    // This is a simplified implementation
    const coeffs = [];
    for (let i = 0; i < this.q; i++) {
      coeffs.push(0.1); // Placeholder coefficients
    }
    return coeffs;
  }

  private getResiduals(data: number[], arCoeffs: number[]): number[] {
    const residuals = [];
    for (let i = arCoeffs.length; i < data.length; i++) {
      let predicted = 0;
      for (let j = 0; j < arCoeffs.length; j++) {
        predicted += arCoeffs[j] * data[i - j - 1];
      }
      residuals.push(data[i] - predicted);
    }
    return residuals;
  }

  private forecastOne(previous: number[]): number {
    let forecast = 0;
    for (let i = 0; i < this.coefficients.length; i++) {
      forecast += this.coefficients[i] * (previous[previous.length - i - 1] || 0);
    }
    return forecast;
  }
}