"use client";

import React, { memo } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";

interface IPhoneFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

function PhoneFormField<T extends FieldValues>({
  name,
  control,
  label,
}: IPhoneFormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          {/* ===== Field Wrapper ===== */}
          <Field data-invalid={fieldState.invalid}>
            {/* ===== Label ===== */}
            <FieldLabel
              htmlFor={String(name)}
              className="text-gray-800 font-medium text-base"
            >
              {label}
            </FieldLabel>

            {/* ===== Phone Input ===== */}
            <PhoneInput
              country="eg" // Default country (Egypt)
              // Normalize value (remove + for library compatibility)
              value={field.value?.replace("+", "")}
              // Always store value in E.164 format
              onChange={(phone) => field.onChange("+" + phone)}
              onBlur={field.onBlur}
              inputProps={{
                name: field.name,
                required: true,
              }}
              // ===== Input Styling =====
              inputClass={`!w-full !h-12 !rounded-none !border-gray-200 ${
                fieldState.invalid ? "!border-red-500" : ""
              }`}
              // ===== Button Styling =====
              buttonClass={`!border-gray-200 !rounded-none ${
                fieldState.invalid ? "!border-red-500 !border-r-gray-200" : ""
              }`}
              dropdownClass="!z-50"
              aria-invalid={fieldState.invalid}
            />

            {/* ===== Validation Error ===== */}
            {fieldState.invalid && (
              <FieldError
                id={`${String(name)}-error`}
                errors={[fieldState.error]}
              />
            )}
          </Field>
        </>
      )}
    />
  );
}

export default PhoneFormField;
