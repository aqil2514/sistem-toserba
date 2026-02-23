import { EmptyData } from "@/components/molecules/empty/empty-data";
import { PurchaseDetailReturn } from "@/features/purchase/types/purchase-api.types";
import { DetailHeader } from "./detail-header.purchase";
import { FlexDetailItemRender } from "./detail-item.purchase";

interface Props {
  data?: PurchaseDetailReturn;
}

export function PurchaseDetailComponent({ data }: Props) {
  if (!data) return <EmptyData />;

  return (
    <div className="space-y-4">
      <DetailHeader data={data.header} />
      <FlexDetailItemRender type={data.type} items={data.items} />
    </div>
  );
}
