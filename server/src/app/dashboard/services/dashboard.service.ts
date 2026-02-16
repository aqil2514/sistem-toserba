import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import Pusher from 'pusher';
import { ActivityLogsDb } from '../../activity/types/activity.types';
import { SalesDb } from '../../sales/interface/sales.interface';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('PUSHER_CLIENT')
    private readonly pusher: Pusher,

    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getLatestLogs(): Promise<ActivityLogsDb[]> {
    const { data, error } = await this.supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;

    return data;
  }

  async getLatestSales():Promise<SalesDb[]>{
       const { data, error } = await this.supabase
      .from('sales')
      .select('*')
      .order('transaction_at', { ascending: false })
      .limit(5);

    if (error) throw error;

    return data;
  }
}
