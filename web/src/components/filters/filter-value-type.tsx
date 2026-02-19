import { LabelValue } from "@/@types/general";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props<T extends string> {
  value: T;
  onValueChange: (value: T) => void;
  options: LabelValue<T>[];
}

export function FilterValueType<T extends string>({
  onValueChange,
  value,
  options,
}: Props<T>) {
  return (
    <Select value={value} onValueChange={onValueChange}>
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
