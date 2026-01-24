import { BadgeCent, Barcode } from "lucide-react";
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
    icon: BadgeCent,
  },
  {
    title: "Pembelian",
    href: "/purchase",
    description: "Transaksi Pembelian",
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
