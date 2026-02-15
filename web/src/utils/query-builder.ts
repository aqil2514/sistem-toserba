import { BasicQuery, FilterState, SortState } from "@/@types/general";

/* ===================================== */
/* SERIALIZE */
/* ===================================== */

export function serializeBasicQuery<K extends keyof BasicQuery>(
  key: K,
  value: BasicQuery[K],
): string | null {
  if (value == null) return null;

  if (value instanceof Date) return value.toISOString();

  if (typeof value === "number") return value.toString();

  if (Array.isArray(value)) return JSON.stringify(value);

  return String(value);
}

/* ===================================== */
/* PARSE WHOLE QUERY */
/* ===================================== */

export function parseBasicQuery(searchParams: URLSearchParams): BasicQuery {
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");
  const filtersParam = searchParams.get("filters");
  const sortParam = searchParams.get("sort");

  let filters: FilterState[] | undefined;
  let sort: SortState[] | undefined;

  try {
    if (filtersParam) {
      filters = JSON.parse(filtersParam);
    }
  } catch {
    filters = undefined;
  }

  try {
    if (sortParam) {
      sort = JSON.parse(sortParam);
    }
  } catch {
    sort = undefined;
  }

  return {
    page,
    limit,
    ...(fromParam && { from: new Date(fromParam) }),
    ...(toParam && { to: new Date(toParam) }),
    ...(filters && { filters }),
    ...(sort && { sort }),
  };
}
