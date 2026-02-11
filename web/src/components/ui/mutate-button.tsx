import { KeyedMutator } from "swr";
import { Button } from "./button";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props<T> {
  mutate?: KeyedMutator<T>;
  successToastMessage?: string;
  onMutateSuccess?: () => void;
}

export function MutateButton<T>({
  mutate,
  successToastMessage = "Data sudah diperbarui",
  onMutateSuccess
}: Props<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mutateHandler = async () => {
    if (!mutate) return;

    try {
      setIsLoading(true);
      await mutate();
      onMutateSuccess?.()

      toast.info(successToastMessage);
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat mutasi data");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      disabled={isLoading}
      size={"icon"}
      variant={"outline"}
      onClick={mutateHandler}
      title="Refresh Data"
      type="button"
    >
      <RefreshCcw className={cn(isLoading && "animate-spin")} />
    </Button>
  );
}
