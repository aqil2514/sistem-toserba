import { KeyedMutator } from "swr";
import { Product } from "../types/type";
import React, { createContext, useContext, useMemo, useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { LabelValue } from "@/@types/general";
import { formatRupiah } from "@/utils/format-to-rupiah";

interface ProductsContextType {
  isLoading: boolean;
  data: Product[] | undefined;
  error?: Error;
  mutate?: KeyedMutator<Product[]>;

  dialogAdd: boolean;
  setDialogAdd: React.Dispatch<React.SetStateAction<boolean>>;

  editProduct: Product | null;
  setEditProduct: React.Dispatch<React.SetStateAction<Product | null>>;

  deleteProduct: Product | null;
  setDeleteProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  deleteContent: LabelValue[];

  detailProduct: Product | null;
  setDetailProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [dialogAdd, setDialogAdd] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const fetcher = useFetch<Product[]>(`${SERVER_URL}/products`);

  const deleteContent = useMemo(() => {
    if (!deleteProduct) return [];

    const result: LabelValue[] = [
      {
        label: "Nama Produk",
        value: deleteProduct.name,
      },
      {
        label: "Harga",
        value: formatRupiah(deleteProduct.price),
      },
      {
        label: "Kategori",
        value: deleteProduct.category,
      },
      {
        label: "Sub Kategori",
        value: deleteProduct.subcategory ?? "-",
      },
      {
        label: "Stok",
        value: `${deleteProduct.stock} ${deleteProduct.unit}`,
      },
    ];

    return result;
  }, [deleteProduct]);

  const values: ProductsContextType = {
    ...fetcher,

    dialogAdd,
    setDialogAdd,

    editProduct,
    setEditProduct,

    deleteProduct,
    setDeleteProduct,
    deleteContent,

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
