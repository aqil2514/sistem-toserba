import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { TableName } from './enums/table-name.enum';

@Injectable()
export class SupabaseRepositoryService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async createNewData(tableName: TableName, payload: any) {
    const { error } = await this.supabase.from(tableName).insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async createNewDataAndSelectId(
    tableName: TableName,
    payload: any,
    idColumn: string = 'id',
  ): Promise<string> {
    const { data, error } = await this.supabase
      .from(tableName)
      .insert(payload)
      .select('id')
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) throw new NotFoundException('Data tidak ditemukan');

    return data[idColumn];
  }

  async updateData(
    tableName: TableName,
    payload: any,
    columnValue: string,
    cellValue: string,
  ) {
    const { error } = await this.supabase
      .from(tableName)
      .update(payload)
      .eq(columnValue, cellValue);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async softDelete(
    tableName: TableName,
    columnName: string,
    rowId: string,
    deleteColumnName: string = 'deleted_at',
  ) {
    const { error } = await this.supabase
      .from(tableName)
      .update({ [deleteColumnName]: new Date().toISOString() })
      .eq(columnName, rowId);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async hardDelete(
    tableName: TableName,
    cellValue: string,
    columnValue: string = 'id',
  ) {
    const { error } = await this.supabase
      .from(tableName)
      .delete()
      .eq(columnValue, cellValue);

    if (error) {
      console.error(error);
      throw error;
    }
  }
}
