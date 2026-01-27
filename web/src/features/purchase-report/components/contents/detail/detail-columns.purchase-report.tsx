import { PurchaseReportDetailData } from "@/features/purchase-report/types/api-response.purchase-report";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ColumnDef } from "@tanstack/react-table";

export const PurchaseReportDetailColumns: ColumnDef<PurchaseReportDetailData>[] =
  [
    {
      accessorKey: "purchase_date",
      header: "Tanggal Pembelian",
      cell: ({ row }) =>
        formatDate(row.original.purchase_date, "29 Desember 2025"),
    },
    {
      accessorKey: "purchase_code",
      header: "Kode Pembelian",
    },
    {
      accessorKey: "supplier_name",
      header: "Nama Supplier",
    },
    {
      accessorKey: "supplier_type",
      header: "Tipe Supplier",
    },
    {
      accessorKey: "product_name",
      header: "Nama Produk",
    },
    {
      accessorKey: "product_category",
      header: "Kategori Produk",
    },
    {
      accessorKey: "product_subcategory",
      header: "Sub Kategori Produk",
    },
    {
      accessorKey: "price",
      header: "Harga Beli",
      cell:({row}) => formatRupiah(row.original.price)
    },
    {
      accessorKey: "hpp",
      header: "HPP",
      cell:({row}) => formatRupiah(row.original.hpp, 2)
    },
    {
      accessorKey: "quantity",
      header: "Kuantiti",
      cell: ({ row }) => `${row.original.quantity} pcs`,
    },
    {
      accessorKey: "remaining_quantity",
      header: "Sisa Kuantiti",
      cell: ({ row }) => `${row.original.remaining_quantity} pcs`,
    },
  ];
