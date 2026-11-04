import {
  BookOpen,
  Component,
  Images,
  LayoutGrid,
  type LucideIcon,
  Palette,
  Signature,
  Type,
  Waves,
} from "lucide-react";

/** Anchor id for a section title: "The “un” icon" → "the-un-icon". */
export function slug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[’'“”"]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type BookPage = { href: string; label: string; icon?: LucideIcon };
export type BookGroup = { label: string; pages: readonly BookPage[] };

/** The book's contents, as the sidebar lists them. */
export const GROUPS: readonly BookGroup[] = [
  {
    label: "Brand",
    pages: [
      { href: "/", label: "Overview", icon: BookOpen },
      { href: "/moodboard", label: "Moodboard", icon: LayoutGrid },
    ],
  },
  {
    label: "Identity",
    pages: [
      { href: "/logo", label: "Logo", icon: Signature },
      { href: "/color", label: "Colour", icon: Palette },
      { href: "/type", label: "Typography", icon: Type },
      { href: "/imagery", label: "Imagery", icon: Images },
    ],
  },
  {
    label: "In use",
    pages: [
      { href: "/motion", label: "Motion", icon: Waves },
      { href: "/components", label: "Components", icon: Component },
    ],
  },
];

export const PAGES: readonly BookPage[] = GROUPS.flatMap((g) => g.pages);
