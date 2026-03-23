import type { ColorTheme } from '@/constants/theme';

const percentFormatter = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function formatPrice(value: number): string {
  if (!value) return ' - ';
  if (value >= 1) return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (value >= 0.0001) return `$${value.toFixed(4)}`;
  return `$${value.toFixed(6)}`;
}

export function formatPercent(value: number): string {
  if (value == null || isNaN(value)) return ' - ';
  const arrow = value > 0 ? '↑' : value < 0 ? '↓' : '';
  return `${arrow} ${percentFormatter.format(value)}%`;
}

export function percentChangeColor(value: number, colors: ColorTheme): string {
  return value > 0 ? colors.positive : value < 0 ? colors.negative : colors.neutral;
}
