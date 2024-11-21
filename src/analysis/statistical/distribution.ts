import { StatisticalState } from '../../../spec/Statistical';

export function normalDistribution(x: number, mean: number, stdDev: number): number {
  const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
  return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
}

export function normalCDF(x: number, mean: number, stdDev: number): number {
  const z = (x - mean) / (stdDev * Math.sqrt(2));
  return 0.5 * (1 + erf(z));
}

export function tDistribution(x: number, degreesOfFreedom: number): number {
  const numerator = gamma((degreesOfFreedom + 1) / 2);
  const denominator = Math.sqrt(degreesOfFreedom * Math.PI) * gamma(degreesOfFreedom / 2);
  const base = 1 + (x * x) / degreesOfFreedom;
  return (numerator / denominator) * Math.pow(base, -(degreesOfFreedom + 1) / 2);
}

export function chiSquareDistribution(x: number, degreesOfFreedom: number): number {
  if (x <= 0) return 0;
  const halfDf = degreesOfFreedom / 2;
  return (Math.pow(x, halfDf - 1) * Math.exp(-x / 2)) / (Math.pow(2, halfDf) * gamma(halfDf));
}

export function fDistribution(x: number, d1: number, d2: number): number {
  if (x <= 0) return 0;
  const numerator = Math.sqrt(Math.pow(d1 * x, d1) * Math.pow(d2, d2));
  const denominator = Math.sqrt(Math.pow(d1 * x + d2, d1 + d2));
  return numerator / denominator;
}

// Helper functions
function erf(x: number): number {
  // Approximation of the error function
  const t = 1 / (1 + 0.5 * Math.abs(x));
  const tau = t * Math.exp(-x * x - 1.26551223 + 1.00002368 * t + 0.37409196 * t * t + 
    0.09678418 * Math.pow(t, 3) - 0.18628806 * Math.pow(t, 4) + 
    0.27886807 * Math.pow(t, 5) - 1.13520398 * Math.pow(t, 6) + 
    1.48851587 * Math.pow(t, 7) - 0.82215223 * Math.pow(t, 8) + 
    0.17087277 * Math.pow(t, 9));
  return x >= 0 ? 1 - tau : tau - 1;
}

function gamma(z: number): number {
  // Lanczos approximation for the gamma function
  if (z < 0.5) {
    return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  }
  
  z -= 1;
  const p = [
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7
  ];
  
  let x = 0.99999999999980993;
  for (let i = 0; i < p.length; i++) {
    x += p[i] / (z + i + 1);
  }
  
  const t = z + p.length - 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}