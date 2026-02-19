import { Input } from "@/components/ui/input";
import { useQueryParams } from "@/hooks/use-query-params";
import { FocusEvent, KeyboardEvent } from "react";
import { toast } from "sonner";

interface Props {
  narationText: string;
  enterInfoToast: string;
}

export function FilterTop({ narationText, enterInfoToast }: Props) {
  const { get, set } = useQueryParams();
  const topDefault = get("top") ?? "10";

  const focusHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
    e.target.select();
    toast.info("Tekan 'Enter' untuk menerapkan perubahan", { duration: 2000 });
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      set("top", target.value);
      toast.info(`${enterInfoToast} ${target.value}`);
      return;
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <p className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
        {narationText}
      </p>
      <Input
        defaultValue={Number(topDefault)}
        type="number"
        className="w-16"
        onFocus={focusHandler}
        onKeyDown={keyDownHandler}
      />
    </div>
  );
}
