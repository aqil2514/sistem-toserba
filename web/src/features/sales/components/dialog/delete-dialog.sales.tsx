import { DeleteDialog } from "@/components/molecules/dialog/delete-dialog";
import { useSales } from "../../store/sales.provider";
import { SalesItemApiResponse } from "../../types/sales-item-api";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { LabelValue } from "@/@types/general";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { formatDate } from "@/utils/format-date.fns";
import { isSalesHeader } from "../../utils/type-guard.sales";
import { useQueryParams } from "@/hooks/use-query-params";

export function SalesDeleteDialog() {
  const { mutate } = useSales();
  const { get, update } = useQueryParams();

  const open = get("action") === "delete";
  const id = get("id");

  const { data, isLoading } = useFetch<SalesItemApiResponse[]>(
    open ? `${SERVER_URL}/sales/${id}` : null,
  );
  const sales = data?.[0];

  if (!open || !sales) return null;

  if (!isSalesHeader(sales.sales_id)) return null;

  const handleDelete = async () => {
    try {
      await api.delete(`/sales/${id}`);
      toast.success("Data penjualan berhasil dihapus");
      if (window.opener) {
        window.opener.postMessage(
          { type: "DELETE_SALES_SUCCESS" },
          window.location.origin,
        );

        window.close();
        return;
      }
      mutate?.();
      update({
        action: null,
        id: null,
      });
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
          "Senin, 29 Desember 2025, 09:21",
        ) ?? "",
    },
  ];

  return (
    <DeleteDialog
      onDeleteHandle={handleDelete}
      onOpenChange={(open) => {
        if (!open) {
          update({
            action: null,
            id: null,
          });
        }
      }}
      isLoading={isLoading}
      open={open}
      title="Yakin hapus data penjualan"
      contents={content}
    />
  );
}
