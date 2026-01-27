import { BasicQuery } from '../../../@types/general';

export type PurchaseReportContent = 'summary' | 'detail' | 'chart';

export interface PurchaseQuery extends BasicQuery {
  content: PurchaseReportContent;
}
