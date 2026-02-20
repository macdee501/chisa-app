import type { Category } from "@/data/categories";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  category: Category;
  onPress?: (category: Category) => void;
};

export default function CategoryCard({ category, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={() => onPress?.(category)}
      className="mr-3 w-28 overflow-hidden rounded-2xl bg-black/5"
    >
      {/* Color block placeholder */}
      <View
        style={{ backgroundColor: category.color }}
        className="h-16 w-full"
      />

      <View className="p-3">
        <Text className="text-sm font-semibold">{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
