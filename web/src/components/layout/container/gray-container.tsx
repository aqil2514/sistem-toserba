import { cn } from "@/lib/utils";
import React from "react";

interface GrayContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GrayContainer({
  children,
  className,
  ...props
}: GrayContainerProps) {
  return (
    <div
      {...props}
      className={cn(
        "bg-gray-100 p-4 rounded-2xl space-y-4",
        className
      )}
    >
      {children}
    </div>
  );
}
