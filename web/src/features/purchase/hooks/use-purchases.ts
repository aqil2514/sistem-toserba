import { useFetch } from "@/hooks/use-fetch";
import { Purchase } from "../types/purchase";
import { Product } from "../../products/types/type";
import { SERVER_URL } from "@/constants/url";
import { api } from "@/lib/api";
import { PurchaseFormValues } from "../schema/purchase.schema";
import axios from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  message: string;
  statusCode: number;
}

export function usePurchases() {
  const fetcher = useFetch<Purchase[]>(`${SERVER_URL}/purchase`);

  const productsFetcher = useFetch<Product[]>(`${SERVER_URL}/products`);

  // ======================
  // CREATE
  // ======================
  const create = async (values: PurchaseFormValues) => {
    try {
      const { data } = await api.post<Purchase>("/purchase", values);

      toast.success("Barang masuk berhasil dicatat");
      fetcher.mutate();
      return data;
    } catch (error: unknown) {
      handleApiError(error);
      throw error;
    }
  };

  // ======================
  // UPDATE
  // ======================
  const update = async (id: string, values: PurchaseFormValues) => {
    try {
      const { data } = await api.patch<Purchase>(`/purchase/${id}`, values);

      toast.success("Pembelian berhasil diperbarui");
      fetcher.mutate();
      return data;
    } catch (error: unknown) {
      handleApiError(error);
      throw error;
    }
  };

  // ======================
  // DELETE
  // ======================
  const remove = async (id: string) => {
    try {
      await api.delete(`/purchase/${id}`);
      toast.success("Pembelian berhasil dihapus");
      fetcher.mutate();
    } catch (error: unknown) {
      handleApiError(error);
      throw error;
    }
  };

  /**
   * Helper: ambil nama produk (PRIVATE)
   */
  function getProductName(productId: string): string {
    const products = productsFetcher.data ?? [];
    return (
      products.find((p) => p.id === productId)?.name ?? "Produk tidak ditemukan"
    );
  }

  return {
    ...fetcher,
    create,
    update,
    remove,
    getProductName,
    products: productsFetcher.data,
  };
}

// ======================
// SHARED ERROR HANDLER
// ======================
function handleApiError(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    toast.error(error.response?.data?.message ?? "Terjadi kesalahan");
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Unknown error");
  }
}
