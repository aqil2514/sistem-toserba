import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export interface FilterTextInputProps {
  value: string;
  onValueChange: (value: string) => void;

  onEnterEvent?: (value: string) => void;

  placeholder?: string;
  disabled?: boolean;

  debounceMs?: number;
  clearable?: boolean;
  onClear?: () => void;

  autoFocus?: boolean;
  maxLength?: number;
}

export function FilterTextInput({
  onEnterEvent,
  onValueChange,
  value,
  autoFocus,
  clearable,
  disabled,
  maxLength,
  onClear,
  placeholder = "masukkan nilai",
}: FilterTextInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    onValueChange(target.value);
  };

  const clearHandler = () => {
    onClear?.();
  };

  const enterEventHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (!onEnterEvent) return;

    const target = e.target as HTMLInputElement;
    onEnterEvent(target.value);
  };

  return (
    <div className="flex gap-1 items-center ">
      <Input
        value={value}
        autoFocus={autoFocus}
        disabled={disabled}
        className="w-full"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={enterEventHandler}
        maxLength={maxLength}
      />
      {clearable && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={clearHandler}
        >
          X
        </Button>
      )}
    </div>
  );
}
