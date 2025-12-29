import { SalesDb } from './sales.interface';

export interface SalesHeaderQueryResponse {
  data: SalesDb[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
