// Base entity with id and title
export type TitledEntity = {
  id: string;
  title: string;
  description?: string;
};

// Immutable Diploma Variants for Confirmation Modal
export interface IImmutableVariant {
  state: boolean;
  label: string;
  title: string;
  description: string;
  confirmLabel: string;
}
