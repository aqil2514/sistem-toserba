import { Global, Module } from '@nestjs/common';
import { BasicQueryService } from './query.service';

@Global()
@Module({
  providers: [BasicQueryService],
  exports: [BasicQueryService],
})
export class BasicQueryModule {}
