import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../../../decorator/roles.decorator';
import { PasetoGuard } from '../../../guards/paseto.guard';
import { RoleGuard } from '../../../guards/role.guard';
import { DashboardService } from '../services/dashboard.service';

@UseGuards(PasetoGuard, RoleGuard)
@Roles('admin')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly service: DashboardService) {}
  @Get("/logs")
  async getDashboardData() {
    return await this.service.getLatestLogs();
  }
}
