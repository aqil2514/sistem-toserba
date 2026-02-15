import { Controller, Get, Query } from '@nestjs/common';
import { BasicQueryDto } from '../../services/query/dto/query.dto';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly fetcher: ActivityService) {}
  @Get()
  async getActivity(@Query() query: BasicQueryDto) {
    return await this.fetcher.getActivity(query);
  }
}
