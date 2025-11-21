"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

interface FormInputProps {
  field: any;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

export default function FormInput({
  field,
  label,
  type = "text",
  placeholder = "",
  className = "",
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <FormItem className="text-right space-y-1">
      <FormLabel>{label}</FormLabel>

      <FormControl>
        <div className="relative">
          <Input
            {...field}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            className={`text-right pr-10 ${className}`}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </FormControl>

      <FormMessage />
    </FormItem>
  );
}
