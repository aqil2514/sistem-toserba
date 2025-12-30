import { endOfDay, startOfDay } from "date-fns";
import { SalesQuery } from "../types/query";

export const defaultQuery: SalesQuery = {
  page: 1,
  limit: 20,
  from: startOfDay(new Date()),
  to: endOfDay(new Date()),
  toggleColumnKey: "customer_name",
};
