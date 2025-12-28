import { ToserbaFooter } from "@/components/layout/footer/toserba-footer";
import { ToserbaHeader } from "@/components/layout/header/toserba-header";
import React from "react";

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
