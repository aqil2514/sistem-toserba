import { LabelValue } from "@/@types/general";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryParams } from "@/hooks/use-query-params";

interface Props<T extends string> {
  options: LabelValue<T>[];
  defaultValue: T;
  isVisible?: boolean;
}

export function FilterMode<T extends string>({
  defaultValue,
  isVisible = true,
  options,
}: Props<T>) {
  const { get, set } = useQueryParams();

  const mode = get("mode") ?? defaultValue;

  if (!isVisible) return null;
  return (
    <Select value={mode} onValueChange={(e) => set("mode", e)}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((mode) => (
            <SelectItem value={mode.value} key={mode.value}>
              {mode.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
