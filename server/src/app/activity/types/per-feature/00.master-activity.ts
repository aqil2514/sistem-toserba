import {
  CashCounterActivityAction,
  CashCounterActivityType,
} from './cash-counter-activity';
import {
  CashflowActivityAction,
  CashflowActivityType,
} from './cashflow-activity';
import {
  PurchaseActivityAction,
  PurchaseActivityType,
} from './purchase-activity';
import { SalesActivityAction, SalesActivityType } from './sales-activity';

export type ActivityLogsAction =
  | CashCounterActivityAction
  | SalesActivityAction
  | CashflowActivityAction
  | PurchaseActivityAction;

export type ActivityLogsType =
  | CashCounterActivityType
  | SalesActivityType
  | CashflowActivityType
  | PurchaseActivityType;
