import { NavItemsTypes } from "../types/nav-items.interface";
import { operationItemsNavigation } from "./operation-items.navigation";
import { generalItemsNavigation } from "./general-item.navigation";
import { financialItemsNavigation } from "./financial-items.navigation";


export const NAVIGATION_ITEMS: NavItemsTypes[] = [
  generalItemsNavigation,
  operationItemsNavigation,
  financialItemsNavigation
];
