import { UseFormReturn } from "react-hook-form";
import { SalesSchemaType } from "../../schemas/sales-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  form: UseFormReturn<SalesSchemaType>;
}
export function PaymentSalesForm({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="payment_method"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Metode Pembayaran</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(e) => field.onChange(e)}
            >
              <SelectTrigger className="w-full">
                <SelectValue defaultValue={field.value} />
              </SelectTrigger>
              <SelectContent className="w-(--radix-select-trigger-width)">
                <SelectItem value="cash">Kas (Lunas)</SelectItem>
                <SelectItem value="utang">Utang</SelectItem>
                <SelectItem value="digital">Digital</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
