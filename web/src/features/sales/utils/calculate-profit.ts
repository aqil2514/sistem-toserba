export function calculateProfit(
  omzet: number,
  hpp: number,
  discount: number = 0,
  tip: number = 0
) {
  const margin = (omzet + tip) - (hpp + discount);

  const marginPercent = omzet === 0 ? 0 : margin / omzet;

  const markupPercent = hpp === 0 ? 0 : margin / hpp;

  return {
    margin,
    markup: margin,
    marginPercent,
    markupPercent,
  };
}
