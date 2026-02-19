import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryParams } from "@/hooks/use-query-params";

interface Props {
  isVisible: boolean;
}

export function FilterGroupBy({ isVisible }: Props) {
  const { get, set } = useQueryParams();

  const groupBy = get("groupBy") ?? "day";

  if (!isVisible) return null;

  return (
    <Select
      value={groupBy}
      onValueChange={(e) => set("groupBy", e)}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="day">Harian</SelectItem>
          <SelectItem value="week">Mingguan</SelectItem>
          <SelectItem value="month">Bulanan</SelectItem>
          <SelectItem value="year">Tahunan</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
