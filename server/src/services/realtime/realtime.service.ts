import { Inject, Injectable } from '@nestjs/common';
import Pusher from 'pusher';
import { ActivityLogsDb } from '../../app/activity/types/activity.types';

@Injectable()
export class RealtimeService {
  constructor(
    @Inject('PUSHER_CLIENT')
    private readonly pusher: Pusher,
  ) {}

  async emitNewLog(logs: ActivityLogsDb[]) {
    await this.pusher.trigger('dashboard-channel', 'new-log', {
      logs,
    });
  }
}
