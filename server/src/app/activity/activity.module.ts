import { Module } from '@nestjs/common';
import { ActivityGateway } from './activity.gateway';
import { ActivityService } from './activity.service';

@Module({
    providers:[ActivityGateway, ActivityService]
})
export class ActivityModule {}
