import { KeyedMutator } from "swr";
import { ReceivablePayableReturn } from "../types/receivable-payable-types";
import { createContext, useContext } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";

interface ReceivablePayableContextTypes {
  isLoading: boolean;
  data: ReceivablePayableReturn | undefined;
  error?: Error;
  mutate?: KeyedMutator<ReceivablePayableReturn>;
}

const ReceivablePayableContext = createContext<ReceivablePayableContextTypes>(
  {} as ReceivablePayableContextTypes,
);

export function ReceivablePayableProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetcher = useFetch<ReceivablePayableReturn>(
    `${SERVER_URL}/cashflow/payable-receivable`,
  );

  const values: ReceivablePayableContextTypes = {
    ...fetcher,
  };

  return (
    <ReceivablePayableContext.Provider value={values}>
      {children}
    </ReceivablePayableContext.Provider>
  );
}

export const useReceivablePayable = () => useContext(ReceivablePayableContext);
