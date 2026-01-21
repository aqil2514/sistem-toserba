import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { RoleGuard } from '../../guards/role.guard';
import { Roles } from '../../decorator/roles.decorator';
import { PasetoGuard } from '../../guards/paseto.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFetchService } from './helpers/products-fetch.service';
import { ProductStockService } from './helpers/products-stock.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private readonly productFetchService: ProductFetchService,
    private readonly productStockService: ProductStockService,
  ) {}

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get()
  async getProducts(@Query('display-mode') displayMode: string) {
    switch (displayMode) {
      case 'non_deleted_item':
        return await this.productFetchService.findAllNonDeletedItem();
      case 'deleted_item':
        return await this.productFetchService.findAllDeletedItem();
      default:
        return await this.productFetchService.findAll();
    }
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get('stocks')
  async getProductStocks() {
    return await this.productStockService.getProductStock();
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get(':id/in')
  async getInProductsHistory(@Param('id') id: string) {
    return await this.productStockService.getInProductHistory(id);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get(':id/out')
  async getOutProductHistory(@Param('id') id: string) {
    return await this.productStockService.getOutProductHistory(id);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Post()
  async addProduct(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Patch(':id')
  async patchProduct(@Body() dto: CreateProductDto, @Param('id') id: string) {
    return await this.productService.update(id, dto);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Patch(':id/restore')
  async restoreProduct(@Param('id') id: string) {
    return await this.productService.restore(id);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.remove(id);
  }
}
