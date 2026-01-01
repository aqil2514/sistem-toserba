import { KeyedMutator } from "swr";
import { Product } from "../type";
import React, { createContext, useContext } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";

interface ProductsContextType {
  isLoading: boolean;
  data: Product[] | undefined;
  error?: Error;
  mutate?: KeyedMutator<Product[]>;
}

const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const fetcher = useFetch<Product[]>(`${SERVER_URL}/products`);

  const values: ProductsContextType = {
    ...fetcher,
  };
  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext)