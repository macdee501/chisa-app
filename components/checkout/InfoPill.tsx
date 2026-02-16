import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InfoPill({ text }: { text: string }) {
  return (
    <View className="mx-4 mt-4 flex-row items-center rounded-2xl bg-black/5 px-4 py-3">
      <Ionicons name="information-circle" size={18} color="#d97706" />
      <Text className="ml-2 text-sm text-black/80">{text}</Text>
    </View>
  );
}
