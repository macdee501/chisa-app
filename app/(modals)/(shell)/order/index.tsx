import { View, Text, Pressable, ScrollView } from "react-native";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/store/useCart";
import { useCheckout } from "@/store/useCheckout";

const money = (n: number) => `R ${n.toFixed(2)}`;

export default function OrderScreen() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);

  // Avoid calling total() inside selector repeatedly
  const totalFn = useCart((s) => s.total);
  const subtotal = totalFn();

  const itemCount = useCart((s) =>
    s.lines.reduce((sum, l) => sum + l.qty, 0)
  );

  const resetCheckout = useCheckout((s) => s.resetCheckout);

  const canCheckout = lines.length > 0;

  const goToCheckout = () => {
    if (!canCheckout) return;

    // Optional but recommended: start checkout clean each time
    resetCheckout();

    // Since this is a modal, replace prevents stacking weirdness
    router.replace("/checkout");
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Top Bar */}
      <View className="flex-row items-center px-4 pt-2">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-black/5"
          hitSlop={10}
        >
          <Ionicons name="arrow-back" size={20} />
        </Pressable>

        <Text className="ml-3 text-base font-semibold text-black/60">
          Steers Orkney
        </Text>
      </View>

      {/* Title */}
      <View className="px-4 pt-4 pb-2">
        <Text className="text-4xl font-extrabold tracking-wide text-black/80">
          ORDER SUMMARY
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {lines.length === 0 ? (
          <View className="px-4 pt-10">
            <Text className="text-base text-black/60">Your order is empty.</Text>
          </View>
        ) : (
          <View className="pt-2">
            {lines.map((l) => (
              <View key={l.itemId} className="px-4">
                <View className="flex-row py-5 border-b border-black/10">
                  {/* Left: qty */}
                  <View className="w-10">
                    <Text className="text-base text-black/80">{l.qty}</Text>
                  </View>

                  {/* Middle: name */}
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-black/80">
                      × {l.name}
                    </Text>
                  </View>

                  {/* Right: price + trash */}
                  <View className="items-end">
                    <Text className="text-base font-semibold text-black/80">
                      {money(l.unitPrice * l.qty)}
                    </Text>

                    <Pressable
                      onPress={() => setQty(l.itemId, 0)}
                      className="mt-2 h-9 w-9 items-center justify-center rounded-full bg-black/5"
                      hitSlop={10}
                    >
                      <Ionicons name="trash-outline" size={18} />
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}

            {/* Add Item */}
            <Pressable onPress={() => router.back()} className="px-4 py-5">
              <Text className="text-base font-semibold text-yellow-600">
                + Add Item
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      {/* Bottom Checkout Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 pb-5 pt-3">
        <Pressable
          className="h-14 flex-row items-center justify-between rounded-2xl bg-yellow-500 px-4"
          onPress={goToCheckout}
          disabled={!canCheckout}
          style={{ opacity: canCheckout ? 1 : 0.5 }}
        >
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-black/10">
            <Text className="text-lg font-extrabold text-black/80">
              {itemCount}
            </Text>
          </View>

          <Text className="text-base font-extrabold tracking-wide text-black">
            CHECKOUT
          </Text>

          <Text className="text-base font-extrabold text-black">
            {money(subtotal)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
