import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../../decorator/roles.decorator';
import { PasetoGuard } from '../../../guards/paseto.guard';
import { RoleGuard } from '../../../guards/role.guard';
import { CashCounterDenominationService } from '../services/cash-counter-denomination.service';
import { DenominationDto } from '../dto/denomination.dto';

@UseGuards(PasetoGuard, RoleGuard)
@Roles('admin')
@Controller('cash-counter/denomination')
export class CashCounterDenominationController {
  constructor(
    private readonly cashCounterDenominationService: CashCounterDenominationService,
  ) {}

  @Get()
  async getAllDenomination() {
    return await this.cashCounterDenominationService.getAllDenomination();
  }

  @Get(':id')
  async getDenominationById(@Param('id') id: string) {
    return await this.cashCounterDenominationService.getDenominationById(id);
  }

  @Post()
  async createNewDenomination(@Body() body: DenominationDto) {
    return await this.cashCounterDenominationService.createNewDenomitaion(body);
  }

  @Put(':id')
  async editDenomination(
    @Body() body: DenominationDto,
    @Param('id') id: string,
  ) {
    return await this.cashCounterDenominationService.editDenominationById(
      id,
      body,
    );
  }
}
