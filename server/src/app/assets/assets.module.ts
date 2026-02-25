import { Module } from '@nestjs/common';
import { AssetsController } from './controllers/assets.controller';
import { AssetsService } from './services/assets.service';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
