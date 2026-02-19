import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SearchMenu() {
  return (
    <View className=" px-4 py-4">
      <Text className="mb-2 text-base font-semibold">Search the menu</Text>

      <Pressable
        onPress={() => router.push("/search")}
        className="flex-row items-center rounded-2xl bg-black px-4 py-4"
      >
        <Ionicons name="search" size={18} color="white" />
        <Text className="ml-2 text-sm text-white">Search burgers, combos, drinks...</Text>
      </Pressable>
    </View>
  );
}
