import { format } from "date-fns";
import { id } from "date-fns/locale/id";

type FormatStringKey = "Senin, 29 Desember 2025, 09:21";

const formatStrMap: Record<FormatStringKey, string> = {
  "Senin, 29 Desember 2025, 09:21": "EEEE, dd MMMM yyyy, HH:mm",
};

export function formatDate(date: Date | string, formatString: FormatStringKey) {
  return format(new Date(date), formatStrMap[formatString], {
    locale: id,
  });
}
