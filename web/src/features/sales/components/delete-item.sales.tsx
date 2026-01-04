import { DeleteDialog } from "@/components/molecules/dialog/delete-dialog";
import { useSales } from "../store/sales.provider";
import { SalesItemApiResponse } from "../types/sales-item-api";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { LabelValue } from "@/@types/general";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { formatDate } from "@/utils/format-date.fns";
import { LoadingDialog } from "@/components/molecules/dialog/loading-dialog";

export function SalesDeleteDialog() {
  const { deleteSalesId, setDeleteSalesId, mutate } = useSales();
  const open = Boolean(deleteSalesId);

  const deleteSalesFetcher = useFetch<SalesItemApiResponse[]>(
    open ? `${SERVER_URL}/sales/${deleteSalesId}` : null
  );
  const sales = deleteSalesFetcher.data?.[0];

  if (!open || !sales) return null;

  if (deleteSalesFetcher.isLoading)
    return (
      <LoadingDialog
        onOpenChange={(open) => {
          if (!open) setDeleteSalesId("");
        }}
        open={open}
      />
    );

  const handleDelete = async () => {
    try {
      await api.delete(`/sales/${deleteSalesId}`);
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
    }
  };

  const content: LabelValue[] = [
    {
      label: "Kode Penjualan",
      value: sales?.sales_id.sales_code ?? "",
    },
    {
      label: "Nama Pembeli",
      value: sales?.sales_id.customer_name ?? "",
    },
    {
      label: "Total Belanja",
      value: formatRupiah(sales?.sales_id.total_amount ?? 0) ?? "",
    },
    {
      label: "Tanggal Pembelian",
      value:
        formatDate(
          sales?.sales_id.transaction_at ?? "",
          "Senin, 29 Desember 2025, 09:21"
        ) ?? "",
    },
  ];
  return (
    <DeleteDialog
      onDeleteHandle={handleDelete}
      onOpenChange={(open) => {
        if (!open) setDeleteSalesId("");
      }}
      open={open}
      title="Yakin hapus data penjualan"
      contents={content}
    />
  );
}
