"use client";
import { SalesProvider, useSales } from "./store/sales.provider";
import { salesColumns } from "./components/columns/columns.sales";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { SalesHeader } from "./components/header/header.sales";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SalesToolbar } from "./components/toolbar/toolbar.sales";
import { SalesDetailDialog } from "./components/detail/detail.sales";
import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { SalesEditDialog } from "./components/edit-item.sales";
import { SalesDeleteDialog } from "./components/delete-item.sales";
import { useShortcut } from "@/hooks/use-shortcut";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";
import { TemplateMode } from "@/@types/general";

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
    <SalesProvider mode={mode}>
      <InnerTemplate />
    </SalesProvider>
  );
}

const InnerTemplate = () => {
  const { data, isLoading, setOpenAddDialog, query, updateQuery } = useSales();

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

      <SalesDetailDialog />
      <SalesEditDialog />
      <SalesDeleteDialog />
    </>
  );
};
