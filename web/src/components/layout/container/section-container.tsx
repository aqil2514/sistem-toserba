import { cn } from "@/lib/utils";
import React from "react";

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SectionContainer({
  children,
  className,
  ...props
}: SectionContainerProps) {
  return (
    <div
      {...props}
      className={cn(
        "w-full max-w-6xl bg-background rounded-lg border shadow-sm p-6 flex flex-col gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}
