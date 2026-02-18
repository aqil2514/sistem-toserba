export type TemplateMode = "private" | "demo";

export interface LabelValue<T = string> {
  label: string;
  value: T;
}

export interface LabelValueWithColor<T = string> extends LabelValue<T> {
  color: string;
}

export interface BasicQuery {
  page: number;
  limit: number;
  from?: Date;
  to?: Date;
  filters?: FilterState[];
  sort?: SortState[];
}

type FilterOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "ilike"
  | "not_ilike"
  | "is_null"
  | "is_not_null";

export interface FilterState {
  key: string;
  value: string;
  operator?: FilterOperator;
}

export interface SortState {
  key: string;
  value: "asc" | "desc";
}

export interface BaseMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DataQueryResponse<T = unknown> {
  data: T;
  meta: BaseMeta;
}

export interface DataQueryResponseWithMode<
  T = unknown,
  M extends string = string,
> extends DataQueryResponse<T> {
  mode: M;
}
