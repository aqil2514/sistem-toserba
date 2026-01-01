import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSales } from "../provider/sales.provider";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SalesItemApiResponse } from "../types/sales-item-api";
import React from "react";
import { SalesDetailHeader } from "./detail-header.sales";
import { DetailItem } from "./detail-item.sales";
import { ScrollArea } from "@/components/ui/scroll-area";

export function SalesDetailDialog() {
  const { detailSalesId, setDetailSalesId } = useSales();

  const open = Boolean(detailSalesId);

  const salesItemFetcher = useFetch<SalesItemApiResponse[]>(
    open ? `${SERVER_URL}/sales/${detailSalesId}` : null
  );

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) setDetailSalesId("");
      }}
    >
      {salesItemFetcher.isLoading ? (
        <ContentLoading />
      ) : (
        <ContentReady data={salesItemFetcher.data} />
      )}
    </Dialog>
  );
}

const ContentLoading = () => {
  return (
    <DialogContent className="sm:max-w-5xl">
      <DialogHeader>
        <DialogTitle>Mengambil Data...</DialogTitle>
        <DialogDescription>Data sedang diambil. Mohon tunggu</DialogDescription>
      </DialogHeader>
      <LoadingSpinner label="Loading..." />
    </DialogContent>
  );
};

const ContentReady: React.FC<{ data?: SalesItemApiResponse[] }> = ({
  data,
}) => {
  if (!data) return null;
  const salesHeader = data[0].sales_id;

  return (
    <DialogContent className="sm:max-w-5xl">
      <ScrollArea className="h-96 lg:h-auto">
        <DialogHeader>
          <DialogTitle>Data {salesHeader.sales_code}</DialogTitle>
          <DialogDescription>
            Informasi tentang data penjualan dengan kode{" "}
            {salesHeader.sales_code}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-4">
          <SalesDetailHeader salesHeader={salesHeader} />
          <DetailItem items={data} />
        </div>
      </ScrollArea>
    </DialogContent>
  );
};
