type QueryValue = string | number | boolean | Date | undefined | null;

export type QueryObject<T extends Record<string, QueryValue>> = T;

export function buildUrl<T>(
  baseUrl: string,
  endpoint: string,
  query?: T
): string {
  const url = new URL(endpoint, baseUrl);

  if (!query) {
    return url.toString();
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (value instanceof Date) {
      url.searchParams.set(key, value.toISOString());
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return url.toString();
}
