import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/use-query-params";

export function TypeFilter() {
  const { get, set } = useQueryParams();

  const type = get("type") ?? "mix";
  const clickHandler = (type: string) => {
    set("type", type);
  };
  return (
    <div className="flex gap-4">
      <Button
        variant={type === "mix" ? "default" : "outline"}
        size={"sm"}
        onClick={() => clickHandler("mix")}
      >
        Semua
      </Button>
      <Button
        variant={type === "payable" ? "default" : "outline"}
        size={"sm"}
        onClick={() => clickHandler("payable")}
      >
        Utang
      </Button>
      <Button
        variant={type === "receivable" ? "default" : "outline"}
        size={"sm"}
        onClick={() => clickHandler("receivable")}
      >
        Piutang
      </Button>
    </div>
  );
}
