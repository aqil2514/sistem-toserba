import { SalesQuery } from "../types/query";

export const defaultQuery: SalesQuery = {
  page: 1,
  limit: 20,
  date: {
    from: new Date(),
  },
};
