import React, { useState } from "react";
import { Path, Control, Controller, FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";

interface IPasswordFormFieldProps<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  hasForgotPassword?: boolean;
}

function PasswordFormField<T extends FieldValues>({
  name,
  control,
  label,
  hasForgotPassword,
  ...inputProps
}: IPasswordFormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {/* Password Label */}
          <FieldLabel
            htmlFor={String(name)}
            className="text-gray-800 font-medium text-base"
          >
            {label}
          </FieldLabel>
          {/* Input Group */}
          <InputGroup className={`${inputProps.className || ""}`}>
            <InputGroupInput
              id={String(name)}
              type={showPassword ? "text" : "password"}
              placeholder="********"
              aria-invalid={fieldState.invalid}
              aria-describedby={`${String(name)}-error`}
              {...inputProps}
              {...field}
            />
            <InputGroupAddon align="inline-end">
              <button
                type="button"
                aria-label={showPassword ? "Hide Password" : "Show Password"}
                onClick={() => setShowPassword((prev) => !prev)}
                className="bg-transparent p-1 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </InputGroupAddon>
          </InputGroup>

          {/* Password validation error if exists */}
          {fieldState.invalid && (
            <FieldError
              id={`${String(name)}-error`}
              errors={[fieldState.error]}
            />
          )}

          {/* Show Forgot Password Link if enabled */}
          {hasForgotPassword && (
            <Link
              href="/reset-password"
              className="text-sm block max-w-fit ml-auto text-blue-600 hover:text-blue-500 font-medium transition-colors"
            >
              Forgot your password?
            </Link>
          )}
        </Field>
      )}
    />
  );
}

export default PasswordFormField;
