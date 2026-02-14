export type HeroSlide = {
    id: string;
    title: string;
    subtitle?: string;
    color: string; // hex color
  };
  
  export const HERO_SLIDES: HeroSlide[] = [
    { id: "1", title: "BBQ Platter", subtitle: "Smoky & tender", color: "#F97316" },
    { id: "2", title: "Chicken Combo", subtitle: "New deal", color: "#EF4444" },
    { id: "3", title: "Family Feast", subtitle: "Best value", color: "#FACC15" },
  ];
  