import { FilterState, SortState } from "@/@types/general";

type PrimitiveValue = number | string | boolean;
type QueryValue =
  | PrimitiveValue
  | Date
  | Array<PrimitiveValue | Date>
  | undefined
  | null;

export interface BuildUrlClientOptions {
  endpoint: string;
  base?: string;
  query?: Record<string, QueryValue>;
  filters?: FilterState[];
  sorts?: SortState[];
}

const isPrimitiveValue = (value: unknown): value is PrimitiveValue => {
  const type = typeof value;
  return type === "string" || type === "number" || type === "boolean";
};

export function buildUrlClient(options: BuildUrlClientOptions) {
  const { endpoint, base, query, filters, sorts } = options;
  const baseUrl = base ?? (process.env.NEXT_PUBLIC_WEB_URL as string);
  const url = new URL(endpoint, baseUrl);

  if (query) {
    const queryEntries = Object.entries(query);

    for (const [key, value] of queryEntries) {
      if (value === undefined || value === null) continue;

      if (isPrimitiveValue(value)) {
        handlePrimitiveValue(url, key, value);
        continue;
      }

      if (value instanceof Date) {
        handleDateValue(url, key, value);
        continue;
      }

      if (Array.isArray(value)) {
        handleArrayValue(url, key, value);
        continue;
      }
    }
  }

  if (filters) handleFilterValue(url, filters);
  if (sorts) handleSortState(url, sorts);

  return url.toString();
}

const handlePrimitiveValue = (
  url: URL,
  key: string,
  value: PrimitiveValue,
  append: boolean = false,
) => {
  if (append) return url.searchParams.append(key, String(value));
  url.searchParams.set(key, String(value));
};

const handleDateValue = (
  url: URL,
  key: string,
  value: Date,
  append: boolean = false,
) => {
  if (append) return url.searchParams.append(key, value.toISOString());
  url.searchParams.set(key, value.toISOString());
};

const handleArrayValue = (
  url: URL,
  key: string,
  values: Array<PrimitiveValue | Date>,
) => {
  values.forEach((value) => {
    if (value instanceof Date) handleDateValue(url, key, value, true);
    else handlePrimitiveValue(url, key, value, true);
  });
};

const handleFilterValue = (url: URL, values: FilterState[]) => {
  values.forEach((value) => {
    const val = `${value.key}:${value.operator ?? "eq"}:${value.value}`;
    url.searchParams.append("filter", val);
  });
};

const handleSortState = (url: URL, values: SortState[]) => {
  values.forEach((value) => {
    const val = `${value.key}:${value.value}`;
    url.searchParams.append("sort", val);
  });
};
