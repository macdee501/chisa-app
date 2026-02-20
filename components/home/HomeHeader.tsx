import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  mode: "deliver" | "collect";
  onChangeMode: (mode: "deliver" | "collect") => void;
  onOpenMenu: () => void;
  addressLabel?: string;
};

export default function HomeHeader({
  mode,
  onChangeMode,
  onOpenMenu,
  addressLabel,
}: Props) {
  const router = useRouter();

  const placeholder =
    mode === "deliver" ? "Enter delivery address" : "Select collection store";

  return (
    <View className="bg-white px-4 pt-2 pb-3">
      {/* Row 1 */}
      <View className="flex-row items-center justify-between">
        {/* Deliver / Collect toggle */}
        <View className="flex-row rounded-full bg-black/5 p-1">
          <TouchableOpacity
            onPress={() => onChangeMode("deliver")}
            className={`rounded-full px-4 py-2 ${mode === "deliver" ? "bg-white" : ""}`}
          >
            <Text className={`text-sm ${mode === "deliver" ? "font-semibold" : ""}`}>
              Deliver
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onChangeMode("collect")}
            className={`rounded-full px-4 py-2 ${mode === "collect" ? "bg-white" : ""}`}
          >
            <Text className={`text-sm ${mode === "collect" ? "font-semibold" : ""}`}>
              Collect
            </Text>
          </TouchableOpacity>
        </View>

        {/* Right side icons */}
        <TouchableOpacity
          onPress={onOpenMenu}
          className="ml-2 h-10 w-10 items-center justify-center rounded-full bg-black/5"
          hitSlop={10}
        >
          <Ionicons name="menu" size={22} />
        </TouchableOpacity>
      </View>

      {/* Row 2: tap to open map */}
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/(modals)/(shell)/map",
            params: { mode },
          })
        }
        className="mt-3 flex-row items-center rounded-2xl bg-black/5 px-3 py-2"
        android_ripple={{ color: "rgba(0,0,0,0.06)" }}
      >
        <Ionicons name="location-outline" size={18} />
        <Text
          className={`ml-2 flex-1 py-2 text-sm ${
            addressLabel ? "text-black" : "text-[#666]"
          }`}
          numberOfLines={1}
        >
          {addressLabel ?? placeholder}
        </Text>
        <Ionicons name="chevron-forward" size={18} />
      </TouchableOpacity>
    </View>
  );
}
