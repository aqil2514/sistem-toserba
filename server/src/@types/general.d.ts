export interface BasicQuery {
  page: number;
  limit: number;
  from?: string;
  to?: string;
  filters?: FilterState[];
  sort?: SortState[];
}

type FilterOperator = 'eq' | 'ilike' | 'gte' | 'lte';

export interface FilterState {
  key: string;
  value: string;
  operator?: FilterOperator;
}

export interface SortState {
  key: string;
  value: "asc" | "desc";
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
