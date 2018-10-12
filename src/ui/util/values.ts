import { memoize } from "lodash";
import { Theme } from "../../core/frontend/Theme";

const fib = memoize((x): number => x < 1 ? 1 : x + fib(x - 1))

export function spacing(theme: Theme, level: number) {
  return fib(level) * theme.spacing.unit
}

export function list(...values: any[]) {
  return values.join(' ')
}

export function unitList(u: string, ...values: any[]) {
  return values.map(val => (typeof val === 'string') ? val : val.toString() + u).join(' ')
}

export const transparent = 'rgba(0,0,0,0)'
