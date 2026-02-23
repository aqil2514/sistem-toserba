import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  startOfDayUTC,
  endOfDayUTC,
} from '../../../utils/format-date';
import { MovementAssetViaSummary } from '../types/cashflow-report.types';
import { BalanceSnapshotInsert } from '../types/cashflow-balance-snapshot.types';

@Injectable()
export class CashflowBalanceSnapshotService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  private async getTodayClosingBalance():Promise<MovementAssetViaSummary['data']> {
    const {data, error} = await this.supabase.rpc('get_asset_running_per_via', {
      p_start_utc: startOfDayUTC(new Date()),
      p_end_utc: endOfDayUTC(new Date()),
    });

    if(error){
      console.error(error);
      throw error;
    }

    return data;
  }

  private mapToBalanceSnapshotDb(data:MovementAssetViaSummary['data'][number]):BalanceSnapshotInsert{
    return {
      asset:data.via,
      closing_balance:data.running_total,
      snapshot_date:data.date
    }
  }

  private async createNewDailyBalanceSnapshot(data:BalanceSnapshotInsert[]){
    const {error} = await this.supabase.from("balance_snapshots").insert(data);

    if(error){
      console.error(error);
      throw error;
    }
  }

  async createDailySnapshot() {
    const currentBalance = await this.getTodayClosingBalance();
    const mappedData = currentBalance.map(this.mapToBalanceSnapshotDb);

    await this.createNewDailyBalanceSnapshot(mappedData);
    return { mappedData };
  }
}
