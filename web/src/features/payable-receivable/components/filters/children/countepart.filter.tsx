import { FilterTextInput } from "@/components/filters/filter-text-input";
import { useQueryParams } from "@/hooks/use-query-params";
import { useEffect, useState } from "react";

export function CounterpartNameFilter() {
  const { get, set, remove } = useQueryParams();
  const counterpartName = get("counterpart_name");

  const [inputValue, setInputValue] = useState(counterpartName ?? "");

  useEffect(() => {
    setInputValue(counterpartName ?? "");
  }, [counterpartName]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputValue.length === 0) {
        remove("counterpart_name");
        return;
      }
      set("counterpart_name", inputValue);
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div>
      <FilterTextInput
        value={inputValue}
        onValueChange={setInputValue}
        placeholder="Nama yang bersangkutan"
      />
    </div>
  );
}
