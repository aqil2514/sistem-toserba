import { HomeTemplate } from "@/features/home/home.template";
import { getMe } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getMe();

  if (user) redirect("/dashboard");
 return <HomeTemplate />
}
