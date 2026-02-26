import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { TableName } from './enums/table-name.enum';
import { GetOption } from './interfaces/get-option.interface';
import { isNull } from 'util';

@Injectable()
export class SupabaseRepositoryService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getAllData<T = unknown>(options: GetOption): Promise<T[]> {
    const { tableName, deletedColumn, select } = options;
    let client = this.supabase.from(tableName).select(select);

    if (deletedColumn) {
      client = client.is(deletedColumn, null);
    }

    const { data, error } = await client;
    if (error) {
      console.error(error);
      throw error;
    }

    return (data ?? []) as T[];
  }

  async createNewData<T extends object>(tableName: TableName, payload: T) {
    const { error } = await this.supabase.from(tableName).insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async createNewDataAndSelectId<T extends object>(
    tableName: TableName,
    payload: T,
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

  async updateData<T extends object>(
    tableName: TableName,
    columnValue: string,
    cellValue: string,
    payload: Partial<T>,
  ) {
    console.log(tableName)
    console.log(columnValue)
    console.log(cellValue)
    console.log(payload)
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
    columnValue: string,
    cellValue: string,
    deleteColumnName: string = 'deleted_at',
  ) {
    const { error } = await this.supabase
      .from(tableName)
      .update({ [deleteColumnName]: new Date().toISOString() })
      .eq(columnValue, cellValue);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async hardDelete(
    tableName: TableName,
    columnValue: string,
    cellValue: string,
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
