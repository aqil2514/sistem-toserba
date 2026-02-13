import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { useCashflow } from "../../store/provider.cashflow";
import {
  SingleSorting,
  SortingKeyType,
} from "@/components/molecules/sorting/single-sorting";
import { useMemo } from "react";
import { FilterPanel } from "@/components/filters/filter-panel/master.filter-panel";
import { FilterConfig } from "@/components/filters/filter-panel/types.filter-panel";
import {
  statusCashflow,
  viaCashflow,
} from "../../constants/cashflow-filter-options.constants";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { CashflowCategoryDb } from "../../types/cashflow-category.types";
import { FilterSelectOptions } from "@/components/filters/filter-select";

const sortingkeys: SortingKeyType[] = [
  {
    sortingKey: "transaction_at",
    label: "Tanggal",
  },
  {
    sortingKey: "product_service",
    label: "Nama Produk / Jasa",
  },
  {
    sortingKey: "cashflow_category",
    label: "Kategori",
  },
  {
    sortingKey: "status_cashflow",
    label: "Status Cashflow",
  },
  {
    sortingKey: "via",
    label: "Via",
  },
  {
    sortingKey: "price",
    label: "Nominal",
  },
];

export function CashflowToolbar() {
  const { updateQuery, query } = useCashflow();

  const memoQueryFilter = useMemo(() => query.filters, [query.filters]);

  const { data } = useFetch<CashflowCategoryDb[]>(
    `${SERVER_URL}/cashflow/categories`,
  );

  const filterConfig = useMemo<FilterConfig[]>(() => {
    const basicConfig: FilterConfig[] = [
      {
        field: "product_service",
        label: "Nama Produk / Jasa",
        type: "text",
        withOperator: true,
      },
      {
        field: "status_cashflow",
        label: "Status Cashflow",
        type: "select",
        selectOptions: statusCashflow,
      },
      {
        field: "via",
        label: "Aset",
        type: "select",
        selectOptions: viaCashflow,
      },
      {
        field: "price",
        label: "Nominal",
        type: "text",
        withOperator: true,
      },
    ];

    if (data) {
      const mappedCategory: FilterSelectOptions[] = data.map((d) => ({
        label: d.name,
        value: d.name,
      }));
      const categoryFilter: FilterConfig = {
        field: "cashflow_category",
        label: "Kategori",
        type: "select",
        selectOptions: mappedCategory,
      };

      basicConfig.push(categoryFilter);
    }

    return basicConfig;
  }, [data]);

  return (
    <div className="flex gap-4 items-center">
      <FilterPanel
        config={filterConfig}
        initialValue={memoQueryFilter ?? []}
        onApplyFilter={(state) => updateQuery("filters", state)}
      />
      <SingleSorting
        sortingkeys={sortingkeys}
        onSortStateChange={(query) => updateQuery("sort", query)}
      />
      <ToolbarDatepicker
        onApply={(date) => {
          updateQuery("from", date.from);
          updateQuery("to", date.to);
        }}
        date={{ from: query.from, to: query.to }}
        setDate={(date) => {
          updateQuery("from", date.from);
          updateQuery("to", date.to);
          updateQuery("page", 1);
        }}
      />
    </div>
  );
}
