import { IApiResponse, IDocumentFields } from "@/shared/lib/types/api";

// Diploma Entity
export interface IDiploma extends IDocumentFields {
  id: string;
  title: string;
  description: string;
  image: string | null;
  immutable: boolean;
}
