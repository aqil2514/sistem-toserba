import { FilterOperator, FilterState } from "@/@types/general";
import { useFilterPanel } from "./provider.filter-panel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { FilterTextInput } from "../filter-text-input";
import { FilterOperator as FilterOperatorComp } from "../filter-operator";
import { FilterSelect } from "../filter-select";
import { FilterConfig } from "./types.filter-panel";
import { cn } from "@/lib/utils";

export function FilterPanelContent() {
  const { config, snapshot, setSnapshot } = useFilterPanel();

  if (snapshot.length < 1) return null;

  const updateKey = (index: number, value: string) => {
    setSnapshot((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, key: value, value: "" } : item,
      ),
    );
  };

  const updateOperator = (index: number, value: FilterOperator) => {
    setSnapshot((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, operator: value } : item,
      ),
    );
  };

  return (
    <div className="space-y-4">
      {snapshot.map((snap, i) => {
        const selectedConfig = config.find((c) => c.field === snap.key);

        if (!selectedConfig) throw new Error(`Tipe filter tidak dikethui`);

        const isWithOperator = selectedConfig.withOperator;

        return (
          <div
            key={`filter-${i}`}
            className={cn(
              "grid grid-cols-2 gap-4",
              isWithOperator && "grid grid-cols-[40%_15%_40%]",
            )}
          >
            <Select value={snap.key} onValueChange={(e) => updateKey(i, e)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                {config.map((con) => (
                  <SelectItem key={con.field} value={con.field}>
                    {con.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isWithOperator && (
              <FilterOperatorComp
                index={i}
                onOperatorChange={(operator) => updateOperator(i, operator)}
                value={snap.operator ?? "eq"}
              />
            )}

            <ConfigRender snap={snap} index={i} config={selectedConfig} />
          </div>
        );
      })}
    </div>
  );
}

const ConfigRender: React.FC<{
  snap: FilterState;
  index: number;
  config: FilterConfig;
}> = ({ snap, index, config }) => {
  const { setSnapshot, onApplyFilter, snapshot, setOpen } = useFilterPanel();

  const updateValue = (index: number, value: string) => {
    setSnapshot((prev) =>
      prev.map((item, i) => (i === index ? { ...item, value } : item)),
    );
  };

  const deleteFilter = (index: number) => {
    setSnapshot((prev) => prev.filter((_, i) => i !== index));
  };

  if (config.type === "text")
    return (
      <FilterTextInput
        onEnterEvent={() => {
          onApplyFilter(snapshot);
          setOpen(false);
        }}
        onValueChange={(value) => updateValue(index, value)}
        value={snap.value}
        onClear={() => deleteFilter(index)}
        clearable
      />
    );

  if (config.type === "select") {
    const options = config.selectOptions;
    if (!options) throw new Error("Tipe select harus memiliki options");
    return (
      <FilterSelect
        value={snap.value}
        onValueChange={(value) => updateValue(index, value)}
        options={options}
        onClear={() => deleteFilter(index)}
        clearable
      />
    );
  }
};
