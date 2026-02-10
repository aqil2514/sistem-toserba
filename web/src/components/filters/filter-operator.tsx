import { FilterOperator as FilterOperatorType } from "@/@types/general";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FilterOperatorProps = {
  value: FilterOperatorType;
  onOperatorChange: (value: FilterOperatorType) => void;
  index: number;
};

export function FilterOperator({
  onOperatorChange,
  value,
}: FilterOperatorProps) {
  return (
    <Select
      value={value}
      onValueChange={(val: FilterOperatorType) => onOperatorChange(val)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Operator" />
      </SelectTrigger>

      <SelectContent position="popper" className="w-96">
        <SelectGroup>
          <SelectLabel>Comparison</SelectLabel>

          <SelectItem value="eq" title="Sama dengan nilai">
            =
          </SelectItem>

          <SelectItem value="neq" title="Tidak sama dengan nilai">
            ≠
          </SelectItem>

          <SelectItem value="gt" title="Lebih besar dari nilai">
            &gt;
          </SelectItem>

          <SelectItem value="gte" title="Lebih besar atau sama dengan nilai">
            ≥
          </SelectItem>

          <SelectItem value="lt" title="Lebih kecil dari nilai">
            &lt;
          </SelectItem>

          <SelectItem value="lte" title="Lebih kecil atau sama dengan nilai">
            ≤
          </SelectItem>
        </SelectGroup>

        <SelectGroup>
          <SelectLabel>Text</SelectLabel>

          <SelectItem
            value="ilike"
            title="Mengandung teks (tidak peka huruf besar/kecil)"
          >
            contains
          </SelectItem>

          <SelectItem value="not_ilike" title="Tidak mengandung teks">
            not contains
          </SelectItem>
        </SelectGroup>

        <SelectGroup>
          <SelectLabel>Null</SelectLabel>

          <SelectItem value="is_null" title="Nilai kosong / tidak ada">
            is empty
          </SelectItem>

          <SelectItem value="is_not_null" title="Nilai tidak kosong">
            is not empty
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
