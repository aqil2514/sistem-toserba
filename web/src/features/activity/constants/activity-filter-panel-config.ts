import { FilterConfig } from "@/components/filters/filter-panel/types.filter-panel";
import { FilterSelectOptions } from "@/components/filters/filter-select";
import { typeBadgeLabel } from "./activity-type/type-badge-label";
import { actionBadgeLabel } from "./activity-action/action-badge-label";

const typeSelect = (): FilterSelectOptions[] => {
  const result: FilterSelectOptions[] = [];
  const typeSelectEntries = Object.entries(typeBadgeLabel);

  typeSelectEntries.forEach(([key, value]) => {
    result.push({
      label: value,
      value: key,
    });
  });

  return result;
};

const actionSelect = (): FilterSelectOptions[] => {
  const result: FilterSelectOptions[] = [];
  const actionSelectEntries = Object.entries(actionBadgeLabel);

  actionSelectEntries.forEach(([key, value]) => {
    result.push({
      label: value,
      value: key,
    });
  });

  return result;
};

export const activityFilterPanel: FilterConfig[] = [
  {
    field: "title",
    label: "Judul",
    type: "text",
    withOperator: true,
  },
  {
    field: "type",
    label: "Tipe Log",
    type: "select",
    selectOptions: typeSelect(),
  },
  {
    field: "action",
    label: "Aksi Log",
    type: "select",
    selectOptions: actionSelect(),
  },
];
