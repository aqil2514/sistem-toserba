export interface ActivityLogsDb<T = unknown> {
  id: number;
  created_at: string;
  type: string;
  title: string;
  description: string;
  reference_id: string;
  meta: T;
}
