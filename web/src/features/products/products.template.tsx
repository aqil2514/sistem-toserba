"use client";

import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { ProductsProvider, useProducts } from "./store/provider.products";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { DataTable } from "@/components/organisms/custom-data-table/core-table";
import { productColumns } from "./components/columns.product/columns.product";
import { ProductHeader } from "./components/header.product";
import { ProductDetailDialog } from "./components/detail.product";
import { ProductAddDialog } from "./components/dialog.product/add-dialog.product";
import { ProductEditDialog } from "./components/dialog.product/edit-dialog.product";
import { DeleteDialog } from "@/components/molecules/dialog/delete-dialog";
import { api } from "@/lib/api";
import { SERVER_URL } from "@/constants/url";
import { TemplateMode } from "@/@types/general";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";

interface Props {
  mode: TemplateMode;
}

export default function ProductTemplate({ mode }: Props) {
  if (mode === "demo") return <UnavailableDemo />

  return (
    <ProductsProvider>
      <InnerTemplate />
    </ProductsProvider>
  );
}

const InnerTemplate = () => {
  const {
    isLoading,
    data,
    deleteProduct,
    setDeleteProduct,
    deleteContent,
    mutate,
  } = useProducts();

  const deleteHandler = async () => {
    if (!deleteProduct) return;
    const url = `${SERVER_URL}/products/${deleteProduct.id}`;
    try {
      await api.delete(url);
      await mutate?.();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return (
    <>
      <MainContainer>
        <SectionContainer>
          <ProductHeader />
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

      <ProductDetailDialog />
      <ProductAddDialog />
      <ProductEditDialog />
      <DeleteDialog
        open={!!deleteProduct}
        onOpenChange={(open) => {
          if (!open) setDeleteProduct(null);
        }}
        contents={deleteContent}
        onDeleteHandle={deleteHandler}
      />
    </>
  );
};
