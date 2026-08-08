import {
  ChefHat,
  CupSoda,
  Flame,
  Hamburger,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { CategoryId } from "@/lib/data";

export const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  "fast-food": Hamburger,
  bbq: Flame,
  desi: ChefHat,
  chinese: UtensilsCrossed,
  "tandoor-tea": CupSoda,
};

export function getCategoryIcon(id: CategoryId) {
  return CATEGORY_ICONS[id];
}
