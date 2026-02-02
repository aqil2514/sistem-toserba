import { ChartNoAxesCombined } from "lucide-react";
import { NavItemsTypes, RouteItems } from "../types/nav-items.interface";

const NAV_ITEMS: RouteItems[] = [
  {
    icon: ChartNoAxesCombined,
    description: "Data Cashflow Warung",
    href: "/cashflow",
    title: "Cashflow",
  },
];

export const financialItemsNavigation: NavItemsTypes = {
  contents: NAV_ITEMS,
  trigger: {
    id: "financial",
    title: "Finansial",
  },
};
