export function formatRupiah(value: number, maximumFractionDigits: number = 0) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits,
  }).format(value);
}
