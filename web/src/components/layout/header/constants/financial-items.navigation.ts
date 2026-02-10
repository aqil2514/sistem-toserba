import { Calculator, ChartLine, ChartNoAxesCombined, Database, HandCoins } from "lucide-react";
import { NavItemsTypes, RouteItems } from "../types/nav-items.interface";

const NAV_ITEMS: RouteItems[] = [
  {
    icon: ChartNoAxesCombined,
    description: "Data Cashflow Warung",
    href: "/cashflow",
    title: "Cashflow",
  },
  {
    icon: ChartLine,
    description: "Laporan Cashflow Warung",
    href: "/cashflow/report",
    title: "Laporan Cashflow",
  },
  {
    icon: Database,
    description: "Aset Finansial Warung",
    href: "/asset-financial",
    title: "Aset Finansial",
  },
  {
    icon: HandCoins,
    description: "Utang Piutang Warung",
    href: "/payable-receivable",
    title: "Utang Piutang",
  },
  {
    icon: Calculator,
    description: "Penghitung Uang",
    href: "/cash-counter",
    title: "Penghitung Uang",
  },
];

export const financialItemsNavigation: NavItemsTypes = {
  contents: NAV_ITEMS,
  trigger: {
    id: "financial",
    title: "Finansial",
  },
};
