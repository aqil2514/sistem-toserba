import { Injectable } from "@nestjs/common";

@Injectable()
export class PurchaseUpdateService{
      // async updatePurchase(purchaseId: string, dto: UpdatePurchaseDto) {
      //   const [oldPurchase, oldItems] = await Promise.all([
      //     this.fetcherService.getPurchaseById(purchaseId),
      //     this.fetcherService.getPurchaseItemByPurchaseId(purchaseId),
      //   ]);
    
      //   // 1️⃣ Pastikan purchase ada & belum dihapus
      //   const { data: existing, error: findError } = await this.supabase
      //     .from('purchases')
      //     .select('id')
      //     .eq('id', purchaseId)
      //     .is('deleted_at', null)
      //     .maybeSingle();
    
      //   if (findError || !existing) {
      //     throw new NotFoundException('Purchase tidak ditemukan');
      //   }
    
      //   // 2️⃣ Update HEADER purchase
      //   const mappedPurchase = this.mapperService.mapToPurchaseUpdateDb({
      //     ...dto,
      //   });
    
      //   if (Object.keys(mappedPurchase).length === 0)
      //     throw new BadRequestException('Tidak ada perubahan data header');
    
      //   const { data: purchase, error: updateError } = await this.supabase
      //     .from('purchases')
      //     .update(mappedPurchase)
      //     .eq('id', purchaseId)
      //     .select()
      //     .maybeSingle();
    
      //   if (updateError) {
      //     console.error(updateError);
      //     throw new InternalServerErrorException('Gagal update data purchase');
      //   }
    
      //   if (!purchase) {
      //     throw new NotFoundException('Purchase tidak ditemukan');
      //   }
    
      //   // 3️⃣ Hard delete item lama
      //   const deletedAt = new Date().toISOString();
    
      //   const { error: hardDeleteError } = await this.supabase
      //     .from('purchase_items')
      //     .delete()
      //     .eq('purchase_id', purchaseId)
      //     .is('deleted_at', null);
    
      //   if (hardDeleteError) {
      //     console.error(hardDeleteError);
      //     throw new InternalServerErrorException('Gagal menghapus item lama');
      //   }
    
      //   const newItems: PurchaseItemInsert[] = []; // Buat log aktivitas
      //   // 4️⃣ Insert item BARU (jika ada)
      //   if (dto.items && dto.items.length > 0) {
      //     const mappedItems = await Promise.all(
      //       dto.items.map((item) =>
      //         this.mapperService.mapToPurchaseItemDb(item, purchaseId),
      //       ),
      //     );
    
      //     newItems.push(...mappedItems);
    
      //     const { error: insertItemError } = await this.supabase
      //       .from('purchase_items')
      //       .insert(mappedItems);
    
      //     if (insertItemError) {
      //       console.error(insertItemError);
    
      //       await this.supabase
      //         .from('purchase_items')
      //         .update({ deleted_at: null })
      //         .eq('purchase_id', purchaseId)
      //         .eq('deleted_at', deletedAt);
    
      //       throw new InternalServerErrorException('Gagal menambahkan item baru');
      //     }
      //   }
    
      //   await this.activityService.updatePurchaseActivity(
      //     mappedPurchase as PurchaseInsert,
      //     oldPurchase,
      //     newItems,
      //     oldItems,
      //     purchaseId,
      //   );
    
      //   return {
      //     purchase,
      //     message: 'Purchase berhasil diperbarui',
      //   };
      // }
}