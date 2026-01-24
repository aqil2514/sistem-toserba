import { CupSoda, LayoutDashboard } from "lucide-react";
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
];

export const generalItemsNavigation: NavItemsTypes = {
  contents: NAV_ITEMS,
  trigger: {
    id: "general",
    title: "General",
  },
};
