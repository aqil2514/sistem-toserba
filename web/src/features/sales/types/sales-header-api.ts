import { SalesHeader } from "./sales-header";

export interface SalesHeaderQueryResponse {
  data: SalesHeader[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
