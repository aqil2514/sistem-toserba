"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface GlobalRefreshButtonProps {
  mutate: () => void | Promise<void>;
}

export function GlobalRefreshButton({
  mutate,
}: GlobalRefreshButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleRefresh() {
    try {
      setLoading(true);
      await mutate();
      toast.success("Data berhasil diperbarui");
    } catch {
      toast.error("Gagal memperbarui data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleRefresh}
      disabled={loading}
      title="Refresh data"
    >
      <RefreshCw
        className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
      />
    </Button>
  );
}
