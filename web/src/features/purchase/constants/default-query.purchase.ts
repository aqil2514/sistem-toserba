import { endOfDay, startOfDay } from "date-fns";
import { PurchaseQuery } from "../types/purchase-query";

export const defaultQuery: PurchaseQuery = {
  page: 1,
  limit: 20,
  from: startOfDay(new Date()),
  to: endOfDay(new Date()),
};
