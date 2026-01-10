"use client";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import {
  SalesReportProvider,
  useSalesReport,
} from "./store/provider.sales-report";
import { SalesReportHeader } from "./components/header.sales-report";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SalesReportToolbar } from "./components/toolbar/toolbar.sales-report";
import { DataSalesReport } from "./components/data/data.sales-report";

interface Props {
  mode: "demo" | "private";
}

// TODO : fitur filter dan sortingnya untuk mode summary dan full. Nanti manfaatin full backend ajah

export function SalesReportTemplate({ mode }: Props) {
  if (mode === "demo")
    return (
      <MainContainer>
        <SectionContainer>
          <h1>Versi Demo Belum Tersedia</h1>
        </SectionContainer>
      </MainContainer>
    );

  return (
    <SalesReportProvider>
      <InnerTemplate />
    </SalesReportProvider>
  );
}

const InnerTemplate = () => {
  const { data, isLoading } = useSalesReport();
  return (
    <MainContainer>
      <SectionContainer>
        <SalesReportHeader />
        <SalesReportToolbar />
        {isLoading || !data ? (
          <LoadingSpinner label="Mengambil data..." />
        ) : (
          <DataSalesReport />
        )}
      </SectionContainer>
    </MainContainer>
  );
};
