import { KeyedMutator } from "swr";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useFetch } from "@/hooks/use-fetch";
import { BasicQuery } from "@/@types/general";
import { CashCountsReturnApi } from "../types/type.cash-counter-cash-counting";
import { buildUrl } from "@/utils/build-url";
import { SERVER_URL } from "@/constants/url";
import { startOfDay, startOfMonth } from "date-fns";

interface CashCountingContextType {
  data: CashCountsReturnApi | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<CashCountsReturnApi>;

  query: BasicQuery;
  updateQuery: <T extends keyof BasicQuery>(
    key: T,
    value: BasicQuery[T],
  ) => void;
  resetQuery: () => void;

  addDialog: boolean;
  setAddDialog: Dispatch<SetStateAction<boolean>>;
  detailDialog: string | null;
  setDetailDialog: Dispatch<SetStateAction<string | null>>;
  editDialog: string | null;
  setEditDialog: Dispatch<SetStateAction<string | null>>;
}

const CashCountingContext = createContext<CashCountingContextType>(
  {} as CashCountingContextType,
);

const defaultQuery: BasicQuery = {
  limit: 10,
  page: 1,
  from: startOfMonth(startOfDay(new Date())),
  to: startOfDay(new Date()),
  filters: [],
  sort: [],
};

export function CashCountingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState<BasicQuery>(defaultQuery);

  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [detailDialog, setDetailDialog] = useState<string | null>(null);
  const [editDialog, setEditDialog] = useState<string | null>(null);

  // >>>>>> FETCHER AREA <<<<<<
  const url = buildUrl<BasicQuery>(
    SERVER_URL,
    "/cash-counter/cash-counting",
    query,
  );
  const fetcher = useFetch<CashCountsReturnApi>(url);

  //   >>>>>> QUERY AREA <<<<<<

  const updateQuery = <T extends keyof BasicQuery>(
    key: T,
    value: BasicQuery[T],
  ) => setQuery((prev) => ({ ...prev, [key]: value }));

  const resetQuery = () => setQuery(defaultQuery);

  const values: CashCountingContextType = {
    ...fetcher,

    addDialog,
    setAddDialog,
    detailDialog,
    setDetailDialog,
    editDialog,
    setEditDialog,

    query,
    resetQuery,
    updateQuery,
  };

  return (
    <CashCountingContext.Provider value={values}>
      {children}
    </CashCountingContext.Provider>
  );
}

export const useCashCounts = () => useContext(CashCountingContext);
