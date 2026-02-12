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

type DialogState =
  | { type: "add" }
  | { type: "edit"; id: string }
  | { type: "detail"; id: string }
  | { type: "delete"; id: string }
  | { type: "copy"; id: string }
  | null;

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

  openDialog: DialogState;
  setOpenDialog: Dispatch<SetStateAction<DialogState>>;
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
  sort: [
    {
      key: "date",
      value: "desc",
    },
  ],
};

export function CashCountingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState<BasicQuery>(defaultQuery);

  const [openDialog, setOpenDialog] = useState<DialogState>(null);

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

    openDialog,
    setOpenDialog,

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
