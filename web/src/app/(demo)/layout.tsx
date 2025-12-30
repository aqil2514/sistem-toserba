import { ToserbaFooter } from "@/components/layout/footer/toserba-footer";
import { ToserbaHeader } from "@/components/layout/header/toserba-header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Demo Internal Toserba",
    absolute: "Demo Internal Toserba",
  },
};

export const dynamic = "force-dynamic";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToserbaHeader />

      {/* Content */}
      <div className="flex-1">{children}</div>

      <ToserbaFooter />
    </>
  );
}
