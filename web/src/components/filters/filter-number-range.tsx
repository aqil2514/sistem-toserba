import { Input } from "../ui/input";

type NumberRangeValue = {
  min?: number;
  max?: number;
};

type FilterNumberRangeProps = {
  value: NumberRangeValue;
  onChange: (value: NumberRangeValue) => void;

  minPlaceholder?: string;
  maxPlaceholder?: string;

  minLimit?: number;
  maxLimit?: number;
  step?: number;

  disabled?: boolean;
  allowNegative?: boolean;

  error?: string;
};

export function FilterNumberRange({
  value,
  onChange,
  minPlaceholder = "Min",
  maxPlaceholder = "Max",
  minLimit,
  maxLimit,
  step = 1,
  disabled = false,
  allowNegative = false,
  error,
}: FilterNumberRangeProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange({
      ...value,
      min: v === "" ? undefined : Number(v),
    });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange({
      ...value,
      max: v === "" ? undefined : Number(v),
    });
  };

  const minInputLimit = allowNegative ? minLimit : Math.max(minLimit ?? 0, 0);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder={minPlaceholder}
          value={value.min ?? ""}
          onChange={handleMinChange}
          min={minInputLimit}
          max={maxLimit}
          step={step}
          disabled={disabled}
        />

        <span className="text-muted-foreground">–</span>

        <Input
          type="number"
          placeholder={maxPlaceholder}
          value={value.max ?? ""}
          onChange={handleMaxChange}
          min={minInputLimit}
          max={maxLimit}
          step={step}
          disabled={disabled}
        />
      </div>

      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}
