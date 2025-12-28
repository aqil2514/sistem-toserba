import { ToserbaFooter } from "@/components/layout/footer/toserba-footer";
import { ToserbaHeader } from "@/components/layout/header/toserba-header";
import { getMe } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Internal Toserba",
    absolute: "Internal Toserba",
  },
  robots: {
    index: false,
  },
};

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
