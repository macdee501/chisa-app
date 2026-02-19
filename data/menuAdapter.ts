import { DummyProduct, getProductsByCategory } from "./api/duumyjson";
import { APP_TO_DUMMY_CATEGORIES, type AppCategoryId } from "./categoryMap";

function uniqById(items: DummyProduct[]) {
  const seen = new Set<number>();
  return items.filter((p) => (seen.has(p.id) ? false : (seen.add(p.id), true)));
}

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function textOf(p: DummyProduct) {
  return `${p.title ?? ""} ${p.description ?? ""}`.toLowerCase();
}

/**
 * Keywords that "nudge" DummyJSON products into your Steers-like categories.
 * Tune freely — this is demo magic ✨
 */
const KEYWORDS: Partial<Record<AppCategoryId, string[]>> = {
  bbq: [
    "bbq",
    "barbecue",
    "grill",
    "smoke",
    "smoked",
    "steak",
    "rib",
    "beef",
    "meat",
    "sauce",
    "spice",
  ],
  burgers: ["burger", "beef", "cheese", "patty", "bun", "grill", "sauce"],
  chicken: ["chicken", "wing", "wings", "drum", "drumstick", "fillet", "crispy", "spicy"],
  sides: ["fries", "chips", "snack", "crisps", "nuts", "popcorn", "salt", "sauce"],
  drinks: ["drink", "cola", "juice", "water", "soda", "tea", "coffee", "energy"],
  desserts: ["dessert", "chocolate", "cookie", "cookies", "cake", "ice", "sweet", "candy"],
  kids: ["snack", "cookies", "juice", "chocolate", "candy"],
  veggie: ["veg", "vegetable", "salad", "greens", "tomato", "cucumber", "plant"],
  sauces: ["sauce", "ketchup", "mayo", "mayonnaise", "mustard", "dip", "dressing"],
  // leave favourites/online-deals/specials unfiltered (or add your own logic later)
};

function keywordFilter(items: DummyProduct[], appCategoryId: AppCategoryId) {
  const keywords = KEYWORDS[appCategoryId];
  if (!keywords || keywords.length === 0) return items;

  const kw = keywords.map((k) => k.toLowerCase());

  return items.filter((p) => {
    const hay = textOf(p);
    return kw.some((k) => hay.includes(k));
  });
}

export async function getAppCategoryProducts(appCategoryId: AppCategoryId) {
  const mapped = APP_TO_DUMMY_CATEGORIES[appCategoryId] ?? [];
  if (mapped.length === 0) return [];

  // Fetch all mapped DummyJSON categories
  const lists = await Promise.all(mapped.map((c) => getProductsByCategory(c)));
  const merged = uniqById(lists.flat());

  // Try keyword filtering
  const filtered = keywordFilter(merged, appCategoryId);

  // Fallback rules: keep demo from looking empty
  // If filtering found "enough", use it; otherwise fall back to merged list.
  // You can tweak the minimum based on how many items you want per category.
  const MIN_RESULTS = 6;
  const chosen = filtered.length >= MIN_RESULTS ? filtered : merged;

  // Shuffle to avoid the same ordering across categories
  return shuffle(chosen);
}
