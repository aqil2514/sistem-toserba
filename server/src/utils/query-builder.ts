import { endOfDayUTC, startOfDayUTC } from "./format-date";

export function applyPagination(
  client: any,
  page?: number,
  limit?: number,
) {
  if (!page || !limit) return client;

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const from = (pageNum - 1) * limitNum;
  const to = from + limitNum - 1;

  return client.range(from, to);
}

export function applyDateRangeFilter(
  client: any,
  column: string,
  from?: Date | string,
  to?: Date | string,
) {
  if (from) {
    client = client.gte(column, startOfDayUTC(from));
  }

  if (to) {
    client = client.lte(column, endOfDayUTC(to));
  }

  return client;
}


export function buildPaginationMeta(
  page?: number,
  limit?: number,
  total = 0,
) {
  const pageNum = Number(page ?? 1);
  const limitNum = Number(limit ?? 20);

  return {
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  };
}
