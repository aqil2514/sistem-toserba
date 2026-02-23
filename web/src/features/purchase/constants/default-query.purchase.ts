import { BasicQuery } from "@/@types/general";
import { endOfDay, startOfDay, startOfMonth } from "date-fns";

export const defaultQuery: BasicQuery = {
  page: 1,
  limit: 20,
  from: startOfMonth(startOfDay(new Date())),
  to: endOfDay(new Date()),
  sort:[
    {
      key:"purchase_date",
      value:"desc"
    }
  ]
};
