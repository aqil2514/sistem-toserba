export type ReceivablePayableStatus = 'paid' | 'unpaid';

export interface ReceivablePayableReturn {
  receivable: ReceivableTypes[];
  payable: PayableTypes[];
}

interface BasicTypes {
  total: number;
  paid: number;
  rest: number;
  status: ReceivablePayableStatus;
}

export interface ReceivableTypes extends BasicTypes {
  customer_name: string;
  type: 'receivable';
}

export interface PayableTypes extends BasicTypes {
  vendor_name: string;
  type: 'payable';
}
