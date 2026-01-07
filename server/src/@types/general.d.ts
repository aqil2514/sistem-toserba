export interface BasicQuery {
  page: number;
  limit: number;
  from?: string;
  to?: string;
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
