import React, { createContext, useContext, useState } from "react";
import { PurchaseReportQuery } from "../types/query.purchase-report";
import { endOfDay, startOfDay } from "date-fns";

interface PurchaseReportContextType {
  query: PurchaseReportQuery;
  updateQuery: <T extends keyof PurchaseReportQuery>(
    key: T,
    value: PurchaseReportQuery[T],
  ) => void;
  resetQuery: () => void;
}

const PurchaseReportContext = createContext<PurchaseReportContextType>(
  {} as PurchaseReportContextType,
);

const defaultQuery: PurchaseReportQuery = {
  limit: 10,
  content: "summary",
  page: 1,
  from: startOfDay(new Date()),
  to: endOfDay(new Date()),
  filters: [],
  sort: [],
};

export function PurchaseReportProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState<PurchaseReportQuery>(defaultQuery);

  //   >>>>>> QUERY AREA <<<<<<

  const updateQuery = <T extends keyof PurchaseReportQuery>(
    key: T,
    value: PurchaseReportQuery[T],
  ) => setQuery((prev) => ({ ...prev, [key]: value }));

  const resetQuery = () => setQuery(defaultQuery);

  const values: PurchaseReportContextType = {
    query,
    updateQuery,
    resetQuery,
  };
  return (
    <PurchaseReportContext.Provider value={values}>
      {children}
    </PurchaseReportContext.Provider>
  );
}

export const usePurchaseReport = () => useContext(PurchaseReportContext);
