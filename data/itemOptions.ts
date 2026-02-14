// data/itemOptions.ts
export type OptionChoice = { id: string; label: string; priceDelta: number };
export type OptionGroup = {
  id: string;
  title: string;
  required?: boolean;
  choices: OptionChoice[];
  defaultChoiceId?: string;
};

export const ITEM_OPTIONS: Record<string, OptionGroup[]> = {
  f1: [
    {
      id: "mealType",
      title: "Meal Type",
      required: true,
      defaultChoiceId: "chickenOnly",
      choices: [
        { id: "chickenChips", label: "Chicken & Chips", priceDelta: 10.0 }, // 49.90 -> 59.90
        { id: "chickenOnly", label: "Chicken Only", priceDelta: 0.0 },
      ],
    },
    {
      id: "chipSize",
      title: "Chip Size",
      required: true,
      defaultChoiceId: "small",
      choices: [
        { id: "small", label: "Small", priceDelta: 0.0 },
        { id: "medium", label: "Medium", priceDelta: 22.9 },
        { id: "large", label: "Large", priceDelta: 32.9 },
      ],
    },
  ],
};
