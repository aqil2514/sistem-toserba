import { startOfDay } from "date-fns";
import { BasicQuery } from "@/@types/general";

export const defaultQuery: BasicQuery = {
  limit: 10,
  page: 1,
  from: startOfDay(new Date()),
  to: startOfDay(new Date()),
  filters: [],
  sort: [
    {
      key: "transaction_at",
      value: "desc",
    },
  ],
};