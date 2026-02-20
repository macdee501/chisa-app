// app/(main)/(shell)/menu/[category].tsx  (or app/menu/[category].tsx depending on your structure)
import { Ionicons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import ScreenHeader from "@/components/layout/ScreenHeader";
import { CATEGORIES } from "@/data/categories";
import { MENU_ITEMS } from "@/data/menuItems";

const money = (n: number) => `R ${n.toFixed(2)}`;

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();

  const categoryObj = CATEGORIES.find((c) => c.id === category);
  const items = categoryObj
    ? MENU_ITEMS.filter((i) => i.categoryId === categoryObj.id)
    : [];

  return (
    <View className="flex-1 bg-white">
      <ScreenHeader />
      <Stack.Screen
        options={{
          title: categoryObj?.name ?? "Menu",
        }}
      />

      {!categoryObj ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-2xl font-extrabold text-black/80">
            Category not found
          </Text>
          <Text className="mt-2 text-center text-black/60">
            The category you’re looking for doesn’t exist.
          </Text>

          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-6 h-12 items-center justify-center rounded-2xl bg-black px-5"
          >
            <Text className="font-semibold text-white">Go back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 28 }}
          ListHeaderComponent={
            <View className="pb-4">
              <Text className="text-4xl font-extrabold tracking-wide text-black/80">
                {categoryObj.name.toUpperCase()}
              </Text>
              <Text className="mt-2 text-base text-black/50">
                Choose an item to customize and add to your order.
              </Text>

              <View className="mt-5 h-[1px] bg-black/10" />
            </View>
          }
          ListEmptyComponent={
            <View className="py-16 items-center">
              <Text className="text-base font-semibold text-black/70">
                Nothing here yet
              </Text>
              <Text className="mt-2 text-center text-black/50">
                No items in this category yet.
              </Text>

              <TouchableOpacity
                onPress={() => router.back()}
                className="mt-6 h-12 items-center justify-center rounded-2xl bg-black px-5"
              >
                <Text className="font-semibold text-white">Back to menu</Text>
              </TouchableOpacity>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/product/${item.id}`)}
              className="mb-3 rounded-3xl border border-black/10 bg-white p-4"
              style={{ elevation: 2 }}
            >
              <View className="flex-row items-start gap-4">
                {/* Left: name + description */}
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-black/90">
                    {item.name}
                  </Text>

                  {!!item.description && (
                    <Text className="mt-1 text-sm text-black/60" numberOfLines={2}>
                      {item.description}
                    </Text>
                  )}

                  <View className="mt-3 flex-row items-center gap-2">
                    <View className="rounded-full bg-yellow-500 px-3 py-1">
                      <Text className="text-xs font-extrabold text-black">
                        FROM {money(item.priceFrom)}
                      </Text>
                    </View>

                    <Text className="text-xs text-black/40">
                      Tap to view options
                    </Text>
                  </View>
                </View>

                {/* Right: mini image placeholder + chevron */}
                <View className="items-end">
                  <View
                    className="h-16 w-16 rounded-2xl bg-black/5"
                    style={{ backgroundColor: item.imageColor ?? "#E5E7EB" }}
                  />
                  <View className="mt-3 h-7 w-7 items-center justify-center rounded-full bg-black/5">
                    <Ionicons name="chevron-forward" size={16} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
