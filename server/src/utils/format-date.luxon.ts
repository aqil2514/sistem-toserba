import { DateTime } from 'luxon';

type FormatStringKey =
  | 'Senin, 29 Desember 2025, 09:21'
  | '29 Desember 2025'
  | '29 Des 2025'
  | '29/12/2025'
  | '29-12-2025 09:21'
  | 'Desember 2025'
  | '09:21'
  | '29 Des 2025, 09:21 WIB'
  | '29 Desember 2025, 09:21 WIB'
  | 'Senin, 29 Desember 2025';

const formatStrMap: Record<FormatStringKey, string> = {
  // Senin, 29 Desember 2025, 09:21
  'Senin, 29 Desember 2025, 09:21': 'EEEE, dd LLLL yyyy, HH:mm',

  // Senin, 29 Desember 2025
  'Senin, 29 Desember 2025': 'EEEE, dd LLLL yyyy',

  // 29 Desember 2025
  '29 Desember 2025': 'dd LLLL yyyy',

  // 29 Des 2025
  '29 Des 2025': 'dd LLL yyyy',

  // 29/12/2025
  '29/12/2025': 'dd/MM/yyyy',

  // 29-12-2025 09:21
  '29-12-2025 09:21': 'dd-MM-yyyy HH:mm',

  // Desember 2025
  'Desember 2025': 'LLLL yyyy',

  // 09:21
  '09:21': 'HH:mm',

  // 29 Des 2025, 09:21 WIB
  '29 Des 2025, 09:21 WIB': "dd LLL yyyy, HH:mm 'WIB'",

  // 29 Desember 2025, 09:21 WIB
  '29 Desember 2025, 09:21 WIB': "dd LLLL yyyy, HH:mm 'WIB'",
};

export function formatDateLuxon(
  date: Date | string,
  formatString: FormatStringKey,
) {
  return DateTime.fromJSDate(new Date(date), { zone: 'Asia/Jakarta' })
    .setLocale('id')
    .toFormat(formatStrMap[formatString]);
}
