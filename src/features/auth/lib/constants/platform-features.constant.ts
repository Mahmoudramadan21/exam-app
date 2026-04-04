import { Brain, BookOpenCheck, RectangleEllipsis, LucideIcon } from "lucide-react";

export interface PlatformFeature {
  id: string
  icon: LucideIcon
  title: string
  description: string
}

export const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: "diplomas",
    icon: Brain,
    title: "Tailored Diplomas",
    description: "Choose from specialized tracks like Frontend, Backend, and Mobile Development."
  },
  {
    id: "exams",
    icon: BookOpenCheck,
    title: "Focused Exams",
    description: "Access topic-specific tests including HTML, CSS, JavaScript, and more."
  },
  {
    id: "forms",
    icon: RectangleEllipsis,
    title: "Smart Multi-Step Forms",
    description: "Choose from specialized tracks like Frontend, Backend, and Mobile Development."
  }
]