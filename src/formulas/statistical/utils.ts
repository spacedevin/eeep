import { FormulaError } from '../../errors';

export function erf(x: number): number {
  // Error function approximation
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

export function erfc(x: number): number {
  return 1 - erf(x);
}

export function erfInv(x: number): number {
  if (Math.abs(x) > 1) {
    throw new Error('Input must be between -1 and 1');
  }

  const a = 0.147;
  let y = 2 * x - 1;
  let result = 0;

  if (Math.abs(y) <= 0.7) {
    y = y * y;
    result = y * (((-25.44106049637 * y + 41.39119773534) * y + -18.61500062529) * y + 2.506628277459);
  } else {
    y = Math.sqrt(-Math.log((1 - Math.abs(x)) / 2));
    result = ((((2.65551567495 * y + 2.37409196271) * y + 1.54508134704) * y + 0.319381530047) * y + -0.356563782987) * y + 1.78107275701;
  }

  return x < 0 ? -result : result;
}

export function gammaLn(x: number): number {
  // Lanczos approximation for ln(gamma)
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

  if (x <= 0) {
    throw new Error('Input must be positive');
  }

  let y = x;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let sum = 0.999999999999975;
  
  for (let i = 0; i < p.length; i++) {
    sum += p[i] / ++y;
  }

  return -tmp + Math.log(2.5066282746310005 * sum / x);
}

export function incompleteBeta(x: number, a: number, b: number): number {
  if (x < 0 || x > 1) {
    throw new Error('x must be between 0 and 1');
  }

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

function betaCF(x: number, a: number, b: number): number {
  const maxIterations = 100;
  const epsilon = 1e-10;
  
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - qab * x / qap;
  
  if (Math.abs(d) < 1e-30) d = 1e-30;
  d = 1 / d;
  let h = d;
  
  for (let m = 1; m <= maxIterations; m++) {
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
    
    if (Math.abs(del - 1) < epsilon) break;
  }
  
  return h;
}

export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('Input must be a non-negative integer');
  }

  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

export function combinations(n: number, k: number): number {
  if (k < 0 || n < k || !Number.isInteger(n) || !Number.isInteger(k)) {
    throw new Error('Invalid input parameters');
  }

  return Math.round(
    Math.exp(gammaLn(n) - gammaLn(k) - gammaLn(n - k))
  );
}

export function permutations(n: number, k: number): number {
  if (k < 0 || n < k || !Number.isInteger(n) || !Number.isInteger(k)) {
    throw new Error('Invalid input parameters');
  }

  return Math.round(
    Math.exp(gammaLn(n) - gammaLn(n - k))
  );
}