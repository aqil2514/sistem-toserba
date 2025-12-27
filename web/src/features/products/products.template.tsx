"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useProducts } from "./hooks/use-products";
import { MainContainer } from "@/components/layout/container/main-container";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ProductError } from "./components/error.product";
import { Separator } from "@/components/ui/separator";

import { ProductHeader } from "./components/header.product";
import { ProductEmpty } from "./components/empty.product";
import { ProductFormDialog } from "./components/form-dialog.product";
import { productColumns } from "./components/columns.product";

import { Product } from "./type";
import { ProductFormValues } from "./schema/product.schema";
import { productToFormValues } from "./utils/product-to-form";

export function ProductTemplate() {
  const { data, isLoading, error, mutate } = useProducts();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  function handleAdd() {
    setEditing(null);
    setOpen(true);
  }

  function handleEdit(product: Product) {
    setEditing(product);
    setOpen(true);
  }

  function handleDelete(product: Product) {
    // sementara
    console.log("delete", product.id);
  }

  function handleSubmit(values: ProductFormValues) {
    if (editing) {
      console.log("update", editing.id, values);
    } else {
      console.log("create", values);
    }

    setOpen(false);
    setEditing(null);
    mutate(); // refresh data (SWR)
  }

  return (
    <MainContainer>
      <div className="w-full max-w-5xl bg-background rounded-lg border shadow-sm p-6 flex flex-col gap-6">
        {/* HEADER */}
        <ProductHeader onAdd={handleAdd} />

        <Separator />

        {/* CONTENT */}
        <div className="flex flex-col gap-4">
          {isLoading && <LoadingSpinner label="Memuat data produk..." />}

          {error && <ProductError />}

          {!isLoading && !error && data?.length === 0 && (
            <ProductEmpty onAdd={handleAdd} />
          )}

          {!isLoading && !error && data && data.length > 0 && (
            <DataTable
              columns={productColumns(handleEdit, handleDelete)}
              data={data}
              pageSize={10}
              searchKey="name"
              categoryKey="category"
            />
          )}
        </div>
      </div>

      {/* DIALOG ADD / EDIT */}
      <ProductFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? "Edit Produk" : "Tambah Produk"}
        defaultValues={editing ? productToFormValues(editing) : undefined}
        onSubmit={handleSubmit}
      />
    </MainContainer>
  );
}
