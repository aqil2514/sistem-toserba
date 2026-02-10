import { BasicQuery } from "@/@types/general";

export type CashflowReportContent = "breakdown";

export interface CashflowReportQuery extends BasicQuery{
    content: CashflowReportContent
}