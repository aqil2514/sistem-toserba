import { KeyedMutator } from "swr";
import { Product } from "../types/type";
import React, { createContext, useContext, useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";

interface ProductsContextType {
  isLoading: boolean;
  data: Product[] | undefined;
  error?: Error;
  mutate?: KeyedMutator<Product[]>;

  dialogAdd: boolean;
  setDialogAdd: React.Dispatch<React.SetStateAction<boolean>>;

  detailProduct: Product | null;
  setDetailProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [dialogAdd, setDialogAdd] = useState<boolean>(false);

  const fetcher = useFetch<Product[]>(`${SERVER_URL}/products`);

  const values: ProductsContextType = {
    ...fetcher,

    dialogAdd,
    setDialogAdd,

    detailProduct,
    setDetailProduct,
  };
  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
