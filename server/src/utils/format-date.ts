import { DateTime } from 'luxon';
export function formatDateYYYYMMDD(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

export function startOfDayUTC(date: Date | string) {
  const d = new Date(date);
  return new Date(Date.UTC(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    0, 0, 0, 0
  )).toISOString();
}

export function endOfDayUTC(date: Date | string) {
  const d = new Date(date);
  return new Date(Date.UTC(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    23, 59, 59, 999
  )).toISOString();
}


export function startOfTodayUtcJakarta() {
  return DateTime
    .now()
    .setZone('Asia/Jakarta')
    .startOf('day')
    .toUTC()
    .toISO();
}

export function endOfTodayUtcJakarta() {
  return DateTime
    .now()
    .setZone('Asia/Jakarta')
    .endOf('day')
    .toUTC()
    .toISO();
}
