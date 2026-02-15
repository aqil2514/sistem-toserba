import { Global, Module } from '@nestjs/common';
import { ActivityGateway } from './activity.gateway';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';

@Global()
@Module({
    controllers:[ActivityController],
    providers:[ActivityGateway, ActivityService],
    exports:[ActivityService]
})
export class ActivityModule {}
