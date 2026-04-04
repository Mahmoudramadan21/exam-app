import { Control, Controller, FieldValues, Path } from "react-hook-form";
import React from "react";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

interface IFormFieldsProps<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

function FormField<T extends FieldValues>({
  name,
  control,
  label,
  ...inputProps
}: IFormFieldsProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {/* Username Label */}
          <FieldLabel
            htmlFor={String(name)}
            className="text-gray-800 font-medium text-base"
          >
            {label}
          </FieldLabel>

          <Input
            aria-invalid={fieldState.invalid}
            id={String(name)}
            aria-describedby={`${name}-error`}
            {...inputProps}
            {...field}
            className={`${inputProps.className || ""}`}
          />

          {fieldState.invalid && (
            <FieldError id={`${name}-error`} errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}

export default FormField;
