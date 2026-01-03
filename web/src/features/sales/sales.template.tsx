"use client";
import { SalesProvider, useSales } from "./store/sales.provider";
import { salesColumns } from "./components/columns.sales";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { PaginationSales } from "./components/pagination.sales";
import { SalesHeader } from "./components/header.sales";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SalesToolbar } from "./components/toolbar.sales";
import { SalesDetailDialog } from "./components/detail.sales";
import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { SalesEditDialog } from "./components/edit-item.sales";
import { SalesDeleteDialog } from "./components/delete-item.sales";
import { useShortcut } from "@/hooks/use-shortcut";

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
  const { data, isLoading, setOpenAddDialog } = useSales();

  useShortcut(() => setOpenAddDialog(true), { ctrl: true, key: "x" });

  return (
    <>
      <MainContainer>
        <SectionContainer>
          <SalesHeader />
          <SalesToolbar />

          {isLoading || !data ? (
            <LoadingSpinner label="Mengambil Data..." />
          ) : (
            <ScrollArea className="h-[60vh] w-full rounded-md border">
              <DataTable data={data.data} columns={salesColumns} />
              <ScrollBar orientation="horizontal" />
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          )}

          <PaginationSales />
        </SectionContainer>
      </MainContainer>

      <SalesDetailDialog />
      <SalesEditDialog />
      <SalesDeleteDialog />
    </>
  );
};
