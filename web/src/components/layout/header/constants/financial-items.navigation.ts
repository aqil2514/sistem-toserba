import { ChartNoAxesCombined, Database } from "lucide-react";
import { NavItemsTypes, RouteItems } from "../types/nav-items.interface";

const NAV_ITEMS: RouteItems[] = [
  {
    icon: ChartNoAxesCombined,
    description: "Data Cashflow Warung",
    href: "/cashflow",
    title: "Cashflow",
  },
  {
    icon: Database,
    description: "Aset Finansial Warung",
    href: "/asset-financial",
    title: "Aset Finansial",
  },
];

export const financialItemsNavigation: NavItemsTypes = {
  contents: NAV_ITEMS,
  trigger: {
    id: "financial",
    title: "Finansial",
  },
};
