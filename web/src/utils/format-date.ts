const defaultOptions: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone:"UTC"
};

export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = defaultOptions
) {
  return new Intl.DateTimeFormat("id-ID", {
    ...defaultOptions,
    ...options,
  }).format(new Date(iso));
}
