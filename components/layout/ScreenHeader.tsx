import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, usePathname } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const TITLE_BY_ROUTE: Record<string, string> = {
  "/orders": "Orders",
  "/inbox": "Inbox",
  "/account": "Account",
  "/help": "Help",
  "/contact": "Contact",
  "/about": "About",
};

export default function ScreenHeader() {
  const navigation = useNavigation();
  const pathname = usePathname();

  // normalize nested routes: "/orders/123" -> "/orders"
  const base =
    Object.keys(TITLE_BY_ROUTE).find((p) => pathname === p || pathname.startsWith(p + "/")) ??
    pathname;

  const title = TITLE_BY_ROUTE[base] ?? "App";

  return (
    <View className="bg-white px-4 pt-2 pb-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-semibold">{title}</Text>

        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          className="h-10 w-10 items-center justify-center rounded-full bg-black/5"
          hitSlop={10}
        >
          <Ionicons name="menu" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
