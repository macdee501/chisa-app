import { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Pressable, ActivityIndicator, Image } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import ScreenHeader from "@/components/layout/ScreenHeader";

import { CATEGORIES } from "@/data/categories";
import { DummyProduct } from "@/data/api/duumyjson";
import { getAppCategoryProducts } from "@/data/menuAdapter";
import { AppCategoryId } from "@/data/categoryMap";

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();

  const categoryObj = useMemo(
    () => CATEGORIES.find((c) => c.id === category),
    [category]
  );

  const [items, setItems] = useState<DummyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setError(null);
        setLoading(true);

        if (!categoryObj) {
          setItems([]);
          return;
        }

        const prods = await getAppCategoryProducts(categoryObj.id as AppCategoryId);
        if (!alive) return;

        setItems(prods);
      } catch (e: any) {
        if (!alive) return;
        console.warn("category load error", e);
        setError(e?.message ?? "Failed to load category");
        setItems([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [categoryObj]);

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
      ) : loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
          <Text className="mt-3 text-sm text-muted-foreground">Loading…</Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-lg font-semibold text-foreground">
            Couldn’t load this category
          </Text>
          <Text className="mt-2 text-center text-sm text-muted-foreground">
            {error}
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
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          ListEmptyComponent={
            <View className="py-10">
              <Text className="text-center text-muted-foreground">
                No items in this category yet.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              className="rounded-2xl border border-border bg-card p-4"
              onPress={() => router.push(`/product/${item.id}`)}
            >
              <View className="flex-row items-start justify-between gap-4">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">
                    {item.title}
                  </Text>

                  {!!item.description && (
                    <Text className="mt-1 text-sm text-muted-foreground" numberOfLines={2}>
                      {item.description}
                    </Text>
                  )}
                </View>

                <View className="items-end">
                  <Text className="text-sm font-semibold text-foreground">
                    R{item.price.toFixed(2)}
                  </Text>

                  <Image
                    source={{ uri: item.thumbnail }}
                    className="mt-3 h-14 w-14 rounded-xl bg-black/5"
                    resizeMode="cover"
                  />
                </View>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
