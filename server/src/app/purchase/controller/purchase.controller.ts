import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PasetoGuard } from '../../../guards/paseto.guard';
import { RoleGuard } from '../../../guards/role.guard';
import { Roles } from '../../../decorator/roles.decorator';
import { PurchaseService } from '../services/purchase.service';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { PurchaseQuery } from '../interface/purchase-query.interface';
import { PurchaseFormService } from '../services/purchase-form.service';
import { PurchaseReportService } from '../services/purchase-report.service';
import { BasicQueryDto } from '../../../services/query/dto/query.dto';
import { PurchaseStatus, PurchaseType } from '../interface/purchase.interface';

@UseGuards(PasetoGuard, RoleGuard)
@Roles('admin')
@Controller('purchase')
export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly purchaseFormService: PurchaseFormService,
    private readonly purchaseReportService: PurchaseReportService,
  ) {}

  @Get()
  async getPurchase(@Query() query: BasicQueryDto) {
    return await this.purchaseService.findByQuery(query);
  }

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

  @Get(':id')
  async getPurchaseItem(@Param('id') id: string) {
    return await this.purchaseService.findByIdWithItems(id);
  }

  @Delete(':id')
  async softDeletePurchase(
    @Param('id') id: string,
    @Query('purchase_type') type: PurchaseType,
  ) {
    return await this.purchaseFormService.softDeletePurchase(id, type);
  }

  @Put(':id')
  async updatePurchase(
    @Param('id') id: string,
    @Body() body: CreatePurchaseDto,
  ) {
    return await this.purchaseFormService.updatePurchase(id, body);
  }

  @Patch(':item_id/remaining_quantity')
  async updateRemainingQuantityPurchase(
    @Param('item_id') item_id: string,
    @Body() body: { remaining_quantity: number },
  ) {
    return await this.purchaseFormService.updateQuantityRemaining(
      item_id,
      body.remaining_quantity,
    );
  }

  @Patch(':purchase_id/purchase_status')
  async updatePurchaseState(
    @Param('purchase_id') purchaseId: string,
    @Body('purchase_status') purchase_status: PurchaseStatus,
  ) {
    return await this.purchaseFormService.updatePurchaseStatus(purchaseId, purchase_status)
  }

  @Post()
  async addPurchase(@Body() body: CreatePurchaseDto) {
    return await this.purchaseFormService.createNewPurchase(body);
  }
}
