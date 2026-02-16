import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCheckout, type PaymentMethod } from "@/store/useCheckout";

export default function PaymentMethodModal() {
  const paymentMethod = useCheckout((s) => s.paymentMethod);
  const setPaymentMethod = useCheckout((s) => s.setPaymentMethod);

  const choose = (m: PaymentMethod) => {
    setPaymentMethod(m);
    router.back();
  };

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <View className="flex-row justify-end">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-black/5"
          hitSlop={10}
        >
          <Ionicons name="close" size={20} />
        </Pressable>
      </View>

      <Text className="mt-2 text-3xl font-extrabold tracking-wide">PAYMENT</Text>

      <Text className="mt-8 text-lg font-extrabold tracking-wide">
        OTHER PAYMENT METHODS
      </Text>

      <Pressable
        onPress={() => choose("card")}
        className="mt-4 flex-row items-center justify-between border-b border-black/10 py-4"
      >
        <View className="flex-row items-center">
          <Ionicons name="card-outline" size={20} />
          <Text className="ml-3 text-base font-semibold">Card on delivery</Text>
        </View>
        {paymentMethod === "card" ? (
          <Ionicons name="checkmark" size={20} color="#d97706" />
        ) : null}
      </Pressable>

      <Pressable
        onPress={() => choose("cash")}
        className="flex-row items-center justify-between border-b border-black/10 py-4"
      >
        <View className="flex-row items-center">
          <Ionicons name="cash-outline" size={20} />
          <Text className="ml-3 text-base font-semibold">Cash on delivery</Text>
        </View>
        {paymentMethod === "cash" ? (
          <Ionicons name="checkmark" size={20} color="#d97706" />
        ) : null}
      </Pressable>

      <View className="mt-auto pb-6">
        <Pressable
          onPress={() => router.back()}
          className="h-14 items-center justify-center rounded-xl bg-amber-500"
        >
          <Text className="text-base font-extrabold tracking-wide">BACK</Text>
        </Pressable>
      </View>
    </View>
  );
}
