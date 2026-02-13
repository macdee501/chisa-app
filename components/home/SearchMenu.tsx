import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SearchMenu() {
  return (
    <View className="bg-red-500 px-4 pb-3">

      <Pressable
        onPress={() => router.push("/search")}
        className="flex-row items-center rounded-2xl bg-black/5 px-3 py-4"
      >
        <Ionicons name="search" size={18} />
        <Text className="ml-2 text-sm text-black/60">
          Search burgers, combos, drinks...
        </Text>
      </Pressable>
    </View>
  );
}
