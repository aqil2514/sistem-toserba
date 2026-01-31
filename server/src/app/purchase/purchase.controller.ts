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
import { PasetoGuard } from '../../guards/paseto.guard';
import { RoleGuard } from '../../guards/role.guard';
import { Roles } from '../../decorator/roles.decorator';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchaseQuery } from './interface/purchase-query.interface';
import { PurchaseFormService } from './helpers/purchase-form.service';
import { PurchaseReportService } from './helpers/purchase-report.service';

@Controller('purchase')
export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly purchaseFormService: PurchaseFormService,
    private readonly purchaseReportService: PurchaseReportService,
  ) {}

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get()
  async getPurchase(@Query() query: PurchaseQuery) {
    return await this.purchaseService.findByQuery(query);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get('report')
  async getPurchaseReport(@Query() query: PurchaseQuery) {
    if (query.content === 'detail')
      return await this.purchaseReportService.getPurchaseDetailReport(query);
    if (query.content === 'chart') {
      switch (query.chart_data) {
        case 'breakdown':
          return await this.purchaseReportService.getPurchaseBreakdownReport(
            query,
          );

        case 'category':
          return await this.purchaseReportService.getPurchaseCategoryReport(
            query,
          );

        default:
          return await this.purchaseReportService.getPurchaseCategoryReport(
            query,
          );
      }
    }
    return await this.purchaseReportService.getPurchaseSummaryReport(query);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get('form-rss')
  async getFormResources() {
    return await this.purchaseFormService.getPurchaseFormResources();
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get(':id')
  async getPurchaseItem(@Param('id') id: string) {
    return await this.purchaseService.findByIdWithItems(id);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Delete(':id')
  async softDeletePurchase(@Param('id') id: string) {
    return await this.purchaseService.softDeletePurchase(id);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Patch(':id')
  async updatePurchase(
    @Param('id') id: string,
    @Body() body: UpdatePurchaseDto,
  ) {
    return await this.purchaseService.updatePurchase(id, body);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Patch(':item_id/remaining_quantity')
  async updateRemainingQuantityPurchase(
    @Param('item_id') item_id: string,
    @Body() body: { remaining_quantity: number },
  ) {
    return await this.purchaseService.updateQuantityRemaining(
      item_id,
      body.remaining_quantity,
    );
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Post()
  async addPurchase(@Body() body: CreatePurchaseDto) {
    return await this.purchaseService.createPurchase(body);
  }
}
