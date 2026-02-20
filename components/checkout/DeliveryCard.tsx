import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function DeliveryCard({
  addressTitle,
  addressLine,
  phone,
}: {
  addressTitle: string;
  addressLine: string;
  phone: string;
}) {
  return (
    <>
      <View className="px-4 mt-4 flex-row items-center justify-between">
        <Text className="text-lg font-extrabold tracking-wide">DELIVERY</Text>
        <TouchableOpacity onPress={() => {}} hitSlop={10}>
          <Text className="text-sm text-amber-600">Switch to collect</Text>
        </TouchableOpacity>
      </View>

      <View className="mx-4 mt-3 rounded-2xl bg-black/5 px-4 py-3">
        <View className="flex-row">
          <View className="mt-1 mr-3">
            <Ionicons name="location-outline" size={18} />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold">{addressTitle}</Text>
            <Text className="text-sm text-black/70">{addressLine}</Text>
          </View>
        </View>

        <View className="my-3 h-px bg-black/10" />

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={18} />
            <Text className="ml-3 text-base">Delivery ASAP</Text>
          </View>
          <Ionicons name="chevron-down" size={18} />
        </View>

        <View className="my-3 h-px bg-black/10" />

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="phone-portrait-outline" size={18} />
            <View className="ml-3">
              <Text className="text-base">Your mobile number</Text>
              <Text className="text-sm text-black/70">{phone}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => {}} hitSlop={10}>
            <Text className="text-sm text-amber-600">Change</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
