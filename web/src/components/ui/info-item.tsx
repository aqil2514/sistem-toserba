"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InfoItemProps {
  label: string;
  value?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function InfoItem({
  label,
  value,
  icon,
  className,
}: InfoItemProps) {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null; 
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3 text-sm",
        className
      )}
    >
      {icon && (
        <div className="mt-0.5 text-muted-foreground">
          {icon}
        </div>
      )}

      <div className="flex flex-col">
        <span className="text-muted-foreground">
          {label}
        </span>
        <span className="font-medium wrap-break-word">
          {value}
        </span>
      </div>
    </div>
  );
}
