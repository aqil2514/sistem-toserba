import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

export type FilterSelectOptions = {
  label: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  options: FilterSelectOptions[];
  placeHolder?: string;

  clearable?: boolean;
  onClear?: () => void;
}

export function FilterSelect({
  onValueChange,
  options,
  value,
  placeHolder = "Semua item",
  clearable,
  onClear,
}: Props) {
  const clearHandler = () => {
    onClear?.();
  };

  return (
    <div className="flex gap-1 items-center ">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                disabled={opt.disabled}
                value={opt.value}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {clearable && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={clearHandler}
        >
          X
        </Button>
      )}
    </div>
  );
}
