import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroupBasicItem } from "./interface.radio-group";

interface Props {
  items: RadioGroupBasicItem[];
  value: string;
  onValueChange: (value: string) => void;
}

export function HorizontalRadioGroup({ items, onValueChange, value }: Props) {
  return (
    <RadioGroup
      className="flex gap-4 flex-wrap"
      value={value}
      onValueChange={onValueChange}
    >
      {items.map((item, i) => (
        <div key={`radio-item-${i}`} className="flex items-center gap-3">
          <RadioGroupItem value={item.radioKey} id={item.radioKey} />
          <Label htmlFor={item.radioKey}>{item.radioLabel}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
