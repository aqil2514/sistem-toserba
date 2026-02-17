import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../decorator/roles.decorator";
import { PasetoGuard } from "../../../guards/paseto.guard";
import { RoleGuard } from "../../../guards/role.guard";
import { PurchaseFetcherService } from "../services/purchase-fetcher.service";

@UseGuards(PasetoGuard, RoleGuard)
@Roles('admin')
@Controller('purchase/fetcher')
export class PurchaseFetcherController{
constructor(
    private readonly fetcherService:PurchaseFetcherService
){}

@Get("supplier-name")
async getSupplierName(){
    return await this.fetcherService.getSupplierName()
}

@Get("supplier-type")
async getSupplierType(){
    return await this.fetcherService.getSupplierType()
}
}