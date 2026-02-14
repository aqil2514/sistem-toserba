import { BasicQuery } from "@/@types/general";
import { FormFieldNumber } from "@/components/forms/field-number.form";
import { InfoItem } from "@/components/molecules/items/info-item";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MutateButton } from "@/components/ui/mutate-button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { SERVER_URL } from "@/constants/url";
import { AssetRpcReturn } from "@/features/asset-financial/types/api-return";
import {
  CashCountSchemaType,
  CashCountsDetailSchemaType,
} from "@/features/cash-counter/schemas/cash-counts.schema";
import { CashCountsSummary } from "@/features/cash-counter/types/type.cash-counter-cash-counting";
import { CashDenomination } from "@/features/cash-counter/types/types.cash-counter-denomination";
import { useFetch } from "@/hooks/use-fetch";
import { buildUrl } from "@/utils/build-url";
import { formatRupiah } from "@/utils/format-to-rupiah";
import React, { useEffect, useMemo } from "react";
import { useFieldArray, UseFormReturn, useWatch } from "react-hook-form";

interface Props {
  form: UseFormReturn<CashCountSchemaType>;
  defaultValues?: CashCountSchemaType;
}

const useDetailForm = (
  form: UseFormReturn<CashCountSchemaType>,
  defaultValues?: CashCountSchemaType,
) => {
  const { data, isLoading } = useFetch<CashDenomination[]>(
    `${SERVER_URL}/cash-counter/denomination`,
  );
  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "detail",
  });

  const denominationData = useMemo<CashDenomination[]>(() => {
    if (!data) return [];

    return data;
  }, [data]);

  const denominationMap = useMemo(() => {
    const map = new Map<string, CashDenomination>();

    denominationData.forEach((data) => {
      map.set(data.id, data);
    });

    return map;
  }, [denominationData]);

  useEffect(() => {
    if (denominationData.length === 0 || defaultValues) return;
    const newDenominationValue: CashCountsDetailSchemaType[] =
      denominationData.map((data) => ({
        denominationId: data.id,
        quantity: 0,
      }));

    replace(newDenominationValue);
  }, [denominationData, replace, defaultValues]);

  const detail = useWatch({
    control: form.control,
    name: "detail",
  });

  return { isLoading, fields, detail, denominationMap };
};

export function DetailForm({ form, defaultValues }: Props) {
  const { isLoading, fields, detail, denominationMap } = useDetailForm(
    form,
    defaultValues,
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="px-4 space-y-4">
      <div className="grid grid-cols-5 gap-4 ">
        {fields.map((field, i) => {
          const denomination = denominationMap.get(field.denominationId);
          return (
            <div key={field.id}>
              <FormFieldNumber
                form={form}
                label={denomination?.label ?? ""}
                name={`detail.${i}.quantity`}
              />
            </div>
          );
        })}
      </div>

      <Separator />

      <TotalEachDenomination
        denominationMap={denominationMap}
        detail={detail}
      />

      <Separator />

      <Summary form={form} denominationMap={denominationMap} />
    </div>
  );
}

interface TotalEachDenominationProps {
  detail: {
    denominationId: string;
    quantity: number;
  }[];
  denominationMap: Map<string, CashDenomination>;
}
const TotalEachDenomination: React.FC<TotalEachDenominationProps> = ({
  detail,
  denominationMap,
}) => {
  return (
    <>
      <p className="text-sm font-semibold underline">Jumlah Masing-masing</p>
      <div className="grid grid-cols-5 gap-4">
        {detail.map((field) => {
          const denomination = denominationMap.get(field.denominationId);
          if (!denomination) return null;

          const total = denomination.nominal * field.quantity;

          return (
            <div key={field.denominationId}>
              <InfoItem
                label={denomination.label}
                value={formatRupiah(total)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const useCalculateSummary = (
  form: UseFormReturn<CashCountSchemaType>,
  denominationMap: Map<string, CashDenomination>,
  system_cash: number,
): CashCountsSummary => {
  const detail =
    useWatch({
      control: form.control,
      name: "detail",
    }) ?? [];

  const thirdParty =
    useWatch({
      control: form.control,
      name: "thirdParty",
    }) ?? [];

  const third_party_cash =
    thirdParty?.reduce((acc, curr) => acc + curr.amount, 0) ?? 0;

  const total_physical_cash =
    detail?.reduce((acc, curr) => {
      const denomination = denominationMap.get(curr.denominationId);
      if (!denomination) return acc;

      return acc + denomination.nominal * curr.quantity;
    }, 0) ?? 0;

  const net_store_cash = total_physical_cash - third_party_cash;

  const difference = net_store_cash - system_cash;

  return {
    total_physical_cash,
    system_cash,
    third_party_cash,
    net_store_cash,
    difference,
  };
};

interface SummaryProps {
  form: UseFormReturn<CashCountSchemaType>;
  denominationMap: Map<string, CashDenomination>;
}

const defaultQuery: BasicQuery = {
  limit: 10,
  page: 1,
  filters: [],
  sort: [],
  from: new Date(1970, 0, 1),
  to: new Date(),
};

const Summary: React.FC<SummaryProps> = ({ form, denominationMap }) => {
  const url = buildUrl<BasicQuery>(
    SERVER_URL,
    "/asset-financial/summary",
    defaultQuery,
  );
  const { data, isLoading, mutate } = useFetch<AssetRpcReturn[]>(url);

  const systemCash = useMemo<number>(() => {
    if (!data) return 0;

    const cash = data.find((d) => d.asset === "Tunai");

    return cash?.total ?? 0;
  }, [data]);

  const {
    difference,
    net_store_cash,
    system_cash,
    third_party_cash,
    total_physical_cash,
  } = useCalculateSummary(form, denominationMap, systemCash);

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold underline">Ringkasan</p>
        <MutateButton mutate={mutate} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <InfoItem
          label="Data di Sistem"
          value={isLoading ? <Spinner /> : formatRupiah(system_cash)}
        />
        <InfoItem
          label="Dana Orang Lain"
          value={formatRupiah(third_party_cash)}
        />
        <InfoItem
          label="Uang Fisik"
          value={formatRupiah(total_physical_cash)}
        />
        <InfoItem label="Total Uang" value={formatRupiah(net_store_cash)} />
        <InfoItem label="Selisih" value={formatRupiah(difference)} />
      </div>
    </>
  );
};
