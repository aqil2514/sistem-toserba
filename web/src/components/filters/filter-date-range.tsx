import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/format-date.fns";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const PRESET_LABELS = {
  "all-time": "Sepanjang Masa",
  today: "Hari Ini",
  yesterday: "Kemarin",
  "this-week": "Minggu Ini",
  "this-month": "Bulan Ini",
  "this-year": "Tahun Ini",
} as const;

/**
 * Daterange Helper
 */
function getPresetDateRange(
  preset:
    | "today"
    | "yesterday"
    | "this-week"
    | "this-month"
    | "this-year"
    | "all-time",
): DateRange {
  const today = startOfDay(new Date());

  switch (preset) {
    case "today":
      return {
        from: today,
        to: today,
      };

    case "yesterday": {
      const y = addDays(today, -1);
      return { from: y, to: y };
    }

    case "this-week":
      return {
        from: startOfWeek(today),
        to: today,
      };

    case "this-month":
      return {
        from: startOfMonth(today),
        to: today,
      };

    case "this-year":
      return {
        from: startOfYear(today),
        to: today,
      };

    case "all-time":
      return {
        from: new Date(1970, 0, 1),
        to: today,
      };
  }
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, amount: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
}

function startOfWeek(date: Date): Date {
  // Senin sebagai awal minggu (ID)
  const d = new Date(date);
  const day = d.getDay() || 7; // Minggu = 7
  d.setDate(d.getDate() - (day - 1));
  return startOfDay(d);
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfYear(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1);
}

function isSameDay(a?: Date, b?: Date) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameRange(a?: DateRange, b?: DateRange) {
  if (!a || !b) return false;
  return isSameDay(a.from, b.from) && isSameDay(a.to, b.to);
}

function getDateTriggerLabel(date?: DateRange) {
  if (!date?.from) return "Pick a date";

  // cek preset
  for (const [key, label] of Object.entries(PRESET_LABELS)) {
    const presetRange = getPresetDateRange(key as keyof typeof PRESET_LABELS);

    if (isSameRange(date, presetRange)) {
      return label;
    }
  }

  // custom range
  if (date.from && date.to) {
    return `${formatDate(date.from, "29 Des 2025")} - ${formatDate(date.to, "29 Des 2025")}`;
  }

  // fallback (harusnya jarang kepakai)
  return format(date.from, "dd/MM/yyyy");
}

interface Props {
  date: DateRange;
  setDate: (value: DateRange) => void;
  onApply: (date: DateRange) => void;
}

export function ToolbarDatepicker({ onApply, setDate, date }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const applyHandler = () => {
    onApply(date);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-70 justify-start text-left font-normal"
        >
          <CalendarIcon />
          <span className="ml-2">{getDateTriggerLabel(date)}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-lg p-0 space-y-1">
        <div className="px-6 pt-3">
          <p className="text-base font-semibold text-center">Filter Tanggal</p>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-3">
            {/* Calendar */}
            <Calendar
              mode="range"
              defaultMonth={date.from}
              selected={date}
              onSelect={setDate}
              captionLayout="dropdown"
              className="rounded-lg border shadow-sm w-full md:w-fit"
              required
            />

            {/* Right panel */}
            <div className="md:pl-4 space-y-4">
              <p className="text-sm text-muted-foreground font-semibold">
                Shortcut
              </p>

              <div className="flex gap-2 flex-wrap">
                {[
                  ["all-time", "Sepanjang Masa"],
                  ["today", "Hari Ini"],
                  ["yesterday", "Kemarin"],
                  ["this-week", "Minggu Ini"],
                  ["this-month", "Bulan Ini"],
                  ["this-year", "Tahun Ini"],
                ].map(([key, label]) => (
                  <Button
                    key={key}
                    size="sm"
                    variant="outline"
                    className="rounded-full text-xs px-4"
                    onClick={() =>
                      setDate(
                        getPresetDateRange(
                          key as
                            | "today"
                            | "yesterday"
                            | "this-week"
                            | "this-month"
                            | "this-year",
                        ),
                      )
                    }
                  >
                    {label}
                  </Button>
                ))}
              </div>

              <Separator />

              {/* Date summary */}
              <div className="rounded-lg border p-3 text-sm space-y-1">
                <p>
                  <strong>Dari:</strong>{" "}
                  {date.from ? formatDate(date.from, "29 Desember 2025") : "-"}
                </p>
                <p>
                  <strong>Sampai:</strong>{" "}
                  {date.to ? formatDate(date.to, "29 Des 2025") : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Footer */}
        <div className="pb-3 px-4 flex flex-col sm:flex-row justify-center gap-2">
          <Button className="w-full sm:w-auto" onClick={applyHandler}>
            Terapkan
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => setOpen(false)}
          >
            Batal
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
