import { DateRange } from "react-day-picker";

export interface SalesQuery {
  page: number;
  limit: number;
  date: DateRange;
}
