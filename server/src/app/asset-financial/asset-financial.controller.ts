import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PasetoGuard } from '../../guards/paseto.guard';
import { RoleGuard } from '../../guards/role.guard';
import { Roles } from '../../decorator/roles.decorator';
import { AssetFinancialFetchService } from './services/asset-financial-fetch.service';
import { BasicQuery } from '../../@types/general';

@Controller('asset-financial')
export class AssetFinancialController {
  constructor(
    private readonly assetFinancialFetchService: AssetFinancialFetchService,
  ) {}

  @Get('summary')
  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  async getAssetSummary(@Query() query:BasicQuery) {
    return await this.assetFinancialFetchService.getSummaryAsset(query);
  }
}
