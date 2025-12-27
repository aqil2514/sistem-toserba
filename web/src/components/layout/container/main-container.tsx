import { cn } from "@/lib/utils";

interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MainContainer({
  children,
  className,
}: MainContainerProps) {
  return (
    <main
      className={cn(
        "min-h-screen bg-muted/40 flex items-center justify-center px-4 py-8",
        className
      )}
    >
      {children}
    </main>
  );
}
