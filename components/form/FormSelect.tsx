"use client";

import {
  FormControl,
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

interface FormSelectProps {
  field: any;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
}

export default function FormSelect({
  field,
  label,
  placeholder = "اختر...",
  options,
}: FormSelectProps) {
  return (
    <FormItem className="text-right space-y-1">
      <FormLabel>{label}</FormLabel>

      <FormControl>
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>

      <FormMessage />
    </FormItem>
  );
}
