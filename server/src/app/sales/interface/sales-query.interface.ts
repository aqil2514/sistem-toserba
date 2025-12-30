export interface SalesQuery {
  page: number;
  limit: number;
  from: Date | undefined;
  to?: Date | undefined;
}
