import { ColumnDef } from "@tanstack/react-table";
import { PayableReceivableDetail } from "../../types/detail.types";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";

export const detailPRColumn: ColumnDef<PayableReceivableDetail>[] = [
  {
    accessorKey: "transaction_at",
    header: "Tanggal",
    cell: ({ row }) => (
      <p className="text-sm text-muted-foreground whitespace-nowrap">
        {format(new Date(row.original.transaction_at), "dd MMM yyyy", {
          locale: id,
        })}
      </p>
    ),
  },
  {
    accessorKey: "product_service",
    header: "Produk / Layanan",
    cell: ({ row }) => (
      <p className="text-sm font-medium">{row.original.product_service}</p>
    ),
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => (
      <p className="text-sm text-muted-foreground">{row.original.category}</p>
    ),
  },
  {
    accessorKey: "status_cashflow",
    header: "Status",
    cell: ({ row }) => {
      const isTransfer = row.original.transfer_group_id !== null;
      const status = row.original.status_cashflow;

      if (isTransfer) {
        return (
          <Badge
            variant="outline"
            className="text-xs font-medium border-purple-300 text-purple-600 bg-purple-50"
          >
            Transfer
          </Badge>
        );
      }

      const labelMap: Record<string, string> = {
        income: "Pemasukan",
        expense: "Pengeluaran",
        payable: "Utang",
        receivable: "Piutang",
      };
      const classMap: Record<string, string> = {
        income: "border-green-300 text-green-600 bg-green-50",
        expense: "border-red-300 text-red-600 bg-red-50",
        payable: "border-red-300 text-red-600 bg-red-50",
        receivable: "border-blue-300 text-blue-600 bg-blue-50",
      };

      return (
        <Badge
          variant="outline"
          className={cn("text-xs font-medium", classMap[status])}
        >
          {labelMap[status] ?? status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Nominal",
    cell: ({ row }) => formatRupiah(row.original.price),
  },
  {
    accessorKey: "via",
    header: "Via",
    cell: ({ row }) => (
      <p className="text-sm text-muted-foreground">{row.original.via}</p>
    ),
  },
];
