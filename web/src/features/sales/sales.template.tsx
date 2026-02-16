"use client";
import { SalesProvider, useSales } from "./store/sales.provider";
import { salesColumns } from "./components/columns/columns.sales";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { SalesHeader } from "./components/header/header.sales";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SalesToolbar } from "./components/toolbar/toolbar.sales";
import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { SalesDeleteDialog } from "./components/dialog/delete-dialog.sales";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";
import { TemplateMode } from "@/@types/general";
import { SalesAddDialog } from "./components/dialog/add-dialog.sales";
import { SalesDetailDialog } from "./components/dialog/detail-dialog.sales";
import { SalesEditDialog } from "./components/dialog/edit-dialog.sales";

interface Props {
  mode: TemplateMode;
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
    <SalesProvider>
      <InnerTemplate />
    </SalesProvider>
  );
}

const InnerTemplate = () => {
  const { data, isLoading, query, updateQuery } = useSales();


  return (
    <>
      <MainContainer>
        <SectionContainer>
          <SalesHeader />
          <SalesToolbar />

          {isLoading || !data ? (
            <LoadingSpinner label="Mengambil Data..." />
          ) : (
            <>
              <ScrollArea className="h-[60vh] w-full rounded-md border">
                <DataTable data={data.data} columns={salesColumns} />
                <ScrollBar orientation="horizontal" />
                <ScrollBar orientation="vertical" />
              </ScrollArea>
              <DataTableFooterServer
                meta={data.meta}
                query={query}
                onQueryChange={updateQuery}
              />
            </>
          )}
        </SectionContainer>
      </MainContainer>

      <SalesAddDialog />
      <SalesDetailDialog />
      <SalesEditDialog />

      <SalesDeleteDialog />
    </>
  );
};
