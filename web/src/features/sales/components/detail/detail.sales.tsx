import { SalesItemApiResponse } from "../../types/sales-item-api";
import React from "react";
import { SalesDetailHeader } from "./detail-header.sales";
import { DetailItem } from "./detail-item.sales";
import { isSalesHeader } from "../../utils/type-guard.sales";

export const SalesDetail: React.FC<{ data?: SalesItemApiResponse[] }> = ({
  data,
}) => {
  if (!data) return null;
  const salesHeader = data[0].sales_id;
  const totalHpp = data.reduce((acc, curr) => acc + curr.hpp, 0);

  if (!isSalesHeader(salesHeader)) return null;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <SalesDetailHeader salesHeader={salesHeader} totalHpp={totalHpp} />
      <DetailItem items={data} />
    </div>
  );
};
