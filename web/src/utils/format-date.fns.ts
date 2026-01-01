import { formatInTimeZone } from "date-fns-tz";
import { id } from "date-fns/locale/id";

type FormatStringKey =
  | "Senin, 29 Desember 2025, 09:21"
  | "29 Desember 2025"
  | "29 Des 2025"
  | "29/12/2025"
  | "29-12-2025 09:21"
  | "Desember 2025"
  | "09:21"
  | "29 Des 2025, 09:21 WIB"
  | "29 Desember 2025, 09:21 WIB";

const formatStrMap: Record<FormatStringKey, string> = {
  // Senin, 29 Desember 2025, 09:21
  "Senin, 29 Desember 2025, 09:21": "EEEE, dd MMMM yyyy, HH:mm",

  // 29 Desember 2025
  "29 Desember 2025": "dd MMMM yyyy",

  // 29 Des 2025
  "29 Des 2025": "dd MMM yyyy",

  // 29/12/2025
  "29/12/2025": "dd/MM/yyyy",

  // 29-12-2025 09:21
  "29-12-2025 09:21": "dd-MM-yyyy HH:mm",

  // Desember 2025
  "Desember 2025": "MMMM yyyy",

  // 09:21
  "09:21": "HH:mm",

  // 29 Des 2025, 09:21 WIB
  "29 Des 2025, 09:21 WIB": "dd MMM yyyy, HH:mm 'WIB'",

  // 29 Des 2025, 09:21 WIB
  "29 Desember 2025, 09:21 WIB": "dd MMMM yyyy, HH:mm 'WIB'",
};

export function formatDate(date: Date | string, formatString: FormatStringKey) {
  return formatInTimeZone(new Date(date), "Asia/Jakarta", formatStrMap[formatString], {
    locale: id,
  });
}
