import { Inject, Injectable } from '@nestjs/common';
import { DataQueryResponse } from '../../@types/general';
import { BasicQueryDto } from '../../services/query/dto/query.dto';
import { BasicQueryService } from '../../services/query/query.service';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  buildPaginationMeta,
  executeSupabaseBasicQuery,
} from '../../utils/query-builder';
import { ActivityLogsDb, ActivityLogsInsert } from './types/activity.types';
import { RealtimeService } from '../../services/realtime/realtime.service';

@Injectable()
export class ActivityService {
  constructor(
    private readonly basicQueryService: BasicQueryService,
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly realtimeService: RealtimeService,
  ) {}

  async getActivity(
    basicQuery: BasicQueryDto,
  ): Promise<DataQueryResponse<ActivityLogsDb[]>> {
    const query = this.basicQueryService.mapToBasicQuery(basicQuery);
    let supabase = this.supabase
      .from('activity_logs')
      .select('*', { count: 'exact' });

    const client = executeSupabaseBasicQuery(supabase, query, 'created_at');

    const { data, error, count } = await client;

    if (error) {
      console.error(error);
      throw error;
    }

    const meta = buildPaginationMeta(query.page, query.limit, count);

    return {
      data,
      meta,
    };
  }

  async createActivity(payload: ActivityLogsInsert | ActivityLogsInsert[]) {
    const { error, data } = await this.supabase
      .from('activity_logs')
      .insert(payload)
      .select('*');
    if (error) {
      console.error(error);
      throw error;
    }

    await this.realtimeService.emitNewLog(data);
  }
}
