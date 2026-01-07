import { KeyedMutator } from "swr";
import { Purchase } from "../types/purchase";
import React, { createContext, useContext, useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { PurchaseQuery } from "../types/purchase-query";
import { defaultQuery } from "../constants/default-query.purchase";
import { buildUrl } from "@/utils/build-url";
import { DataQueryResponse } from "@/@types/general";

interface PurchaseContextType {
  isLoading: boolean;
  data: DataQueryResponse<Purchase[]> | undefined;
  error?: Error;
  mutate?: KeyedMutator<DataQueryResponse<Purchase[]>>;

  query: PurchaseQuery;
  updateQuery: <T extends keyof PurchaseQuery>(
    key: T,
    value: PurchaseQuery[T]
  ) => void;
  resetQuery: () => void;

  detailPurchaseId: string;
  setDetailPurchaseId: React.Dispatch<React.SetStateAction<string>>;

  editPurchaseId: string;
  setEditPurchaseId: React.Dispatch<React.SetStateAction<string>>;

  deletePurchaseId: string;
  setDeletePurchaseId: React.Dispatch<React.SetStateAction<string>>;

  addOpen: boolean;
  setAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PurchaseContext = createContext<PurchaseContextType>(
  {} as PurchaseContextType
);

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState<PurchaseQuery>(defaultQuery);
  const [detailPurchaseId, setDetailPurchaseId] = useState<string>("");
  const [editPurchaseId, setEditPurchaseId] = useState<string>("");
  const [deletePurchaseId, setDeletePurchaseId] = useState<string>("");
  const [addOpen, setAddOpen] = useState<boolean>(false);

  const url = buildUrl<PurchaseQuery>(SERVER_URL, "purchase", {
    page: query.page,
    limit: query.limit,
    from: query?.from,
    to: query?.to,
  });

  const fetcher = useFetch<DataQueryResponse<Purchase[]>>(url);

  const resetQuery = () => setQuery(defaultQuery);

  const updateQuery = <T extends keyof PurchaseQuery>(
    key: T,
    value: PurchaseQuery[T]
  ) => {
    setQuery((prev) => ({ ...prev, [key]: value }));
  };

  const values: PurchaseContextType = {
    ...fetcher,
    query,
    resetQuery,
    updateQuery,

    detailPurchaseId,
    setDetailPurchaseId,

    editPurchaseId,
    setEditPurchaseId,

    deletePurchaseId,
    setDeletePurchaseId,

    addOpen,
    setAddOpen,
  };

  return (
    <PurchaseContext.Provider value={values}>
      {children}
    </PurchaseContext.Provider>
  );
}

export const usePurchase = () => useContext(PurchaseContext);
