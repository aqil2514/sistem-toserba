export interface BasicQuery {
  page: number;
  limit: number;
  from?: string;
  to?: string;
}

type FilterOperator = 'eq' | 'ilike' | 'gte' | 'lte';

export interface FilterState {
  key: string;
  value: string;
  operator?: FilterOperator;
}

export interface DataQueryResponse<T = unknown> {
  data: T;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
