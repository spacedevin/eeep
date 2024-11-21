import { StatisticalState } from '../../../spec/Statistical';

export function calculateMean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export function calculateMode(values: number[]): number[] {
  if (values.length === 0) return [];
  
  const counts = new Map<number, number>();
  let maxCount = 0;
  
  values.forEach(val => {
    const count = (counts.get(val) || 0) + 1;
    counts.set(val, count);
    maxCount = Math.max(maxCount, count);
  });
  
  return Array.from(counts.entries())
    .filter(([_, count]) => count === maxCount)
    .map(([value]) => value);
}

export function calculateVariance(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = calculateMean(values);
  return values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (values.length - 1);
}

export function calculateStandardDeviation(values: number[]): number {
  return Math.sqrt(calculateVariance(values));
}

export function calculateSkewness(values: number[]): number {
  if (values.length < 3) return 0;
  const mean = calculateMean(values);
  const std = calculateStandardDeviation(values);
  const n = values.length;
  
  const m3 = values.reduce((sum, val) => sum + Math.pow(val - mean, 3), 0) / n;
  return m3 / Math.pow(std, 3);
}

export function calculateKurtosis(values: number[]): number {
  if (values.length < 4) return 0;
  const mean = calculateMean(values);
  const std = calculateStandardDeviation(values);
  const n = values.length;
  
  const m4 = values.reduce((sum, val) => sum + Math.pow(val - mean, 4), 0) / n;
  return m4 / Math.pow(std, 4) - 3;
}