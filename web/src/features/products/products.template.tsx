// "use client";

// import { useState } from "react";
// import { DataTable } from "@/components/ui/data-table";
// import { useProducts } from "./hooks/use-products";
// import { MainContainer } from "@/components/layout/container/main-container";
// import { LoadingSpinner } from "@/components/ui/loading-spinner";
// import { ProductError } from "./components/error.product";
// import { Separator } from "@/components/ui/separator";

// import { ProductHeader } from "./components/header.product";
// import { ProductEmpty } from "./components/empty.product";
// import { ProductFormDialog } from "./components/form-dialog.product";
// import { productColumns } from "./components/columns.product";

// import { Product } from "./type";
// import { ProductFormValues } from "./schema/product.schema";
// import { productToFormValues } from "./utils/product-to-form";
// import { useProductTaxonomy } from "./hooks/use-product-taxonomy";
// import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

// export function ProductTemplate() {
//   const { data, isLoading, error, mutate } = useProducts();
//   const [deleting, setDeleting] = useState<Product | null>(null);

//   const { categories, subcategoriesMap } = useProductTaxonomy(data);

//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState<Product | null>(null);

//   function handleAdd() {
//     setEditing(null);
//     setOpen(true);
//   }

//   function handleEdit(product: Product) {
//     setEditing(product);
//     setOpen(true);
//   }

//   function handleDelete(product: Product) {
//     setDeleting(product);
//   }

//   function handleSubmit(values: ProductFormValues) {
//     if (editing) {
//       console.log("update", editing.id, values);
//     } else {
//       console.log("create", values);
//     }

//     setOpen(false);
//     setEditing(null);
//     mutate();
//   }

//   return (
//     <MainContainer>
//       <div className="w-full max-w-5xl bg-background rounded-lg border shadow-sm p-6 flex flex-col gap-6">
//         {/* HEADER */}
//         <ProductHeader onAdd={handleAdd} />

//         <Separator />

//         {/* CONTENT */}
//         <div className="flex flex-col gap-4">
//           {isLoading && <LoadingSpinner label="Memuat data produk..." />}

//           {error && <ProductError />}

//           {!isLoading && !error && data?.length === 0 && (
//             <ProductEmpty onAdd={handleAdd} />
//           )}

//           {!isLoading && !error && data && data.length > 0 && (
//             <DataTable
//               columns={productColumns(handleEdit, handleDelete)}
//               data={data}
//               pageSize={10}
//               searchKey="name"
//               categoryKey="category"
//             />
//           )}
//         </div>
//       </div>

//       {/* DIALOG ADD / EDIT */}
//       <ProductFormDialog
//         open={open}
//         onOpenChange={setOpen}
//         title={editing ? "Edit Produk" : "Tambah Produk"}
//         defaultValues={editing ? productToFormValues(editing) : undefined}
//         onSubmit={handleSubmit}
//         categories={categories}
//         subcategoriesMap={subcategoriesMap}
//       />

//       <ConfirmDeleteDialog
//         open={!!deleting}
//         onOpenChange={(open) => {
//           if (!open) setDeleting(null);
//         }}
//         title="Hapus Produk"
//         description={`Produk "${deleting?.name}" akan dihapus. Produk ini masih dapat dipulihkan`}
//         confirmText="Hapus Produk"
//         onConfirm={async () => {
//           if (!deleting) return;

//           setDeleting(null);
//           mutate();
//         }}
//       />
//     </MainContainer>
//   );
// }

"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { MainContainer } from "@/components/layout/container/main-container";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Separator } from "@/components/ui/separator";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

import { ProductHeader } from "./components/header.product";
import { ProductEmpty } from "./components/empty.product";
import { ProductFormDialog } from "./components/form-dialog.product";
import { ProductError } from "./components/error.product";
import { productColumns } from "./components/columns.product";

import { Product } from "./type";
import { ProductFormValues } from "./schema/product.schema";
import { productToFormValues } from "./utils/product-to-form";
import { useProductTaxonomy } from "./hooks/use-product-taxonomy";

type ProductTemplateProps = {
  mode: "private" | "demo";
  data?: Product[];
  isLoading?: boolean;
  error?: Error;
  onCreate: (values: ProductFormValues) => void;
  onUpdate: (id: string, values: ProductFormValues) => void;
  onDelete: (id: string) => void;
};

export function ProductTemplate({
  mode,
  data = [],
  isLoading = false,
  error,
  onCreate,
  onUpdate,
  onDelete,
}: ProductTemplateProps) {
  const { categories, subcategoriesMap } = useProductTaxonomy(data);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);

  function handleAdd() {
    setEditing(null);
    setOpen(true);
  }

  function handleEdit(product: Product) {
    setEditing(product);
    setOpen(true);
  }

  function handleSubmit(values: ProductFormValues) {
    if (editing) {
      onUpdate(editing.id, values);
    } else {
      onCreate(values);
    }

    setOpen(false);
    setEditing(null);
  }

  return (
    <MainContainer>
      <div className="w-full max-w-5xl bg-background rounded-lg border shadow-sm p-6 flex flex-col gap-6">
        {/* HEADER */}
        <ProductHeader
          onAdd={handleAdd}
          mode={mode}
        />

        <Separator />

        {/* CONTENT */}
        <div className="flex flex-col gap-4">
          {isLoading && (
            <LoadingSpinner label="Memuat data produk..." />
          )}

          {error && <ProductError />}

          {!isLoading && !error && data.length === 0 && (
            <ProductEmpty onAdd={handleAdd} />
          )}

          {!isLoading && !error && data.length > 0 && (
            <DataTable
              columns={productColumns(handleEdit, setDeleting)}
              data={data}
              pageSize={10}
              searchKey="name"
              categoryKey="category"
            />
          )}
        </div>
      </div>

      {/* ADD / EDIT */}
      <ProductFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? "Edit Produk" : "Tambah Produk"}
        defaultValues={editing ? productToFormValues(editing) : undefined}
        onSubmit={handleSubmit}
        categories={categories}
        subcategoriesMap={subcategoriesMap}
      />

      {/* DELETE */}
      <ConfirmDeleteDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Hapus Produk"
        description={`Produk "${deleting?.name}" akan dihapus.`}
        confirmText="Hapus Produk"
        onConfirm={() => {
          if (!deleting) return;
          onDelete(deleting.id);
          setDeleting(null);
        }}
      />
    </MainContainer>
  );
}


// TODO https://chatgpt.com/c/694f7b4e-28e4-8321-a049-80f9cb53ab03