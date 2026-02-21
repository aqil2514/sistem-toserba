import { Separator } from "@/components/ui/separator";
import { CounterpartNameFilter } from "./children/countepart.filter";
import { TypeFilter } from "./children/type.filter";

export function PayableReceivableFilter() {
  return (
    <div className="space-y-4">
      <TypeFilter />
      <Separator />
      <CounterpartNameFilter />
    </div>
  );
}
