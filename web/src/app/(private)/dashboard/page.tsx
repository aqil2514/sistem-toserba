import { DashboardTemplate } from "@/features/dashboard/dashboard.template";
import { getMe } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getMe();

  if (!user) redirect("/");
  return <DashboardTemplate />;
}
