import React from "react";

interface Props {
  value: React.ReactNode;
  label: string;
}

export function OneLineItem({ label, value }: Props) {
  return (
    <div className="flex justify-between items-center">
      <p className="font-semibold">{label} :</p>
      <p className="text-muted-foreground text-sm font-semibold">{value}</p>
    </div>
  );
}
