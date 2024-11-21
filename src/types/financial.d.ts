declare module 'financial' {
  export type PaymentDueTime = 0 | 1;

  export function ipmt(
    rate: number,
    period: number,
    periods: number,
    present: number,
    future?: number,
    type?: PaymentDueTime
  ): number;

  export function ppmt(
    rate: number,
    period: number,
    periods: number,
    present: number,
    future?: number,
    type?: PaymentDueTime
  ): number;
}