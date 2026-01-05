import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { DateTime } from 'luxon';

@Injectable()
export class SalesRpcService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getSalesSummaryByRange(
    startDate: string,
    endDate: string,
    timezone: string,
  ) {
    const start = DateTime.fromJSDate(new Date(startDate), {
      zone: timezone,
    }).startOf('day');

    const end = DateTime.fromJSDate(new Date(endDate ?? startDate), {
      zone: timezone,
    }).endOf('day');

    const startUtc = start.toUTC().toISO();
    const endUtc = end.toUTC().toISO();

    const { data, error } = await this.supabase
      .rpc('get_sales_summary_range', {
        p_start_utc: startUtc,
        p_end_utc: endUtc,
      })
      .maybeSingle();

    if (!data) {
      throw new NotFoundException('Belum ada data');
    }

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }
}
