import { FilterState } from "@/@types/general";
import { FilterSelectOptions } from "../filter-select";

export type FilterPanelType = "text" | "select" | "number-range" | "date-range";

export interface FilterConfig {
  field: string;
  label: string;
  type: FilterPanelType;
  selectOptions?: FilterSelectOptions[];
  withOperator?: boolean;
}

export interface FilterPanelProps {
  config: FilterConfig[];
  initialValue: FilterState[];
  onApplyFilter: (state: FilterState[]) => void;
}