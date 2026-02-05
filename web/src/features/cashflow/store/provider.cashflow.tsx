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
import { CashflowRpcReturn } from "../types/cashflow.types";
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

  editDialog: string | null;
  setEditDialog: React.Dispatch<React.SetStateAction<string | null>>;

  deleteDialog: string | null;
  setDeleteDialog: React.Dispatch<React.SetStateAction<string | null>>;

  data: DataQueryResponse<CashflowRpcReturn[]> | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<DataQueryResponse<CashflowRpcReturn[]>>;
}

const CashflowContext = createContext<CashflowContextType>(
  {} as CashflowContextType,
);

const defaultQuery: BasicQuery = {
  limit: 10,
  page: 1,
  filters: [],
  sort: [
    {
      key: "transaction_at",
      value: "asc",
    },
  ],
  from: new Date(),
  to: new Date(),
};

export function CashflowProvider({ children }: { children: React.ReactNode }) {
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [editDialog, setEditDialog] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);
  const [query, setQuery] = useState<BasicQuery>(defaultQuery);

  // >>>>>> FETCHER AREA <<<<<<
  const url = buildUrl<BasicQuery>(SERVER_URL, "/cashflow", query);
  const fetcher = useFetch<DataQueryResponse<CashflowRpcReturn[]>>(url);

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
    editDialog,
    setEditDialog,
    deleteDialog,
    setDeleteDialog,

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
