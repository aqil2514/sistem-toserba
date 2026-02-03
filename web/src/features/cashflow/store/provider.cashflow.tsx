"use client";

import { BasicQuery, DataQueryResponse } from "@/@types/general";
import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";
import { buildUrl } from "@/utils/build-url";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { CashflowDb } from "../types/cashflow.types";
import { KeyedMutator } from "swr";

interface CashflowContextType {
  query: BasicQuery;
  updateQuery: <T extends keyof BasicQuery>(
    key: T,
    value: BasicQuery[T],
  ) => void;
  resetQuery: () => void;

  addDialog: boolean;
  setAddDialog: Dispatch<SetStateAction<boolean>>;

  data: DataQueryResponse<CashflowDb[]> | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<DataQueryResponse<CashflowDb[]>>;
}

const CashflowContext = createContext<CashflowContextType>(
  {} as CashflowContextType,
);

const defaultQuery: BasicQuery = {
  limit: 10,
  page: 1,
  filters: [],
  sort: [],
  from: new Date(),
  to: new Date(),
};

export function CashflowProvider({ children }: { children: React.ReactNode }) {
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [query, setQuery] = useState<BasicQuery>(defaultQuery);

  // >>>>>> FETCHER AREA <<<<<<
  const url = buildUrl<BasicQuery>(SERVER_URL, "/cashflow", query);
  const fetcher = useFetch<DataQueryResponse<CashflowDb[]>>(url);

  //   >>>>>> QUERY AREA <<<<<<

  const updateQuery = <T extends keyof BasicQuery>(
    key: T,
    value: BasicQuery[T],
  ) => setQuery((prev) => ({ ...prev, [key]: value }));

  const resetQuery = () => setQuery(defaultQuery);

  const values: CashflowContextType = {
    ...fetcher,

    addDialog,
    setAddDialog,

    query,
    resetQuery,
    updateQuery,
  };
  return (
    <CashflowContext.Provider value={values}>
      {children}
    </CashflowContext.Provider>
  );
}

export const useCashflow = () => useContext(CashflowContext);
