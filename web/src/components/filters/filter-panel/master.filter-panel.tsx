import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { FilterPanelProvider, useFilterPanel } from "./provider.filter-panel";
import { FilterPanelContent } from "./content.filter-panel";
import { FilterPanelProps } from "./types.filter-panel";
import { FilterPanelFooter } from "./footer.filter-panel";

export function FilterPanel({
  config,
  initialValue,
  onApplyFilter,
}: FilterPanelProps) {
  return (
    <FilterPanelProvider
      config={config}
      initialValue={initialValue}
      onApplyFilter={onApplyFilter}
    >
      <InnerTemplate />
    </FilterPanelProvider>
  );
}

const InnerTemplate = () => {
  const { open, setOpen, snapshot } = useFilterPanel();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>Filter</Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4 w-xl">
        <p className="font-semibold text-lg">Filter Data</p>
        <p className="text-muted-foreground text-xs font-semibold">
          {snapshot.length === 0
            ? "Belum ada filter"
            : `Terdapat ${snapshot.length} filter`}
        </p>
        <Separator />

        <FilterPanelContent />

        <FilterPanelFooter />
      </PopoverContent>
    </Popover>
  );
};
