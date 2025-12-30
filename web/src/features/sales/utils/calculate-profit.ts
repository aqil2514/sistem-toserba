export function calculateProfit(omzet: number, hpp: number) {
  const margin = omzet - hpp;

  const marginPercent = omzet === 0 ? 0 : margin / omzet;

  const markupPercent = hpp === 0 ? 0 : margin / hpp;

  return {
    margin,
    markup: margin,
    marginPercent,
    markupPercent,
  };
}
