"use client";
import { SalesProvider, useSales } from "./provider/sales.provider";
import { salesColumns } from "./components/columns.sales";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { DataTable } from "@/components/organisms/data-table/core-table";
import { PaginationSales } from "./components/pagination.sales";
import { SalesHeader } from "./components/header.sales";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SalesToolbar } from "./components/toolbar.sales";

interface Props {
  mode: "private" | "demo";
}

export default function SalesTemplate({ mode }: Props) {
  if (mode === "demo")
    return (
      <MainContainer>
        <SectionContainer>
          <h1>Versi Demo Belum Tersedia</h1>
        </SectionContainer>
      </MainContainer>
    );
    
  return (
    <SalesProvider mode={mode}>
      <InnerTemplate />
    </SalesProvider>
  );
}

const InnerTemplate = () => {
  const { data, isLoading, query } = useSales();

  return (
    <MainContainer>
      <SectionContainer>
        <SalesHeader />
        <SalesToolbar />

        {isLoading || !data ? (
          <LoadingSpinner label="Mengambil Data..." />
        ) : (
          <ScrollArea className="h-[60vh] w-full rounded-md border">
            <DataTable
              withPagination={false}
              pageSize={query.limit}
              data={data.data}
              columns={salesColumns}
            />
          </ScrollArea>
        )}

        <PaginationSales />
      </SectionContainer>
    </MainContainer>
  );
};
