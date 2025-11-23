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
import { X } from "lucide-react";

interface FormSelectProps {
  field: any;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
  onClear?: () => void;
}

export default function FormSelect({
  field,
  label,
  placeholder = "اختر...",
  options,
  disabled = false,
  onClear,
}: FormSelectProps) {
  return (
    <FormItem className="text-right space-y-1 relative">
      <FormLabel>{label}</FormLabel>

      <FormControl>
        <div className="relative">
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
            dir="rtl"
          >
            <SelectTrigger className="w-full pr-10" disabled={disabled}>
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

          {field.value && !disabled && (
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-black"
              onClick={onClear}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </FormControl>

      <FormMessage />
    </FormItem>
  );
}
