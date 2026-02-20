import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function CheckoutHeader({ storeName }: { storeName: string }) {
  return (
    <View className="px-4 pt-2 pb-3 bg-white">
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-black/5"
          hitSlop={10}
        >
          <Ionicons name="arrow-back" size={20} />
        </TouchableOpacity>

        <View className="ml-3">
          <Text className="text-3xl font-extrabold tracking-wide">CHECKOUT</Text>
          <Text className="text-base text-black/70">{storeName}</Text>
        </View>
      </View>
    </View>
  );
}
