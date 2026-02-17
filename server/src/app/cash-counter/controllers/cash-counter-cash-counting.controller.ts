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
import { Roles } from '../../../decorator/roles.decorator';
import { PasetoGuard } from '../../../guards/paseto.guard';
import { RoleGuard } from '../../../guards/role.guard';
import { CashCounterCashCountingService } from '../services/cash-counter-cash-counting.service';
import { BasicQuery } from '../../../@types/general';
import { CreateCashCountDto } from '../dto/cash-counting.dto';
import { CashCounterCashCountingFetchService } from '../services/cash-counter-cash-counting-fetch.service';
import { BasicQueryDto } from '../../../services/query/dto/query.dto';

@UseGuards(PasetoGuard, RoleGuard)
@Roles('admin')
@Controller('cash-counter/cash-counting')
export class CashCounterCashCountingController {
  constructor(
    private readonly crudService: CashCounterCashCountingService,
    private readonly fetchService: CashCounterCashCountingFetchService,
  ) {}

  @Get()
  async getCashCounts(@Query() query: BasicQueryDto) {
    return await this.crudService.getCashCounts(query);
  }

  @Get('report')
  async getCashCountsReport(@Query() query: BasicQuery) {
    return await this.fetchService.getCashcountPivot(query);
  }

  @Get(':id')
  async getCashCountsById(@Param('id') id: string) {
    return await this.fetchService.getDataByCashCountsId(id);
  }

  @Get(':id/form')
  async getCashCountsByIdForm(@Param('id') id: string) {
    return await this.fetchService.getDataCashCountForm(id);
  }

  @Post()
  async createNewCashCounts(@Body() body: CreateCashCountDto) {
    return await this.crudService.createNewCashCountData(body);
  }

  @Put(':id')
  async reCreateCashCounts(
    @Body() body: CreateCashCountDto,
    @Param('id') cashCounterId: string,
  ) {
    return await this.crudService.reCreateCashCountData(body, cashCounterId);
  }

  @Delete(':id')
  async deleteCashCountsData(@Param('id') cashCounterId: string) {
    return await this.crudService.deleteCashCountData(cashCounterId);
  }
}
