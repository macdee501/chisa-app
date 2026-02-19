export type AppCategoryId =
  | "favourites"
  | "online-deals"
  | "specials"
  | "bbq"
  | "burgers"
  | "chicken"
  | "sides"
  | "drinks"
  | "desserts"
  | "kids"
  | "veggie"
  | "sauces";

export const APP_TO_DUMMY_CATEGORIES: Record<AppCategoryId, string[]> = {
  favourites: ["groceries"],
  "online-deals": ["groceries"],
  specials: ["groceries"],

  bbq: ["groceries"],
  burgers: ["groceries"],
  chicken: ["groceries"],
  sides: ["snacks", "groceries"],
  drinks: ["beverages"],
  desserts: ["snacks", "groceries"],

  kids: ["snacks", "groceries"],
  veggie: ["groceries"],
  sauces: ["groceries"],
};
