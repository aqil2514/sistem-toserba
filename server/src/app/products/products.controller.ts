import {
  Controller,
  Get,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { PasetoGuard } from 'src/guards/paseto.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get()
  async getProducts() {
    return await this.productService.findAll();
  }
}
