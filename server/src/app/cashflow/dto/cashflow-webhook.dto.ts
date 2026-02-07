import { OmitType } from '@nestjs/mapped-types';
import { CashflowDto } from './cashflow.dto';

export class CashflowWebhookDto extends OmitType(CashflowDto, [
  'transaction_at',
]) {}
