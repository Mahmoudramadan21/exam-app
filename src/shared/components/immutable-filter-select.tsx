"use client";

import { ChevronsUpDown } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { memo } from "react";

interface IFilterOption {
  value: string;
  label: string;
}

interface IFilterSelectProps {
  value: string;
  placeholder: string;
  options: IFilterOption[];
  onChange: (value: string) => void;
}

function ImmutableFilterSelect({
  value,
  placeholder,
  options,
  onChange,
}: IFilterSelectProps) {
  const selectedLabel =
    options.find((o) => o.value === value)?.label || placeholder;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between">
          {selectedLabel}
          <ChevronsUpDown className="size-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(ImmutableFilterSelect);
