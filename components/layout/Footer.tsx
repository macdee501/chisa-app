import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { useCart } from "@/store/useCart";

const money = (n: number) => `R ${n.toFixed(2)}`;

export default function StickyFooterBar() {
  const lines = useCart((s) => s.lines);
  const total = useCart((s) => s.total());
  const itemCount = useCart((s) => s.lines.reduce((sum, l) => sum + l.qty, 0));

  const hasOrder = lines.length > 0;

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white px-4 pb-5 pt-3">
      {hasOrder ? (
        <Pressable
          onPress={() => router.push("/order")}
          className="h-14 flex-row items-center justify-between rounded-2xl bg-yellow-500 px-4"
        >
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-black/10">
            <Text className="text-lg font-extrabold text-black/80">
              {itemCount}
            </Text>
          </View>

          <Text className="text-base font-extrabold tracking-wide text-black">
            VIEW ORDER
          </Text>

          <Text className="text-base font-extrabold text-black">
            {money(total)}
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => () => router.push("/auth")
          }
          className="h-14 items-center justify-center rounded-2xl bg-yellow-500"
        >
          <Text className="text-base font-extrabold tracking-wide text-black">
            LOGIN OR SIGN UP
          </Text>
        </Pressable>
      )}
    </View>
  );
}
