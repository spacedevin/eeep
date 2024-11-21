import { StatisticalState } from '../../../spec/Statistical';

export function pearsonCorrelation(x: number[], y: number[]): {
  coefficient: number;
  pValue: number;
} {
  if (x.length !== y.length || x.length < 2) {
    throw new Error('Arrays must have the same length and contain at least 2 points');
  }

  const n = x.length;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;
  
  let numerator = 0;
  let denominatorX = 0;
  let denominatorY = 0;
  
  for (let i = 0; i < n; i++) {
    const xDiff = x[i] - meanX;
    const yDiff = y[i] - meanY;
    numerator += xDiff * yDiff;
    denominatorX += xDiff * xDiff;
    denominatorY += yDiff * yDiff;
  }
  
  const r = numerator / Math.sqrt(denominatorX * denominatorY);
  
  // Calculate p-value using t-distribution
  const t = r * Math.sqrt((n - 2) / (1 - r * r));
  const pValue = 2 * (1 - tCDF(Math.abs(t), n - 2));

  return {
    coefficient: r,
    pValue
  };
}

export function spearmanCorrelation(x: number[], y: number[]): {
  coefficient: number;
  pValue: number;
} {
  if (x.length !== y.length || x.length < 2) {
    throw new Error('Arrays must have the same length and contain at least 2 points');
  }

  // Convert values to ranks
  const xRanks = calculateRanks(x);
  const yRanks = calculateRanks(y);

  // Use Pearson correlation on ranks
  return pearsonCorrelation(xRanks, yRanks);
}

export function kendallCorrelation(x: number[], y: number[]): {
  coefficient: number;
  pValue: number;
} {
  if (x.length !== y.length || x.length < 2) {
    throw new Error('Arrays must have the same length and contain at least 2 points');
  }

  const n = x.length;
  let concordant = 0;
  let discordant = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      const xDiff = x[j] - x[i];
      const yDiff = y[j] - y[i];
      if (xDiff * yDiff > 0) concordant++;
      else if (xDiff * yDiff < 0) discordant++;
    }
  }

  const tau = (concordant - discordant) / (n * (n - 1) / 2);
  
  // Calculate p-value using normal approximation
  const var0 = (4 * n + 10) / (9 * n * (n - 1));
  const z = tau / Math.sqrt(var0);
  const pValue = 2 * (1 - normalCDF(Math.abs(z), 0, 1));

  return {
    coefficient: tau,
    pValue
  };
}

// Helper functions
function calculateRanks(values: number[]): number[] {
  const sorted = values.map((v, i) => ({ value: v, index: i }))
    .sort((a, b) => a.value - b.value);
  
  const ranks = new Array(values.length);
  let currentRank = 1;
  
  for (let i = 0; i < sorted.length; i++) {
    let tieCount = 1;
    while (i + tieCount < sorted.length && sorted[i + tieCount].value === sorted[i].value) {
      tieCount++;
    }
    
    const averageRank = currentRank + (tieCount - 1) / 2;
    for (let j = 0; j < tieCount; j++) {
      ranks[sorted[i + j].index] = averageRank;
    }
    
    currentRank += tieCount;
    i += tieCount - 1;
  }
  
  return ranks;
}

function tCDF(t: number, df: number): number {
  // Approximation of t-distribution CDF
  const x = df / (df + t * t);
  return 1 - 0.5 * incompleteBeta(x, df/2, 0.5);
}

function normalCDF(x: number, mean: number, stdDev: number): number {
  const z = (x - mean) / (stdDev * Math.sqrt(2));
  return 0.5 * (1 + erf(z));
}

function erf(x: number): number {
  // Approximation of error function
  const t = 1 / (1 + 0.5 * Math.abs(x));
  const tau = t * Math.exp(-x * x - 1.26551223 + 1.00002368 * t + 0.37409196 * t * t + 
    0.09678418 * Math.pow(t, 3) - 0.18628806 * Math.pow(t, 4) + 
    0.27886807 * Math.pow(t, 5) - 1.13520398 * Math.pow(t, 6) + 
    1.48851587 * Math.pow(t, 7) - 0.82215223 * Math.pow(t, 8) + 
    0.17087277 * Math.pow(t, 9));
  return x >= 0 ? 1 - tau : tau - 1;
}

function incompleteBeta(x: number, a: number, b: number): number {
  // Approximation of incomplete beta function
  if (x === 0) return 0;
  if (x === 1) return 1;
  
  const bt = Math.exp(
    gammaLn(a + b) - gammaLn(a) - gammaLn(b) + 
    a * Math.log(x) + b * Math.log(1 - x)
  );
  
  if (x < (a + 1) / (a + b + 2)) {
    return bt * betaCF(x, a, b) / a;
  }
  return 1 - bt * betaCF(1 - x, b, a) / b;
}

function gammaLn(x: number): number {
  // Approximation of log gamma function
  const c = [
    76.18009172947146,
    -86.50532032941677,
    24.01409824083091,
    -1.231739572450155,
    0.1208650973866179e-2,
    -0.5395239384953e-5
  ];
  
  let y = x;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (let j = 0; j <= 5; j++) {
    ser += c[j] / ++y;
  }
  return -tmp + Math.log(2.5066282746310005 * ser / x);
}

function betaCF(x: number, a: number, b: number): number {
  // Continued fraction for incomplete beta function
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - qab * x / qap;
  if (Math.abs(d) < 1e-30) d = 1e-30;
  d = 1 / d;
  let h = d;
  
  for (let m = 1; m <= 100; m++) {
    const m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = 1 + aa / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    h *= d * c;
    
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = 1 + aa / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    const del = d * c;
    h *= del;
    
    if (Math.abs(del - 1) < 3e-7) break;
  }
  
  return h;
}