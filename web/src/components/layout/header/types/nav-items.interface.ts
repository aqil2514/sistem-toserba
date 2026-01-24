import { LucideIcon } from "lucide-react";

export interface RouteItems {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

interface NavTrigger {
  title: string;
  id: string;
}

export interface NavItemsTypes {
  trigger: NavTrigger;
  contents: RouteItems[];
}
