import { Injectable } from '@nestjs/common';
import { ActivityGateway } from './activity.gateway';

@Injectable()
export class ActivityService {
  constructor(private readonly gateway: ActivityGateway) {}

  async createActivity(){
    console.log("Nyambung ke aktivitas")

    this.gateway.emitActivity("test")
  }
}
