import { View, Text, Pressable } from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { MENU_ITEMS } from "@/data/menuItems";

export default function ProductModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = MENU_ITEMS.find((x) => x.id === id);

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: item?.name ?? "Item",
          presentation: "modal",
        }}
      />

      {!item ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-lg font-semibold">Item not found</Text>
          <Pressable
            onPress={() => router.back()}
            className="mt-4 rounded-2xl bg-black px-4 py-3"
          >
            <Text className="font-semibold text-white">Close</Text>
          </Pressable>
        </View>
      ) : (
        <View className="p-5">
          {/* image placeholder */}
          <View
            className="h-48 w-full rounded-3xl"
            style={{ backgroundColor: item.imageColor ?? "#E5E7EB" }}
          />

          <Text className="mt-5 text-2xl font-extrabold">{item.name}</Text>

          {!!item.description && (
            <Text className="mt-2 text-base text-black/60">
              {item.description}
            </Text>
          )}

          <Text className="mt-4 text-lg font-bold">
            From R {item.priceFrom.toFixed(2)}
          </Text>

          <Pressable
            onPress={() => router.back()}
            className="mt-8 items-center rounded-2xl bg-black py-4"
          >
            <Text className="text-base font-semibold text-white">Close</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
