import { useMemo, useRef } from "react";
import { View, Text, Pressable } from "react-native";
import { MENU_ITEMS, type MenuItem } from "@/data/menuItems";
import { CATEGORIES } from "@/data/categories";

type Props = {
  registerSection: (categoryId: string, y: number) => void;
};

export default function MenuSections({ registerSection }: Props) {

    const itemsByCategory = useMemo(() => {
        const map: Record<string, MenuItem[]> = {};
        for (const item of MENU_ITEMS) {
          const arr = (map[item.categoryId] ??= []);
          if (arr.length < 2) arr.push(item); // limit to 2 per category
        }
        return map;
      }, []);
      

  return (
    <View className="bg-white">
      {CATEGORIES.map((cat) => {
        const items = itemsByCategory[cat.id] ?? [];
        if (items.length === 0) return null;

        return (
          <View
            key={cat.id}
            className="px-4 pt-8"
            onLayout={(e) => registerSection(cat.id, e.nativeEvent.layout.y)}
          >
           <View className="flex-row items-center justify-between">
  <Text className="text-2xl font-extrabold tracking-wide text-black/80">
    {cat.name.toUpperCase()}
  </Text>

  <Pressable onPress={() => { /* later: open full list screen */ }}>
    <Text className="text-sm font-semibold text-black/50">See all</Text>
  </Pressable>
</View>


            <View className="mt-3">
              {items.map((item) => (
                <MenuRow key={item.id} item={item} />
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <Pressable className="flex-row items-center justify-between py-5 border-b border-black/10">
      <View className="flex-1 pr-4">
        <Text className="text-lg font-semibold">{item.name}</Text>

        {item.description ? (
          <Text className="mt-1 text-sm text-black/60" numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}

        <Text className="mt-2 text-base font-semibold">
          R {item.priceFrom.toFixed(2)} +
        </Text>
      </View>

      {/* image placeholder (right) */}
      <View
        className="h-20 w-20 rounded-xl bg-black/5"
        style={{ backgroundColor: item.imageColor ?? "#E5E7EB" }}
      />
    </Pressable>
  );
}
