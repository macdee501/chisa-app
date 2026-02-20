import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function AuthScreen() {
  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ title: "Authentication" }} />

      <View className="flex-1 items-center justify-center px-6">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-yellow-500/20">
          <Ionicons name="lock-closed-outline" size={36} />
        </View>

        <Text className="mt-6 text-2xl font-extrabold text-black/80">
          Coming Soon
        </Text>

        <Text className="mt-3 text-center text-black/60">
          Authentication and account features will be available
          in the full release.
        </Text>

        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-8 h-12 items-center justify-center rounded-2xl bg-black px-6"
        >
          <Text className="font-semibold text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
