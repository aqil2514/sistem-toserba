import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../decorator/roles.decorator';
import { PasetoGuard } from '../../guards/paseto.guard';
import { RoleGuard } from '../../guards/role.guard';
import { CashflowDto } from './dto/cashflow.dto';
import { CashflowFormService } from './services/cashflow-form.service';
import { CashflowFetchService } from './services/cashflow-fetch.service';
import { BasicQuery } from '../../@types/general';
import { CashflowSalesService } from './services/cashflow-sales.service';

@Controller('cashflow')
export class CashflowController {
  constructor(
    private readonly cashflowFormService: CashflowFormService,
    private readonly cashflowFetchService: CashflowFetchService,
    private readonly cashflowSalesService: CashflowSalesService,
  ) {}

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Post()
  async createNewCashflow(@Body() body: CashflowDto) {
    return await this.cashflowFormService.createNewCashflowData(body);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Post('sales')
  async createNewCashflowFromSales() {
    return await this.cashflowSalesService.createNewCashflowFromSales();
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get()
  async getCashflowsData(@Query() query: BasicQuery) {
    return await this.cashflowFetchService.getCashflowsData(query);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get('categories')
  async getCashflowCategories() {
    return await this.cashflowFetchService.getAllCashflowCategory();
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get('assets')
  async getCashflowAset() {
    return await this.cashflowFetchService.getAllCashflowAsset();
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get(':id')
  async getCashflowDataById(@Param('id') cashflowId: string) {
    return await this.cashflowFetchService.getCashflowDataById(cashflowId);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Put(':id/edit')
  async editCashflow(
    @Body() body: CashflowDto,
    @Param('id') cashflowId: string,
    @Query('transfer_group_id') transferGroupId: string,
  ) {
    return await this.cashflowFormService.editCashflowData(
      body,
      cashflowId,
      transferGroupId,
    );
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteCashflowData(
    @Param('id') cashflowId: string,
    @Query('transfer_group_id') transferGroupId: string,
  ) {
    return await this.cashflowFormService.hardDeleteCashflowData(
      cashflowId,
      transferGroupId,
    );
  }
}
