import { BasicQuery } from "@/@types/general";
import { KeyedMutator } from "swr";
import { AssetRpcReturn } from "../types/api-return";
import { createContext, useContext, useState } from "react";
import { buildUrl } from "@/utils/build-url";
import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";

interface AssetFinancialStoreTypes {
  query: BasicQuery;
  updateQuery: <T extends keyof BasicQuery>(
    key: T,
    value: BasicQuery[T],
  ) => void;
  resetQuery: () => void;

  data: AssetRpcReturn[] | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<AssetRpcReturn[]>;
}

const AssetFinancialContext = createContext<AssetFinancialStoreTypes>(
  {} as AssetFinancialStoreTypes,
);

const defaultQuery: BasicQuery = {
  limit: 10,
  page: 1,
  filters: [],
  sort: [],
  from: new Date(1970, 0, 1),
  to: new Date(),
};

export function AssetFinancialProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState<BasicQuery>(defaultQuery);

  // >>>>>> FETCHER AREA <<<<<<
  const url = buildUrl<BasicQuery>(
    SERVER_URL,
    "/asset-financial/summary",
    query,
  );
  const fetcher = useFetch<AssetRpcReturn[]>(url);

  //   >>>>>> QUERY AREA <<<<<<

  const updateQuery = <T extends keyof BasicQuery>(
    key: T,
    value: BasicQuery[T],
  ) => setQuery((prev) => ({ ...prev, [key]: value }));

  const resetQuery = () => setQuery(defaultQuery);

  const values: AssetFinancialStoreTypes = {
    ...fetcher,

    query,
    resetQuery,
    updateQuery,
  };
  return (
    <AssetFinancialContext.Provider value={values}>
      {children}
    </AssetFinancialContext.Provider>
  );
}

export const useAssetFinancial = () => useContext(AssetFinancialContext);
