import { useFetch } from "@/hooks/use-fetch";
import { Product } from "../types/type";
import { SERVER_URL } from "@/constants/url";
import { api } from "@/lib/api";
import { ProductFormValues } from "../schema/product.schema";
import axios from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  message: string;
  statusCode: number;
}

export function useProducts() {
  const fetcher = useFetch<Product[]>(`${SERVER_URL}/products`);

  // ======================
  // CREATE
  // ======================
  const create = async (product: ProductFormValues) => {
    try {
      const { data } = await api.post<Product>("/products", product);

      toast.success("Produk berhasil ditambahkan");
      fetcher.mutate();

      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        toast.error(error.response?.data?.message ?? "Terjadi kesalahan");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error");
      }

      throw error;
    }
  };

  // ======================
  // UPDATE
  // ======================
  const update = async (id: string, product: ProductFormValues) => {
    try {
      const { data } = await api.patch<Product>(`/products/${id}`, product);

      toast.success("Produk berhasil diperbarui");
      fetcher.mutate();

      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        toast.error(error.response?.data?.message ?? "Terjadi kesalahan");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error");
      }

      throw error;
    }
  };

  // ======================
  // DELETE
  // ======================
  const remove = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);

      toast.success("Produk berhasil dihapus");
      fetcher.mutate();
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        toast.error(error.response?.data?.message ?? "Terjadi kesalahan");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error");
      }

      throw error;
    }
  };

  return {
    ...fetcher,
    create,
    update,
    remove,
  };
}
