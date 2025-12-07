"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FormSelectProps {
  field: any;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  onClear?: () => void;

  options: { label: string; value: string }[];
  onSearch?: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchableFormSelect({
  field,
  label,
  placeholder = "اختر...",
  options,
  disabled = false,
  onClear,
  onSearch,
  isLoading = false,
}: FormSelectProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <FormItem className="text-right space-y-1 relative">
      <FormLabel>{label}</FormLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <button
              type="button"
              disabled={disabled}
              className={cn(
                "w-full flex justify-between items-center rounded-md border px-3 py-2 text-sm pr-8", // ← added pr-8
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span>
                {field.value
                  ? options.find((o) => o.value === field.value)?.label
                  : placeholder}
              </span>

              <ChevronsUpDown size={16} className="opacity-50" />
            </button>

            {field.value && onClear && !disabled && (
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-black"
                onClick={() => {
                  field.onChange("");
                  setInputValue("");
                  onSearch?.("");
                }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0" align="end" dir="rtl">
          <Command dir="rtl">
            <CommandInput
              placeholder="ابحث..."
              value={inputValue}
              onValueChange={(value) => {
                setInputValue(value);
                onSearch?.(value);
              }}
            />

            <CommandList>
              {isLoading && <CommandEmpty>جاري التحميل...</CommandEmpty>}

              {!isLoading && options.length === 0 && (
                <CommandEmpty>لا توجد نتائج</CommandEmpty>
              )}

              <CommandGroup>
                {options.map((o) => (
                  <CommandItem
                    key={o.value}
                    value={o.label}
                    onSelect={() => {
                      field.onChange(o.value);
                      setOpen(false);
                    }}
                  >
                    {o.label}

                    <Check
                      className={cn(
                        "mr-auto h-4 w-4",
                        o.value === field.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <FormMessage />
    </FormItem>
  );
}
