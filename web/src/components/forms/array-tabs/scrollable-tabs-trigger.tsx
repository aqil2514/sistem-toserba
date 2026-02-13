import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HasId {
  id: string;
}

interface Props<T extends HasId[]> {
  items: T;
  disabled?: boolean;
}

export function ScrollableTabsTrigger<T extends HasId[]>({
  items,
  disabled,
}: Props<T>) {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <TabsList>
        {items.map((item, i) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            className="px-3"
            disabled={disabled}
          >
            {i + 1}
          </TabsTrigger>
        ))}
      </TabsList>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
