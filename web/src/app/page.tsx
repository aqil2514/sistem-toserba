import { HomeTemplate } from "@/features/home/home.template";
import { getMe } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata:Metadata ={
  title:"Sistem Internal Toserba Login"
} 

export default async function LoginPage() {
  const user = await getMe();

  if (user) redirect("/dashboard");
 return <HomeTemplate />
}
