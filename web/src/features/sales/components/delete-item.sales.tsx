import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSales } from "../provider/sales.provider";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";
import { SalesItemApiResponse } from "../types/sales-item-api";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export function SalesDeleteDialog() {
  const { deleteSalesId, setDeleteSalesId, mutate } = useSales();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const open = Boolean(deleteSalesId);

  const deleteSalesFetcher = useFetch<SalesItemApiResponse[]>(
    open ? `${SERVER_URL}/sales/${deleteSalesId}` : null
  );

  if (!open) return null;

  const sales = deleteSalesFetcher.data?.[0];

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await api.delete(`/sales/${deleteSalesId}`);
      toast.success("Data penjualan berhasil dihapus");
      mutate?.();
      setDeleteSalesId("");
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;

        toast.error(data.message ?? "Terjadi kesalahan");
        return;
      }
      toast.error("Terjadi kesalahan");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) setDeleteSalesId("");
      }}
    >
      {deleteSalesFetcher.isLoading || !sales ? (
        <ContentLoading />
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Hapus data penjualan {sales.sales_id.sales_code}.
            </DialogTitle>
            <DialogDescription>
              Tindakan ini akan menghapus data penjualan{" "}
              {sales.sales_id.sales_code} dan tidak dapat dipulihkan. Lanjut?
            </DialogDescription>
            <DialogFooter className="flex gap-4">
              <Button
                variant={"destructive"}
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex gap-4">
                    <Spinner /> Menghapus...
                  </span>
                ) : (
                  "Hapus"
                )}
              </Button>
              <DialogClose asChild>
                <Button variant={"outline"}>Batal</Button>
              </DialogClose>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
}

const ContentLoading = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Mengambil Data...</DialogTitle>
        <DialogDescription>Data sedang diambil. Mohon tunggu</DialogDescription>
      </DialogHeader>
      <LoadingSpinner label="Loading..." />
    </DialogContent>
  );
};
