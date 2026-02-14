export type Category = {
  id: string;
  name: string;
};

export const CATEGORIES: Category[] = [
  { id: "favourites", name: "Favourites" },
  { id: "online-deals", name: "Online Only Deals" },
  { id: "specials", name: "Specials" },
  
  { id: "bbq", name: "BBQ Platters" },
  { id: "burgers", name: "Burgers" },
  { id: "chicken", name: "Chicken" },
  { id: "sides", name: "Sides" },
  { id: "drinks", name: "Drinks" },
  { id: "desserts", name: "Desserts" },

  { id: "kids", name: "Kids Meals" },
  { id: "veggie", name: "Veggie" },
  { id: "sauces", name: "Sauces" },
];
