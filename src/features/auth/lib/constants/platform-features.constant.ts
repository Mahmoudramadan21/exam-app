import {
  Brain,
  BookOpenCheck,
  RectangleEllipsis,
  LucideIcon,
} from "lucide-react";

/**
 * Single platform feature structure
 * Used to render the promo features list in Auth UI
 */
export interface PlatformFeature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Static features list for the platform promo section
 * This data drives the AuthPromoPanel UI (no logic here)
 */
export const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: "diplomas",
    icon: Brain,
    title: "Tailored Diplomas",
    description:
      "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
  {
    id: "exams",
    icon: BookOpenCheck,
    title: "Focused Exams",
    description:
      "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
  },
  {
    id: "forms",
    icon: RectangleEllipsis,
    title: "Smart Multi-Step Forms",
    description:
      "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
];
