import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProducts } from "../../provider/provider.products";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { ContentDetail } from "./content-detail.product";
import { ContentHistory } from "./content-history.product";

export function ProductDetailDialog() {
  const { detailProduct, setDetailProduct } = useProducts();

  if (!detailProduct) return null;

  return (
    <Dialog open={!!detailProduct} onOpenChange={() => setDetailProduct(null)}>
      <DialogContent className="sm:max-w-7xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>Detail {detailProduct.name}</DialogTitle>
          <DialogDescription>
            Informasi mengenai produk {detailProduct.name}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="space-y-4">
          <ContentDetail data={detailProduct} />
          <ContentHistory product_id={detailProduct.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
