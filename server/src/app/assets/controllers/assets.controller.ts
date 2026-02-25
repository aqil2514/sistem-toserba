import { Controller, Get, UseGuards } from '@nestjs/common';
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
    return await this.assetsService.getAllAssets()
  }
}
