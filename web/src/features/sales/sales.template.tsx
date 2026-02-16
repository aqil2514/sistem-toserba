"use client";
import { SalesProvider } from "./store/sales.provider";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { SalesHeader } from "./components/header/header.sales";
import { SalesToolbar } from "./components/toolbar/toolbar.sales";
import { SalesDeleteDialog } from "./components/dialog/delete-dialog.sales";
import { TemplateMode } from "@/@types/general";
import { SalesAddDialog } from "./components/dialog/add-dialog.sales";
import { SalesDetailDialog } from "./components/dialog/detail-dialog.sales";
import { SalesEditDialog } from "./components/dialog/edit-dialog.sales";
import { SalesContent } from "./components/sales.content";

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
  return (
    <>
      <MainContainer>
        <SectionContainer>
          <SalesHeader />
          <SalesToolbar />

          <SalesContent />
        </SectionContainer>
      </MainContainer>

      <SalesAddDialog />
      <SalesDetailDialog />
      <SalesEditDialog />
      <SalesDeleteDialog />
    </>
  );
};
