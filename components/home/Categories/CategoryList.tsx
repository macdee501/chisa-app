import { View, Text, FlatList } from "react-native";
import { CATEGORIES } from "@/data/categories";
import CategoryCard from "./CategoryCard";

export default function CategoryList() {
  return (
    <View className="bg-white px-4 py-3">
      <Text className="mb-2 text-base font-semibold">Categories</Text>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() => {
              // later: router.push(`/menu/${item.id}`) or `/menu?cat=${item.id}`
            }}
          />
        )}
      />
    </View>
  );
}
