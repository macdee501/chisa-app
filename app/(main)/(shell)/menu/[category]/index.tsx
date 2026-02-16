// app/menu/[category].tsx
import { View, Text, FlatList, Pressable } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { CATEGORIES } from "@/data/categories";
import { MENU_ITEMS } from "@/data/menuItems";
import ScreenHeader from "@/components/layout/ScreenHeader";

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();

  const categoryObj = CATEGORIES.find((c) => c.id === category);
  const items = categoryObj
    ? MENU_ITEMS.filter((i) => i.categoryId === categoryObj.id)
    : [];

  return (
    
    <View className="flex-1 bg-background">
      <ScreenHeader />
      <Stack.Screen
        options={{
          title: categoryObj?.name ?? "Menu",
        }}
      />

      {!categoryObj ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-lg font-semibold text-foreground">
            Category not found
          </Text>

          <Pressable
            onPress={() => router.back()}
            className="mt-4 rounded-2xl bg-foreground px-4 py-3"
          >
            <Text className="font-semibold text-background">Go back</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          ListEmptyComponent={
            <View className="py-10">
              <Text className="text-center text-muted-foreground">
                No items in this category yet.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable className="rounded-2xl border border-border bg-card p-4">
              <View className="flex-row items-start justify-between gap-4">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">
                    {item.name}
                  </Text>
                  {!!item.description && (
                    <Text className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </Text>
                  )}
                </View>

                <Text className="text-sm font-semibold text-foreground">
                  From R{item.priceFrom.toFixed(2)}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
