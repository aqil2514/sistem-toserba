import { Activity, CupSoda, LayoutDashboard, Store } from "lucide-react";
import { NavItemsTypes, RouteItems } from "../types/nav-items.interface";

const NAV_ITEMS: RouteItems[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Halaman Utama & Ringkasan Data",
    icon: LayoutDashboard,
  },
  {
    title: "Produk",
    href: "/products",
    description: "Daftar produk yang dijual",
    icon: CupSoda,
  },
  {
    title: "Aset Fisik",
    href: "/assets",
    description: "Daftar Aset yang dimiliki oleh warung saat ini",
    icon: Store,
  },
  {
    title: "Aktivitas",
    href: "/activity",
    description: "Aktivitas yang terjadi pada sistem ini",
    icon: Activity,
  },
];

export const generalItemsNavigation: NavItemsTypes = {
  contents: NAV_ITEMS,
  trigger: {
    id: "general",
    title: "General",
  },
};
