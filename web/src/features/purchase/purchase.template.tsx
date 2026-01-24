"use client";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { PurchaseProvider, usePurchase } from "./store/provider.purchase";
import { PurchaseHeader } from "./components/header.purchase";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { purchaseColumns } from "./components/columns/columns.purchase";
import { PurchaseToolbar } from "./components/toolbar/toolbar.purchase";
import { PurchaseDetailDialog } from "./components/dialog/detail/dialog-detail.purchase";
import { PurchaseAddDialog } from "./components/dialog/add/dialog-add.purchase";
import { PurchaseEditDialog } from "./components/dialog/edit/dialog-edit.purchase";
import { PurchaseDeleteDialog } from "./components/dialog/delete/dialog-delete.purchase";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";
import { TemplateMode } from "@/@types/general";

interface Props {
  mode: TemplateMode;
}
export function PurchaseTemplate({ mode }: Props) {
  if (mode === "demo")
    return (
      <MainContainer>
        <SectionContainer>
          <h1>Versi Demo Belum Tersedia</h1>
        </SectionContainer>
      </MainContainer>
    );

  return (
    <PurchaseProvider>
      <InnerTemplate />
    </PurchaseProvider>
  );
}

const InnerTemplate = () => {
  const { data, isLoading, query, updateQuery } = usePurchase();

  return (
    <>
      <MainContainer>
        <SectionContainer>
          <PurchaseHeader />
          <PurchaseToolbar />

          {isLoading || !data ? (
            <LoadingSpinner label="Memuat Data..." />
          ) : (
            <>
              <DataTable columns={purchaseColumns} data={data.data} />
              <DataTableFooterServer
                meta={data.meta}
                query={query}
                onQueryChange={updateQuery}
              />
            </>
          )}
        </SectionContainer>
      </MainContainer>

      <PurchaseDetailDialog />
      <PurchaseAddDialog />
      <PurchaseEditDialog />
      <PurchaseDeleteDialog />
    </>
  );
};
