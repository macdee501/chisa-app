import { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, ActivityIndicator, Image } from "react-native";
import { router } from "expo-router";
import { useCart } from "@/store/useCart";

import { CATEGORIES } from "@/data/categories";
import { DummyProduct } from "@/data/api/duumyjson";
import { getAppCategoryProducts } from "@/data/menuAdapter";
import { AppCategoryId } from "@/data/categoryMap";

type Props = {
  registerSection: (categoryId: string, y: number) => void;
};

export default function MenuSections({ registerSection }: Props) {
  const [itemsByCategory, setItemsByCategory] = useState<Record<string, DummyProduct[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setError(null);
        setLoading(true);

        // Fetch preview items for each category (2 items)
        const pairs = await Promise.all(
          CATEGORIES.map(async (cat) => {
            const items = await getAppCategoryProducts(cat.id as AppCategoryId);
            return [cat.id, items.slice(0, 2)] as const;
          })
        );

        if (!alive) return;

        const map: Record<string, DummyProduct[]> = {};
        for (const [catId, items] of pairs) map[catId] = items;
        setItemsByCategory(map);
      } catch (e: any) {
        if (!alive) return;
        console.warn("menu sections load error", e);
        setError(e?.message ?? "Failed to load menu");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return (
      <View className="py-10 items-center">
        <ActivityIndicator />
        <Text className="mt-3 text-sm text-black/60">Loading menu…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="px-4 py-10">
        <Text className="text-base font-semibold text-red-600">Couldn’t load menu</Text>
        <Text className="mt-2 text-sm text-black/60">{error}</Text>
      </View>
    );
  }

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

              <Pressable onPress={() => router.push(`/menu/${cat.id}`)}>
                <Text className="text-sm font-semibold text-primary">See all</Text>
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

function MenuRow({ item }: { item: DummyProduct }) {
  const qtyInCart = useCart((s) => s.getQty(String(item.id)));

  return (
    <Pressable
      className="flex-row items-center justify-between py-5 border-b border-black/10"
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <View className="flex-1 pr-4">
        <View className="flex-row items-center gap-3">
          <Text className="text-lg font-semibold">{item.title}</Text>

          {qtyInCart > 0 ? (
            <View className="h-7 min-w-[28px] items-center justify-center rounded-md bg-yellow-500 px-2">
              <Text className="text-sm font-extrabold text-black">{qtyInCart}</Text>
            </View>
          ) : null}
        </View>

        {!!item.description ? (
          <Text className="mt-1 text-sm text-black/60" numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}

        <Text className="mt-2 text-base font-semibold">
          R {item.price.toFixed(2)} +
        </Text>
      </View>

      <Image
        source={{ uri: item.thumbnail }}
        className="h-20 w-20 rounded-xl bg-black/5"
        resizeMode="cover"
      />
    </Pressable>
  );
}
