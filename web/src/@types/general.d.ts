export type TemplateMode = "private" | "demo";

export interface LabelValue<T = string> {
  label: string;
  value: T;
}

export interface BasicQuery {
  page: number;
  limit: number;
  from?: Date;
  to?: Date;
  filters?: FilterState[];
  sort?: SortState[];
}

type FilterOperator = "eq" | "ilike" | "gte" | "lte";

export interface FilterState {
  key: string;
  value: string;
  operator?: FilterOperator;
}

export interface SortState {
  key: string;
  value: "asc" | "desc";
}

export interface MetaResponseQuery {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DataQueryResponse<T = unknown> {
  data: T;
  meta: MetaResponseQuery;
}
