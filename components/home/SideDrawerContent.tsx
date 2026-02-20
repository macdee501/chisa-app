import { Ionicons } from "@expo/vector-icons";
import {
    DrawerContentScrollView,
    type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const LINKS = ["Home", "Orders", "Inbox", "Account", "Help", "Contact", "About"] as const;
type LinkLabel = (typeof LINKS)[number];

const ROUTES = {
  Home: "/home",
  Orders: "/orders",
  Inbox: "/inbox",
  Account: "/account",
  Help: "/help",
  Contact: "/contact",
  About: "/about",
} as const;

type Props = DrawerContentComponentProps & {
  name?: string;
};

export default function SideDrawerContent({ navigation, name }: Props) {
  const pathname = usePathname();

  const handlePress = (label: LinkLabel) => {
    const href = ROUTES[label];
    if (!href) return;

    router.navigate(href);
    navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0 }}>
      <View className="h-full bg-white px-4 pt-12">
        <View className="mb-6 flex-row justify-end">
          <TouchableOpacity onPress={() => navigation.closeDrawer()}>
            <Ionicons name="close" size={26} />
          </TouchableOpacity>
        </View>

        <View className="mb-6 h-14 w-32 rounded-xl bg-black/10" />

        {LINKS.map((label) => {
          const href = ROUTES[label]; // ✅ define href here
          const enabled = !!href;

          const isActive =
            enabled &&
            (pathname === href || pathname.startsWith(href + "/"));

          return (
            <TouchableOpacity
              key={label}
              className={`py-3 ${
                isActive ? "rounded-xl bg-black/5 px-2" : ""
              }`}
              onPress={() => handlePress(label)}
              disabled={!enabled}
            >
              <Text
                className={[
                  "text-base",
                  enabled ? "" : "text-black/30",
                  isActive ? "font-semibold" : "",
                ].join(" ")}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <View className="mt-auto pb-6">
          <Text className="text-sm text-black/60">
            {name ? `Hi, ${name}` : "Hi, Guest"}
          </Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
