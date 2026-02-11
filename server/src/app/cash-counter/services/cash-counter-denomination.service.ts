import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CashDenomination } from '../types/denomination.types';
import { DenominationDto } from '../dto/denomination.dto';

@Injectable()
export class CashCounterDenominationService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getAllDenomination(): Promise<CashDenomination[]> {
    const { data, error } = await this.supabase
      .from('denominations')
      .select('*')
      .order('nominal')
      .is('deleted_at', null);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getDenominationById(id: string): Promise<CashDenomination> {
    const { data, error } = await this.supabase
      .from('denominations')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) throw new NotFoundException('Data tidak ditemukan');

    return data;
  }

  async createNewDenomitaion(payload: DenominationDto) {
    const { error } = await this.supabase.from('denominations').insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async editDenominationById(id: string, payload: DenominationDto) {
    const { error } = await this.supabase
      .from('denominations')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async softDeleteDenominationById(id: string) {
    const { error } = await this.supabase
      .from('denominations')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error(error);
      throw error;
    }
  }
}
