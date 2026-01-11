import { DateTime } from 'luxon';
import { DataQueryResponse, FilterState } from '../@types/general';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

export function applyPagination(client: PostgrestFilterBuilder<any, any, any, any>, page?: number, limit?: number) {
  if (!page || !limit) return client;

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const from = (pageNum - 1) * limitNum;
  const to = from + limitNum - 1;

  return client.range(from, to);
}

export function applyDateRangeFilter(
  client: PostgrestFilterBuilder<any, any, any, any>,
  column: string,
  from?: string,
  to?: string,
) {
  if (from) {
    const startUtc = DateTime.fromISO(from, {
      zone: 'Asia/Jakarta',
    })
      .startOf('day')
      .toUTC()
      .toISO();

    client = client.gte(column, startUtc);
  }

  if (to) {
    const endUtc = DateTime.fromISO(to, {
      zone: 'Asia/Jakarta',
    })
      .endOf('day')
      .toUTC()
      .toISO();

    client = client.lte(column, endUtc);
  }

  return client;
}

export function applyFilterState(
  client: PostgrestFilterBuilder<any, any, any, any>,
  filter: FilterState,
) {
  const { key, value, operator = 'ilike' } = filter;

  if (!key || !value) return client;

  switch (operator) {
    case 'ilike':
      return client.ilike(key, `%${value}%`);
    case 'gte':
      return client.gte(key, value);
    case 'lte':
      return client.lte(key, value);
    default:
      return client.eq(key, value);
  }
}

export function buildPaginationMeta(
  page?: number,
  limit?: number,
  total = 0,
): DataQueryResponse['meta'] {
  const pageNum = Number(page ?? 1);
  const limitNum = Number(limit ?? 20);

  return {
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  };
}
