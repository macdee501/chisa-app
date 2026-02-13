import { View, Text, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  mode: "deliver" | "collect";
  onChangeMode: (mode: "deliver" | "collect") => void;
  onOpenMenu: () => void;
};

export default function HomeHeader({ mode, onChangeMode, onOpenMenu }: Props) {
  return (
    <View className="bg-white px-4 pt-2 pb-3">
      {/* Row 1 */}
      <View className="flex-row items-center justify-between">
        {/* Deliver / Collect toggle */}
        <View className="flex-row rounded-full bg-black/5 p-1">
          <Pressable
            onPress={() => onChangeMode("deliver")}
            className={`rounded-full px-4 py-2 ${mode === "deliver" ? "bg-white" : ""}`}
          >
            <Text className={`text-sm ${mode === "deliver" ? "font-semibold" : ""}`}>
              Deliver
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onChangeMode("collect")}
            className={`rounded-full px-4 py-2 ${mode === "collect" ? "bg-white" : ""}`}
          >
            <Text className={`text-sm ${mode === "collect" ? "font-semibold" : ""}`}>
              Collect
            </Text>
          </Pressable>
        </View>

        {/* Right side icons */}
        <Pressable
          onPress={onOpenMenu}
          className="ml-2 h-10 w-10 items-center justify-center rounded-full bg-black/5"
          hitSlop={10}
        >
          <Ionicons name="menu" size={22} />
        </Pressable>
      </View>

      {/* Row 2: address input */}
      <View className="mt-3 flex-row items-center rounded-2xl bg-black/5 px-3 py-2">
        <Ionicons name="location-outline" size={18} />
        <TextInput
          className="ml-2 flex-1 py-2 text-sm"
          placeholder={mode === "deliver" ? "Enter delivery address" : "Select collection store"}
          placeholderTextColor="#666"
        />
      </View>
    </View>
  );
}
