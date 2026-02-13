import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  children: ReactNode;
}

export function FloatingContainer({ isOpen, children }: Props) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 pointer-events-none">
      <div
        className={cn(
          "bg-white shadow-xl border rounded-2xl p-5 transition-all duration-300 pointer-events-auto",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}
