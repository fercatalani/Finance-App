"use client";

import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  autocomplete?: string;
};

export const Input = ({
  label,
  type = "text",
  placeholder,
  register,
  error,
  className = "",
  autocomplete,
}: InputProps) => {
  const autocompleteAttr =
    autocomplete ??
    (type === "email"
      ? "email"
      : type === "password"
      ? "current-password"
      : type === "name"
      ? "name"
      : undefined);

  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        type={type}
        {...register}
        placeholder={placeholder || label}
        autoComplete={autocompleteAttr}
        className={`w-full rounded-full px-4 py-2 mt-2 mb-1 placeholder:text-charcoal-blue text-slate-blue-gray bg-powder-blue focus:outline-none focus:ring-2 focus:ring-steel-blue ${className}`}
      />
      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </label>
  );
};
