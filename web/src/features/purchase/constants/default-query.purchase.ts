import { BasicQuery } from "@/@types/general";
import { endOfDay, startOfDay } from "date-fns";

export const defaultQuery: BasicQuery = {
  page: 1,
  limit: 20,
  from: startOfDay(new Date()),
  to: endOfDay(new Date()),
};
