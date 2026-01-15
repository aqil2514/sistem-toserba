"use client";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import {
  SalesReportProvider,
  useSalesReport,
} from "./store/provider.sales-report";
import { SalesReportHeader } from "./components/header/header.sales-report";
import { SalesReportToolbar } from "./components/toolbar/toolbar.sales-report";
import { DataSalesReport } from "./components/contents/data/data.sales-report";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportSalesSummary } from "./components/contents/summary/summary.report-sales";
import { ReportContent } from "./types/query.report-sales";
import { SalesReportChart } from "./components/contents/chart/chart.sales-report";

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
  const { query, updateQuery } = useSalesReport();

  return (
    <MainContainer>
      <SectionContainer>
        <SalesReportHeader />
        <SalesReportToolbar />

        <Tabs
          value={query.content}
          onValueChange={(e) => {
            updateQuery("filters", []);
            updateQuery("content", e as ReportContent);
          }}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="summary">Ringkasan</TabsTrigger>
            <TabsTrigger value="detail">Detail</TabsTrigger>
            <TabsTrigger value="chart">Diagram</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <ReportSalesSummary />
          </TabsContent>
          <TabsContent value="detail">
            <DataSalesReport />
          </TabsContent>
          <TabsContent value="chart">
            <SalesReportChart />
          </TabsContent>
        </Tabs>
      </SectionContainer>
    </MainContainer>
  );
};
