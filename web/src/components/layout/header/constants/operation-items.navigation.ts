import { BadgeCent, Barcode, ShoppingBasket, SquarePercent } from "lucide-react";
import { NavItemsTypes, RouteItems } from "../types/nav-items.interface";

const NAV_ITEMS: RouteItems[] = [
  {
    title: "Penjualan",
    href: "/sales",
    description: "Transaksi Penjualan",
    icon: BadgeCent,
  },
  {
    title: "Laporan Penjualan",
    href: "/sales/report",
    description: "Laporan Transaksi Penjualan",
    icon: SquarePercent,
  },
  {
    title: "Pembelian Stok",
    href: "/purchase",
    description: "Transaksi Pembelian Stok",
    icon: ShoppingBasket,
  },
  {
    title: "Laporan Pembelian",
    href: "/purchase/report",
    description: "Laporan Transaksi Pembelian Stok",
    icon: Barcode,
  },
];

export const operationItemsNavigation: NavItemsTypes = {
  contents: NAV_ITEMS,
  trigger: {
    id: "operational",
    title: "Operasional",
  },
};
