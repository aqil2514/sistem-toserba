import { Product } from "../types/type";

export function useProductTaxonomy(products?: Product[]) {
  const categories = new Set<string>();
  const subcategoriesMap = new Map<string, Set<string>>();

  products?.forEach((p) => {
    if (!p.category) return;

    categories.add(p.category);

    if (p.subcategory) {
      if (!subcategoriesMap.has(p.category)) {
        subcategoriesMap.set(p.category, new Set());
      }
      subcategoriesMap.get(p.category)!.add(p.subcategory);
    }
  });

  return {
    categories: Array.from(categories),
    subcategoriesMap,
  };
}
