export function roundToDecimals(number: number) {
  const multiplier = Math.pow(10, 2);
  return Math.round(number * multiplier) / multiplier;
}
