import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Pusher from 'pusher';

@Global()
@Module({
  providers: [
    {
      provide: 'PUSHER_CLIENT',
      useFactory(configService: ConfigService) {
        return new Pusher({
          appId: configService.get<string>('PUSHER_APP_ID')!,
          key: configService.get<string>('PUSHER_KEY')!,
          secret: configService.get<string>('PUSHER_SECRET')!,
          cluster: configService.get<string>('PUSHER_CLUSTER')!,
          useTLS: true,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['PUSHER_CLIENT'],
})
export class PusherModule {}
