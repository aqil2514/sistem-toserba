"use client";

import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { ProductsProvider, useProducts } from "./provider/provider.products";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { DataTable } from "@/components/organisms/custom-data-table/core-table";
import { productColumns } from "./components/columns.product";
import { ProductHeader } from "./components/header.product";

interface Props {
  mode: "private" | "demo";
}

export default function ProductTemplate({ mode }: Props) {
  if (mode === "demo")
    return (
      <MainContainer>
        <SectionContainer>
          <h1>Versi Demo Belum Tersedia</h1>
        </SectionContainer>
      </MainContainer>
    );

  return (
    <ProductsProvider>
      <InnerTemplate />
    </ProductsProvider>
  );
}

const InnerTemplate = () => {
  const { isLoading, data } = useProducts();
  return (
    <MainContainer>
      <SectionContainer>
      <ProductHeader  />
        {isLoading || !data ? (
          <LoadingSpinner label="Mengambil Data..." />
        ) : (
          <DataTable
            columns={productColumns}
            data={data}
            categoryKey="category"
            subCategoryKey="subcategory"
            searchKey="name"
            pageSize={10}
            withPagination
          />
        )}
      </SectionContainer>
    </MainContainer>
  );
};
