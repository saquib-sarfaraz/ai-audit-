export const USD_TO_INR_RATE = 83; // Example conversion rate

export function convertUsdToInr(usdAmount: number): number {
  if (typeof usdAmount !== 'number' || Number.isNaN(usdAmount)) return 0;
  return usdAmount * USD_TO_INR_RATE;
}

export function formatInr(amount: number) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function compactInr(amount: number) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(amount)
}

// Keep formatUsd for secondary display or raw backend logic debugging if needed
export function formatUsd(amount: number) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount)
}

export function formatCurrency(usdAmount: number, compact = false) {
  const inrValue = convertUsdToInr(usdAmount);
  return compact ? compactInr(inrValue) : formatInr(inrValue);
}

export function formatCurrencyWithSecondary(usdAmount: number) {
  const inrValue = convertUsdToInr(usdAmount);
  const inrStr = formatInr(inrValue);
  const usdStr = formatUsd(usdAmount);
  return `${inrStr} (${usdStr})`;
}

export function clampNumber(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min
  return Math.min(max, Math.max(min, value))
}
