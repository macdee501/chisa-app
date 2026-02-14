export type MenuItem = {
    id: string;
    name: string;
    description?: string;
    priceFrom: number;
    categoryId: string; // must match a Category.id from CATEGORIES
    imageColor?: string; // placeholder for image block
  };
  
  export const MENU_ITEMS: MenuItem[] = [
    // favourites
    { id: "f1", name: "1/4 Chicken", description: "With small chips", priceFrom: 49.9, categoryId: "favourites", imageColor: "#FACC15" },
    { id: "f2", name: "Full Chicken", description: "With large chips", priceFrom: 174.9, categoryId: "favourites", imageColor: "#EF4444" },
    { id: "f3", name: "Brisket Plate", description: "Smoked brisket + sides", priceFrom: 149.9, categoryId: "favourites", imageColor: "#F97316" },
  
    // online-deals
    { id: "d1", name: "Single Rib Rack & 4 Wings", description: "Flame-grilled ribs + wings", priceFrom: 299.9, categoryId: "online-deals", imageColor: "#EF4444" },
    { id: "d2", name: "12 Wings", description: "Your choice of flavour", priceFrom: 169.9, categoryId: "online-deals", imageColor: "#F97316" },
    { id: "d3", name: "2 Bacon Cheese Burgers & 2 Drinks", description: "Burger duo combo", priceFrom: 164.9, categoryId: "online-deals", imageColor: "#FACC15" },
  
    // specials
    { id: "s1", name: "Chicken Burger Duo & Chips", description: "2x chicken burgers + chips", priceFrom: 129.9, categoryId: "specials", imageColor: "#F97316" },
    { id: "s2", name: "Phanda Double Burger & Chips", description: "2x burgers + chips", priceFrom: 119.9, categoryId: "specials", imageColor: "#EF4444" },
    { id: "s3", name: "Phanda Duo & Chips", description: "2x single burgers + chips", priceFrom: 89.9, categoryId: "specials", imageColor: "#FACC15" },
  
    // bbq
    { id: "b1", name: "BBQ Platter", description: "Brisket + ribs + sides", priceFrom: 179.9, categoryId: "bbq", imageColor: "#22C55E" },
    { id: "b2", name: "Half Rack Ribs", description: "Sticky BBQ glaze", priceFrom: 159.9, categoryId: "bbq", imageColor: "#EF4444" },
    { id: "b3", name: "Pulled Pork Sandwich", description: "House slaw", priceFrom: 79.9, categoryId: "bbq", imageColor: "#F97316" },
  
    // burgers
    { id: "bu1", name: "Classic Burger", description: "Beef patty, lettuce, tomato", priceFrom: 54.9, categoryId: "burgers", imageColor: "#FACC15" },
    { id: "bu2", name: "Cheesy BBQ Double", description: "2x patties, cheese, BBQ sauce", priceFrom: 79.9, categoryId: "burgers", imageColor: "#EF4444" },
    { id: "bu3", name: "King Burger", description: "Big burger, big flavour", priceFrom: 89.9, categoryId: "burgers", imageColor: "#F97316" },
  
    // chicken
    { id: "c1", name: "6 Wings", description: "Hot or BBQ", priceFrom: 79.9, categoryId: "chicken", imageColor: "#EF4444" },
    { id: "c2", name: "Chicken Strips", description: "Crispy strips + dip", priceFrom: 69.9, categoryId: "chicken", imageColor: "#F97316" },
    { id: "c3", name: "Grilled Chicken Burger", description: "Flame-grilled fillet", priceFrom: 64.9, categoryId: "chicken", imageColor: "#FACC15" },
  
    // sides
    { id: "si1", name: "Regular Chips", description: "Hand-cut style", priceFrom: 24.9, categoryId: "sides", imageColor: "#FACC15" },
    { id: "si2", name: "Onion Rings", description: "Crispy golden rings", priceFrom: 29.9, categoryId: "sides", imageColor: "#F97316" },
    { id: "si3", name: "Coleslaw", description: "Creamy slaw", priceFrom: 19.9, categoryId: "sides", imageColor: "#22C55E" },
  
    // drinks
    { id: "dr1", name: "Cappy Juice", description: "330ml", priceFrom: 22.0, categoryId: "drinks", imageColor: "#60A5FA" },
    { id: "dr2", name: "Soft Drink", description: "330ml can", priceFrom: 19.9, categoryId: "drinks", imageColor: "#3B82F6" },
    { id: "dr3", name: "Bottled Water", description: "Still water", priceFrom: 14.9, categoryId: "drinks", imageColor: "#93C5FD" },
  
    // desserts
    { id: "de1", name: "Ice Cream", description: "Vanilla soft serve", priceFrom: 19.9, categoryId: "desserts", imageColor: "#E9D5FF" },
    { id: "de2", name: "Chocolate Brownie", description: "Warm & gooey", priceFrom: 29.9, categoryId: "desserts", imageColor: "#A78BFA" },
    { id: "de3", name: "Milkshake", description: "Chocolate / Vanilla", priceFrom: 34.9, categoryId: "desserts", imageColor: "#C4B5FD" },
  
    // kids
    { id: "k1", name: "Kids Chicken Strips", description: "2 strips + small chips", priceFrom: 49.9, categoryId: "kids", imageColor: "#FACC15" },
    { id: "k2", name: "Kids Burger", description: "Mini burger + small chips", priceFrom: 44.9, categoryId: "kids", imageColor: "#F97316" },
  
    // veggie
    { id: "v1", name: "Veggie Burger", description: "Plant-based patty", priceFrom: 59.9, categoryId: "veggie", imageColor: "#22C55E" },
    { id: "v2", name: "Garden Salad", description: "Fresh greens", priceFrom: 39.9, categoryId: "veggie", imageColor: "#16A34A" },
  
    // sauces
    { id: "sa1", name: "BBQ Sauce", description: "Smoky house BBQ", priceFrom: 9.9, categoryId: "sauces", imageColor: "#EF4444" },
    { id: "sa2", name: "Peri-Peri", description: "Hot chilli sauce", priceFrom: 9.9, categoryId: "sauces", imageColor: "#F97316" },
  ];
  
  