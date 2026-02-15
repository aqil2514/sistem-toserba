import { Inject, Injectable } from '@nestjs/common';
import { ActivityService } from '../../activity/activity.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SalesLogService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly activityService: ActivityService,
  ) {}

  async mapToCreateActivity(){}
}
