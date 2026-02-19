import { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, ScrollView, ActivityIndicator, Image } from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { useCart } from "@/store/useCart";
import { DummyProduct, getProduct } from "@/data/api/duumyjson";


const money = (n: number) => `R ${n.toFixed(2)}`;

export default function ProductModal() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const addItem = useCart((s) => s.addItem);
  const alreadyQty = useCart((s) => s.getQty(id ?? ""));
  const isInCart = alreadyQty > 0;

  const [qty, setQty] = useState(1);

  const [product, setProduct] = useState<DummyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setError(null);
        setLoading(true);

        if (!id) throw new Error("Missing product id");

        const p = await getProduct(id);
        if (!alive) return;
        setProduct(p);
      } catch (e: any) {
        if (!alive) return;
        console.warn("product load error", e);
        setError(e?.message ?? "Failed to load product");
        setProduct(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [id]);

  const total = useMemo(() => (product ? product.price * qty : 0), [product, qty]);

  // Adapter for your cart store (MenuItem-like shape)
  const cartItem = useMemo(() => {
    if (!product) return null;
    return {
      id: String(product.id),
      name: product.title,
      priceFrom: product.price,
      description: product.description,
    };
  }, [product]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Stack.Screen options={{ headerShown: false, presentation: "modal" }} />
        <ActivityIndicator size="large" />
        <Text className="mt-3 text-sm text-black/60">Loading…</Text>
      </View>
    );
  }

  if (!product || !cartItem) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Stack.Screen options={{ headerShown: false, presentation: "modal" }} />

        <Text className="text-lg font-semibold">Item not found</Text>
        {!!error && (
          <Text className="mt-2 text-center text-sm text-black/60">{error}</Text>
        )}

        <Pressable
          onPress={() => router.back()}
          className="mt-4 rounded-2xl bg-black px-4 py-3"
        >
          <Text className="text-white font-semibold">Close</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "",
          presentation: "modal",
          headerShown: false,
        }}
      />

      {/* Floating close */}
      <Pressable
        onPress={() => router.back()}
        className="absolute right-4 top-4 z-50 h-11 w-11 items-center justify-center rounded-full bg-white"
        style={{ elevation: 6 }}
      >
        <Text className="text-xl">✕</Text>
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Image */}
        <Image
          source={{ uri: product.thumbnail }}
          className="mx-4 mt-4 h-44 rounded-3xl bg-black/5"
          resizeMode="cover"
        />

        {/* Title */}
        <View className="px-4 pt-5">
          <Text className="text-3xl font-extrabold text-black/90">
            {product.title.toUpperCase()}
          </Text>

          {!!product.description && (
            <Text className="mt-2 text-base text-black/60">
              {product.description}
            </Text>
          )}

          <Text className="mt-4 text-lg font-bold">{money(product.price)}</Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View className="absolute bottom-0 left-0 right-0 border-t border-black/10 bg-white px-4 pb-5 pt-3">
        <View className="flex-row items-center justify-center gap-6 pb-3">
          <Pressable
            onPress={() => setQty((q) => Math.max(1, q - 1))}
            className="h-12 w-12 items-center justify-center rounded-full bg-black/5"
          >
            <Text className="text-2xl font-semibold">−</Text>
          </Pressable>

          <Text className="text-xl font-bold">{qty}</Text>

          <Pressable
            onPress={() => setQty((q) => q + 1)}
            className="h-12 w-12 items-center justify-center rounded-full bg-black/5"
          >
            <Text className="text-2xl font-semibold">+</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            if (isInCart) {
              router.push("/order");
              return;
            }
            addItem(cartItem as any, qty);
          }}
          className="h-14 items-center justify-center rounded-2xl bg-yellow-500"
        >
          <Text className="text-base font-extrabold tracking-wide text-black">
            {isInCart ? "VIEW ORDER" : `ADD TO ORDER  •  ${money(total)}`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
