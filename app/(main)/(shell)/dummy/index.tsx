import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { Stack } from "expo-router";

type DummyProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
};

export default function DummyScreen() {
  const [products, setProducts] = useState<DummyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setError(null);
        setLoading(true);

        // Use a category that always exists for a reliable test
        const res = await fetch("https://dummyjson.com/products/category/groceries");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = (await res.json()) as { products: DummyProduct[] };

        if (!alive) return;
        setProducts(data.products);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Failed to load");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ title: "DummyJSON Test" }} />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
          <Text className="mt-3 text-black/60">Loading…</Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-lg font-semibold text-red-600">Fetch failed</Text>
          <Text className="mt-2 text-center text-black/60">{error}</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          renderItem={({ item }) => (
            <View className="rounded-2xl border border-black/10 p-4">
              <Image
                source={{ uri: item.thumbnail }}
                className="h-36 w-full rounded-xl bg-black/5"
                resizeMode="cover"
              />
              <Text className="mt-3 text-lg font-semibold">{item.title}</Text>
              <Text className="mt-1 text-sm text-black/60" numberOfLines={2}>
                {item.description}
              </Text>
              <Text className="mt-3 text-base font-bold">R {item.price.toFixed(2)}</Text>
              <Text className="mt-1 text-xs text-black/40">{item.category}</Text>
            </View>
          )}
          ListEmptyComponent={
            <View className="py-10">
              <Text className="text-center text-black/60">No products returned.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
