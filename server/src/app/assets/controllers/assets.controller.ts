import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { Roles } from '../../../decorator/roles.decorator';
import { PasetoGuard } from '../../../guards/paseto.guard';
import { RoleGuard } from '../../../guards/role.guard';
import { AssetsService } from '../services/assets.service';

@UseGuards(PasetoGuard, RoleGuard)
@Roles('admin')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  async getAssets() {
    return await this.assetsService.getAllAssets();
  }

  @Patch(':asset_id/condition')
  async updateAssetCondition(
    @Param('asset_id') assetId: string,
    @Body('newCondition') newCondition: string,
  ) {
    return await this.assetsService.updateAssetCondition(assetId, newCondition);
  }
}
