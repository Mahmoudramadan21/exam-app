import { IImmutableVariant } from "@/shared/lib/types/base";

type ImmutableEntity = "diploma" | "exam" | "question";

export function createImmutableVariants(
  entity: ImmutableEntity,
): readonly IImmutableVariant[] {
  return [
    {
      state: false,
      label: "Make Immutable",
      title: `Are you sure you want to make this ${entity} immutable?`,
      description: `This action will prevent further modifications to this ${entity}.`,
      confirmLabel: "Make Immutable",
    },
    {
      state: true,
      label: "Make Mutable",
      title: `Are you sure you want to make this ${entity} mutable?`,
      description: `This will allow further modifications to this ${entity}.`,
      confirmLabel: "Make Mutable",
    },
  ] as const;
}
