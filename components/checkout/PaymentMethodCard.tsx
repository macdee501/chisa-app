import { useCheckout } from "@/store/useCheckout";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function PaymentMethodCard() {
  const paymentMethod = useCheckout((s) => s.paymentMethod);

  const title = paymentMethod === "card" ? "Card on delivery" : "Cash on delivery";
  const subtitle =
    paymentMethod === "card"
      ? "Pay with card when driver arrives"
      : "Pay cash when driver arrives";

  return (
    <View className="px-4 mt-10">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-extrabold tracking-wide">PAYMENT METHOD</Text>

        <TouchableOpacity onPress={() => router.push("/payment-method")} hitSlop={10}>
          <Text className="text-sm text-amber-600">Change</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/payment-method")}
        className="mt-4 rounded-2xl bg-black/5 px-4 py-4 flex-row items-center"
      >
        <Ionicons name="card-outline" size={22} />
        <View className="ml-3 flex-1">
          <Text className="text-base font-semibold">{title}</Text>
          <Text className="text-sm text-black/60">{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} />
      </TouchableOpacity>
    </View>
  );
}
