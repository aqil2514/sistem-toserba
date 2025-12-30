export function formatNumber(data: number) {
  return new Intl.NumberFormat().format(data);
}
