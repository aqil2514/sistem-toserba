import { BadgeCent, Barcode, CupSoda } from "lucide-react";
import { NavItemsTypes, RouteItems } from "../types/nav-items.interface";
import { operationItemsNavigation } from "./operation-items.navigation";
import { generalItemsNavigation } from "./general-item.navigation";

export const NAV_ITEMS: RouteItems[] = [
  {
    title: "Produk",
    href: "/products",
    description: "Daftar Produk",
    icon: CupSoda,
  },
  {
    title: "Pembelian",
    href: "/purchase",
    description: "Transaksi Pembelian",
    icon: Barcode,
  },
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
];

export const NAVIGATION_ITEMS: NavItemsTypes[] = [
  generalItemsNavigation,
  operationItemsNavigation,
];
