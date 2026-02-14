import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { MENU_ITEMS } from "@/data/menuItems";
import { useCart } from "@/store/useCart";

const money = (n: number) => `R ${n.toFixed(2)}`;

export default function ProductModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = MENU_ITEMS.find((x) => x.id === id);
  const addItem = useCart((s) => s.addItem);
const alreadyQty = useCart((s) => s.getQty(item?.id ?? ""));
const isInCart = alreadyQty > 0;

  const [qty, setQty] = useState(1);

  if (!item) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-semibold">Item not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 rounded-2xl bg-black px-4 py-3"
        >
          <Text className="text-white font-semibold">Close</Text>
        </Pressable>
      </View>
    );
  }

  const total = item.priceFrom * qty;

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
  options={{
    title: "",
    presentation: "modal",
    headerShown: false, // Steers-style: no header, just floating X
  }}
/>
<Pressable
  onPress={() => router.back()}
  className="absolute right-4 top-4 z-50 h-11 w-11 items-center justify-center rounded-full bg-white"
  style={{ elevation: 6 }} // Android shadow
>
  <Text className="text-xl">✕</Text>
</Pressable>



      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Image */}
        <View
          className="mx-4 mt-4 h-44 rounded-3xl"
          style={{ backgroundColor: item.imageColor ?? "#E5E7EB" }}
        />

        {/* Title */}
        <View className="px-4 pt-5">
          <Text className="text-3xl font-extrabold text-black/90">
            {item.name.toUpperCase()}
          </Text>

          {!!item.description && (
            <Text className="mt-2 text-base text-black/60">
              {item.description}
            </Text>
          )}

          <Text className="mt-4 text-lg font-bold">
            From {money(item.priceFrom)}
          </Text>
        </View>

        {/* 
          🚀 FUTURE: Dynamic Option Groups
          
          Later we can:
          - Attach optionGroups to each MenuItem
          - Or fetch item options from an API
          - Render radio/checkbox groups here
          - Adjust total price based on selections
          
          For demo purposes, keeping it simple.
        */}
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
    addItem(item, qty);
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
