create view public.cashflow_unique_via as
select distinct
  via
from
  cashflow;