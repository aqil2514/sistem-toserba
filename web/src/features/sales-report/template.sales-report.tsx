"use client";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { SalesReportProvider } from "./store/provider.sales-report";
import { SalesReportHeader } from "./components/header/header.sales-report";
import { SalesReportToolbar } from "./components/toolbar/toolbar.sales-report";
import { DataSalesReport } from "./components/contents/data/data.sales-report";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportSalesSummary } from "./components/contents/summary/summary.report-sales";

interface Props {
  mode: "demo" | "private";
}

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
  return (
    <MainContainer>
      <SectionContainer>
        <SalesReportHeader />
        <SalesReportToolbar />

        <Tabs defaultValue="summary" className="w-full">
          <TabsList>
            <TabsTrigger value="summary">Ringkasan</TabsTrigger>
            <TabsTrigger value="detail">Detail</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <ReportSalesSummary />
          </TabsContent>
          <TabsContent value="detail">
            <DataSalesReport />
          </TabsContent>
        </Tabs>
      </SectionContainer>
    </MainContainer>
  );
};
