import { SalesHeader } from "./sales-header";

// TODO : Audit ini. Kayaknya bisa pakek interface yang lebih fleksibel
export interface SalesHeaderQueryResponse {
  data: SalesHeader[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
