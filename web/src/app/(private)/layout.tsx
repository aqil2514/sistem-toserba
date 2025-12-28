import { ToserbaFooter } from "@/components/layout/footer/toserba-footer";
import { ToserbaHeader } from "@/components/layout/header/toserba-header";
import { getMe } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  if (!user) redirect("/");
  return (
    <>
      <ToserbaHeader />

      {/* Content */}
      <div className="flex-1">{children}</div>

      <ToserbaFooter />
    </>
  );
}
