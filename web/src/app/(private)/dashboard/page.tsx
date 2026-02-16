import { DashboardTemplate } from "@/features/dashboard/dashboard.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return <DashboardTemplate mode="private" />;
}
