export type FavouriteItem = {
    id: string;
    name: string;
    description?: string;
    price: number;
    color: string; // placeholder background
  };
  
  export const FAVOURITES: FavouriteItem[] = [
    { id: "fav-1", name: "BBQ Ribs", description: "Half rack", price: 129.99, color: "#EF4444" },
    { id: "fav-2", name: "Brisket Plate", description: "Smoked brisket", price: 149.99, color: "#F97316" },
    { id: "fav-3", name: "Wings Combo", description: "Hot & crispy", price: 99.99, color: "#FACC15" },
    { id: "fav-4", name: "Pulled Pork", description: "Classic", price: 109.99, color: "#22C55E" },
  ];
  