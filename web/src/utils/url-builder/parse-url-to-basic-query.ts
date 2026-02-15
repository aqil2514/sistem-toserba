import { BasicQuery, FilterOperator } from "@/@types/general";
import { startOfMonth } from "date-fns";

export function parseSearchParamsToBasicQuery(
  searchParams: URLSearchParams,
): BasicQuery {
  return {
    limit: Number(searchParams.get("limit") ?? 10),
    page: Number(searchParams.get("page") ?? 1),
    from: searchParams.get("from")
      ? new Date(searchParams.get("from")!)
      : startOfMonth(new Date()),
    to: searchParams.get("to") ? new Date(searchParams.get("to")!) : new Date(),
    filters: searchParams.getAll("filter").map((f) => {
      const value = f.split(":");
      return {
        key: value[0],
        operator: value[1] as FilterOperator,
        value: value[2],
      };
    }),
    sort: searchParams.getAll("sort").map((s) => {
      const [key, value] = s.split(":");
      return { key, value: value as "asc" | "desc" };
    }),
  };
}

export function mergeQueryWithDefaults(
  defaults: BasicQuery,
  searchParams: URLSearchParams,
): BasicQuery {
  return {
    limit: Number(searchParams.get("limit") ?? defaults.limit),
    page: Number(searchParams.get("page") ?? defaults.page),

    from: searchParams.get("from")
      ? new Date(searchParams.get("from")!)
      : defaults.from,

    to: searchParams.get("to")
      ? new Date(searchParams.get("to")!)
      : defaults.to,

    filters: searchParams.getAll("filter").length
      ? searchParams.getAll("filter").map((f) => {
          const value = f.split(":");
          return {
            key: value[0],
            operator: value[1] as FilterOperator,
            value: value[2],
          };
        })
      : defaults.filters,

    sort: searchParams.getAll("sort").length
      ? searchParams.getAll("sort").map((s) => {
          const [key, value] = s.split(":");
          return { key, value: value as "asc" | "desc" };
        })
      : defaults.sort,
  };
}
