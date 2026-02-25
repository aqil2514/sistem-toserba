import { useFetch } from "@/hooks/use-fetch";
import { createContext, useContext } from "react";
import { KeyedMutator } from "swr";

interface FetchContextTypes<T> {
  isLoading: boolean;
  data: T | undefined;
  error?: Error;
  mutate?: KeyedMutator<T>;
}

export function createFetchContext<T>(url: string) {
  const Context = createContext<FetchContextTypes<T>>({} as FetchContextTypes<T>);

  function Provider({ children }: { children: React.ReactNode }) {
    const fetcher = useFetch<T>(url);
    return <Context.Provider value={fetcher}>{children}</Context.Provider>;
  }

  const useData = () => useContext(Context);

  return { Provider, useData };
}