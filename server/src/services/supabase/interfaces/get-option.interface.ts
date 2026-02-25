import { TableName } from '../enums/table-name.enum';

/**
 * Opsi cara pengambilan data dari Supabase
 */
export interface GetOption {
  /**
   * Nama tabel yang akan diambil datanya
   */
  tableName: TableName;

  /**
   * Nama kolom yang digunakan sebagai penanda soft delete (opsional).
   * Jika diisi, hanya data yang kolom ini bernilai `null` yang akan diambil.
   *
   * @example 'deleted_at'
   */
  deletedColumn?: string;

  /**
   * Kolom yang ingin dipilih, mengikuti sintaks Supabase `.select()` (opsional).
   * Jika tidak diisi, defaultnya adalah `'*'` (semua kolom).
   *
   * @example '*'
   * @example 'id, name, email'
   * @example 'id, orders(id, total)'
   */
  select?: string;
}
