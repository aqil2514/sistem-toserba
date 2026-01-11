export function buildUrl<T>(
  baseUrl: string,
  endpoint: string,
  query?: T
): string {
  const url = new URL(endpoint, baseUrl);

  if (!query) return url.toString();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    // Date
    if (value instanceof Date) {
      url.searchParams.set(key, value.toISOString());
      return;
    }

    // Array
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        // Array of Date
        if (item instanceof Date) {
          url.searchParams.append(key, item.toISOString());
          return;
        }

        // Array of object (FilterState[])
        if (typeof item === "object") {
          Object.entries(item).forEach(([k, v]) => {
            if (v === undefined || v === null || v === "") return;

            const finalValue = v instanceof Date ? v.toISOString() : String(v);

            url.searchParams.append(`${key}[${index}][${k}]`, finalValue);
          });
          return;
        }

        // Array of primitive
        url.searchParams.append(key, String(item));
      });
      return;
    }

    // Object (single object)
    if (typeof value === "object") {
      Object.entries(value).forEach(([k, v]) => {
        if (v === undefined || v === null || v === "") return;

        const finalValue = v instanceof Date ? v.toISOString() : String(v);

        url.searchParams.set(`${key}[${k}]`, finalValue);
      });
      return;
    }

    // Primitive
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}
